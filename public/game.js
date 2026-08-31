// src/core/collections/FreeList.ts
var FreeList = class {
  _freeIndices;
  _nextAvailableIndex = 0;
  constructor(initialCapacity = 256) {
    this._freeIndices = [];
    this._freeIndices.length = 0;
  }
  get count() {
    return this._nextAvailableIndex - this._freeIndices.length;
  }
  allocate() {
    if (this._freeIndices.length > 0) {
      return this._freeIndices.pop();
    }
    const id = this._nextAvailableIndex;
    this._nextAvailableIndex++;
    return id;
  }
  free(id) {
    if (id < 0 || id >= this._nextAvailableIndex) {
      throw new Error(`Invalid free id: ${id}`);
    }
    this._freeIndices.push(id);
  }
  clear() {
    this._freeIndices.length = 0;
    this._nextAvailableIndex = 0;
  }
};

// src/core/ecs/EntityManager.ts
var EntityManager = class {
  _generations;
  _alive;
  _freeList;
  _capacity;
  _activeCount = 0;
  constructor(initialCapacity = 1e4) {
    this._capacity = initialCapacity;
    this._generations = new Uint32Array(initialCapacity);
    this._alive = new Uint8Array(initialCapacity);
    this._freeList = new FreeList(initialCapacity);
  }
  get count() {
    return this._activeCount;
  }
  create() {
    const id = this._freeList.allocate();
    if (id >= this._capacity) {
      this._grow(id + 1);
    }
    this._alive[id] = 1;
    this._activeCount++;
    return {
      id,
      generation: this._generations[id]
    };
  }
  destroy(id) {
    if (!this.isAlive(id, this._generations[id])) {
      return false;
    }
    this._alive[id] = 0;
    this._generations[id]++;
    this._freeList.free(id);
    this._activeCount--;
    return true;
  }
  isAlive(id, generation) {
    if (id < 0 || id >= this._capacity) return false;
    return this._alive[id] === 1 && this._generations[id] === generation;
  }
  getGeneration(id) {
    return id < this._capacity ? this._generations[id] : 0;
  }
  _grow(newCapacity) {
    const nextCap = Math.max(newCapacity, this._capacity * 2);
    const nextGens = new Uint32Array(nextCap);
    const nextAlive = new Uint8Array(nextCap);
    nextGens.set(this._generations);
    nextAlive.set(this._alive);
    this._generations = nextGens;
    this._alive = nextAlive;
    this._capacity = nextCap;
  }
  clear() {
    this._generations.fill(0);
    this._alive.fill(0);
    this._freeList.clear();
    this._activeCount = 0;
  }
};

// src/core/collections/BitSet.ts
var BitSet = class _BitSet {
  _words;
  constructor(bitCapacity = 64) {
    const wordCount = Math.ceil(bitCapacity / 32);
    this._words = new Uint32Array(Math.max(2, wordCount));
  }
  set(index, value = true) {
    this._ensureCapacity(index + 1);
    const wordIndex = index >>> 5;
    const bitIndex = index & 31;
    if (value) {
      this._words[wordIndex] |= 1 << bitIndex;
    } else {
      this._words[wordIndex] &= ~(1 << bitIndex);
    }
    return this;
  }
  get(index) {
    const wordIndex = index >>> 5;
    if (wordIndex >= this._words.length) return false;
    return (this._words[wordIndex] & 1 << (index & 31)) !== 0;
  }
  toggle(index) {
    this._ensureCapacity(index + 1);
    const wordIndex = index >>> 5;
    this._words[wordIndex] ^= 1 << (index & 31);
    return this;
  }
  clear() {
    this._words.fill(0);
    return this;
  }
  containsAll(other) {
    const minWords = Math.min(this._words.length, other._words.length);
    for (let i = 0; i < minWords; i++) {
      const otherWord = other._words[i];
      if ((this._words[i] & otherWord) !== otherWord) {
        return false;
      }
    }
    for (let i = minWords; i < other._words.length; i++) {
      if (other._words[i] !== 0) return false;
    }
    return true;
  }
  intersects(other) {
    const minWords = Math.min(this._words.length, other._words.length);
    for (let i = 0; i < minWords; i++) {
      if ((this._words[i] & other._words[i]) !== 0) {
        return true;
      }
    }
    return false;
  }
  and(other) {
    const result = new _BitSet(Math.max(this._words.length, other._words.length) * 32);
    const minWords = Math.min(this._words.length, other._words.length);
    for (let i = 0; i < minWords; i++) {
      result._words[i] = this._words[i] & other._words[i];
    }
    return result;
  }
  or(other) {
    const maxLen = Math.max(this._words.length, other._words.length);
    const result = new _BitSet(maxLen * 32);
    for (let i = 0; i < this._words.length; i++) {
      result._words[i] = this._words[i];
    }
    for (let i = 0; i < other._words.length; i++) {
      result._words[i] |= other._words[i];
    }
    return result;
  }
  xor(other) {
    const maxLen = Math.max(this._words.length, other._words.length);
    const result = new _BitSet(maxLen * 32);
    for (let i = 0; i < maxLen; i++) {
      const a = i < this._words.length ? this._words[i] : 0;
      const b = i < other._words.length ? other._words[i] : 0;
      result._words[i] = a ^ b;
    }
    return result;
  }
  clone() {
    const copy = new _BitSet(this._words.length * 32);
    copy._words.set(this._words);
    return copy;
  }
  countBits() {
    let count = 0;
    for (let i = 0; i < this._words.length; i++) {
      let v = this._words[i];
      v = v - (v >>> 1 & 1431655765);
      v = (v & 858993459) + (v >>> 2 & 858993459);
      count += (v + (v >>> 4) & 252645135) * 16843009 >>> 24;
    }
    return count;
  }
  _ensureCapacity(bits) {
    const requiredWords = Math.ceil(bits / 32);
    if (requiredWords > this._words.length) {
      const newWords = new Uint32Array(Math.max(requiredWords, this._words.length * 2));
      newWords.set(this._words);
      this._words = newWords;
    }
  }
};

// src/core/ecs/ComponentRegistry.ts
var ComponentRegistry = class {
  static _typeIdMap = /* @__PURE__ */ new Map();
  static _nameMap = /* @__PURE__ */ new Map();
  static _constructors = [];
  static _nextTypeId = 0;
  static register(type, customName) {
    if (this._typeIdMap.has(type)) {
      return this._typeIdMap.get(type);
    }
    const id = this._nextTypeId++;
    this._typeIdMap.set(type, id);
    this._constructors[id] = type;
    const name = customName || type.name;
    this._nameMap.set(name, type);
    return id;
  }
  static getTypeId(type) {
    let id = this._typeIdMap.get(type);
    if (id === void 0) {
      id = this.register(type);
    }
    return id;
  }
  static getConstructor(id) {
    return this._constructors[id];
  }
  static getByName(name) {
    return this._nameMap.get(name);
  }
  static createBitSet(types) {
    const bitset = new BitSet();
    for (let i = 0; i < types.length; i++) {
      const typeId = this.getTypeId(types[i]);
      bitset.set(typeId, true);
    }
    return bitset;
  }
  static get totalTypes() {
    return this._nextTypeId;
  }
};

// src/core/collections/FastArray.ts
var FastArray = class {
  data;
  length = 0;
  constructor(initialCapacity = 32) {
    this.data = new Array(initialCapacity);
  }
  push(item) {
    if (this.length >= this.data.length) {
      this._grow();
    }
    this.data[this.length] = item;
    this.length++;
  }
  pop() {
    if (this.length === 0) return void 0;
    this.length--;
    const val = this.data[this.length];
    this.data[this.length] = void 0;
    return val;
  }
  removeAtSwap(index) {
    if (index < 0 || index >= this.length) return void 0;
    const removed = this.data[index];
    this.length--;
    this.data[index] = this.data[this.length];
    this.data[this.length] = void 0;
    return removed;
  }
  get(index) {
    if (index < 0 || index >= this.length) return void 0;
    return this.data[index];
  }
  set(index, val) {
    if (index >= this.data.length) {
      this._ensureCapacity(index + 1);
    }
    if (index >= this.length) {
      this.length = index + 1;
    }
    this.data[index] = val;
  }
  clear() {
    for (let i = 0; i < this.length; i++) {
      this.data[i] = void 0;
    }
    this.length = 0;
  }
  _grow() {
    const newCap = Math.max(8, this.data.length * 2);
    const nextArr = new Array(newCap);
    for (let i = 0; i < this.length; i++) {
      nextArr[i] = this.data[i];
    }
    this.data = nextArr;
  }
  _ensureCapacity(cap) {
    if (cap <= this.data.length) return;
    const nextCap = Math.max(cap, this.data.length * 2);
    const nextArr = new Array(nextCap);
    for (let i = 0; i < this.length; i++) {
      nextArr[i] = this.data[i];
    }
    this.data = nextArr;
  }
};

// src/core/ecs/Archetype.ts
var Archetype = class {
  id;
  mask;
  componentTypes;
  entities;
  componentColumns;
  entityIndexMap;
  constructor(id, mask, componentTypes) {
    this.id = id;
    this.mask = mask;
    this.componentTypes = [...componentTypes].sort((a, b) => a - b);
    this.entities = new FastArray(32);
    this.componentColumns = /* @__PURE__ */ new Map();
    this.entityIndexMap = /* @__PURE__ */ new Map();
    for (let i = 0; i < this.componentTypes.length; i++) {
      this.componentColumns.set(this.componentTypes[i], []);
    }
  }
  get entityCount() {
    return this.entities.length;
  }
  addEntity(entityId, components) {
    const row = this.entities.length;
    this.entities.push(entityId);
    this.entityIndexMap.set(entityId, row);
    for (let i = 0; i < this.componentTypes.length; i++) {
      const typeId = this.componentTypes[i];
      const column = this.componentColumns.get(typeId);
      const comp = components.get(typeId);
      column[row] = comp;
    }
    return row;
  }
  removeEntity(entityId) {
    const row = this.entityIndexMap.get(entityId);
    if (row === void 0) return;
    const lastRow = this.entities.length - 1;
    const lastEntity = this.entities.get(lastRow);
    if (row !== lastRow) {
      this.entities.set(row, lastEntity);
      this.entityIndexMap.set(lastEntity, row);
      for (let i = 0; i < this.componentTypes.length; i++) {
        const typeId = this.componentTypes[i];
        const column = this.componentColumns.get(typeId);
        column[row] = column[lastRow];
      }
    }
    this.entities.pop();
    for (let i = 0; i < this.componentTypes.length; i++) {
      const typeId = this.componentTypes[i];
      const column = this.componentColumns.get(typeId);
      column.pop();
    }
    this.entityIndexMap.delete(entityId);
  }
  getComponent(entityId, typeId) {
    const row = this.entityIndexMap.get(entityId);
    if (row === void 0) return void 0;
    const column = this.componentColumns.get(typeId);
    return column ? column[row] : void 0;
  }
  getColumn(typeId) {
    return this.componentColumns.get(typeId);
  }
};

// src/core/ecs/ArchetypeGraph.ts
var ArchetypeGraph = class {
  root;
  _archetypes = [];
  _edges = /* @__PURE__ */ new Map();
  _nextArchetypeId = 0;
  constructor() {
    const emptyMask = new BitSet();
    this.root = this._createArchetype(emptyMask, []);
  }
  get allArchetypes() {
    return this._archetypes;
  }
  getTransitionAdd(source, typeId) {
    const edge = this._edges.get(source);
    let target = edge.add.get(typeId);
    if (!target) {
      const newMask = source.mask.clone().set(typeId, true);
      const newTypes = [...source.componentTypes, typeId];
      target = this._findOrCreateArchetype(newMask, newTypes);
      edge.add.set(typeId, target);
      this._edges.get(target).remove.set(typeId, source);
    }
    return target;
  }
  getTransitionRemove(source, typeId) {
    const edge = this._edges.get(source);
    let target = edge.remove.get(typeId);
    if (!target) {
      const newMask = source.mask.clone().set(typeId, false);
      const newTypes = source.componentTypes.filter((t) => t !== typeId);
      target = this._findOrCreateArchetype(newMask, newTypes);
      edge.remove.set(typeId, target);
      this._edges.get(target).add.set(typeId, source);
    }
    return target;
  }
  _findOrCreateArchetype(mask, types) {
    for (let i = 0; i < this._archetypes.length; i++) {
      const a = this._archetypes[i];
      if (a.mask.containsAll(mask) && mask.containsAll(a.mask)) {
        return a;
      }
    }
    return this._createArchetype(mask, types);
  }
  _createArchetype(mask, types) {
    const a = new Archetype(this._nextArchetypeId++, mask, types);
    this._archetypes.push(a);
    this._edges.set(a, {
      add: /* @__PURE__ */ new Map(),
      remove: /* @__PURE__ */ new Map()
    });
    return a;
  }
};

// src/core/ecs/Entity.ts
var Entity = class {
  id;
  generation;
  _world;
  constructor(id, generation, world) {
    this.id = id;
    this.generation = generation;
    this._world = world;
  }
  get isValid() {
    return this._world.entityManager.isAlive(this.id, this.generation);
  }
  add(component) {
    this._world.addComponent(this.id, component);
    return this;
  }
  get(type) {
    return this._world.getComponent(this.id, type);
  }
  require(type) {
    const comp = this.get(type);
    if (!comp) {
      throw new Error(`Entity ${this.id} missing required component: ${type.name}`);
    }
    return comp;
  }
  has(type) {
    return this._world.hasComponent(this.id, type);
  }
  remove(type) {
    this._world.removeComponent(this.id, type);
    return this;
  }
  destroy() {
    this._world.destroyEntity(this.id);
  }
};

// src/core/ecs/Query.ts
var Query = class {
  _allMask;
  _anyMask;
  _noneMask;
  _world;
  _matchingArchetypes = [];
  constructor(world, allTypes = [], anyTypes = [], noneTypes = []) {
    this._world = world;
    this._allMask = ComponentRegistry.createBitSet(allTypes);
    this._noneMask = ComponentRegistry.createBitSet(noneTypes);
    if (anyTypes.length > 0) {
      this._anyMask = ComponentRegistry.createBitSet(anyTypes);
    }
    this.rebuild();
  }
  rebuild() {
    this._matchingArchetypes = [];
    const all = this._world.archetypeGraph.allArchetypes;
    for (let i = 0; i < all.length; i++) {
      const arch = all[i];
      if (this.matches(arch)) {
        this._matchingArchetypes.push(arch);
      }
    }
  }
  matches(archetype) {
    if (!archetype.mask.containsAll(this._allMask)) {
      return false;
    }
    if (this._noneMask.intersects(archetype.mask)) {
      return false;
    }
    if (this._anyMask && !this._anyMask.intersects(archetype.mask)) {
      return false;
    }
    return true;
  }
  get matchingArchetypes() {
    return this._matchingArchetypes;
  }
  forEach(callback, componentTypes) {
    const typeIds = componentTypes.map((t) => ComponentRegistry.getTypeId(t));
    for (let a = 0; a < this._matchingArchetypes.length; a++) {
      const arch = this._matchingArchetypes[a];
      const count = arch.entityCount;
      if (count === 0) continue;
      const columns = typeIds.map((tid) => arch.getColumn(tid));
      const entities = arch.entities;
      for (let i = 0; i < count; i++) {
        const entityId = entities.get(i);
        const comps = columns.map((col) => col[i]);
        callback(entityId, ...comps);
      }
    }
  }
  count() {
    let total = 0;
    for (let i = 0; i < this._matchingArchetypes.length; i++) {
      total += this._matchingArchetypes[i].entityCount;
    }
    return total;
  }
};

// src/core/ecs/Types.ts
var SystemPhase = {
  PreUpdate: 0,
  Physics: 1,
  Update: 2,
  Combat: 3,
  PostUpdate: 4,
  PreRender: 5,
  Render: 6,
  PostRender: 7,
  Diagnostics: 8
};

// src/core/ecs/SystemScheduler.ts
var SystemScheduler = class {
  _systemsByPhase = /* @__PURE__ */ new Map();
  _phasesInOrder = [
    SystemPhase.PreUpdate,
    SystemPhase.Physics,
    SystemPhase.Update,
    SystemPhase.Combat,
    SystemPhase.PostUpdate,
    SystemPhase.PreRender,
    SystemPhase.Render,
    SystemPhase.PostRender,
    SystemPhase.Diagnostics
  ];
  constructor() {
    for (const phase of this._phasesInOrder) {
      this._systemsByPhase.set(phase, []);
    }
  }
  register(system, world) {
    system.init(world);
    const list = this._systemsByPhase.get(system.phase) || [];
    list.push(system);
    list.sort((a, b) => b.priority - a.priority);
    this._systemsByPhase.set(system.phase, list);
  }
  unregister(system) {
    const list = this._systemsByPhase.get(system.phase);
    if (!list) return;
    const idx = list.indexOf(system);
    if (idx !== -1) {
      system.onDestroy();
      list.splice(idx, 1);
    }
  }
  update(dt, world) {
    for (let p = 0; p < this._phasesInOrder.length; p++) {
      const phase = this._phasesInOrder[p];
      const systems = this._systemsByPhase.get(phase);
      for (let s = 0; s < systems.length; s++) {
        const sys = systems[s];
        if (sys.enabled) {
          sys.update(dt);
        }
      }
      world.commandBuffer.flush(world);
    }
  }
  clear() {
    for (const systems of this._systemsByPhase.values()) {
      for (const sys of systems) {
        sys.onDestroy();
      }
      systems.length = 0;
    }
  }
};

// src/core/ecs/CommandBuffer.ts
var CommandBuffer = class {
  _commands = [];
  createEntity(callback) {
    this._commands.push({ type: "createEntity", callback });
    return this;
  }
  destroyEntity(entityId) {
    this._commands.push({ type: "destroyEntity", entityId });
    return this;
  }
  addComponent(entityId, component) {
    this._commands.push({ type: "addComponent", entityId, component });
    return this;
  }
  removeComponent(entityId, componentType) {
    this._commands.push({ type: "removeComponent", entityId, componentType });
    return this;
  }
  defer(fn) {
    this._commands.push({ type: "custom", fn });
    return this;
  }
  flush(world) {
    if (this._commands.length === 0) return;
    for (let i = 0; i < this._commands.length; i++) {
      const cmd = this._commands[i];
      switch (cmd.type) {
        case "createEntity": {
          const entity = world.createEntity();
          if (cmd.callback) cmd.callback(entity.id);
          break;
        }
        case "destroyEntity":
          world.destroyEntity(cmd.entityId);
          break;
        case "addComponent":
          world.addComponent(cmd.entityId, cmd.component);
          break;
        case "removeComponent":
          world.removeComponent(cmd.entityId, cmd.componentType);
          break;
        case "custom":
          cmd.fn(world);
          break;
      }
    }
    this._commands.length = 0;
  }
  clear() {
    this._commands.length = 0;
  }
};

// src/core/ecs/World.ts
var World = class {
  entityManager;
  archetypeGraph;
  systemScheduler;
  commandBuffer;
  _entityArchetypes = /* @__PURE__ */ new Map();
  _queries = [];
  constructor(initialEntityCapacity = 1e4) {
    this.entityManager = new EntityManager(initialEntityCapacity);
    this.archetypeGraph = new ArchetypeGraph();
    this.systemScheduler = new SystemScheduler();
    this.commandBuffer = new CommandBuffer();
  }
  createEntity() {
    const { id, generation } = this.entityManager.create();
    const root = this.archetypeGraph.root;
    root.addEntity(id, /* @__PURE__ */ new Map());
    this._entityArchetypes.set(id, root);
    this._notifyQueriesArchetypeChanged();
    return new Entity(id, generation, this);
  }
  getEntity(id) {
    const gen = this.entityManager.getGeneration(id);
    if (!this.entityManager.isAlive(id, gen)) return null;
    return new Entity(id, gen, this);
  }
  destroyEntity(id) {
    const arch = this._entityArchetypes.get(id);
    if (!arch) return false;
    arch.removeEntity(id);
    this._entityArchetypes.delete(id);
    const destroyed = this.entityManager.destroy(id);
    this._notifyQueriesArchetypeChanged();
    return destroyed;
  }
  addComponent(id, component) {
    const currentArch = this._entityArchetypes.get(id);
    if (!currentArch) return;
    const constructor = component.constructor;
    const typeId = ComponentRegistry.getTypeId(constructor);
    if (currentArch.mask.get(typeId)) {
      const row2 = currentArch.entityIndexMap.get(id);
      if (row2 !== void 0) {
        currentArch.componentColumns.get(typeId)[row2] = component;
      }
      return;
    }
    const targetArch = this.archetypeGraph.getTransitionAdd(currentArch, typeId);
    const row = currentArch.entityIndexMap.get(id);
    const comps = /* @__PURE__ */ new Map();
    for (const tid of currentArch.componentTypes) {
      comps.set(tid, currentArch.componentColumns.get(tid)[row]);
    }
    comps.set(typeId, component);
    currentArch.removeEntity(id);
    targetArch.addEntity(id, comps);
    this._entityArchetypes.set(id, targetArch);
    this._notifyQueriesArchetypeChanged();
  }
  removeComponent(id, componentType) {
    const currentArch = this._entityArchetypes.get(id);
    if (!currentArch) return;
    const typeId = ComponentRegistry.getTypeId(componentType);
    if (!currentArch.mask.get(typeId)) return;
    const targetArch = this.archetypeGraph.getTransitionRemove(currentArch, typeId);
    const row = currentArch.entityIndexMap.get(id);
    const comps = /* @__PURE__ */ new Map();
    for (const tid of currentArch.componentTypes) {
      if (tid !== typeId) {
        comps.set(tid, currentArch.componentColumns.get(tid)[row]);
      }
    }
    currentArch.removeEntity(id);
    targetArch.addEntity(id, comps);
    this._entityArchetypes.set(id, targetArch);
    this._notifyQueriesArchetypeChanged();
  }
  getComponent(id, componentType) {
    const arch = this._entityArchetypes.get(id);
    if (!arch) return void 0;
    const typeId = ComponentRegistry.getTypeId(componentType);
    return arch.getComponent(id, typeId);
  }
  hasComponent(id, componentType) {
    const arch = this._entityArchetypes.get(id);
    if (!arch) return false;
    const typeId = ComponentRegistry.getTypeId(componentType);
    return arch.mask.get(typeId);
  }
  createQuery(filter) {
    const query = new Query(this, filter.all || [], filter.any || [], filter.none || []);
    this._queries.push(query);
    return query;
  }
  addSystem(system) {
    this.systemScheduler.register(system, this);
    return this;
  }
  update(dt) {
    this.systemScheduler.update(dt, this);
  }
  clear() {
    this.systemScheduler.clear();
    this.entityManager.clear();
    this._entityArchetypes.clear();
    this._queries.length = 0;
  }
  _notifyQueriesArchetypeChanged() {
    for (let i = 0; i < this._queries.length; i++) {
      this._queries[i].rebuild();
    }
  }
};

// src/core/math/Vector2.ts
var Vector2 = class _Vector2 {
  x;
  y;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  static get ZERO() {
    return new _Vector2(0, 0);
  }
  static get ONE() {
    return new _Vector2(1, 1);
  }
  static get UP() {
    return new _Vector2(0, -1);
  }
  static get DOWN() {
    return new _Vector2(0, 1);
  }
  static get LEFT() {
    return new _Vector2(-1, 0);
  }
  static get RIGHT() {
    return new _Vector2(1, 0);
  }
  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  copy(other) {
    this.x = other.x;
    this.y = other.y;
    return this;
  }
  clone() {
    return new _Vector2(this.x, this.y);
  }
  add(other) {
    return new _Vector2(this.x + other.x, this.y + other.y);
  }
  addSelf(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  addScalar(scalar) {
    return new _Vector2(this.x + scalar, this.y + scalar);
  }
  addScalarSelf(scalar) {
    this.x += scalar;
    this.y += scalar;
    return this;
  }
  subtract(other) {
    return new _Vector2(this.x - other.x, this.y - other.y);
  }
  subtractSelf(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }
  multiply(other) {
    return new _Vector2(this.x * other.x, this.y * other.y);
  }
  multiplySelf(other) {
    this.x *= other.x;
    this.y *= other.y;
    return this;
  }
  scale(scalar) {
    return new _Vector2(this.x * scalar, this.y * scalar);
  }
  scaleSelf(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
  divide(other) {
    return new _Vector2(
      other.x !== 0 ? this.x / other.x : 0,
      other.y !== 0 ? this.y / other.y : 0
    );
  }
  divideSelf(other) {
    this.x = other.x !== 0 ? this.x / other.x : 0;
    this.y = other.y !== 0 ? this.y / other.y : 0;
    return this;
  }
  divideScalar(scalar) {
    if (scalar === 0) return new _Vector2(0, 0);
    const inv = 1 / scalar;
    return new _Vector2(this.x * inv, this.y * inv);
  }
  divideScalarSelf(scalar) {
    if (scalar === 0) {
      this.x = 0;
      this.y = 0;
      return this;
    }
    const inv = 1 / scalar;
    this.x *= inv;
    this.y *= inv;
    return this;
  }
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  cross(other) {
    return this.x * other.y - this.y * other.x;
  }
  lengthSquared() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normalize() {
    const len = this.length();
    if (len === 0) return new _Vector2(0, 0);
    const inv = 1 / len;
    return new _Vector2(this.x * inv, this.y * inv);
  }
  normalizeSelf() {
    const len = this.length();
    if (len === 0) {
      this.x = 0;
      this.y = 0;
      return this;
    }
    const inv = 1 / len;
    this.x *= inv;
    this.y *= inv;
    return this;
  }
  distanceTo(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  distanceToSquared(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return dx * dx + dy * dy;
  }
  angle() {
    return Math.atan2(this.y, this.x);
  }
  angleTo(other) {
    return Math.atan2(this.cross(other), this.dot(other));
  }
  rotate(radians) {
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    return new _Vector2(
      this.x * cos - this.y * sin,
      this.x * sin + this.y * cos
    );
  }
  rotateSelf(radians) {
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const rx = this.x * cos - this.y * sin;
    const ry = this.x * sin + this.y * cos;
    this.x = rx;
    this.y = ry;
    return this;
  }
  rotateAround(center, radians) {
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const dx = this.x - center.x;
    const dy = this.y - center.y;
    return new _Vector2(
      center.x + (dx * cos - dy * sin),
      center.y + (dx * sin + dy * cos)
    );
  }
  lerp(target, alpha) {
    return new _Vector2(
      this.x + (target.x - this.x) * alpha,
      this.y + (target.y - this.y) * alpha
    );
  }
  lerpSelf(target, alpha) {
    this.x += (target.x - this.x) * alpha;
    this.y += (target.y - this.y) * alpha;
    return this;
  }
  reflect(normal) {
    const d = 2 * this.dot(normal);
    return new _Vector2(this.x - d * normal.x, this.y - d * normal.y);
  }
  project(onto) {
    const d = onto.lengthSquared();
    if (d === 0) return new _Vector2(0, 0);
    const scalar = this.dot(onto) / d;
    return onto.scale(scalar);
  }
  perpendicular() {
    return new _Vector2(-this.y, this.x);
  }
  clampLength(minLength, maxLength) {
    const lenSq = this.lengthSquared();
    if (lenSq === 0) return this;
    const len = Math.sqrt(lenSq);
    if (len < minLength) {
      this.scaleSelf(minLength / len);
    } else if (len > maxLength) {
      this.scaleSelf(maxLength / len);
    }
    return this;
  }
  equals(other, tolerance = 1e-6) {
    return Math.abs(this.x - other.x) <= tolerance && Math.abs(this.y - other.y) <= tolerance;
  }
  toArray() {
    return [this.x, this.y];
  }
  toString(precision = 2) {
    return `(${this.x.toFixed(precision)}, ${this.y.toFixed(precision)})`;
  }
};

// src/core/math/Matrix3.ts
var Matrix3 = class _Matrix3 {
  // Elements stored in column-major order:
  // [ m0 m3 m6 ]
  // [ m1 m4 m7 ]
  // [ m2 m5 m8 ]
  elements;
  constructor() {
    this.elements = new Float32Array([
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ]);
  }
  identity() {
    const e = this.elements;
    e[0] = 1;
    e[3] = 0;
    e[6] = 0;
    e[1] = 0;
    e[4] = 1;
    e[7] = 0;
    e[2] = 0;
    e[5] = 0;
    e[8] = 1;
    return this;
  }
  copy(m) {
    const me = m.elements;
    const te = this.elements;
    for (let i = 0; i < 9; i++) {
      te[i] = me[i];
    }
    return this;
  }
  clone() {
    const m = new _Matrix3();
    m.copy(this);
    return m;
  }
  set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    const te = this.elements;
    te[0] = m00;
    te[3] = m01;
    te[6] = m02;
    te[1] = m10;
    te[4] = m11;
    te[7] = m12;
    te[2] = m20;
    te[5] = m21;
    te[8] = m22;
    return this;
  }
  multiply(other) {
    return this.clone().multiplySelf(other);
  }
  multiplySelf(other) {
    const ae = this.elements;
    const be = other.elements;
    const a0 = ae[0], a1 = ae[1], a2 = ae[2];
    const a3 = ae[3], a4 = ae[4], a5 = ae[5];
    const a6 = ae[6], a7 = ae[7], a8 = ae[8];
    const b0 = be[0], b1 = be[1], b2 = be[2];
    const b3 = be[3], b4 = be[4], b5 = be[5];
    const b6 = be[6], b7 = be[7], b8 = be[8];
    ae[0] = a0 * b0 + a3 * b1 + a6 * b2;
    ae[1] = a1 * b0 + a4 * b1 + a7 * b2;
    ae[2] = a2 * b0 + a5 * b1 + a8 * b2;
    ae[3] = a0 * b3 + a3 * b4 + a6 * b5;
    ae[4] = a1 * b3 + a4 * b4 + a7 * b5;
    ae[5] = a2 * b3 + a5 * b4 + a8 * b5;
    ae[6] = a0 * b6 + a3 * b7 + a6 * b8;
    ae[7] = a1 * b6 + a4 * b7 + a7 * b8;
    ae[8] = a2 * b6 + a5 * b7 + a8 * b8;
    return this;
  }
  makeTranslation(x, y) {
    this.set(
      1,
      0,
      x,
      0,
      1,
      y,
      0,
      0,
      1
    );
    return this;
  }
  makeRotation(radians) {
    const c = Math.cos(radians);
    const s = Math.sin(radians);
    this.set(
      c,
      -s,
      0,
      s,
      c,
      0,
      0,
      0,
      1
    );
    return this;
  }
  makeScale(x, y) {
    this.set(
      x,
      0,
      0,
      0,
      y,
      0,
      0,
      0,
      1
    );
    return this;
  }
  translate(x, y) {
    const t = new _Matrix3().makeTranslation(x, y);
    return this.multiplySelf(t);
  }
  rotate(radians) {
    const r = new _Matrix3().makeRotation(radians);
    return this.multiplySelf(r);
  }
  scale(x, y) {
    const s = new _Matrix3().makeScale(x, y);
    return this.multiplySelf(s);
  }
  transformVector2(v) {
    const e = this.elements;
    const x = e[0] * v.x + e[3] * v.y + e[6];
    const y = e[1] * v.x + e[4] * v.y + e[7];
    return new Vector2(x, y);
  }
  transformVector2Self(v) {
    const e = this.elements;
    const x = e[0] * v.x + e[3] * v.y + e[6];
    const y = e[1] * v.x + e[4] * v.y + e[7];
    v.x = x;
    v.y = y;
    return v;
  }
  determinant() {
    const e = this.elements;
    return e[0] * (e[4] * e[8] - e[7] * e[5]) - e[3] * (e[1] * e[8] - e[7] * e[2]) + e[6] * (e[1] * e[5] - e[4] * e[2]);
  }
  invert() {
    const e = this.elements;
    const det = this.determinant();
    if (Math.abs(det) < 1e-8) {
      this.identity();
      return this;
    }
    const invDet = 1 / det;
    const n00 = (e[4] * e[8] - e[5] * e[7]) * invDet;
    const n01 = (e[6] * e[5] - e[3] * e[8]) * invDet;
    const n02 = (e[3] * e[7] - e[6] * e[4]) * invDet;
    const n10 = (e[7] * e[2] - e[1] * e[8]) * invDet;
    const n11 = (e[0] * e[8] - e[6] * e[2]) * invDet;
    const n12 = (e[6] * e[1] - e[0] * e[7]) * invDet;
    const n20 = (e[1] * e[5] - e[2] * e[4]) * invDet;
    const n21 = (e[2] * e[3] - e[0] * e[5]) * invDet;
    const n22 = (e[0] * e[4] - e[1] * e[3]) * invDet;
    e[0] = n00;
    e[3] = n01;
    e[6] = n02;
    e[1] = n10;
    e[4] = n11;
    e[7] = n12;
    e[2] = n20;
    e[5] = n21;
    e[8] = n22;
    return this;
  }
};

// src/core/math/Transform2D.ts
var Transform2D = class {
  position;
  scale;
  rotation;
  // In radians
  localMatrix;
  worldMatrix;
  _isDirty = true;
  _parent = null;
  _children = [];
  constructor(x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1) {
    this.position = new Vector2(x, y);
    this.scale = new Vector2(scaleX, scaleY);
    this.rotation = rotation;
    this.localMatrix = new Matrix3();
    this.worldMatrix = new Matrix3();
    this.updateMatrices();
  }
  get parent() {
    return this._parent;
  }
  get children() {
    return this._children;
  }
  setParent(newParent) {
    if (this._parent === newParent) return this;
    if (this._parent) {
      const idx = this._parent._children.indexOf(this);
      if (idx !== -1) {
        this._parent._children.splice(idx, 1);
      }
    }
    this._parent = newParent;
    if (this._parent) {
      this._parent._children.push(this);
    }
    this.markDirty();
    return this;
  }
  markDirty() {
    this._isDirty = true;
    for (let i = 0; i < this._children.length; i++) {
      this._children[i].markDirty();
    }
  }
  setPosition(x, y) {
    this.position.set(x, y);
    this.markDirty();
    return this;
  }
  translate(dx, dy) {
    this.position.x += dx;
    this.position.y += dy;
    this.markDirty();
    return this;
  }
  setRotation(radians) {
    this.rotation = radians;
    this.markDirty();
    return this;
  }
  rotate(radians) {
    this.rotation += radians;
    this.markDirty();
    return this;
  }
  setScale(sx, sy) {
    this.scale.set(sx, sy);
    this.markDirty();
    return this;
  }
  updateMatrices() {
    if (!this._isDirty) return;
    const c = Math.cos(this.rotation);
    const s = Math.sin(this.rotation);
    const sx = this.scale.x;
    const sy = this.scale.y;
    const px = this.position.x;
    const py = this.position.y;
    this.localMatrix.set(
      c * sx,
      -s * sy,
      px,
      s * sx,
      c * sy,
      py,
      0,
      0,
      1
    );
    if (this._parent) {
      this._parent.updateMatrices();
      this.worldMatrix.copy(this._parent.worldMatrix).multiplySelf(this.localMatrix);
    } else {
      this.worldMatrix.copy(this.localMatrix);
    }
    this._isDirty = false;
  }
  getWorldPosition(out = new Vector2()) {
    this.updateMatrices();
    const e = this.worldMatrix.elements;
    return out.set(e[6], e[7]);
  }
  getWorldRotation() {
    this.updateMatrices();
    const e = this.worldMatrix.elements;
    return Math.atan2(e[1], e[0]);
  }
  getWorldScale(out = new Vector2()) {
    this.updateMatrices();
    const e = this.worldMatrix.elements;
    const sx = Math.sqrt(e[0] * e[0] + e[1] * e[1]);
    const sy = Math.sqrt(e[3] * e[3] + e[4] * e[4]);
    return out.set(sx, sy);
  }
  transformPoint(point, out = new Vector2()) {
    this.updateMatrices();
    return this.worldMatrix.transformVector2Self(out.copy(point));
  }
  inverseTransformPoint(point, out = new Vector2()) {
    this.updateMatrices();
    const inv = this.worldMatrix.clone().invert();
    return inv.transformVector2Self(out.copy(point));
  }
};

// src/core/math/MathUtils.ts
var MathUtils = class {
  static DEG2RAD = Math.PI / 180;
  static RAD2DEG = 180 / Math.PI;
  static EPSILON = 1e-6;
  static TWO_PI = Math.PI * 2;
  static HALF_PI = Math.PI * 0.5;
  static clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
  static clamp01(value) {
    return Math.max(0, Math.min(1, value));
  }
  static lerp(start, end, t) {
    return start + (end - start) * t;
  }
  static inverseLerp(start, end, value) {
    if (Math.abs(end - start) < this.EPSILON) return 0;
    return (value - start) / (end - start);
  }
  static remap(value, inMin, inMax, outMin, outMax) {
    const t = this.inverseLerp(inMin, inMax, value);
    return this.lerp(outMin, outMax, t);
  }
  static smoothstep(min, max, value) {
    const x = this.clamp01((value - min) / (max - min));
    return x * x * (3 - 2 * x);
  }
  static smootherstep(min, max, value) {
    const x = this.clamp01((value - min) / (max - min));
    return x * x * x * (x * (x * 6 - 15) + 10);
  }
  static damp(source, target, smoothing, dt) {
    return this.lerp(source, target, 1 - Math.exp(-smoothing * dt));
  }
  static moveTowards(current, target, maxDelta) {
    if (Math.abs(target - current) <= maxDelta) {
      return target;
    }
    return current + Math.sign(target - current) * maxDelta;
  }
  static moveTowardsAngle(current, target, maxDelta) {
    const delta = this.deltaAngle(current, target);
    if (-maxDelta < delta && delta < maxDelta) {
      return target;
    }
    target = current + delta;
    return this.moveTowards(current, target, maxDelta);
  }
  static deltaAngle(current, target) {
    let delta = this.repeat(target - current, this.TWO_PI);
    if (delta > Math.PI) {
      delta -= this.TWO_PI;
    }
    return delta;
  }
  static repeat(t, length) {
    return this.clamp(t - Math.floor(t / length) * length, 0, length);
  }
  static pingPong(t, length) {
    t = this.repeat(t, length * 2);
    return length - Math.abs(t - length);
  }
  static radToDeg(radians) {
    return radians * this.RAD2DEG;
  }
  static degToRad(degrees) {
    return degrees * this.DEG2RAD;
  }
  static approxEquals(a, b, tolerance = 1e-6) {
    return Math.abs(a - b) <= tolerance;
  }
  /**
   * Fast seedable pseudo-random number generator (Mulberry32)
   */
  static createRNG(seed) {
    let s = seed | 0;
    return () => {
      s = s + 1831565813 | 0;
      let t = Math.imul(s ^ s >>> 15, 1 | s);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
};

// src/core/math/Color.ts
var Color = class _Color {
  r;
  g;
  b;
  a;
  constructor(r = 1, g = 1, b = 1, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
  static WHITE = new _Color(1, 1, 1, 1);
  static BLACK = new _Color(0, 0, 0, 1);
  static RED = new _Color(1, 0, 0, 1);
  static GREEN = new _Color(0, 1, 0, 1);
  static BLUE = new _Color(0, 0, 1, 1);
  static YELLOW = new _Color(1, 1, 0, 1);
  static CYAN = new _Color(0, 1, 1, 1);
  static MAGENTA = new _Color(1, 0, 1, 1);
  static TRANSPARENT = new _Color(0, 0, 0, 0);
  static fromHex(hex) {
    let cleanHex = hex.replace("#", "");
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split("").map((c) => c + c).join("") + "ff";
    } else if (cleanHex.length === 6) {
      cleanHex += "ff";
    }
    const num = parseInt(cleanHex, 16);
    const r = (num >> 24 & 255) / 255;
    const g = (num >> 16 & 255) / 255;
    const b = (num >> 8 & 255) / 255;
    const a = (num & 255) / 255;
    return new _Color(r, g, b, a);
  }
  static fromHSL(h, s, l, a = 1) {
    h = MathUtils.repeat(h, 360) / 360;
    s = MathUtils.clamp01(s);
    l = MathUtils.clamp01(l);
    if (s === 0) {
      return new _Color(l, l, l, a);
    }
    const hue2rgb = (p2, q2, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
      if (t < 1 / 2) return q2;
      if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
      return p2;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, h + 1 / 3);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 1 / 3);
    return new _Color(r, g, b, a);
  }
  set(r, g, b, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    return this;
  }
  copy(other) {
    this.r = other.r;
    this.g = other.g;
    this.b = other.b;
    this.a = other.a;
    return this;
  }
  clone() {
    return new _Color(this.r, this.g, this.b, this.a);
  }
  lerp(target, t) {
    return new _Color(
      MathUtils.lerp(this.r, target.r, t),
      MathUtils.lerp(this.g, target.g, t),
      MathUtils.lerp(this.b, target.b, t),
      MathUtils.lerp(this.a, target.a, t)
    );
  }
  lerpSelf(target, t) {
    this.r = MathUtils.lerp(this.r, target.r, t);
    this.g = MathUtils.lerp(this.g, target.g, t);
    this.b = MathUtils.lerp(this.b, target.b, t);
    this.a = MathUtils.lerp(this.a, target.a, t);
    return this;
  }
  toRGBA() {
    const ir = Math.round(MathUtils.clamp01(this.r) * 255);
    const ig = Math.round(MathUtils.clamp01(this.g) * 255);
    const ib = Math.round(MathUtils.clamp01(this.b) * 255);
    const fa = MathUtils.clamp01(this.a);
    return `rgba(${ir},${ig},${ib},${fa})`;
  }
  toRgbaString() {
    return this.toRGBA();
  }
  toHex() {
    const ir = Math.round(MathUtils.clamp01(this.r) * 255).toString(16).padStart(2, "0");
    const ig = Math.round(MathUtils.clamp01(this.g) * 255).toString(16).padStart(2, "0");
    const ib = Math.round(MathUtils.clamp01(this.b) * 255).toString(16).padStart(2, "0");
    return `#${ir}${ig}${ib}`;
  }
  packRGBA() {
    const ir = Math.round(MathUtils.clamp01(this.r) * 255);
    const ig = Math.round(MathUtils.clamp01(this.g) * 255);
    const ib = Math.round(MathUtils.clamp01(this.b) * 255);
    const ia = Math.round(MathUtils.clamp01(this.a) * 255);
    return (ia << 24 | ib << 16 | ig << 8 | ir) >>> 0;
  }
  toFloat32Array() {
    return new Float32Array([this.r, this.g, this.b, this.a]);
  }
};

// src/physics/RigidBody2D.ts
var BodyType = {
  Static: 0,
  Kinematic: 1,
  Dynamic: 2
};
var RigidBody2D = class {
  type;
  // Linear motion
  velocity;
  force;
  linearDamping;
  // Angular motion
  angularVelocity;
  // radians/sec
  torque;
  angularDamping;
  // Mass properties
  mass;
  invMass;
  inertia;
  invInertia;
  // Physics modifiers
  gravityScale;
  isFixedRotation;
  isBullet;
  // Enables Continuous Collision Detection
  // Sleeping state
  isSleeping = false;
  sleepTimer = 0;
  constructor(options = {}) {
    this.type = options.type ?? BodyType.Dynamic;
    this.velocity = new Vector2();
    this.force = new Vector2();
    this.linearDamping = options.linearDamping ?? 0.05;
    this.angularVelocity = 0;
    this.torque = 0;
    this.angularDamping = options.angularDamping ?? 0.1;
    this.mass = options.mass ?? 1;
    this.invMass = this.type === BodyType.Dynamic && this.mass > 0 ? 1 / this.mass : 0;
    this.inertia = this.mass * 32;
    this.invInertia = this.type === BodyType.Dynamic && this.inertia > 0 ? 1 / this.inertia : 0;
    this.gravityScale = options.gravityScale ?? 1;
    this.isFixedRotation = options.fixedRotation ?? false;
    this.isBullet = options.bullet ?? false;
    if (this.type !== BodyType.Dynamic) {
      this.invMass = 0;
      this.invInertia = 0;
    }
  }
  setMass(mass) {
    this.mass = Math.max(0, mass);
    this.invMass = this.type === BodyType.Dynamic && this.mass > 0 ? 1 / this.mass : 0;
    return this;
  }
  applyForce(force) {
    if (this.type !== BodyType.Dynamic) return;
    this.force.addSelf(force);
    this.wakeUp();
  }
  applyImpulse(impulse) {
    if (this.type !== BodyType.Dynamic) return;
    this.velocity.addSelf(impulse.scale(this.invMass));
    this.wakeUp();
  }
  applyTorque(torque) {
    if (this.type !== BodyType.Dynamic || this.isFixedRotation) return;
    this.torque += torque;
    this.wakeUp();
  }
  applyAngularImpulse(impulse) {
    if (this.type !== BodyType.Dynamic || this.isFixedRotation) return;
    this.angularVelocity += impulse * this.invInertia;
    this.wakeUp();
  }
  wakeUp() {
    this.isSleeping = false;
    this.sleepTimer = 0;
  }
  clearForces() {
    this.force.set(0, 0);
    this.torque = 0;
  }
};

// src/core/math/AABB.ts
var AABB = class _AABB {
  min;
  max;
  constructor(minX = 0, minY = 0, maxX = 0, maxY = 0) {
    this.min = new Vector2(minX, minY);
    this.max = new Vector2(maxX, maxY);
  }
  static fromCenterAndHalfExtents(center, halfExtents) {
    return new _AABB(
      center.x - halfExtents.x,
      center.y - halfExtents.y,
      center.x + halfExtents.x,
      center.y + halfExtents.y
    );
  }
  static fromPoints(points) {
    if (points.length === 0) return new _AABB(0, 0, 0, 0);
    let minX = points[0].x;
    let minY = points[0].y;
    let maxX = points[0].x;
    let maxY = points[0].y;
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }
    return new _AABB(minX, minY, maxX, maxY);
  }
  set(minX, minY, maxX, maxY) {
    this.min.set(minX, minY);
    this.max.set(maxX, maxY);
    return this;
  }
  copy(other) {
    this.min.copy(other.min);
    this.max.copy(other.max);
    return this;
  }
  clone() {
    return new _AABB(this.min.x, this.min.y, this.max.x, this.max.y);
  }
  get width() {
    return Math.max(0, this.max.x - this.min.x);
  }
  get height() {
    return Math.max(0, this.max.y - this.min.y);
  }
  get center() {
    return new Vector2(
      (this.min.x + this.max.x) * 0.5,
      (this.min.y + this.max.y) * 0.5
    );
  }
  get halfExtents() {
    return new Vector2(
      (this.max.x - this.min.x) * 0.5,
      (this.max.y - this.min.y) * 0.5
    );
  }
  get area() {
    return this.width * this.height;
  }
  get perimeter() {
    return 2 * (this.width + this.height);
  }
  containsPoint(p) {
    return p.x >= this.min.x && p.x <= this.max.x && p.y >= this.min.y && p.y <= this.max.y;
  }
  containsAABB(other) {
    return other.min.x >= this.min.x && other.max.x <= this.max.x && other.min.y >= this.min.y && other.max.y <= this.max.y;
  }
  intersectsAABB(other) {
    if (this.max.x < other.min.x || this.min.x > other.max.x) return false;
    if (this.max.y < other.min.y || this.min.y > other.max.y) return false;
    return true;
  }
  expandToPoint(p) {
    this.min.x = Math.min(this.min.x, p.x);
    this.min.y = Math.min(this.min.y, p.y);
    this.max.x = Math.max(this.max.x, p.x);
    this.max.y = Math.max(this.max.y, p.y);
    return this;
  }
  expandToAABB(other) {
    this.min.x = Math.min(this.min.x, other.min.x);
    this.min.y = Math.min(this.min.y, other.min.y);
    this.max.x = Math.max(this.max.x, other.max.x);
    this.max.y = Math.max(this.max.y, other.max.y);
    return this;
  }
  fatten(margin) {
    this.min.x -= margin;
    this.min.y -= margin;
    this.max.x += margin;
    this.max.y += margin;
    return this;
  }
  translate(delta) {
    this.min.addSelf(delta);
    this.max.addSelf(delta);
    return this;
  }
  getOverlap(other) {
    const ox = Math.min(this.max.x, other.max.x) - Math.max(this.min.x, other.min.x);
    const oy = Math.min(this.max.y, other.max.y) - Math.max(this.min.y, other.min.y);
    return new Vector2(Math.max(0, ox), Math.max(0, oy));
  }
};

// src/physics/Collider2D.ts
var ColliderShapeType = {
  Box: 0,
  Circle: 1,
  Polygon: 2
};
var DEFAULT_PHYSICS_MATERIAL = {
  friction: 0.3,
  restitution: 0.2,
  density: 1
};
var Collider2D = class {
  shapeType;
  offset;
  isSensor;
  material;
  // Layer collision filtering
  collisionLayer = 1;
  collisionMask = 65535;
  // Shape definitions
  boxExtents;
  // half-width, half-height
  circleRadius;
  polygon;
  // Cached tight AABB in world coordinates
  worldAABB;
  constructor(shapeType = ColliderShapeType.Box, options = {}) {
    this.shapeType = shapeType;
    this.offset = options.offset ? options.offset.clone() : new Vector2();
    this.isSensor = options.isSensor ?? false;
    this.material = { ...DEFAULT_PHYSICS_MATERIAL, ...options.material };
    this.boxExtents = options.boxExtents ? options.boxExtents.clone() : new Vector2(16, 16);
    this.circleRadius = options.circleRadius ?? 16;
    this.polygon = options.polygon ? options.polygon.clone() : void 0;
    this.collisionLayer = options.layer ?? 1;
    this.collisionMask = options.mask ?? 65535;
    this.worldAABB = new AABB();
  }
  computeWorldAABB(bodyPosition, bodyRotation = 0) {
    const center = bodyPosition.add(this.offset.rotate(bodyRotation));
    switch (this.shapeType) {
      case ColliderShapeType.Circle: {
        const r = this.circleRadius || 16;
        this.worldAABB.set(center.x - r, center.y - r, center.x + r, center.y + r);
        break;
      }
      case ColliderShapeType.Box: {
        const ext = this.boxExtents || new Vector2(16, 16);
        if (bodyRotation === 0) {
          this.worldAABB.set(
            center.x - ext.x,
            center.y - ext.y,
            center.x + ext.x,
            center.y + ext.y
          );
        } else {
          const c = Math.abs(Math.cos(bodyRotation));
          const s = Math.abs(Math.sin(bodyRotation));
          const hx = ext.x * c + ext.y * s;
          const hy = ext.x * s + ext.y * c;
          this.worldAABB.set(center.x - hx, center.y - hy, center.x + hx, center.y + hy);
        }
        break;
      }
      case ColliderShapeType.Polygon: {
        if (this.polygon) {
          const worldVerts = this.polygon.vertices.map(
            (v) => v.rotate(bodyRotation).add(center)
          );
          this.worldAABB.copy(AABB.fromPoints(worldVerts));
        }
        break;
      }
    }
    return this.worldAABB;
  }
  canCollideWith(other) {
    return (this.collisionLayer & other.collisionMask) !== 0 && (other.collisionLayer & this.collisionMask) !== 0;
  }
};

// src/core/collections/BVHTree.ts
var BVHNode = class {
  aabb;
  item;
  left;
  right;
  parent;
  height = 0;
  constructor(aabb, item) {
    this.aabb = aabb.clone();
    this.item = item;
  }
  get isLeaf() {
    return this.left === void 0;
  }
};
var BVHTree = class {
  _root;
  _margin;
  constructor(fatMargin = 2) {
    this._margin = fatMargin;
  }
  get root() {
    return this._root;
  }
  insert(item, tightAABB) {
    const fatAABB = tightAABB.clone().fatten(this._margin);
    const leaf = new BVHNode(fatAABB, item);
    if (!this._root) {
      this._root = leaf;
      return leaf;
    }
    let bestSibling = this._root;
    let bestCost = this._computeMergedArea(this._root.aabb, fatAABB);
    const queue = [this._root];
    while (queue.length > 0) {
      const current = queue.shift();
      const directCost = this._computeMergedArea(current.aabb, fatAABB);
      if (directCost < bestCost) {
        bestCost = directCost;
        bestSibling = current;
      }
      if (!current.isLeaf) {
        queue.push(current.left);
        queue.push(current.right);
      }
    }
    const oldParent = bestSibling.parent;
    const newParent = new BVHNode(bestSibling.aabb.clone().expandToAABB(fatAABB));
    newParent.parent = oldParent;
    newParent.height = bestSibling.height + 1;
    if (oldParent) {
      if (oldParent.left === bestSibling) {
        oldParent.left = newParent;
      } else {
        oldParent.right = newParent;
      }
    } else {
      this._root = newParent;
    }
    newParent.left = bestSibling;
    newParent.right = leaf;
    bestSibling.parent = newParent;
    leaf.parent = newParent;
    this._refit(leaf.parent);
    return leaf;
  }
  remove(leaf) {
    if (leaf === this._root) {
      this._root = void 0;
      return;
    }
    const parent = leaf.parent;
    const grandParent = parent.parent;
    const sibling = parent.left === leaf ? parent.right : parent.left;
    if (grandParent) {
      if (grandParent.left === parent) {
        grandParent.left = sibling;
      } else {
        grandParent.right = sibling;
      }
      sibling.parent = grandParent;
      this._refit(grandParent);
    } else {
      this._root = sibling;
      sibling.parent = void 0;
    }
  }
  queryAABB(range, results = []) {
    if (!this._root) return results;
    const stack = [this._root];
    while (stack.length > 0) {
      const node = stack.pop();
      if (node.aabb.intersectsAABB(range)) {
        if (node.isLeaf) {
          if (node.item !== void 0) {
            results.push(node.item);
          }
        } else {
          if (node.left) stack.push(node.left);
          if (node.right) stack.push(node.right);
        }
      }
    }
    return results;
  }
  raycast(ray, testItemCallback) {
    if (!this._root) return null;
    let closestHit = null;
    let minDistance = ray.length;
    const stack = [this._root];
    while (stack.length > 0) {
      const node = stack.pop();
      const hit = ray.intersectAABB(node.aabb);
      if (!hit || hit.distance > minDistance) continue;
      if (node.isLeaf) {
        if (node.item !== void 0) {
          if (testItemCallback) {
            const itemHit = testItemCallback(node.item, ray);
            if (itemHit && itemHit.distance < minDistance) {
              minDistance = itemHit.distance;
              closestHit = { item: node.item, hit: itemHit };
            }
          } else {
            minDistance = hit.distance;
            closestHit = { item: node.item, hit };
          }
        }
      } else {
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
      }
    }
    return closestHit;
  }
  _computeMergedArea(a, b) {
    const minX = Math.min(a.min.x, b.min.x);
    const minY = Math.min(a.min.y, b.min.y);
    const maxX = Math.max(a.max.x, b.max.x);
    const maxY = Math.max(a.max.y, b.max.y);
    return (maxX - minX) * (maxY - minY);
  }
  _refit(node) {
    while (node) {
      const left = node.left;
      const right = node.right;
      node.aabb.copy(left.aabb).expandToAABB(right.aabb);
      node.height = 1 + Math.max(left.height, right.height);
      node = node.parent;
    }
  }
  clear() {
    this._root = void 0;
  }
};

// src/physics/Broadphase.ts
var Broadphase = class {
  _bvh;
  _proxies = /* @__PURE__ */ new Map();
  constructor(fatMargin = 4) {
    this._bvh = new BVHTree(fatMargin);
  }
  register(entityId, collider) {
    const proxy = {
      entityId,
      collider
    };
    proxy.bvhNode = this._bvh.insert(proxy, collider.worldAABB);
    this._proxies.set(entityId, proxy);
  }
  unregister(entityId) {
    const proxy = this._proxies.get(entityId);
    if (!proxy) return;
    if (proxy.bvhNode) {
      this._bvh.remove(proxy.bvhNode);
    }
    this._proxies.delete(entityId);
  }
  updateProxy(entityId) {
    const proxy = this._proxies.get(entityId);
    if (!proxy || !proxy.bvhNode) return;
    if (!proxy.bvhNode.aabb.containsAABB(proxy.collider.worldAABB)) {
      this._bvh.remove(proxy.bvhNode);
      proxy.bvhNode = this._bvh.insert(proxy, proxy.collider.worldAABB);
    }
  }
  computePairs() {
    const pairs = [];
    const testedPairs = /* @__PURE__ */ new Set();
    for (const proxy of this._proxies.values()) {
      const candidates = [];
      this._bvh.queryAABB(proxy.collider.worldAABB, candidates);
      for (let i = 0; i < candidates.length; i++) {
        const other = candidates[i];
        if (proxy.entityId === other.entityId) continue;
        const minId = Math.min(proxy.entityId, other.entityId);
        const maxId = Math.max(proxy.entityId, other.entityId);
        const pairKey = `${minId}:${maxId}`;
        if (testedPairs.has(pairKey)) continue;
        testedPairs.add(pairKey);
        if (proxy.collider.canCollideWith(other.collider)) {
          pairs.push({
            entityA: minId,
            entityB: maxId
          });
        }
      }
    }
    return pairs;
  }
  clear() {
    this._bvh.clear();
    this._proxies.clear();
  }
};

// src/physics/CollisionManifold.ts
var CollisionManifold = class {
  entityA;
  entityB;
  bodyA;
  bodyB;
  colliderA;
  colliderB;
  normal;
  // Points from A to B
  tangent;
  contacts = [];
  friction = 0.2;
  restitution = 0;
  isSensor = false;
  constructor(entityA, entityB, bodyA, bodyB, colliderA, colliderB) {
    this.entityA = entityA;
    this.entityB = entityB;
    this.bodyA = bodyA;
    this.bodyB = bodyB;
    this.colliderA = colliderA;
    this.colliderB = colliderB;
    this.normal = new Vector2();
    this.tangent = new Vector2();
    this.friction = Math.sqrt(colliderA.material.friction * colliderB.material.friction);
    this.restitution = Math.max(colliderA.material.restitution, colliderB.material.restitution);
    this.isSensor = colliderA.isSensor || colliderB.isSensor;
  }
  computeTangent() {
    this.tangent.set(-this.normal.y, this.normal.x);
  }
};

// src/physics/NarrowphaseSAT.ts
var NarrowphaseSAT = class {
  static testCollision(entityA, entityB, posA, rotA, posB, rotB, bodyA, bodyB, colliderA, colliderB) {
    if (colliderA.shapeType === ColliderShapeType.Circle && colliderB.shapeType === ColliderShapeType.Circle) {
      return this._testCircleCircle(
        entityA,
        entityB,
        posA,
        posB,
        bodyA,
        bodyB,
        colliderA,
        colliderB
      );
    }
    if (colliderA.shapeType === ColliderShapeType.Circle && (colliderB.shapeType === ColliderShapeType.Box || colliderB.shapeType === ColliderShapeType.Polygon)) {
      return this._testCirclePolygon(
        entityA,
        entityB,
        posA,
        posB,
        rotB,
        bodyA,
        bodyB,
        colliderA,
        colliderB
      );
    }
    if ((colliderA.shapeType === ColliderShapeType.Box || colliderA.shapeType === ColliderShapeType.Polygon) && colliderB.shapeType === ColliderShapeType.Circle) {
      const manifold = this._testCirclePolygon(
        entityB,
        entityA,
        posB,
        posA,
        rotA,
        bodyB,
        bodyA,
        colliderB,
        colliderA
      );
      if (manifold) {
        manifold.normal.scaleSelf(-1);
        manifold.entityA = entityA;
        manifold.entityB = entityB;
        manifold.bodyA = bodyA;
        manifold.bodyB = bodyB;
        manifold.colliderA = colliderA;
        manifold.colliderB = colliderB;
        manifold.computeTangent();
      }
      return manifold;
    }
    return this._testPolygonPolygon(
      entityA,
      entityB,
      posA,
      rotA,
      posB,
      rotB,
      bodyA,
      bodyB,
      colliderA,
      colliderB
    );
  }
  static _testCircleCircle(entityA, entityB, posA, posB, bodyA, bodyB, colliderA, colliderB) {
    const cA = posA.add(colliderA.offset);
    const cB = posB.add(colliderB.offset);
    const delta = cB.subtract(cA);
    const distSq = delta.lengthSquared();
    const rA = colliderA.circleRadius || 16;
    const rB = colliderB.circleRadius || 16;
    const totalRadius = rA + rB;
    if (distSq > totalRadius * totalRadius) {
      return null;
    }
    const dist = Math.sqrt(distSq);
    const manifold = new CollisionManifold(entityA, entityB, bodyA, bodyB, colliderA, colliderB);
    if (dist === 0) {
      manifold.normal.set(0, -1);
    } else {
      manifold.normal.copy(delta.scale(1 / dist));
    }
    manifold.computeTangent();
    const penetration = totalRadius - dist;
    const contactPos = cA.add(manifold.normal.scale(rA - penetration * 0.5));
    const contact = {
      position: contactPos,
      penetration,
      normalImpulse: 0,
      tangentImpulse: 0,
      rA: contactPos.subtract(posA),
      rB: contactPos.subtract(posB)
    };
    manifold.contacts.push(contact);
    return manifold;
  }
  static _testCirclePolygon(circleEntity, polyEntity, circlePos, polyPos, polyRot, circleBody, polyBody, circleCollider, polyCollider) {
    const cCenter = circlePos.add(circleCollider.offset);
    const cRadius = circleCollider.circleRadius || 16;
    const polyVerts = this._getTransformedVertices(polyCollider, polyPos, polyRot);
    let minOverlap = Infinity;
    let smallestAxis = new Vector2();
    for (let i = 0; i < polyVerts.length; i++) {
      const p1 = polyVerts[i];
      const p2 = polyVerts[(i + 1) % polyVerts.length];
      const edge = p2.subtract(p1);
      const axis = new Vector2(-edge.y, edge.x).normalize();
      const [minP, maxP] = this._projectVertices(polyVerts, axis);
      const cProj = cCenter.dot(axis);
      const minC = cProj - cRadius;
      const maxC = cProj + cRadius;
      if (maxP < minC || maxC < minP) return null;
      const overlap = Math.min(maxP, maxC) - Math.max(minP, minC);
      if (overlap < minOverlap) {
        minOverlap = overlap;
        smallestAxis.copy(axis);
      }
    }
    let closestVert = polyVerts[0];
    let minDistSq = cCenter.distanceToSquared(closestVert);
    for (let i = 1; i < polyVerts.length; i++) {
      const dSq = cCenter.distanceToSquared(polyVerts[i]);
      if (dSq < minDistSq) {
        minDistSq = dSq;
        closestVert = polyVerts[i];
      }
    }
    const vertAxis = closestVert.subtract(cCenter).normalize();
    if (vertAxis.lengthSquared() > 0) {
      const [minP, maxP] = this._projectVertices(polyVerts, vertAxis);
      const cProj = cCenter.dot(vertAxis);
      const minC = cProj - cRadius;
      const maxC = cProj + cRadius;
      if (maxP < minC || maxC < minP) return null;
      const overlap = Math.min(maxP, maxC) - Math.max(minP, minC);
      if (overlap < minOverlap) {
        minOverlap = overlap;
        smallestAxis.copy(vertAxis);
      }
    }
    const centerDir = polyPos.subtract(circlePos);
    if (smallestAxis.dot(centerDir) < 0) {
      smallestAxis.scaleSelf(-1);
    }
    const manifold = new CollisionManifold(
      circleEntity,
      polyEntity,
      circleBody,
      polyBody,
      circleCollider,
      polyCollider
    );
    manifold.normal.copy(smallestAxis);
    manifold.computeTangent();
    const contactPos = cCenter.add(manifold.normal.scale(cRadius));
    manifold.contacts.push({
      position: contactPos,
      penetration: minOverlap,
      normalImpulse: 0,
      tangentImpulse: 0,
      rA: contactPos.subtract(circlePos),
      rB: contactPos.subtract(polyPos)
    });
    return manifold;
  }
  static _testPolygonPolygon(entityA, entityB, posA, rotA, posB, rotB, bodyA, bodyB, colliderA, colliderB) {
    const vertsA = this._getTransformedVertices(colliderA, posA, rotA);
    const vertsB = this._getTransformedVertices(colliderB, posB, rotB);
    let minOverlap = Infinity;
    let smallestAxis = new Vector2();
    const axes = [...this._getPolygonNormals(vertsA), ...this._getPolygonNormals(vertsB)];
    for (let i = 0; i < axes.length; i++) {
      const axis = axes[i];
      const [minA, maxA] = this._projectVertices(vertsA, axis);
      const [minB, maxB] = this._projectVertices(vertsB, axis);
      if (maxA < minB || maxB < minA) {
        return null;
      }
      const overlap = Math.min(maxA, maxB) - Math.max(minA, minB);
      if (overlap < minOverlap) {
        minOverlap = overlap;
        smallestAxis.copy(axis);
      }
    }
    const dir = posB.subtract(posA);
    if (smallestAxis.dot(dir) < 0) {
      smallestAxis.scaleSelf(-1);
    }
    const manifold = new CollisionManifold(
      entityA,
      entityB,
      bodyA,
      bodyB,
      colliderA,
      colliderB
    );
    manifold.normal.copy(smallestAxis);
    manifold.computeTangent();
    const contactPos = posA.add(posB).scale(0.5);
    manifold.contacts.push({
      position: contactPos,
      penetration: minOverlap,
      normalImpulse: 0,
      tangentImpulse: 0,
      rA: contactPos.subtract(posA),
      rB: contactPos.subtract(posB)
    });
    return manifold;
  }
  static _getTransformedVertices(collider, pos, rot) {
    const center = pos.add(collider.offset.rotate(rot));
    if (collider.shapeType === ColliderShapeType.Box) {
      const ext = collider.boxExtents || new Vector2(16, 16);
      const hw = ext.x;
      const hh = ext.y;
      return [
        new Vector2(-hw, -hh).rotate(rot).add(center),
        new Vector2(hw, -hh).rotate(rot).add(center),
        new Vector2(hw, hh).rotate(rot).add(center),
        new Vector2(-hw, hh).rotate(rot).add(center)
      ];
    } else if (collider.polygon) {
      return collider.polygon.vertices.map((v) => v.rotate(rot).add(center));
    }
    return [center];
  }
  static _getPolygonNormals(verts) {
    const normals = [];
    for (let i = 0; i < verts.length; i++) {
      const p1 = verts[i];
      const p2 = verts[(i + 1) % verts.length];
      const edge = p2.subtract(p1);
      normals.push(new Vector2(-edge.y, edge.x).normalize());
    }
    return normals;
  }
  static _projectVertices(verts, axis) {
    let min = verts[0].dot(axis);
    let max = min;
    for (let i = 1; i < verts.length; i++) {
      const p = verts[i].dot(axis);
      if (p < min) min = p;
      if (p > max) max = p;
    }
    return [min, max];
  }
};

// src/physics/ContactSolver.ts
var ContactSolver = class {
  static BAUMGARTE_SLOP = 0.05;
  static BAUMGARTE_BIAS_FACTOR = 0.2;
  static preSolve(manifold, dt) {
    if (manifold.isSensor) return;
    const bodyA = manifold.bodyA;
    const bodyB = manifold.bodyB;
    const normal = manifold.normal;
    const tangent = manifold.tangent;
    for (let i = 0; i < manifold.contacts.length; i++) {
      const c = manifold.contacts[i];
      const P = normal.scale(c.normalImpulse).add(tangent.scale(c.tangentImpulse));
      if (bodyA.invMass > 0) {
        bodyA.velocity.subtractSelf(P.scale(bodyA.invMass));
        bodyA.angularVelocity -= c.rA.cross(P) * bodyA.invInertia;
      }
      if (bodyB.invMass > 0) {
        bodyB.velocity.addSelf(P.scale(bodyB.invMass));
        bodyB.angularVelocity += c.rB.cross(P) * bodyB.invInertia;
      }
    }
  }
  static solveVelocity(manifold) {
    if (manifold.isSensor) return;
    const bodyA = manifold.bodyA;
    const bodyB = manifold.bodyB;
    const normal = manifold.normal;
    const tangent = manifold.tangent;
    for (let i = 0; i < manifold.contacts.length; i++) {
      const c = manifold.contacts[i];
      const vA = bodyA.velocity.add(new Vector2(-bodyA.angularVelocity * c.rA.y, bodyA.angularVelocity * c.rA.x));
      const vB = bodyB.velocity.add(new Vector2(-bodyB.angularVelocity * c.rB.y, bodyB.angularVelocity * c.rB.x));
      const dv = vB.subtract(vA);
      const vn = dv.dot(normal);
      const rAcn = c.rA.cross(normal);
      const rBcn = c.rB.cross(normal);
      const kNormal = bodyA.invMass + bodyB.invMass + rAcn * rAcn * bodyA.invInertia + rBcn * rBcn * bodyB.invInertia;
      if (kNormal > 0) {
        let dPn = -vn / kNormal;
        if (vn < -1) {
          dPn += -manifold.restitution * vn / kNormal;
        }
        const oldImpulse = c.normalImpulse;
        c.normalImpulse = Math.max(0, oldImpulse + dPn);
        dPn = c.normalImpulse - oldImpulse;
        const Pn = normal.scale(dPn);
        if (bodyA.invMass > 0) {
          bodyA.velocity.subtractSelf(Pn.scale(bodyA.invMass));
          bodyA.angularVelocity -= c.rA.cross(Pn) * bodyA.invInertia;
        }
        if (bodyB.invMass > 0) {
          bodyB.velocity.addSelf(Pn.scale(bodyB.invMass));
          bodyB.angularVelocity += c.rB.cross(Pn) * bodyB.invInertia;
        }
      }
      const vt = dv.dot(tangent);
      const rAct = c.rA.cross(tangent);
      const rBct = c.rB.cross(tangent);
      const kTangent = bodyA.invMass + bodyB.invMass + rAct * rAct * bodyA.invInertia + rBct * rBct * bodyB.invInertia;
      if (kTangent > 0) {
        let dPt = -vt / kTangent;
        const maxPt = manifold.friction * c.normalImpulse;
        const oldImpulse = c.tangentImpulse;
        c.tangentImpulse = Math.max(-maxPt, Math.min(maxPt, oldImpulse + dPt));
        dPt = c.tangentImpulse - oldImpulse;
        const Pt = tangent.scale(dPt);
        if (bodyA.invMass > 0) {
          bodyA.velocity.subtractSelf(Pt.scale(bodyA.invMass));
          bodyA.angularVelocity -= c.rA.cross(Pt) * bodyA.invInertia;
        }
        if (bodyB.invMass > 0) {
          bodyB.velocity.addSelf(Pt.scale(bodyB.invMass));
          bodyB.angularVelocity += c.rB.cross(Pt) * bodyB.invInertia;
        }
      }
    }
  }
  static solvePosition(posA, posB, manifold) {
    if (manifold.isSensor) return true;
    const bodyA = manifold.bodyA;
    const bodyB = manifold.bodyB;
    const normal = manifold.normal;
    let minPenetration = 0;
    for (let i = 0; i < manifold.contacts.length; i++) {
      const c = manifold.contacts[i];
      const penetration = c.penetration;
      minPenetration = Math.min(minPenetration, penetration);
      const correction = Math.max(0, penetration - this.BAUMGARTE_SLOP) * this.BAUMGARTE_BIAS_FACTOR;
      const totalInvMass = bodyA.invMass + bodyB.invMass;
      if (totalInvMass > 0 && correction > 0) {
        const deltaA = normal.scale(-correction * (bodyA.invMass / totalInvMass));
        const deltaB = normal.scale(correction * (bodyB.invMass / totalInvMass));
        posA.addSelf(deltaA);
        posB.addSelf(deltaB);
      }
    }
    return minPenetration >= -this.BAUMGARTE_SLOP;
  }
};

// src/core/ecs/System.ts
var System = class {
  phase = SystemPhase.Update;
  priority = 0;
  enabled = true;
  world;
  commands;
  init(world) {
    this.world = world;
    this.commands = world.commandBuffer;
    this.onInit();
  }
  onInit() {
  }
  onDestroy() {
  }
};

// src/physics/PhysicsWorld.ts
var PhysicsWorld = class extends System {
  phase = SystemPhase.Physics;
  priority = 100;
  gravity;
  velocityIterations = 8;
  positionIterations = 3;
  broadphase;
  _manifolds = [];
  _joints = [];
  constructor(gravity = new Vector2(0, 0)) {
    super();
    this.gravity = gravity;
    this.broadphase = new Broadphase(4);
  }
  addJoint(joint) {
    this._joints.push(joint);
  }
  removeJoint(joint) {
    const idx = this._joints.indexOf(joint);
    if (idx !== -1) {
      this._joints.splice(idx, 1);
    }
  }
  get activeManifolds() {
    return this._manifolds;
  }
  update(dt) {
    if (dt <= 0) return;
    const clampedDt = Math.min(dt, 0.033);
    const bodyQuery = this.world.createQuery({ all: [Transform2D, RigidBody2D] });
    const colliderQuery = this.world.createQuery({ all: [Transform2D, Collider2D] });
    bodyQuery.forEach((id, transform, body) => {
      if (body.type === BodyType.Dynamic && !body.isSleeping) {
        const totalAccel = this.gravity.scale(body.gravityScale).add(body.force.scale(body.invMass));
        body.velocity.addSelf(totalAccel.scale(clampedDt));
        body.velocity.scaleSelf(1 / (1 + clampedDt * body.linearDamping));
        if (!body.isFixedRotation) {
          body.angularVelocity += body.torque * body.invInertia * clampedDt;
          body.angularVelocity *= 1 / (1 + clampedDt * body.angularDamping);
        }
        body.clearForces();
      }
    }, [Transform2D, RigidBody2D]);
    colliderQuery.forEach((id, transform, collider) => {
      collider.computeWorldAABB(transform.position, transform.rotation);
      this.broadphase.updateProxy(id);
    }, [Transform2D, Collider2D]);
    const candidatePairs = this.broadphase.computePairs();
    this._manifolds = [];
    for (let i = 0; i < candidatePairs.length; i++) {
      const pair = candidatePairs[i];
      const transformA = this.world.getComponent(pair.entityA, Transform2D);
      const transformB = this.world.getComponent(pair.entityB, Transform2D);
      const bodyA = this.world.getComponent(pair.entityA, RigidBody2D) || new RigidBody2D({ type: BodyType.Static });
      const bodyB = this.world.getComponent(pair.entityB, RigidBody2D) || new RigidBody2D({ type: BodyType.Static });
      const colliderA = this.world.getComponent(pair.entityA, Collider2D);
      const colliderB = this.world.getComponent(pair.entityB, Collider2D);
      if (!transformA || !transformB) continue;
      const manifold = NarrowphaseSAT.testCollision(
        pair.entityA,
        pair.entityB,
        transformA.position,
        transformA.rotation,
        transformB.position,
        transformB.rotation,
        bodyA,
        bodyB,
        colliderA,
        colliderB
      );
      if (manifold && manifold.contacts.length > 0) {
        this._manifolds.push(manifold);
      }
    }
    for (let m = 0; m < this._manifolds.length; m++) {
      ContactSolver.preSolve(this._manifolds[m], clampedDt);
    }
    for (let j = 0; j < this._joints.length; j++) {
      const joint = this._joints[j];
      const tA = this.world.getComponent(joint.entityA, Transform2D);
      const tB = this.world.getComponent(joint.entityB, Transform2D);
      if (tA && tB && joint.isEnabled) {
        joint.preSolve(tA.position, tA.rotation, tB.position, tB.rotation, clampedDt);
      }
    }
    for (let iter = 0; iter < this.velocityIterations; iter++) {
      for (let j = 0; j < this._joints.length; j++) {
        if (this._joints[j].isEnabled) {
          this._joints[j].solveVelocity();
        }
      }
      for (let m = 0; m < this._manifolds.length; m++) {
        ContactSolver.solveVelocity(this._manifolds[m]);
      }
    }
    bodyQuery.forEach((id, transform, body) => {
      if (body.type === BodyType.Dynamic && !body.isSleeping) {
        transform.position.addSelf(body.velocity.scale(clampedDt));
        if (!body.isFixedRotation) {
          transform.rotation += body.angularVelocity * clampedDt;
        }
        transform.markDirty();
      } else if (body.type === BodyType.Kinematic) {
        transform.position.addSelf(body.velocity.scale(clampedDt));
        transform.rotation += body.angularVelocity * clampedDt;
        transform.markDirty();
      }
    }, [Transform2D, RigidBody2D]);
    for (let iter = 0; iter < this.positionIterations; iter++) {
      let contactsSolved = true;
      for (let m = 0; m < this._manifolds.length; m++) {
        const man = this._manifolds[m];
        const tA = this.world.getComponent(man.entityA, Transform2D);
        const tB = this.world.getComponent(man.entityB, Transform2D);
        if (tA && tB) {
          const ok = ContactSolver.solvePosition(tA.position, tB.position, man);
          if (!ok) contactsSolved = false;
        }
      }
      if (contactsSolved) break;
    }
  }
};

// src/renderer/WebGLContext.ts
var WebGLContext = class {
  gl;
  canvas;
  width = 0;
  height = 0;
  dpr = 1;
  constructor(canvas) {
    this.canvas = canvas;
    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: true,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance"
    });
    if (!gl) {
      throw new Error("WebGL2 is not supported on this device/browser");
    }
    this.gl = gl;
    this.resize();
  }
  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = Math.floor(this.canvas.clientWidth * this.dpr);
    const displayHeight = Math.floor(this.canvas.clientHeight * this.dpr);
    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
      this.width = displayWidth;
      this.height = displayHeight;
      this.gl.viewport(0, 0, displayWidth, displayHeight);
      return true;
    }
    return false;
  }
  setClearColor(r, g, b, a = 1) {
    this.gl.clearColor(r, g, b, a);
  }
  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }
  setBlendMode(mode) {
    const gl = this.gl;
    if (mode === "none") {
      gl.disable(gl.BLEND);
      return;
    }
    gl.enable(gl.BLEND);
    switch (mode) {
      case "normal":
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        break;
      case "additive":
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        break;
      case "multiply":
        gl.blendFunc(gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA);
        break;
    }
  }
};

// src/renderer/Shader.ts
var Shader = class {
  program;
  _gl;
  _uniformLocations = /* @__PURE__ */ new Map();
  _attribLocations = /* @__PURE__ */ new Map();
  constructor(gl, vertexSrc, fragmentSrc) {
    this._gl = gl;
    const vShader = this._compileShader(gl.VERTEX_SHADER, vertexSrc);
    const fShader = this._compileShader(gl.FRAGMENT_SHADER, fragmentSrc);
    const program = gl.createProgram();
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(`Shader Link Error:
${info}`);
    }
    gl.deleteShader(vShader);
    gl.deleteShader(fShader);
    this.program = program;
  }
  bind() {
    this._gl.useProgram(this.program);
  }
  getUniformLocation(name) {
    let loc = this._uniformLocations.get(name);
    if (loc === void 0) {
      const glLoc = this._gl.getUniformLocation(this.program, name);
      if (glLoc) {
        this._uniformLocations.set(name, glLoc);
        loc = glLoc;
      }
    }
    return loc || null;
  }
  getAttribLocation(name) {
    let loc = this._attribLocations.get(name);
    if (loc === void 0) {
      loc = this._gl.getAttribLocation(this.program, name);
      this._attribLocations.set(name, loc);
    }
    return loc;
  }
  setFloat(name, value) {
    const loc = this.getUniformLocation(name);
    if (loc) this._gl.uniform1f(loc, value);
  }
  setInt(name, value) {
    const loc = this.getUniformLocation(name);
    if (loc) this._gl.uniform1i(loc, value);
  }
  setVec2(name, x, y) {
    const loc = this.getUniformLocation(name);
    if (loc) this._gl.uniform2f(loc, x, y);
  }
  setVec3(name, x, y, z) {
    const loc = this.getUniformLocation(name);
    if (loc) this._gl.uniform3f(loc, x, y, z);
  }
  setVec4(name, x, y, z, w) {
    const loc = this.getUniformLocation(name);
    if (loc) this._gl.uniform4f(loc, x, y, z, w);
  }
  setMat3(name, matrix) {
    const loc = this.getUniformLocation(name);
    if (loc) this._gl.uniformMatrix3fv(loc, false, matrix);
  }
  setMat4(name, matrix) {
    const loc = this.getUniformLocation(name);
    if (loc) this._gl.uniformMatrix4fv(loc, false, matrix);
  }
  dispose() {
    this._gl.deleteProgram(this.program);
  }
  _compileShader(type, src) {
    const gl = this._gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src.trim());
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      const typeStr = type === gl.VERTEX_SHADER ? "Vertex" : "Fragment";
      throw new Error(`${typeStr} Shader Compile Error:
${info}
Source:
${src}`);
    }
    return shader;
  }
};

// src/renderer/BufferGeometry.ts
var BufferGeometry = class {
  vao;
  vbo;
  ebo;
  _gl;
  indexCount = 0;
  vertexCount = 0;
  constructor(gl) {
    this._gl = gl;
    this.vao = gl.createVertexArray();
    this.vbo = gl.createBuffer();
  }
  setVertices(data, usage = this._gl.STATIC_DRAW) {
    const gl = this._gl;
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, data, usage);
  }
  setSubData(offset, data) {
    const gl = this._gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
  }
  setIndices(indices, usage = this._gl.STATIC_DRAW) {
    const gl = this._gl;
    if (!this.ebo) {
      this.ebo = gl.createBuffer();
    }
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, usage);
    this.indexCount = indices.length;
  }
  setAttributes(attributes) {
    const gl = this._gl;
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes[i];
      gl.enableVertexAttribArray(attr.location);
      gl.vertexAttribPointer(
        attr.location,
        attr.size,
        attr.type,
        attr.normalized,
        attr.stride,
        attr.offset
      );
    }
  }
  bind() {
    this._gl.bindVertexArray(this.vao);
  }
  unbind() {
    this._gl.bindVertexArray(null);
  }
  dispose() {
    const gl = this._gl;
    gl.deleteBuffer(this.vbo);
    if (this.ebo) gl.deleteBuffer(this.ebo);
    gl.deleteVertexArray(this.vao);
  }
};

// src/renderer/Texture2D.ts
var Texture2D = class _Texture2D {
  texture;
  width;
  height;
  _gl;
  constructor(gl, width = 1, height = 1) {
    this._gl = gl;
    this.width = width;
    this.height = height;
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  }
  static createSolidColor(gl, color) {
    const tex = new _Texture2D(gl, 1, 1);
    const pixel = new Uint8Array([
      Math.floor(color.r * 255),
      Math.floor(color.g * 255),
      Math.floor(color.b * 255),
      Math.floor(color.a * 255)
    ]);
    gl.bindTexture(gl.TEXTURE_2D, tex.texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      pixel
    );
    return tex;
  }
  static createProceduralCheckerboard(gl, size = 64, cellSize = 8, color1 = new Color(0.2, 0.2, 0.2, 1), color2 = new Color(0.4, 0.4, 0.4, 1)) {
    const tex = new _Texture2D(gl, size, size);
    const pixels = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const check = (Math.floor(x / cellSize) + Math.floor(y / cellSize)) % 2 === 0;
        const c = check ? color1 : color2;
        const idx = (y * size + x) * 4;
        pixels[idx + 0] = Math.floor(c.r * 255);
        pixels[idx + 1] = Math.floor(c.g * 255);
        pixels[idx + 2] = Math.floor(c.b * 255);
        pixels[idx + 3] = Math.floor(c.a * 255);
      }
    }
    gl.bindTexture(gl.TEXTURE_2D, tex.texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      size,
      size,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      pixels
    );
    return tex;
  }
  bind(unit = 0) {
    this._gl.activeTexture(this._gl.TEXTURE0 + unit);
    this._gl.bindTexture(this._gl.TEXTURE_2D, this.texture);
  }
  dispose() {
    this._gl.deleteTexture(this.texture);
  }
};

// src/renderer/SpriteBatchRenderer.ts
var VERTEX_SHADER_SRC = `#version 300 es
precision highp float;

layout(location = 0) in vec2 a_position;
layout(location = 1) in vec2 a_texCoord;
layout(location = 2) in vec4 a_color;

uniform mat4 u_projectionMatrix;
uniform mat4 u_viewMatrix;

out vec2 v_texCoord;
out vec4 v_color;

void main() {
    v_texCoord = a_texCoord;
    v_color = a_color;
    gl_Position = u_projectionMatrix * u_viewMatrix * vec4(a_position, 0.0, 1.0);
}
`;
var FRAGMENT_SHADER_SRC = `#version 300 es
precision highp float;

in vec2 v_texCoord;
in vec4 v_color;

uniform sampler2D u_texture;

out vec4 fragColor;

void main() {
    vec4 texColor = texture(u_texture, v_texCoord);
    fragColor = texColor * v_color;
}
`;
var SpriteBatchRenderer = class _SpriteBatchRenderer {
  static MAX_SPRITES = 1e4;
  static VERTICES_PER_SPRITE = 4;
  static INDICES_PER_SPRITE = 6;
  static FLOATS_PER_VERTEX = 8;
  // x, y, u, v, r, g, b, a
  _gl;
  _shader;
  _geometry;
  _vertexData;
  _spriteCount = 0;
  _currentTexture;
  _whiteTexture;
  drawCalls = 0;
  constructor(gl) {
    this._gl = gl;
    this._shader = new Shader(gl, VERTEX_SHADER_SRC, FRAGMENT_SHADER_SRC);
    this._geometry = new BufferGeometry(gl);
    this._whiteTexture = Texture2D.createSolidColor(gl, Color.WHITE);
    const totalFloats = _SpriteBatchRenderer.MAX_SPRITES * _SpriteBatchRenderer.VERTICES_PER_SPRITE * _SpriteBatchRenderer.FLOATS_PER_VERTEX;
    this._vertexData = new Float32Array(totalFloats);
    const totalIndices = _SpriteBatchRenderer.MAX_SPRITES * _SpriteBatchRenderer.INDICES_PER_SPRITE;
    const indices = new Uint32Array(totalIndices);
    for (let i = 0, v = 0; i < totalIndices; i += 6, v += 4) {
      indices[i + 0] = v + 0;
      indices[i + 1] = v + 1;
      indices[i + 2] = v + 2;
      indices[i + 3] = v + 2;
      indices[i + 4] = v + 3;
      indices[i + 5] = v + 0;
    }
    this._geometry.setVertices(this._vertexData, gl.DYNAMIC_DRAW);
    this._geometry.setIndices(indices, gl.STATIC_DRAW);
    const stride = _SpriteBatchRenderer.FLOATS_PER_VERTEX * 4;
    this._geometry.setAttributes([
      { location: 0, size: 2, type: gl.FLOAT, normalized: false, stride, offset: 0 },
      { location: 1, size: 2, type: gl.FLOAT, normalized: false, stride, offset: 8 },
      { location: 2, size: 4, type: gl.FLOAT, normalized: false, stride, offset: 16 }
    ]);
  }
  begin(viewMatrix, projMatrix) {
    this._shader.bind();
    this._shader.setMat4("u_viewMatrix", viewMatrix.elements);
    this._shader.setMat4("u_projectionMatrix", projMatrix.elements);
    this._shader.setInt("u_texture", 0);
    this._spriteCount = 0;
    this.drawCalls = 0;
    this._currentTexture = void 0;
  }
  drawSprite(pos, size, rotation = 0, origin = new Vector2(0.5, 0.5), color = Color.WHITE, uvs = [0, 0, 1, 1], texture) {
    const tex = texture || this._whiteTexture;
    if (this._currentTexture && this._currentTexture !== tex) {
      this.flush();
    }
    this._currentTexture = tex;
    if (this._spriteCount >= _SpriteBatchRenderer.MAX_SPRITES) {
      this.flush();
    }
    const w = size.x;
    const h = size.y;
    const ox = origin.x * w;
    const oy = origin.y * h;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const x0 = -ox, y0 = -oy;
    const x1 = w - ox, y1 = -oy;
    const x2 = w - ox, y2 = h - oy;
    const x3 = -ox, y3 = h - oy;
    const p0x = pos.x + (x0 * cos - y0 * sin);
    const p0y = pos.y + (x0 * sin + y0 * cos);
    const p1x = pos.x + (x1 * cos - y1 * sin);
    const p1y = pos.y + (x1 * sin + y1 * cos);
    const p2x = pos.x + (x2 * cos - y2 * sin);
    const p2y = pos.y + (x2 * sin + y2 * cos);
    const p3x = pos.x + (x3 * cos - y3 * sin);
    const p3y = pos.y + (x3 * sin + y3 * cos);
    const u0 = uvs[0], v0 = uvs[1], u1 = uvs[2], v1 = uvs[3];
    const r = color.r, g = color.g, b = color.b, a = color.a;
    let offset = this._spriteCount * _SpriteBatchRenderer.VERTICES_PER_SPRITE * _SpriteBatchRenderer.FLOATS_PER_VERTEX;
    const vd = this._vertexData;
    vd[offset++] = p0x;
    vd[offset++] = p0y;
    vd[offset++] = u0;
    vd[offset++] = v0;
    vd[offset++] = r;
    vd[offset++] = g;
    vd[offset++] = b;
    vd[offset++] = a;
    vd[offset++] = p1x;
    vd[offset++] = p1y;
    vd[offset++] = u1;
    vd[offset++] = v0;
    vd[offset++] = r;
    vd[offset++] = g;
    vd[offset++] = b;
    vd[offset++] = a;
    vd[offset++] = p2x;
    vd[offset++] = p2y;
    vd[offset++] = u1;
    vd[offset++] = v1;
    vd[offset++] = r;
    vd[offset++] = g;
    vd[offset++] = b;
    vd[offset++] = a;
    vd[offset++] = p3x;
    vd[offset++] = p3y;
    vd[offset++] = u0;
    vd[offset++] = v1;
    vd[offset++] = r;
    vd[offset++] = g;
    vd[offset++] = b;
    vd[offset++] = a;
    this._spriteCount++;
  }
  flush() {
    if (this._spriteCount === 0) return;
    const tex = this._currentTexture || this._whiteTexture;
    tex.bind(0);
    const countFloats = this._spriteCount * _SpriteBatchRenderer.VERTICES_PER_SPRITE * _SpriteBatchRenderer.FLOATS_PER_VERTEX;
    const subArray = this._vertexData.subarray(0, countFloats);
    this._geometry.setSubData(0, subArray);
    this._geometry.bind();
    const indexCount = this._spriteCount * _SpriteBatchRenderer.INDICES_PER_SPRITE;
    this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_INT, 0);
    this._geometry.unbind();
    this.drawCalls++;
    this._spriteCount = 0;
  }
  end() {
    this.flush();
  }
  dispose() {
    this._geometry.dispose();
    this._shader.dispose();
    this._whiteTexture.dispose();
  }
};

// src/core/math/Vector3.ts
var Vector3 = class _Vector3 {
  x;
  y;
  z;
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  static get ZERO() {
    return new _Vector3(0, 0, 0);
  }
  static get ONE() {
    return new _Vector3(1, 1, 1);
  }
  static get UP() {
    return new _Vector3(0, 1, 0);
  }
  static get FORWARD() {
    return new _Vector3(0, 0, 1);
  }
  static get RIGHT() {
    return new _Vector3(1, 0, 0);
  }
  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  copy(other) {
    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
    return this;
  }
  clone() {
    return new _Vector3(this.x, this.y, this.z);
  }
  add(other) {
    return new _Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
  }
  addSelf(other) {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    return this;
  }
  subtract(other) {
    return new _Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
  }
  subtractSelf(other) {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    return this;
  }
  scale(scalar) {
    return new _Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
  }
  scaleSelf(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }
  multiply(other) {
    return new _Vector3(this.x * other.x, this.y * other.y, this.z * other.z);
  }
  multiplySelf(other) {
    this.x *= other.x;
    this.y *= other.y;
    this.z *= other.z;
    return this;
  }
  dot(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }
  cross(other) {
    return new _Vector3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }
  crossSelf(other) {
    const cx = this.y * other.z - this.z * other.y;
    const cy = this.z * other.x - this.x * other.z;
    const cz = this.x * other.y - this.y * other.x;
    this.x = cx;
    this.y = cy;
    this.z = cz;
    return this;
  }
  lengthSquared() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.lengthSquared());
  }
  normalize() {
    const len = this.length();
    if (len === 0) return new _Vector3(0, 0, 0);
    const inv = 1 / len;
    return new _Vector3(this.x * inv, this.y * inv, this.z * inv);
  }
  normalizeSelf() {
    const len = this.length();
    if (len === 0) return this;
    const inv = 1 / len;
    this.x *= inv;
    this.y *= inv;
    this.z *= inv;
    return this;
  }
  distanceTo(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const dz = this.z - other.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
  lerp(target, alpha) {
    return new _Vector3(
      this.x + (target.x - this.x) * alpha,
      this.y + (target.y - this.y) * alpha,
      this.z + (target.z - this.z) * alpha
    );
  }
  lerpSelf(target, alpha) {
    this.x += (target.x - this.x) * alpha;
    this.y += (target.y - this.y) * alpha;
    this.z += (target.z - this.z) * alpha;
    return this;
  }
  equals(other, tolerance = 1e-6) {
    return Math.abs(this.x - other.x) <= tolerance && Math.abs(this.y - other.y) <= tolerance && Math.abs(this.z - other.z) <= tolerance;
  }
  toArray() {
    return [this.x, this.y, this.z];
  }
};

// src/core/math/Matrix4.ts
var Matrix4 = class _Matrix4 {
  elements;
  constructor() {
    this.elements = new Float32Array([
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ]);
  }
  identity() {
    const e = this.elements;
    e[0] = 1;
    e[4] = 0;
    e[8] = 0;
    e[12] = 0;
    e[1] = 0;
    e[5] = 1;
    e[9] = 0;
    e[13] = 0;
    e[2] = 0;
    e[6] = 0;
    e[10] = 1;
    e[14] = 0;
    e[3] = 0;
    e[7] = 0;
    e[11] = 0;
    e[15] = 1;
    return this;
  }
  copy(m) {
    const me = m.elements;
    const te = this.elements;
    for (let i = 0; i < 16; i++) {
      te[i] = me[i];
    }
    return this;
  }
  clone() {
    const m = new _Matrix4();
    m.copy(this);
    return m;
  }
  multiply(other) {
    return this.clone().multiplySelf(other);
  }
  multiplySelf(other) {
    const ae = this.elements;
    const be = other.elements;
    const r = new Float32Array(16);
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        r[col * 4 + row] = ae[0 * 4 + row] * be[col * 4 + 0] + ae[1 * 4 + row] * be[col * 4 + 1] + ae[2 * 4 + row] * be[col * 4 + 2] + ae[3 * 4 + row] * be[col * 4 + 3];
      }
    }
    for (let i = 0; i < 16; i++) {
      ae[i] = r[i];
    }
    return this;
  }
  makeOrthographic(left, right, top, bottom, near, far) {
    const te = this.elements;
    const w = 1 / (right - left);
    const h = 1 / (top - bottom);
    const p = 1 / (far - near);
    const x = (right + left) * w;
    const y = (top + bottom) * h;
    const z = (far + near) * p;
    te[0] = 2 * w;
    te[4] = 0;
    te[8] = 0;
    te[12] = -x;
    te[1] = 0;
    te[5] = 2 * h;
    te[9] = 0;
    te[13] = -y;
    te[2] = 0;
    te[6] = 0;
    te[10] = -2 * p;
    te[14] = -z;
    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[15] = 1;
    return this;
  }
  makePerspective(fovRadians, aspect, near, far) {
    const te = this.elements;
    const f = 1 / Math.tan(fovRadians / 2);
    const rangeInv = 1 / (near - far);
    te[0] = f / aspect;
    te[4] = 0;
    te[8] = 0;
    te[12] = 0;
    te[1] = 0;
    te[5] = f;
    te[9] = 0;
    te[13] = 0;
    te[2] = 0;
    te[6] = 0;
    te[10] = (far + near) * rangeInv;
    te[14] = 2 * far * near * rangeInv;
    te[3] = 0;
    te[7] = 0;
    te[11] = -1;
    te[15] = 0;
    return this;
  }
  makeTranslation(x, y, z) {
    this.identity();
    const e = this.elements;
    e[12] = x;
    e[13] = y;
    e[14] = z;
    return this;
  }
  makeScale(x, y, z) {
    this.identity();
    const e = this.elements;
    e[0] = x;
    e[5] = y;
    e[10] = z;
    return this;
  }
  transformVector3(v) {
    const e = this.elements;
    const x = e[0] * v.x + e[4] * v.y + e[8] * v.z + e[12];
    const y = e[1] * v.x + e[5] * v.y + e[9] * v.z + e[13];
    const z = e[2] * v.x + e[6] * v.y + e[10] * v.z + e[14];
    const w = e[3] * v.x + e[7] * v.y + e[11] * v.z + e[15];
    if (w !== 1 && w !== 0) {
      return new Vector3(x / w, y / w, z / w);
    }
    return new Vector3(x, y, z);
  }
};

// src/renderer/Camera2D.ts
var Camera2D = class {
  position;
  target;
  zoom;
  rotation;
  viewportWidth;
  viewportHeight;
  // Smoothing and limits
  smoothSpeed = 8;
  minZoom = 0.25;
  maxZoom = 4;
  bounds;
  // Screen shake trauma (trauma^2 decay model)
  trauma = 0;
  maxShakeOffset = 24;
  maxShakeAngle = 0.1;
  // radians
  _shakeOffset = new Vector2();
  _shakeRotation = 0;
  // Matrices
  viewMatrix;
  projectionMatrix;
  constructor(viewportWidth = 1920, viewportHeight = 1080) {
    this.position = new Vector2(0, 0);
    this.target = new Vector2(0, 0);
    this.zoom = 1;
    this.rotation = 0;
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;
    this.viewMatrix = new Matrix4();
    this.projectionMatrix = new Matrix4();
    this.updateMatrices();
  }
  addTrauma(amount) {
    this.trauma = MathUtils.clamp01(this.trauma + amount);
  }
  update(dt) {
    this.position.lerpSelf(this.target, 1 - Math.exp(-this.smoothSpeed * dt));
    if (this.bounds) {
      const halfW = this.viewportWidth * 0.5 / this.zoom;
      const halfH = this.viewportHeight * 0.5 / this.zoom;
      this.position.x = MathUtils.clamp(this.position.x, this.bounds.min.x + halfW, this.bounds.max.x - halfW);
      this.position.y = MathUtils.clamp(this.position.y, this.bounds.min.y + halfH, this.bounds.max.y - halfH);
    }
    if (this.trauma > 0) {
      const shakePower = this.trauma * this.trauma;
      const angle = (Math.random() * 2 - 1) * this.maxShakeAngle * shakePower;
      const offsetX = (Math.random() * 2 - 1) * this.maxShakeOffset * shakePower;
      const offsetY = (Math.random() * 2 - 1) * this.maxShakeOffset * shakePower;
      this._shakeOffset.set(offsetX, offsetY);
      this._shakeRotation = angle;
      this.trauma = Math.max(0, this.trauma - dt * 1.5);
    } else {
      this._shakeOffset.set(0, 0);
      this._shakeRotation = 0;
    }
    this.updateMatrices();
  }
  updateMatrices() {
    const hw = this.viewportWidth * 0.5;
    const hh = this.viewportHeight * 0.5;
    this.projectionMatrix.makeOrthographic(-hw, hw, -hh, hh, -1e3, 1e3);
    const effectivePos = this.position.add(this._shakeOffset);
    const effectiveRot = this.rotation + this._shakeRotation;
    this.viewMatrix.identity();
    const t = new Matrix4().makeTranslation(-effectivePos.x, -effectivePos.y, 0);
    const s = new Matrix4().makeScale(this.zoom, this.zoom, 1);
    this.viewMatrix.copy(s).multiplySelf(t);
  }
  screenToWorld(screenPos) {
    const hw = this.viewportWidth * 0.5;
    const hh = this.viewportHeight * 0.5;
    const centeredX = (screenPos.x - hw) / this.zoom;
    const centeredY = (screenPos.y - hh) / this.zoom;
    return new Vector2(
      this.position.x + centeredX,
      this.position.y + centeredY
    );
  }
  worldToScreen(worldPos) {
    const hw = this.viewportWidth * 0.5;
    const hh = this.viewportHeight * 0.5;
    const relX = (worldPos.x - this.position.x) * this.zoom;
    const relY = (worldPos.y - this.position.y) * this.zoom;
    return new Vector2(
      hw + relX,
      hh + relY
    );
  }
  getVisibleAABB() {
    const hw = this.viewportWidth * 0.5 / this.zoom;
    const hh = this.viewportHeight * 0.5 / this.zoom;
    return new AABB(
      this.position.x - hw,
      this.position.y - hh,
      this.position.x + hw,
      this.position.y + hh
    );
  }
};

// src/renderer/TilemapRenderer.ts
var TilemapOrientation = {
  Orthogonal: 0,
  Isometric: 1
};
var TilemapRenderer = class {
  width;
  // in tiles
  height;
  // in tiles
  tileWidth;
  tileHeight;
  orientation;
  layers = [];
  tilesetTexture;
  tilesetColumns = 16;
  tilesetRows = 16;
  constructor(width = 100, height = 100, tileWidth = 32, tileHeight = 32, orientation = TilemapOrientation.Orthogonal) {
    this.width = width;
    this.height = height;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.orientation = orientation;
  }
  addLayer(name) {
    const layer = {
      name,
      data: new Int32Array(this.width * this.height).fill(-1),
      visible: true,
      opacity: 1
    };
    this.layers.push(layer);
    return layer;
  }
  setTile(layerIndex, x, y, tileId) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    const layer = this.layers[layerIndex];
    if (layer) {
      layer.data[y * this.width + x] = tileId;
    }
  }
  getTile(layerIndex, x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return -1;
    const layer = this.layers[layerIndex];
    return layer ? layer.data[y * this.width + x] : -1;
  }
  render(batch, camera) {
    const visibleBounds = camera.getVisibleAABB();
    let minTileX = 0;
    let maxTileX = this.width - 1;
    let minTileY = 0;
    let maxTileY = this.height - 1;
    if (this.orientation === TilemapOrientation.Orthogonal) {
      minTileX = Math.max(0, Math.floor(visibleBounds.min.x / this.tileWidth));
      maxTileX = Math.min(this.width - 1, Math.ceil(visibleBounds.max.x / this.tileWidth));
      minTileY = Math.max(0, Math.floor(visibleBounds.min.y / this.tileHeight));
      maxTileY = Math.min(this.height - 1, Math.ceil(visibleBounds.max.y / this.tileHeight));
    }
    const tileSize = new Vector2(this.tileWidth, this.tileHeight);
    const origin = new Vector2(0, 0);
    for (let l = 0; l < this.layers.length; l++) {
      const layer = this.layers[l];
      if (!layer.visible) continue;
      const layerColor = new Color(1, 1, 1, layer.opacity);
      for (let y = minTileY; y <= maxTileY; y++) {
        for (let x = minTileX; x <= maxTileX; x++) {
          const tileId = layer.data[y * this.width + x];
          if (tileId < 0) continue;
          let worldPos;
          if (this.orientation === TilemapOrientation.Orthogonal) {
            worldPos = new Vector2(x * this.tileWidth, y * this.tileHeight);
          } else {
            worldPos = new Vector2(
              (x - y) * (this.tileWidth * 0.5),
              (x + y) * (this.tileHeight * 0.5)
            );
          }
          const tu = tileId % this.tilesetColumns / this.tilesetColumns;
          const tv = Math.floor(tileId / this.tilesetColumns) / this.tilesetRows;
          const uStep = 1 / this.tilesetColumns;
          const vStep = 1 / this.tilesetRows;
          batch.drawSprite(
            worldPos,
            tileSize,
            0,
            origin,
            layerColor,
            [tu, tv, tu + uStep, tv + vStep],
            this.tilesetTexture
          );
        }
      }
    }
  }
};

// src/renderer/PostProcessor.ts
var POST_VERTEX_SRC = `#version 300 es
precision highp float;

layout(location = 0) in vec2 a_position;
layout(location = 1) in vec2 a_texCoord;

out vec2 v_texCoord;

void main() {
    v_texCoord = a_texCoord;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;
var POST_FRAGMENT_SRC = `#version 300 es
precision highp float;

in vec2 v_texCoord;
uniform sampler2D u_screenTexture;
uniform float u_time;
uniform float u_bloomIntensity;
uniform float u_vignetteIntensity;
uniform float u_chromaticAberration;
uniform float u_scanlineIntensity;

out vec4 fragColor;

void main() {
    vec2 uv = v_texCoord;

    // 1. Chromatic Aberration
    vec2 caOffset = (uv - 0.5) * u_chromaticAberration * 0.02;
    float r = texture(u_screenTexture, uv - caOffset).r;
    float g = texture(u_screenTexture, uv).g;
    float b = texture(u_screenTexture, uv + caOffset).b;
    vec3 color = vec3(r, g, b);

    // 2. Vignette
    vec2 center = uv - 0.5;
    float dist = length(center);
    float vignette = smoothstep(0.7, 0.3, dist * u_vignetteIntensity);
    color *= vignette;

    // 3. Subtle CRT Scanlines
    if (u_scanlineIntensity > 0.0) {
        float scanline = sin(uv.y * 800.0 + u_time * 5.0) * 0.5 + 0.5;
        color -= color * scanline * u_scanlineIntensity * 0.1;
    }

    fragColor = vec4(color, 1.0);
}
`;
var PostProcessor = class {
  _gl;
  _shader;
  _quadGeometry;
  bloomIntensity = 0.5;
  vignetteIntensity = 0.8;
  chromaticAberration = 0.2;
  scanlineIntensity = 0.3;
  constructor(gl) {
    this._gl = gl;
    this._shader = new Shader(gl, POST_VERTEX_SRC, POST_FRAGMENT_SRC);
    this._quadGeometry = new BufferGeometry(gl);
    const quadVertices = new Float32Array([
      // pos: x, y,  uv: u, v
      -1,
      -1,
      0,
      0,
      1,
      -1,
      1,
      0,
      1,
      1,
      1,
      1,
      -1,
      1,
      0,
      1
    ]);
    const quadIndices = new Uint16Array([0, 1, 2, 2, 3, 0]);
    this._quadGeometry.setVertices(quadVertices);
    this._quadGeometry.setIndices(quadIndices);
    this._quadGeometry.setAttributes([
      { location: 0, size: 2, type: gl.FLOAT, normalized: false, stride: 16, offset: 0 },
      { location: 1, size: 2, type: gl.FLOAT, normalized: false, stride: 16, offset: 8 }
    ]);
  }
  render(screenTexture, time) {
    const gl = this._gl;
    this._shader.bind();
    this._shader.setFloat("u_time", time);
    this._shader.setFloat("u_bloomIntensity", this.bloomIntensity);
    this._shader.setFloat("u_vignetteIntensity", this.vignetteIntensity);
    this._shader.setFloat("u_chromaticAberration", this.chromaticAberration);
    this._shader.setFloat("u_scanlineIntensity", this.scanlineIntensity);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, screenTexture);
    this._shader.setInt("u_screenTexture", 0);
    this._quadGeometry.bind();
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    this._quadGeometry.unbind();
  }
  dispose() {
    this._quadGeometry.dispose();
    this._shader.dispose();
  }
};

// src/renderer/Canvas2DFallback.ts
var Canvas2DFallback = class {
  ctx;
  canvas;
  width = 0;
  height = 0;
  constructor(canvas) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas 2D context is unavailable");
    }
    this.ctx = ctx;
    this.resize();
  }
  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(this.canvas.clientWidth * dpr);
    this.canvas.height = Math.floor(this.canvas.clientHeight * dpr);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }
  clear(color = "#0b0e14") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
  beginCamera(camera) {
    this.ctx.save();
    const hw = this.width * 0.5;
    const hh = this.height * 0.5;
    this.ctx.translate(hw, hh);
    this.ctx.scale(camera.zoom, camera.zoom);
    this.ctx.rotate(-camera.rotation);
    this.ctx.translate(-camera.position.x, -camera.position.y);
  }
  endCamera() {
    this.ctx.restore();
  }
  drawRect(pos, size, color, rotation = 0) {
    this.ctx.save();
    this.ctx.translate(pos.x, pos.y);
    this.ctx.rotate(rotation);
    this.ctx.fillStyle = color.toRGBA();
    this.ctx.fillRect(-size.x * 0.5, -size.y * 0.5, size.x, size.y);
    this.ctx.restore();
  }
  drawCircle(pos, radius, color) {
    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = color.toRGBA();
    this.ctx.fill();
  }
};

// src/particles/ColorRamp.ts
var ColorRamp = class {
  stops;
  constructor(stops = []) {
    if (stops.length === 0) {
      this.stops = [
        { position: 0, color: new Color(1, 1, 1, 1) },
        { position: 1, color: new Color(1, 1, 1, 0) }
      ];
    } else {
      this.stops = [...stops].sort((a, b) => a.position - b.position);
    }
  }
  evaluate(t, out = new Color()) {
    const clampedT = MathUtils.clamp01(t);
    if (clampedT <= this.stops[0].position) {
      return out.copy(this.stops[0].color);
    }
    if (clampedT >= this.stops[this.stops.length - 1].position) {
      return out.copy(this.stops[this.stops.length - 1].color);
    }
    for (let i = 0; i < this.stops.length - 1; i++) {
      const s0 = this.stops[i];
      const s1 = this.stops[i + 1];
      if (clampedT >= s0.position && clampedT <= s1.position) {
        const span = s1.position - s0.position;
        const localT = span > 0 ? (clampedT - s0.position) / span : 0;
        return out.copy(s0.color).lerpSelf(s1.color, localT);
      }
    }
    return out.copy(this.stops[0].color);
  }
};

// src/particles/BurstController.ts
var BurstController = class {
  bursts = [];
  _currentTime = 0;
  constructor(bursts = []) {
    this.bursts = bursts.map((b) => ({ ...b, cyclesRemaining: b.cyclesRemaining ?? 1 }));
  }
  update(dt, emitCallback) {
    const prevTime = this._currentTime;
    this._currentTime += dt;
    for (let i = 0; i < this.bursts.length; i++) {
      const burst = this.bursts[i];
      if (burst.cyclesRemaining === void 0 || burst.cyclesRemaining <= 0) continue;
      if (prevTime < burst.time && this._currentTime >= burst.time) {
        emitCallback(burst.count);
        burst.cyclesRemaining--;
        if (burst.repeatInterval && burst.cyclesRemaining > 0) {
          burst.time += burst.repeatInterval;
        }
      }
    }
  }
  reset() {
    this._currentTime = 0;
  }
};

// src/particles/ParticleEmitter.ts
var EmitterShape = {
  Point: 0,
  Circle: 1,
  Cone: 2,
  Box: 3
};
var ParticleEmitter = class {
  isEmitting = true;
  duration = 0;
  // 0 = infinite loop
  emissionRate = 50;
  // particles per second
  shape = EmitterShape.Circle;
  shapeRadius = 8;
  coneAngle = Math.PI * 0.25;
  // Particle properties
  minLifetime = 0.5;
  maxLifetime = 1.5;
  minSpeed = 50;
  maxSpeed = 150;
  minSize = 4;
  maxSize = 12;
  endSize = 0;
  gravity = new Vector2(0, 0);
  colorRamp;
  burstController;
  blendMode = "additive";
  _emissionTimer = 0;
  _age = 0;
  constructor(options = {}) {
    this.emissionRate = options.emissionRate ?? 50;
    this.shape = options.shape ?? EmitterShape.Circle;
    this.shapeRadius = options.shapeRadius ?? 8;
    this.minLifetime = options.lifetime ? options.lifetime[0] : 0.5;
    this.maxLifetime = options.lifetime ? options.lifetime[1] : 1.5;
    this.minSpeed = options.speed ? options.speed[0] : 50;
    this.maxSpeed = options.speed ? options.speed[1] : 150;
    this.minSize = options.size ? options.size[0] : 4;
    this.maxSize = options.size ? options.size[1] : 12;
    this.colorRamp = options.colorRamp ?? new ColorRamp([
      { position: 0, color: new Color(1, 0.8, 0.2, 1) },
      { position: 0.5, color: new Color(1, 0.3, 0.1, 0.8) },
      { position: 1, color: new Color(0.2, 0.1, 0.1, 0) }
    ]);
    this.burstController = new BurstController();
    this.blendMode = options.blendMode ?? "additive";
  }
  update(dt, onSpawn) {
    this._age += dt;
    this.burstController.update(dt, onSpawn);
    if (!this.isEmitting) return;
    if (this.duration > 0 && this._age >= this.duration) {
      this.isEmitting = false;
      return;
    }
    this._emissionTimer += dt;
    const interval = 1 / this.emissionRate;
    let spawnCount = 0;
    while (this._emissionTimer >= interval) {
      spawnCount++;
      this._emissionTimer -= interval;
    }
    if (spawnCount > 0) {
      onSpawn(spawnCount);
    }
  }
};

// src/renderer/Lighting2D.ts
var LightType = {
  Point: 0,
  Spot: 1,
  Directional: 2
};
var Light2D = class {
  type;
  color;
  intensity;
  radius;
  innerRadius;
  // Spot light properties
  direction;
  spotAngle;
  // in radians
  // Shadows
  castShadows;
  shadowSoftness;
  // Dynamic animation
  isFlickering;
  flickerSpeed;
  flickerIntensity;
  _flickerTime = 0;
  constructor(options = {}) {
    this.type = options.type ?? LightType.Point;
    this.color = options.color ? options.color.clone() : new Color(1, 0.9, 0.7, 1);
    this.intensity = options.intensity ?? 1;
    this.radius = options.radius ?? 250;
    this.innerRadius = options.innerRadius ?? 0;
    this.direction = options.direction ? options.direction.clone() : new Vector2(0, 1);
    this.spotAngle = options.spotAngle ?? Math.PI * 0.25;
    this.castShadows = options.castShadows ?? true;
    this.shadowSoftness = 0.5;
    this.isFlickering = options.flickering ?? false;
    this.flickerSpeed = 10;
    this.flickerIntensity = 0.15;
  }
  getEffectiveIntensity(dt = 0) {
    if (!this.isFlickering) return this.intensity;
    this._flickerTime += dt * this.flickerSpeed;
    const noise = Math.sin(this._flickerTime) * Math.cos(this._flickerTime * 2.3);
    return Math.max(0, this.intensity + noise * this.flickerIntensity);
  }
};

// src/gameplay/Attributes.ts
var Attributes = class {
  // Primary Attributes
  strength = 10;
  agility = 10;
  intelligence = 10;
  vitality = 10;
  // Resource Pools
  maxHealth = 100;
  currentHealth = 100;
  healthRegen = 1;
  // HP/sec
  maxMana = 50;
  currentMana = 50;
  manaRegen = 2;
  // MP/sec
  maxStamina = 100;
  currentStamina = 100;
  staminaRegen = 15;
  // SP/sec
  // Defensive Stats
  armor = 0;
  fireResistance = 0;
  // % reduction (0-75)
  coldResistance = 0;
  lightningResistance = 0;
  voidResistance = 0;
  // Offensive Stats
  attackPower = 10;
  spellPower = 10;
  attackSpeed = 1;
  // attacks/sec
  critChance = 0.05;
  // 5% base
  critMultiplier = 1.5;
  // 150% damage
  lifeSteal = 0;
  // % of damage dealt
  // Movement
  moveSpeed = 160;
  // px/sec
  isDead = false;
  constructor(options = {}) {
    Object.assign(this, options);
    this.recalculateDerivedStats();
    this.currentHealth = this.maxHealth;
    this.currentMana = this.maxMana;
    this.currentStamina = this.maxStamina;
  }
  recalculateDerivedStats() {
    this.maxHealth = 50 + this.vitality * 10;
    this.maxMana = 20 + this.intelligence * 8;
    this.attackPower = this.strength * 2 + this.agility;
    this.spellPower = this.intelligence * 2.5;
    this.critChance = Math.min(0.75, 0.05 + this.agility * 2e-3);
  }
  updateRegen(dt) {
    if (this.isDead) return;
    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + this.healthRegen * dt);
    this.currentMana = Math.min(this.maxMana, this.currentMana + this.manaRegen * dt);
    this.currentStamina = Math.min(this.maxStamina, this.currentStamina + this.staminaRegen * dt);
  }
};

// src/gameplay/DamageCalculator.ts
var DamageType = {
  Physical: 0,
  Fire: 1,
  Cold: 2,
  Lightning: 3,
  Void: 4
};
var DamageCalculator = class {
  static calculate(pkg, defender) {
    let rawDamage = pkg.baseAmount;
    if (pkg.attackerStats) {
      if (pkg.type === DamageType.Physical) {
        rawDamage += pkg.attackerStats.attackPower * 0.5;
      } else {
        rawDamage += pkg.attackerStats.spellPower * 0.5;
      }
    }
    let isCritical = false;
    if (pkg.canCrit !== false && pkg.attackerStats) {
      if (Math.random() < pkg.attackerStats.critChance) {
        isCritical = true;
        rawDamage *= pkg.attackerStats.critMultiplier;
      }
    }
    let mitigationPercent = 0;
    if (pkg.type === DamageType.Physical) {
      mitigationPercent = defender.armor / (defender.armor + 200);
    } else if (pkg.type === DamageType.Fire) {
      mitigationPercent = defender.fireResistance / 100;
    } else if (pkg.type === DamageType.Cold) {
      mitigationPercent = defender.coldResistance / 100;
    } else if (pkg.type === DamageType.Lightning) {
      mitigationPercent = defender.lightningResistance / 100;
    } else if (pkg.type === DamageType.Void) {
      mitigationPercent = defender.voidResistance / 100;
    }
    mitigationPercent = Math.min(0.75, Math.max(0, mitigationPercent));
    const finalDamage = Math.max(1, rawDamage * (1 - mitigationPercent));
    const mitigatedAmount = rawDamage - finalDamage;
    return {
      finalDamage,
      isCritical,
      mitigatedAmount,
      type: pkg.type
    };
  }
};

// src/gameplay/SkillDefinitions.ts
var SKILL_FIREBALL = {
  id: "fireball",
  name: "Aetherial Fireball",
  description: "Hurls a fiery orb that explodes on impact dealing Fire damage.",
  manaCost: 15,
  cooldown: 0.5,
  damageType: DamageType.Fire,
  baseDamage: 40,
  range: 500,
  radius: 40,
  projectileSpeed: 450,
  iconIndex: 0
};
var SKILL_FROST_NOVA = {
  id: "frost_nova",
  name: "Frost Nova",
  description: "Emits a freezing blast around the caster freezing nearby foes.",
  manaCost: 25,
  cooldown: 4,
  damageType: DamageType.Cold,
  baseDamage: 30,
  range: 0,
  radius: 120,
  iconIndex: 1
};
var SKILL_LIGHTNING_CHAIN = {
  id: "lightning_chain",
  name: "Chain Lightning",
  description: "Discharges an electric bolt bouncing across up to 4 enemies.",
  manaCost: 20,
  cooldown: 1.2,
  damageType: DamageType.Lightning,
  baseDamage: 35,
  range: 400,
  iconIndex: 2
};
var SKILL_WHIRLWIND = {
  id: "whirlwind",
  name: "Whirlwind",
  description: "Spins weapon dealing continuous physical damage to all adjacent enemies.",
  manaCost: 10,
  cooldown: 0.1,
  damageType: DamageType.Physical,
  baseDamage: 25,
  range: 0,
  radius: 60,
  iconIndex: 3
};

// src/audio/AudioContextManager.ts
var MockAudioParam = class {
  value = 1;
  setValueAtTime() {
  }
  linearRampToValueAtTime() {
  }
  exponentialRampToValueAtTime() {
  }
  cancelScheduledValues() {
  }
};
var MockGainNode = class {
  gain = new MockAudioParam();
  connect() {
  }
  disconnect() {
  }
};
var MockAudioContext = class {
  state = "running";
  currentTime = 0;
  sampleRate = 44100;
  destination = {};
  createGain() {
    return new MockGainNode();
  }
  createOscillator() {
    return {
      type: "sine",
      frequency: new MockAudioParam(),
      connect() {
      },
      disconnect() {
      },
      start() {
      },
      stop() {
      },
      onended: null
    };
  }
  createBuffer(channels, length, sampleRate) {
    return {
      getChannelData: () => new Float32Array(length)
    };
  }
  createBufferSource() {
    return {
      buffer: null,
      connect() {
      },
      disconnect() {
      },
      start() {
      },
      stop() {
      },
      onended: null
    };
  }
  createBiquadFilter() {
    return {
      type: "lowpass",
      frequency: new MockAudioParam(),
      Q: new MockAudioParam(),
      connect() {
      },
      disconnect() {
      }
    };
  }
  async resume() {
  }
};
var AudioContextManager = class _AudioContextManager {
  static _instance;
  ctx;
  masterGain;
  musicGain;
  sfxGain;
  isUnlocked = false;
  constructor() {
    const hasWindow = typeof window !== "undefined";
    const AudioCtx = hasWindow ? window.AudioContext || window.webkitAudioContext : MockAudioContext;
    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.musicGain = this.ctx.createGain();
    this.sfxGain = this.ctx.createGain();
    this.musicGain.connect(this.masterGain);
    this.sfxGain.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
    this.setMasterVolume(0.8);
    this.setMusicVolume(0.6);
    this.setSFXVolume(0.9);
    if (hasWindow) {
      this._setupUnlockListener();
    } else {
      this.isUnlocked = true;
    }
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _AudioContextManager();
    }
    return this._instance;
  }
  setMasterVolume(val) {
    this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
  }
  setMusicVolume(val) {
    this.musicGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
  }
  setSFXVolume(val) {
    this.sfxGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
  }
  unlock() {
    if (this.ctx.state === "suspended") {
      this.ctx.resume().then(() => {
        this.isUnlocked = true;
      });
    } else {
      this.isUnlocked = true;
    }
  }
  _setupUnlockListener() {
    const unlockHandler = () => {
      this.unlock();
      window.removeEventListener("click", unlockHandler);
      window.removeEventListener("keydown", unlockHandler);
      window.removeEventListener("touchstart", unlockHandler);
    };
    window.addEventListener("click", unlockHandler, { once: true });
    window.addEventListener("keydown", unlockHandler, { once: true });
    window.addEventListener("touchstart", unlockHandler, { once: true });
  }
};

// src/audio/ADSRGainEnvelope.ts
var ADSREnvelope = class {
  attack;
  decay;
  sustain;
  release;
  peakLevel;
  constructor(config) {
    this.attack = Math.max(1e-3, config.attack);
    this.decay = Math.max(1e-3, config.decay);
    this.sustain = Math.max(0, Math.min(1, config.sustain));
    this.release = Math.max(1e-3, config.release);
    this.peakLevel = config.peakLevel ?? 1;
  }
  applyTo(param, startTime, duration) {
    const p = param;
    const peak = this.peakLevel;
    const susLevel = peak * this.sustain;
    p.cancelScheduledValues(startTime);
    p.setValueAtTime(1e-4, startTime);
    const attackEnd = startTime + this.attack;
    p.exponentialRampToValueAtTime(peak, attackEnd);
    const decayEnd = attackEnd + this.decay;
    p.exponentialRampToValueAtTime(Math.max(1e-4, susLevel), decayEnd);
    if (duration !== void 0) {
      const releaseStart = Math.max(decayEnd, startTime + duration);
      p.setValueAtTime(Math.max(1e-4, susLevel), releaseStart);
      const releaseEnd = releaseStart + this.release;
      p.exponentialRampToValueAtTime(1e-4, releaseEnd);
      return releaseEnd;
    }
    return decayEnd;
  }
};

// src/audio/FilterGraph.ts
var FilterGraph = class {
  filterNode;
  _ctx;
  constructor(ctx, type = "lowpass", cutoff = 2e3, q = 1) {
    this._ctx = ctx;
    this.filterNode = ctx.createBiquadFilter();
    this.filterNode.type = type;
    this.filterNode.frequency.setValueAtTime(cutoff, ctx.currentTime);
    this.filterNode.Q.setValueAtTime(q, ctx.currentTime);
  }
  setCutoff(freq, rampTime = 0.05) {
    const t = this._ctx.currentTime;
    this.filterNode.frequency.cancelScheduledValues(t);
    this.filterNode.frequency.exponentialRampToValueAtTime(Math.max(20, Math.min(2e4, freq)), t + rampTime);
  }
  setResonance(q) {
    this.filterNode.Q.setValueAtTime(Math.max(0.1, q), this._ctx.currentTime);
  }
  sweep(startFreq, endFreq, duration) {
    const t = this._ctx.currentTime;
    this.filterNode.frequency.setValueAtTime(Math.max(20, startFreq), t);
    this.filterNode.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t + duration);
  }
};

// src/audio/ProceduralSynth.ts
var ProceduralSynth = class {
  _manager;
  constructor() {
    this._manager = AudioContextManager.getInstance();
  }
  playTone(frequency, duration = 0.2, type = "sine", envelope = new ADSREnvelope({ attack: 0.01, decay: 0.05, sustain: 0.6, release: 0.1 }), destination = this._manager.sfxGain) {
    const ctx = this._manager.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    const endTime = envelope.applyTo(gain.gain, ctx.currentTime, duration);
    osc.connect(gain);
    gain.connect(destination);
    osc.start(ctx.currentTime);
    osc.stop(endTime);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }
  playNoise(duration = 0.3, filterCutoff = 1200, envelope = new ADSREnvelope({ attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.1 }), destination = this._manager.sfxGain) {
    const ctx = this._manager.ctx;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    const filter = new FilterGraph(ctx, "lowpass", filterCutoff);
    const gain = ctx.createGain();
    const endTime = envelope.applyTo(gain.gain, ctx.currentTime, duration);
    noiseSource.connect(filter.filterNode);
    filter.filterNode.connect(gain);
    gain.connect(destination);
    noiseSource.start(ctx.currentTime);
    noiseSource.stop(endTime);
    noiseSource.onended = () => {
      noiseSource.disconnect();
      filter.filterNode.disconnect();
      gain.disconnect();
    };
  }
};

// src/audio/SoundFXGenerator.ts
var SoundFXGenerator = class {
  static _synth = new ProceduralSynth();
  static playLaser() {
    const manager = AudioContextManager.getInstance();
    const ctx = manager.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(1e-4, now + 0.15);
    osc.connect(gain);
    gain.connect(manager.sfxGain);
    osc.start(now);
    osc.stop(now + 0.15);
  }
  static playExplosion() {
    this._synth.playNoise(
      0.6,
      400,
      new ADSREnvelope({ attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.3, peakLevel: 1 })
    );
  }
  static playCoinPickup() {
    const manager = AudioContextManager.getInstance();
    const ctx = manager.ctx;
    const now = ctx.currentTime;
    this._synth.playTone(987.77, 0.08, "sine", new ADSREnvelope({ attack: 5e-3, decay: 0.04, sustain: 0.2, release: 0.02 }));
    setTimeout(() => {
      this._synth.playTone(1318.51, 0.15, "sine", new ADSREnvelope({ attack: 5e-3, decay: 0.05, sustain: 0.3, release: 0.05 }));
    }, 70);
  }
  static playSwordSwing() {
    const manager = AudioContextManager.getInstance();
    const ctx = manager.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = new FilterGraph(ctx, "bandpass", 1500, 3);
    osc.type = "triangle";
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.12);
    osc.connect(filter.filterNode);
    filter.filterNode.connect(gain);
    gain.connect(manager.sfxGain);
    osc.start(now);
    osc.stop(now + 0.12);
  }
  static playHitImpact() {
    const manager = AudioContextManager.getInstance();
    const ctx = manager.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.1);
    osc.connect(gain);
    gain.connect(manager.sfxGain);
    osc.start(now);
    osc.stop(now + 0.1);
  }
  static playLevelUp() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this._synth.playTone(freq, 0.12, "square", new ADSREnvelope({ attack: 0.01, decay: 0.06, sustain: 0.3, release: 0.05 }));
      }, idx * 90);
    });
  }
};

// src/gameplay/SkillManager.ts
var SkillManager = class {
  slots = [
    { slotIndex: 0, skill: SKILL_FIREBALL, currentCooldown: 0 },
    { slotIndex: 1, skill: SKILL_FROST_NOVA, currentCooldown: 0 },
    { slotIndex: 2, skill: SKILL_LIGHTNING_CHAIN, currentCooldown: 0 },
    { slotIndex: 3, skill: SKILL_WHIRLWIND, currentCooldown: 0 }
  ];
  update(dt) {
    for (let i = 0; i < this.slots.length; i++) {
      const s = this.slots[i];
      if (s && s.currentCooldown > 0) {
        s.currentCooldown = Math.max(0, s.currentCooldown - dt);
      }
    }
  }
  canCast(slotIndex, attributes) {
    const s = this.slots[slotIndex];
    if (!s) return false;
    return s.currentCooldown <= 0 && attributes.currentMana >= s.skill.manaCost;
  }
  cast(slotIndex, attributes, casterPos, aimPos) {
    if (!this.canCast(slotIndex, attributes)) return null;
    const s = this.slots[slotIndex];
    attributes.currentMana -= s.skill.manaCost;
    s.currentCooldown = s.skill.cooldown;
    SoundFXGenerator.playLaser();
    return s.skill;
  }
};

// src/gameplay/ProjectileSystem.ts
var Projectile = class {
  velocity;
  maxDistance;
  traveledDistance = 0;
  hitRadius;
  damagePackage;
  ownerEntityId;
  pierceCount = 0;
  constructor(options) {
    this.velocity = options.velocity.clone();
    this.maxDistance = options.maxDistance ?? 600;
    this.hitRadius = options.hitRadius ?? 16;
    this.damagePackage = options.damagePackage;
    this.ownerEntityId = options.ownerEntityId;
    this.pierceCount = options.pierceCount ?? 0;
  }
};
var ProjectileSystem = class extends System {
  phase = SystemPhase.Update;
  priority = 80;
  update(dt) {
    const combatSystem = this.world.systemScheduler;
    const projQuery = this.world.createQuery({ all: [Transform2D, Projectile] });
    const targetQuery = this.world.createQuery({ all: [Transform2D, Attributes] });
    projQuery.forEach((projId, transform, proj) => {
      const step = proj.velocity.scale(dt);
      transform.position.addSelf(step);
      proj.traveledDistance += step.length();
      if (proj.traveledDistance >= proj.maxDistance) {
        this.commands.destroyEntity(projId);
        return;
      }
      targetQuery.forEach((targetId, targetTrans, targetAttrs) => {
        if (targetId === proj.ownerEntityId || targetAttrs.isDead) return;
        const distSq = transform.position.distanceToSquared(targetTrans.position);
        if (distSq <= proj.hitRadius * proj.hitRadius) {
          const combat = this.world.systemScheduler;
          targetAttrs.currentHealth = Math.max(0, targetAttrs.currentHealth - proj.damagePackage.baseAmount);
          if (proj.pierceCount <= 0) {
            this.commands.destroyEntity(projId);
          } else {
            proj.pierceCount--;
          }
        }
      }, [Transform2D, Attributes]);
    }, [Transform2D, Projectile]);
  }
};

// src/gameplay/PlayerController.ts
var PlayerInput = class {
  moveDir = new Vector2();
  mouseWorldPos = new Vector2();
  isAttackPressed = false;
  isSkill1Pressed = false;
  isSkill2Pressed = false;
  isRollPressed = false;
  isRolling = false;
  rollTimer = 0;
  rollDuration = 0.25;
  rollSpeed = 350;
  rollDirection = new Vector2();
};
var PlayerControllerSystem = class extends System {
  phase = SystemPhase.PreUpdate;
  priority = 100;
  _keysDown = /* @__PURE__ */ new Set();
  onInit() {
    window.addEventListener("keydown", (e) => this._keysDown.add(e.key.toLowerCase()));
    window.addEventListener("keyup", (e) => this._keysDown.delete(e.key.toLowerCase()));
  }
  update(dt) {
    const query = this.world.createQuery({ all: [Transform2D, RigidBody2D, Attributes, PlayerInput] });
    query.forEach((id, transform, body, attrs, input) => {
      if (attrs.isDead) return;
      let dx = 0;
      let dy = 0;
      if (this._keysDown.has("w") || this._keysDown.has("arrowup")) dy -= 1;
      if (this._keysDown.has("s") || this._keysDown.has("arrowdown")) dy += 1;
      if (this._keysDown.has("a") || this._keysDown.has("arrowleft")) dx -= 1;
      if (this._keysDown.has("d") || this._keysDown.has("arrowright")) dx += 1;
      input.moveDir.set(dx, dy).normalizeSelf();
      if (this._keysDown.has(" ") && !input.isRolling && attrs.currentStamina >= 25 && input.moveDir.lengthSquared() > 0) {
        input.isRolling = true;
        input.rollTimer = input.rollDuration;
        input.rollDirection.copy(input.moveDir);
        attrs.currentStamina -= 25;
      }
      if (input.isRolling) {
        input.rollTimer -= dt;
        body.velocity.copy(input.rollDirection.scale(input.rollSpeed));
        if (input.rollTimer <= 0) {
          input.isRolling = false;
        }
      } else {
        body.velocity.copy(input.moveDir.scale(attrs.moveSpeed));
      }
      const aimDir = input.mouseWorldPos.subtract(transform.position);
      if (aimDir.lengthSquared() > 0) {
        transform.rotation = aimDir.angle();
      }
      const skillMgr = this.world.getComponent(id, SkillManager);
      if (skillMgr) {
        skillMgr.update(dt);
        if (this._keysDown.has("1") || this._keysDown.has("q")) {
          const castedSkill = skillMgr.cast(0, attrs, transform.position, input.mouseWorldPos);
          if (castedSkill) {
            const projDir = aimDir.normalize();
            this.commands.createEntity((projEntityId) => {
              const projTrans = new Transform2D(transform.position.x, transform.position.y);
              const proj = new Projectile({
                velocity: projDir.scale(castedSkill.projectileSpeed || 400),
                hitRadius: 20,
                damagePackage: {
                  baseAmount: castedSkill.baseDamage,
                  type: castedSkill.damageType,
                  attackerStats: attrs
                },
                ownerEntityId: id
              });
              this.commands.addComponent(projEntityId, projTrans);
              this.commands.addComponent(projEntityId, proj);
            });
          }
        }
      }
    }, [Transform2D, RigidBody2D, Attributes, PlayerInput]);
  }
};

// src/ai/SteeringBehaviors.ts
var SteeringBehaviors = class {
  static seek(position, velocity, target, maxSpeed, maxForce) {
    const desired = target.subtract(position).normalize().scale(maxSpeed);
    const steer = desired.subtract(velocity);
    return steer.clampLength(0, maxForce);
  }
  static flee(position, velocity, target, maxSpeed, maxForce) {
    const desired = position.subtract(target).normalize().scale(maxSpeed);
    const steer = desired.subtract(velocity);
    return steer.clampLength(0, maxForce);
  }
  static arrive(position, velocity, target, maxSpeed, maxForce, slowingRadius = 100) {
    const offset = target.subtract(position);
    const distance = offset.length();
    if (distance === 0) return new Vector2(0, 0);
    const rampedSpeed = maxSpeed * (distance / slowingRadius);
    const clippedSpeed = Math.min(rampedSpeed, maxSpeed);
    const desired = offset.scale(clippedSpeed / distance);
    const steer = desired.subtract(velocity);
    return steer.clampLength(0, maxForce);
  }
  static wander(velocity, circleDistance = 50, circleRadius = 30, wanderAngle = 0, angleChange = 0.5, maxForce = 50) {
    const circleCenter = velocity.lengthSquared() > 0 ? velocity.clone().normalize().scale(circleDistance) : new Vector2(circleDistance, 0);
    const newAngle = wanderAngle + (Math.random() * 2 - 1) * angleChange;
    const displacement = new Vector2(Math.cos(newAngle) * circleRadius, Math.sin(newAngle) * circleRadius);
    const force = circleCenter.add(displacement).clampLength(0, maxForce);
    return { force, newAngle };
  }
  static separation(position, neighbors, separationRadius = 40, maxForce = 100) {
    let steer = new Vector2();
    let count = 0;
    for (let i = 0; i < neighbors.length; i++) {
      const other = neighbors[i];
      const d = position.distanceTo(other);
      if (d > 0 && d < separationRadius) {
        const diff = position.subtract(other).normalize().scale(1 / d);
        steer.addSelf(diff);
        count++;
      }
    }
    if (count > 0) {
      steer.scaleSelf(1 / count);
      steer.clampLength(0, maxForce);
    }
    return steer;
  }
};

// src/ai/ThreatMatrix.ts
var ThreatMatrix = class {
  _threatTable = /* @__PURE__ */ new Map();
  threatDecayRate = 5;
  // Threat points lost per second
  switchTargetThreshold = 1.1;
  // Must exceed current target by 10% to switch
  addThreat(entityId, amount) {
    let entry = this._threatTable.get(entityId);
    if (!entry) {
      entry = { entityId, threatValue: 0, lastDamageTime: performance.now() };
      this._threatTable.set(entityId, entry);
    }
    entry.threatValue += amount;
    entry.lastDamageTime = performance.now();
  }
  getPrimaryTarget() {
    let highestThreat = -Infinity;
    let primaryTarget = null;
    for (const entry of this._threatTable.values()) {
      if (entry.threatValue > highestThreat && entry.threatValue > 0) {
        highestThreat = entry.threatValue;
        primaryTarget = entry.entityId;
      }
    }
    return primaryTarget;
  }
  update(dt) {
    for (const [entityId, entry] of this._threatTable.entries()) {
      entry.threatValue = Math.max(0, entry.threatValue - this.threatDecayRate * dt);
      if (entry.threatValue === 0) {
        this._threatTable.delete(entityId);
      }
    }
  }
  clear() {
    this._threatTable.clear();
  }
};

// src/gameplay/EnemyAIController.ts
var MonsterState = {
  Idle: 0,
  Patrol: 1,
  Chase: 2,
  Attack: 3
};
var EnemyAI = class {
  state = MonsterState.Idle;
  aggroRadius = 250;
  attackRadius = 40;
  attackCooldown = 1;
  attackTimer = 0;
  wanderAngle = 0;
  threatMatrix = new ThreatMatrix();
};
var EnemyAISystem = class extends System {
  phase = SystemPhase.Update;
  priority = 90;
  update(dt) {
    const playerQuery = this.world.createQuery({ all: [Transform2D, PlayerInput] });
    let playerPos = null;
    let playerId = null;
    playerQuery.forEach((id, pTrans) => {
      playerPos = pTrans.position;
      playerId = id;
    }, [Transform2D, PlayerInput]);
    const enemyQuery = this.world.createQuery({ all: [Transform2D, RigidBody2D, Attributes, EnemyAI] });
    enemyQuery.forEach((eId, transform, body, attrs, ai) => {
      if (attrs.isDead) return;
      ai.attackTimer = Math.max(0, ai.attackTimer - dt);
      if (!playerPos) return;
      const distToPlayer = transform.position.distanceTo(playerPos);
      if (distToPlayer <= ai.attackRadius) {
        ai.state = MonsterState.Attack;
      } else if (distToPlayer <= ai.aggroRadius) {
        ai.state = MonsterState.Chase;
      } else {
        ai.state = MonsterState.Patrol;
      }
      switch (ai.state) {
        case MonsterState.Chase: {
          const steerForce = SteeringBehaviors.seek(
            transform.position,
            body.velocity,
            playerPos,
            attrs.moveSpeed * 0.8,
            200
          );
          body.applyForce(steerForce);
          transform.rotation = playerPos.subtract(transform.position).angle();
          break;
        }
        case MonsterState.Attack: {
          body.velocity.set(0, 0);
          if (ai.attackTimer <= 0 && playerId !== null) {
            ai.attackTimer = ai.attackCooldown;
            const playerAttrs = this.world.getComponent(playerId, Attributes);
            if (playerAttrs) {
              playerAttrs.currentHealth = Math.max(0, playerAttrs.currentHealth - attrs.attackPower);
            }
          }
          break;
        }
        case MonsterState.Patrol: {
          const { force, newAngle } = SteeringBehaviors.wander(
            body.velocity,
            40,
            20,
            ai.wanderAngle,
            0.5,
            60
          );
          ai.wanderAngle = newAngle;
          body.applyForce(force);
          break;
        }
      }
    }, [Transform2D, RigidBody2D, Attributes, EnemyAI]);
  }
};

// src/gameplay/InventorySystem.ts
var Inventory = class {
  capacity;
  items;
  gold = 0;
  constructor(capacity = 24) {
    this.capacity = capacity;
    this.items = new Array(capacity).fill(null);
  }
  addItem(item) {
    const emptyIdx = this.items.indexOf(null);
    if (emptyIdx === -1) return false;
    this.items[emptyIdx] = item;
    return true;
  }
  removeItemAt(index) {
    if (index < 0 || index >= this.items.length) return null;
    const item = this.items[index];
    this.items[index] = null;
    return item;
  }
  swapSlots(indexA, indexB) {
    if (indexA < 0 || indexA >= this.items.length || indexB < 0 || indexB >= this.items.length) return;
    const temp = this.items[indexA];
    this.items[indexA] = this.items[indexB];
    this.items[indexB] = temp;
  }
};

// src/gameplay/LootDropSystem.ts
var LootDrop = class {
  item;
  pickupRadius = 40;
  magnetRadius = 140;
  magnetSpeed = 250;
  constructor(item) {
    this.item = item;
  }
};
var LootDropSystem = class extends System {
  phase = SystemPhase.Update;
  priority = 70;
  update(dt) {
    const playerQuery = this.world.createQuery({ all: [Transform2D, PlayerInput, Inventory] });
    let playerPos = null;
    let playerInv = null;
    playerQuery.forEach((id, pTrans, pInput, inv) => {
      playerPos = pTrans.position;
      playerInv = inv;
    }, [Transform2D, PlayerInput, Inventory]);
    if (!playerPos || !playerInv) return;
    const lootQuery = this.world.createQuery({ all: [Transform2D, LootDrop] });
    lootQuery.forEach((lootId, transform, loot) => {
      const dist = transform.position.distanceTo(playerPos);
      if (dist <= loot.magnetRadius && dist > loot.pickupRadius) {
        const pullDir = playerPos.subtract(transform.position).normalize();
        transform.position.addSelf(pullDir.scale(loot.magnetSpeed * dt));
      }
      if (dist <= loot.pickupRadius) {
        if (playerInv.addItem(loot.item)) {
          SoundFXGenerator.playCoinPickup();
          this.commands.destroyEntity(lootId);
        }
      }
    }, [Transform2D, LootDrop]);
  }
};

// src/renderer/RenderPipeline.ts
var RenderPipeline = class extends System {
  phase = SystemPhase.Render;
  priority = 100;
  canvas;
  camera;
  tilemap;
  fallback2D;
  batch;
  context;
  postProcessor;
  isWebGL = false;
  _time = 0;
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.fallback2D = new Canvas2DFallback(canvas);
    this.camera = new Camera2D(canvas.width || 800, canvas.height || 600);
    this.tilemap = new TilemapRenderer(80, 80, 32, 32);
    try {
      this.context = new WebGLContext(canvas);
      this.batch = new SpriteBatchRenderer(this.context.gl);
      this.postProcessor = new PostProcessor(this.context.gl);
      this.isWebGL = true;
    } catch (e) {
      console.warn("WebGL2 hardware context unavailable, using optimized Canvas2D rendering pipeline.", e);
      this.isWebGL = false;
    }
  }
  update(dt) {
    this._time += dt;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = Math.floor(window.innerWidth * dpr);
    const displayHeight = Math.floor(window.innerHeight * dpr);
    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
    }
    this.camera.viewportWidth = this.canvas.width;
    this.camera.viewportHeight = this.canvas.height;
    this.camera.update(dt);
    const ctx = this.fallback2D.ctx;
    this.fallback2D.resize();
    this.fallback2D.clear("#0b0e14");
    this.fallback2D.beginCamera(this.camera);
    this._renderTilemap2D(ctx);
    this._renderLights2D(ctx);
    this._renderLoot2D(ctx);
    this._renderEnemies2D(ctx);
    this._renderPlayer2D(ctx);
    this._renderProjectiles2D(ctx);
    this._renderParticles2D(ctx);
    this.fallback2D.endCamera();
  }
  _renderTilemap2D(ctx) {
    const layer = this.tilemap.getLayer(0);
    if (!layer) return;
    for (let y = 0; y < layer.height; y++) {
      for (let x = 0; x < layer.width; x++) {
        const tile = layer.data[y * layer.width + x];
        const wx = x * 32;
        const wy = y * 32;
        if (tile === 1 || tile === 16) {
          ctx.fillStyle = "#1e293b";
          ctx.fillRect(wx, wy, 32, 32);
          ctx.strokeStyle = "#334155";
          ctx.lineWidth = 1;
          ctx.strokeRect(wx, wy, 32, 32);
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(wx + 4, wy + 4, 24, 24);
        } else if (tile === 0) {
          ctx.fillStyle = (x + y) % 2 === 0 ? "#161e2e" : "#1a2234";
          ctx.fillRect(wx, wy, 32, 32);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
          ctx.strokeRect(wx, wy, 32, 32);
        }
      }
    }
  }
  _renderLights2D(ctx) {
    const query = this.world.createQuery({ all: [Transform2D, Light2D] });
    query.forEach((id, transform, light) => {
      const radius = light.flickering ? light.radius + Math.sin(this._time * 15) * 6 : light.radius;
      const grad = ctx.createRadialGradient(
        transform.position.x,
        transform.position.y,
        4,
        transform.position.x,
        transform.position.y,
        radius
      );
      grad.addColorStop(0, `rgba(255, 180, 80, ${0.4 * light.intensity})`);
      grad.addColorStop(0.5, `rgba(255, 100, 30, ${0.15 * light.intensity})`);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(transform.position.x, transform.position.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }, [Transform2D, Light2D]);
  }
  _renderPlayer2D(ctx) {
    const query = this.world.createQuery({ all: [Transform2D, PlayerInput, Attributes] });
    query.forEach((id, transform, input, attrs) => {
      const px = transform.position.x;
      const py = transform.position.y;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(transform.rotation);
      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(10, -3, 14, 6);
      ctx.restore();
      const hpPct = attrs.currentHealth / attrs.maxHealth;
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(px - 20, py - 28, 40, 5);
      ctx.fillStyle = "#22c55e";
      ctx.fillRect(px - 20, py - 28, 40 * hpPct, 5);
    }, [Transform2D, PlayerInput, Attributes]);
  }
  _renderEnemies2D(ctx) {
    const query = this.world.createQuery({ all: [Transform2D, EnemyAI, Attributes] });
    query.forEach((id, transform, ai, attrs) => {
      const ex = transform.position.x;
      const ey = transform.position.y;
      ctx.save();
      ctx.translate(ex, ey);
      ctx.rotate(transform.rotation);
      ctx.fillStyle = "#dc2626";
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#450a0a";
      ctx.beginPath();
      ctx.moveTo(-6, -12);
      ctx.lineTo(-12, -22);
      ctx.lineTo(-2, -14);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(6, -12);
      ctx.lineTo(12, -22);
      ctx.lineTo(2, -14);
      ctx.fill();
      ctx.fillStyle = "#fef08a";
      ctx.fillRect(4, -5, 3, 3);
      ctx.fillRect(4, 2, 3, 3);
      ctx.restore();
      const hpPct = attrs.currentHealth / attrs.maxHealth;
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(ex - 18, ey - 26, 36, 4);
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(ex - 18, ey - 26, 36 * hpPct, 4);
    }, [Transform2D, EnemyAI, Attributes]);
  }
  _renderProjectiles2D(ctx) {
    const query = this.world.createQuery({ all: [Transform2D, Projectile] });
    query.forEach((id, transform, proj) => {
      ctx.save();
      const grad = ctx.createRadialGradient(
        transform.position.x,
        transform.position.y,
        2,
        transform.position.x,
        transform.position.y,
        proj.hitRadius
      );
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.3, "#f59e0b");
      grad.addColorStop(1, "rgba(239, 68, 68, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(transform.position.x, transform.position.y, proj.hitRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }, [Transform2D, Projectile]);
  }
  _renderLoot2D(ctx) {
    const query = this.world.createQuery({ all: [Transform2D, LootDrop] });
    query.forEach((id, transform, loot) => {
      const lx = transform.position.x;
      const ly = transform.position.y + Math.sin(this._time * 4) * 3;
      ctx.save();
      ctx.fillStyle = "#fbbf24";
      ctx.strokeStyle = "#fef08a";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(lx, ly - 8);
      ctx.lineTo(lx + 8, ly);
      ctx.lineTo(lx, ly + 8);
      ctx.lineTo(lx - 8, ly);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }, [Transform2D, LootDrop]);
  }
  _renderParticles2D(ctx) {
    const query = this.world.createQuery({ all: [Transform2D, ParticleEmitter] });
    query.forEach((id, transform, emitter) => {
      for (let i = 0; i < emitter.particles.length; i++) {
        const p = emitter.particles[i];
        if (!p.active) continue;
        ctx.fillStyle = p.color.toRGBA();
        ctx.beginPath();
        ctx.arc(p.position.x, p.position.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }, [Transform2D, ParticleEmitter]);
  }
};

// src/particles/Particle.ts
var Particle = class {
  position = new Vector2();
  velocity = new Vector2();
  acceleration = new Vector2();
  lifetime = 1;
  age = 0;
  startSize = 8;
  endSize = 0;
  currentSize = 8;
  startRotation = 0;
  rotationSpeed = 0;
  currentRotation = 0;
  color = new Color();
  isAlive = false;
  reset() {
    this.position.set(0, 0);
    this.velocity.set(0, 0);
    this.acceleration.set(0, 0);
    this.lifetime = 1;
    this.age = 0;
    this.startSize = 8;
    this.endSize = 0;
    this.currentSize = 8;
    this.startRotation = 0;
    this.rotationSpeed = 0;
    this.currentRotation = 0;
    this.color.set(1, 1, 1, 1);
    this.isAlive = false;
  }
  get normalizedLife() {
    return this.lifetime > 0 ? Math.min(1, this.age / this.lifetime) : 1;
  }
};

// src/core/collections/ObjectPool.ts
var ObjectPool = class {
  _factory;
  _resetFn;
  _freeList;
  _capacity;
  _allocatedCount = 0;
  constructor(factory, initialCapacity = 64, resetFn) {
    this._factory = factory;
    this._resetFn = resetFn;
    this._capacity = initialCapacity;
    this._freeList = new Array(initialCapacity);
    for (let i = 0; i < initialCapacity; i++) {
      this._freeList[i] = this._factory();
      this._allocatedCount++;
    }
  }
  get available() {
    return this._freeList.length;
  }
  get totalAllocated() {
    return this._allocatedCount;
  }
  get inUse() {
    return this._allocatedCount - this._freeList.length;
  }
  acquire() {
    if (this._freeList.length === 0) {
      this._allocatedCount++;
      return this._factory();
    }
    return this._freeList.pop();
  }
  release(item) {
    if (this._resetFn) {
      this._resetFn(item);
    } else if (typeof item.reset === "function") {
      item.reset();
    }
    this._freeList.push(item);
  }
  releaseAll(items) {
    for (let i = 0; i < items.length; i++) {
      this.release(items[i]);
    }
  }
  prewarm(count) {
    for (let i = 0; i < count; i++) {
      this._freeList.push(this._factory());
      this._allocatedCount++;
    }
  }
  clear() {
    this._freeList.length = 0;
    this._allocatedCount = 0;
  }
};

// src/particles/ParticleSystem.ts
var ParticleSystem = class extends System {
  phase = SystemPhase.PostUpdate;
  priority = 50;
  _pool;
  _activeParticles = [];
  maxParticles = 5e3;
  constructor() {
    super();
    this._pool = new ObjectPool(() => new Particle(), 1024, (p) => p.reset());
  }
  get activeParticleCount() {
    return this._activeParticles.length;
  }
  update(dt) {
    const emitterQuery = this.world.createQuery({ all: [Transform2D, ParticleEmitter] });
    emitterQuery.forEach((id, transform, emitter) => {
      emitter.update(dt, (count) => {
        this._spawnParticles(transform.position, transform.rotation, emitter, count);
      });
    }, [Transform2D, ParticleEmitter]);
    for (let i = this._activeParticles.length - 1; i >= 0; i--) {
      const p = this._activeParticles[i];
      p.age += dt;
      if (p.age >= p.lifetime) {
        this._activeParticles.splice(i, 1);
        this._pool.release(p);
        continue;
      }
      p.velocity.addSelf(p.acceleration.scale(dt));
      p.position.addSelf(p.velocity.scale(dt));
      p.currentRotation += p.rotationSpeed * dt;
      const t = p.normalizedLife;
      p.currentSize = MathUtils.lerp(p.startSize, p.endSize, t);
    }
  }
  render(batch) {
    const origin = new Vector2(0.5, 0.5);
    const size = new Vector2();
    for (let i = 0; i < this._activeParticles.length; i++) {
      const p = this._activeParticles[i];
      size.set(p.currentSize, p.currentSize);
      batch.drawSprite(
        p.position,
        size,
        p.currentRotation,
        origin,
        p.color
      );
    }
  }
  _spawnParticles(emitterPos, emitterRot, emitter, count) {
    for (let i = 0; i < count; i++) {
      if (this._activeParticles.length >= this.maxParticles) break;
      const p = this._pool.acquire();
      p.isAlive = true;
      p.age = 0;
      p.lifetime = MathUtils.lerp(emitter.minLifetime, emitter.maxLifetime, Math.random());
      let offset = new Vector2();
      let angle = emitterRot;
      switch (emitter.shape) {
        case EmitterShape.Circle: {
          const r = Math.random() * emitter.shapeRadius;
          const a = Math.random() * Math.PI * 2;
          offset.set(Math.cos(a) * r, Math.sin(a) * r);
          angle = a;
          break;
        }
        case EmitterShape.Cone: {
          const spread = (Math.random() * 2 - 1) * emitter.coneAngle * 0.5;
          angle = emitterRot + spread;
          break;
        }
        case EmitterShape.Point:
        default:
          break;
      }
      p.position.copy(emitterPos.add(offset));
      const speed = MathUtils.lerp(emitter.minSpeed, emitter.maxSpeed, Math.random());
      p.velocity.set(Math.cos(angle) * speed, Math.sin(angle) * speed);
      p.acceleration.copy(emitter.gravity);
      p.startSize = MathUtils.lerp(emitter.minSize, emitter.maxSize, Math.random());
      p.endSize = emitter.endSize;
      p.currentSize = p.startSize;
      p.color = emitter.colorRamp.evaluate(0);
      this._activeParticles.push(p);
    }
  }
};

// src/gameplay/StatusEffects.ts
var StatusEffectType = {
  Bleed: 0,
  Burn: 1,
  Freeze: 2,
  Shock: 3,
  Poison: 4,
  Stun: 5,
  Shield: 6,
  Haste: 7
};
var StatusEffects = class {
  activeEffects = [];
  applyEffect(type, duration, magnitude, tickInterval = 1, sourceEntityId) {
    const existing = this.activeEffects.find((e) => e.type === type);
    if (existing) {
      existing.remainingTime = Math.max(existing.remainingTime, duration);
      existing.magnitude = Math.max(existing.magnitude, magnitude);
      return;
    }
    this.activeEffects.push({
      type,
      duration,
      remainingTime: duration,
      tickInterval,
      tickTimer: 0,
      magnitude,
      sourceEntityId
    });
  }
  hasEffect(type) {
    return this.activeEffects.some((e) => e.type === type);
  }
  update(dt, attributes, onTickDamage) {
    for (let i = this.activeEffects.length - 1; i >= 0; i--) {
      const effect = this.activeEffects[i];
      effect.remainingTime -= dt;
      effect.tickTimer += dt;
      if (effect.tickTimer >= effect.tickInterval) {
        effect.tickTimer = 0;
        if (effect.type === StatusEffectType.Bleed || effect.type === StatusEffectType.Burn || effect.type === StatusEffectType.Poison) {
          attributes.currentHealth = Math.max(0, attributes.currentHealth - effect.magnitude);
          if (onTickDamage) {
            onTickDamage(effect.magnitude, effect.type);
          }
        }
      }
      if (effect.remainingTime <= 0) {
        this.activeEffects.splice(i, 1);
      }
    }
  }
};

// src/gameplay/CombatSystem.ts
var CombatSystem = class extends System {
  phase = SystemPhase.Combat;
  priority = 100;
  _pendingHits = [];
  floatingTextManager;
  queueHit(event) {
    this._pendingHits.push(event);
  }
  update(dt) {
    while (this._pendingHits.length > 0) {
      const hit = this._pendingHits.shift();
      this._processHit(hit);
    }
    const query = this.world.createQuery({ all: [Attributes] });
    query.forEach((id, attributes) => {
      attributes.updateRegen(dt);
      const effects = this.world.getComponent(id, StatusEffects);
      if (effects) {
        effects.update(dt, attributes, (tickDamage) => {
          const transform = this.world.getComponent(id, Transform2D);
          if (transform && this.floatingTextManager) {
            this.floatingTextManager.spawnDamage(transform.position, tickDamage, "#fb923c");
          }
        });
      }
      if (attributes.currentHealth <= 0 && !attributes.isDead) {
        attributes.isDead = true;
        SoundFXGenerator.playExplosion();
        this.commands.defer((w) => {
          w.destroyEntity(id);
        });
      }
    }, [Attributes]);
  }
  _processHit(event) {
    const targetAttrs = this.world.getComponent(event.targetEntityId, Attributes);
    if (!targetAttrs || targetAttrs.isDead) return;
    const result = DamageCalculator.calculate(event.damagePackage, targetAttrs);
    targetAttrs.currentHealth = Math.max(0, targetAttrs.currentHealth - result.finalDamage);
    SoundFXGenerator.playHitImpact();
    if (this.floatingTextManager) {
      const color = result.isCritical ? "#facc15" : "#ef4444";
      this.floatingTextManager.spawnDamage(event.hitPosition, result.finalDamage, color, result.isCritical);
    }
    if (event.damagePackage.attackerStats && event.damagePackage.attackerStats.lifeSteal > 0) {
      const healed = result.finalDamage * (event.damagePackage.attackerStats.lifeSteal / 100);
      event.damagePackage.attackerStats.currentHealth = Math.min(
        event.damagePackage.attackerStats.maxHealth,
        event.damagePackage.attackerStats.currentHealth + healed
      );
    }
  }
};

// src/gameplay/LevelProgression.ts
var LevelProgression = class {
  currentLevel = 1;
  currentXP = 0;
  maxXP = 100;
  unallocatedStatPoints = 0;
  unallocatedSkillPoints = 0;
  addXP(amount, attributes) {
    this.currentXP += amount;
    let didLevelUp = false;
    while (this.currentXP >= this.maxXP) {
      this.currentXP -= this.maxXP;
      this.currentLevel++;
      this.maxXP = Math.floor(this.maxXP * 1.35 + 50);
      this.unallocatedStatPoints += 5;
      this.unallocatedSkillPoints += 1;
      attributes.currentHealth = attributes.maxHealth;
      attributes.currentMana = attributes.maxMana;
      SoundFXGenerator.playLevelUp();
      didLevelUp = true;
    }
    return didLevelUp;
  }
};

// src/procgen/LootTableGenerator.ts
var ItemSlot = {
  Weapon: 0,
  Helm: 1,
  Armor: 2,
  Boots: 3,
  Amulet: 4,
  Ring: 5
};

// src/gameplay/EquipmentSlots.ts
var EquipmentSlots = class {
  weapon = null;
  helm = null;
  armor = null;
  boots = null;
  amulet = null;
  ring = null;
  equip(item) {
    let unequipped = null;
    switch (item.slot) {
      case ItemSlot.Weapon:
        unequipped = this.weapon;
        this.weapon = item;
        break;
      case ItemSlot.Helm:
        unequipped = this.helm;
        this.helm = item;
        break;
      case ItemSlot.Armor:
        unequipped = this.armor;
        this.armor = item;
        break;
      case ItemSlot.Boots:
        unequipped = this.boots;
        this.boots = item;
        break;
      case ItemSlot.Amulet:
        unequipped = this.amulet;
        this.amulet = item;
        break;
      case ItemSlot.Ring:
        unequipped = this.ring;
        this.ring = item;
        break;
    }
    return unequipped;
  }
  applyStatsTo(attributes) {
    const equipped = [this.weapon, this.helm, this.armor, this.boots, this.amulet, this.ring];
    for (const item of equipped) {
      if (!item) continue;
      if (item.baseDamage) attributes.attackPower += item.baseDamage;
      if (item.baseArmor) attributes.armor += item.baseArmor;
      for (const [stat, val] of Object.entries(item.stats)) {
        if (stat === "strength") attributes.strength += val;
        else if (stat === "agility") attributes.agility += val;
        else if (stat === "intelligence") attributes.intelligence += val;
        else if (stat === "vitality") attributes.vitality += val;
        else if (stat === "fireDamage") attributes.spellPower += val;
        else if (stat === "critRate") attributes.critChance += val * 0.01;
      }
    }
    attributes.recalculateDerivedStats();
  }
};

// src/procgen/BSPDungeonGenerator.ts
var BSPLeaf = class _BSPLeaf {
  x;
  y;
  width;
  height;
  leftChild;
  rightChild;
  room;
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  split(minLeafSize = 8) {
    if (this.leftChild || this.rightChild) return false;
    let splitH = Math.random() > 0.5;
    if (this.width > this.height && this.width / this.height >= 1.25) splitH = false;
    else if (this.height > this.width && this.height / this.width >= 1.25) splitH = true;
    const max = (splitH ? this.height : this.width) - minLeafSize;
    if (max <= minLeafSize) return false;
    const split = Math.floor(Math.random() * (max - minLeafSize) + minLeafSize);
    if (splitH) {
      this.leftChild = new _BSPLeaf(this.x, this.y, this.width, split);
      this.rightChild = new _BSPLeaf(this.x, this.y + split, this.width, this.height - split);
    } else {
      this.leftChild = new _BSPLeaf(this.x, this.y, split, this.height);
      this.rightChild = new _BSPLeaf(this.x + split, this.y, this.width - split, this.height);
    }
    return true;
  }
  createRooms(minRoomSize = 4) {
    if (this.leftChild || this.rightChild) {
      if (this.leftChild) this.leftChild.createRooms(minRoomSize);
      if (this.rightChild) this.rightChild.createRooms(minRoomSize);
    } else {
      const roomW = Math.floor(Math.random() * (this.width - 2 - minRoomSize) + minRoomSize);
      const roomH = Math.floor(Math.random() * (this.height - 2 - minRoomSize) + minRoomSize);
      const roomX = Math.floor(Math.random() * (this.width - 1 - roomW) + this.x + 1);
      const roomY = Math.floor(Math.random() * (this.height - 1 - roomH) + this.y + 1);
      this.room = { x: roomX, y: roomY, width: roomW, height: roomH };
    }
  }
  getRoom() {
    if (this.room) return this.room;
    if (this.leftChild) {
      const lRoom = this.leftChild.getRoom();
      if (lRoom) return lRoom;
    }
    if (this.rightChild) {
      const rRoom = this.rightChild.getRoom();
      if (rRoom) return rRoom;
    }
    return void 0;
  }
};
var BSPDungeonGenerator = class {
  width;
  height;
  grid;
  // 0 = floor, 1 = wall
  rooms = [];
  constructor(width = 64, height = 64) {
    this.width = width;
    this.height = height;
    this.grid = new Uint8Array(width * height).fill(1);
  }
  generate(maxLeafSize = 20, minLeafSize = 8, minRoomSize = 4) {
    this.grid.fill(1);
    this.rooms = [];
    const root = new BSPLeaf(0, 0, this.width, this.height);
    const leaves = [root];
    let didSplit = true;
    while (didSplit) {
      didSplit = false;
      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];
        if (!leaf.leftChild && !leaf.rightChild) {
          if (leaf.width > maxLeafSize || leaf.height > maxLeafSize || Math.random() > 0.2) {
            if (leaf.split(minLeafSize)) {
              leaves.push(leaf.leftChild);
              leaves.push(leaf.rightChild);
              didSplit = true;
            }
          }
        }
      }
    }
    root.createRooms(minRoomSize);
    this._carveLeaves(root);
  }
  _carveLeaves(leaf) {
    if (leaf.room) {
      this.rooms.push(leaf.room);
      for (let y = leaf.room.y; y < leaf.room.y + leaf.room.height; y++) {
        for (let x = leaf.room.x; x < leaf.room.x + leaf.room.width; x++) {
          if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.grid[y * this.width + x] = 0;
          }
        }
      }
    }
    if (leaf.leftChild && leaf.rightChild) {
      this._carveLeaves(leaf.leftChild);
      this._carveLeaves(leaf.rightChild);
      const r1 = leaf.leftChild.getRoom();
      const r2 = leaf.rightChild.getRoom();
      if (r1 && r2) {
        this._carveCorridor(
          Math.floor(r1.x + r1.width * 0.5),
          Math.floor(r1.y + r1.height * 0.5),
          Math.floor(r2.x + r2.width * 0.5),
          Math.floor(r2.y + r2.height * 0.5)
        );
      }
    }
  }
  _carveCorridor(x1, y1, x2, y2) {
    let cx = x1;
    let cy = y1;
    while (cx !== x2) {
      if (cx >= 0 && cx < this.width && cy >= 0 && cy < this.height) {
        this.grid[cy * this.width + cx] = 0;
      }
      cx += cx < x2 ? 1 : -1;
    }
    while (cy !== y2) {
      if (cx >= 0 && cx < this.width && cy >= 0 && cy < this.height) {
        this.grid[cy * this.width + cx] = 0;
      }
      cy += cy < y2 ? 1 : -1;
    }
  }
};

// src/procgen/TilemapGenerator.ts
var TilemapGenerator = class {
  static generateAutotileLayer(binaryGrid, width, height, floorTileId = 0, wallBaseTileId = 16) {
    const tileLayer = new Int32Array(width * height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (binaryGrid[idx] === 0) {
          tileLayer[idx] = floorTileId;
        } else {
          const mask = this._compute4BitMask(binaryGrid, width, height, x, y);
          tileLayer[idx] = wallBaseTileId + mask;
        }
      }
    }
    return tileLayer;
  }
  static _compute4BitMask(grid, w, h, x, y) {
    let mask = 0;
    if (y > 0 && grid[(y - 1) * w + x] === 1) mask |= 1;
    if (x < w - 1 && grid[y * w + (x + 1)] === 1) mask |= 2;
    if (y < h - 1 && grid[(y + 1) * w + x] === 1) mask |= 4;
    if (x > 0 && grid[y * w + (x - 1)] === 1) mask |= 8;
    return mask;
  }
};

// src/procgen/DungeonDecorator.ts
var PropType = {
  Chest: 0,
  Torch: 1,
  Barrel: 2,
  Altar: 3,
  SpikeTrap: 4
};
var DungeonDecorator = class {
  static decorateRooms(rooms, tileSize = 32) {
    const props = [];
    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      const cx = (room.x + room.width * 0.5) * tileSize;
      const cy = (room.y + room.height * 0.5) * tileSize;
      props.push({ type: PropType.Torch, position: new Vector2((room.x + 1) * tileSize, (room.y + 1) * tileSize) });
      props.push({ type: PropType.Torch, position: new Vector2((room.x + room.width - 2) * tileSize, (room.y + 1) * tileSize) });
      if (Math.random() < 0.4) {
        props.push({ type: PropType.Chest, position: new Vector2(cx, cy) });
      }
      const barrelCount = Math.floor(Math.random() * 4);
      for (let b = 0; b < barrelCount; b++) {
        const bx = (room.x + 1 + Math.random() * (room.width - 2)) * tileSize;
        const by = (room.y + 1 + Math.random() * (room.height - 2)) * tileSize;
        props.push({ type: PropType.Barrel, position: new Vector2(bx, by) });
      }
    }
    return props;
  }
};

// src/ui/UINode.ts
var UINode = class {
  name;
  position = new Vector2();
  size = new Vector2(100, 100);
  anchor = { min: new Vector2(0, 0), max: new Vector2(0, 0) };
  pivot = new Vector2(0, 0);
  backgroundColor = new Color(0.1, 0.15, 0.2, 0.85);
  borderColor = new Color(0.3, 0.4, 0.5, 1);
  borderWidth = 1;
  borderRadius = 4;
  isVisible = true;
  isInteractive = true;
  parent = null;
  children = [];
  // Cached calculated screen rect
  computedX = 0;
  computedY = 0;
  computedWidth = 0;
  computedHeight = 0;
  constructor(name = "UINode") {
    this.name = name;
  }
  addChild(child) {
    if (child.parent) {
      child.parent.removeChild(child);
    }
    child.parent = this;
    this.children.push(child);
    return this;
  }
  removeChild(child) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      this.children.splice(idx, 1);
      child.parent = null;
      return true;
    }
    return false;
  }
  calculateLayout(parentWidth, parentHeight, parentX = 0, parentY = 0) {
    const ax = parentX + parentWidth * this.anchor.min.x;
    const ay = parentY + parentHeight * this.anchor.min.y;
    this.computedWidth = this.size.x;
    this.computedHeight = this.size.y;
    this.computedX = ax + this.position.x - this.computedWidth * this.pivot.x;
    this.computedY = ay + this.position.y - this.computedHeight * this.pivot.y;
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].isVisible) {
        this.children[i].calculateLayout(this.computedWidth, this.computedHeight, this.computedX, this.computedY);
      }
    }
  }
  containsPoint(screenX, screenY) {
    if (!this.isVisible) return false;
    return screenX >= this.computedX && screenX <= this.computedX + this.computedWidth && screenY >= this.computedY && screenY <= this.computedY + this.computedHeight;
  }
  render(ctx) {
    if (!this.isVisible) return;
    ctx.save();
    if (this.backgroundColor.a > 0) {
      ctx.fillStyle = this.backgroundColor.toRGBA();
      ctx.fillRect(this.computedX, this.computedY, this.computedWidth, this.computedHeight);
    }
    if (this.borderWidth > 0 && this.borderColor.a > 0) {
      ctx.strokeStyle = this.borderColor.toRGBA();
      ctx.lineWidth = this.borderWidth;
      ctx.strokeRect(this.computedX, this.computedY, this.computedWidth, this.computedHeight);
    }
    this.onRenderContent(ctx);
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].render(ctx);
    }
    ctx.restore();
  }
  onRenderContent(ctx) {
  }
};

// src/ui/UIButton.ts
var UIButton = class extends UINode {
  text;
  textColor = new Color(1, 1, 1, 1);
  font = "bold 14px Segoe UI, sans-serif";
  normalColor = new Color(0.18, 0.24, 0.35, 0.9);
  hoverColor = new Color(0.25, 0.35, 0.5, 0.95);
  pressedColor = new Color(0.12, 0.18, 0.28, 1);
  isHovered = false;
  isPressed = false;
  isEnabled = true;
  onClick;
  constructor(text = "Button", onClick) {
    super("UIButton");
    this.text = text;
    this.onClick = onClick;
    this.size.set(120, 36);
  }
  onPointerEnter() {
    if (!this.isEnabled) return;
    this.isHovered = true;
  }
  onPointerLeave() {
    this.isHovered = false;
    this.isPressed = false;
  }
  onPointerDown() {
    if (!this.isEnabled) return;
    this.isPressed = true;
  }
  onPointerUp() {
    if (!this.isEnabled) return;
    if (this.isPressed) {
      this.isPressed = false;
      SoundFXGenerator.playCoinPickup();
      if (this.onClick) {
        this.onClick();
      }
    }
  }
  onRenderContent(ctx) {
    let bg = this.normalColor;
    if (this.isPressed) bg = this.pressedColor;
    else if (this.isHovered) bg = this.hoverColor;
    ctx.fillStyle = bg.toRGBA();
    ctx.fillRect(this.computedX, this.computedY, this.computedWidth, this.computedHeight);
    ctx.font = this.font;
    ctx.fillStyle = this.textColor.toRGBA();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      this.text,
      this.computedX + this.computedWidth * 0.5,
      this.computedY + this.computedHeight * 0.5
    );
  }
};

// src/ui/UIFloatingText.ts
var UIFloatingTextManager = class {
  _items = [];
  spawnDamage(worldPos, amount, color = "#f87171", isCrit = false) {
    this._items.push({
      text: `${Math.round(amount)}${isCrit ? "!" : ""}`,
      worldPos: worldPos.clone().addSelf(new Vector2((Math.random() * 2 - 1) * 8, 0)),
      velocity: new Vector2((Math.random() * 2 - 1) * 20, isCrit ? -80 : -50),
      color,
      scale: isCrit ? 1.6 : 1,
      alpha: 1,
      lifetime: 0.9,
      age: 0,
      isCrit
    });
  }
  update(dt) {
    for (let i = this._items.length - 1; i >= 0; i--) {
      const item = this._items[i];
      item.age += dt;
      if (item.age >= item.lifetime) {
        this._items.splice(i, 1);
        continue;
      }
      item.worldPos.addSelf(item.velocity.scale(dt));
      item.velocity.y += 60 * dt;
      item.alpha = Math.max(0, 1 - item.age / item.lifetime);
    }
  }
  render(ctx, camera) {
    for (let i = 0; i < this._items.length; i++) {
      const item = this._items[i];
      const screenPos = camera.worldToScreen(item.worldPos);
      ctx.save();
      ctx.globalAlpha = item.alpha;
      ctx.font = `bold ${Math.round(16 * item.scale)}px Segoe UI, sans-serif`;
      ctx.fillStyle = item.color;
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 3;
      ctx.textAlign = "center";
      ctx.strokeText(item.text, screenPos.x, screenPos.y);
      ctx.fillText(item.text, screenPos.x, screenPos.y);
      ctx.restore();
    }
  }
};

// src/ui/UIManager.ts
var UIManager = class {
  root;
  floatingText;
  canvas;
  ctx;
  _hoveredNode = null;
  _pressedNode = null;
  constructor(containerElement) {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "ui-canvas";
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.pointerEvents = "auto";
    containerElement.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.root = new UINode("Root");
    this.floatingText = new UIFloatingTextManager();
    this._setupEventListeners();
    this.resize();
  }
  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(this.canvas.clientWidth * dpr);
    this.canvas.height = Math.floor(this.canvas.clientHeight * dpr);
    this.root.size.set(this.canvas.width, this.canvas.height);
  }
  update(dt) {
    this.floatingText.update(dt);
    this.root.calculateLayout(this.canvas.width, this.canvas.height);
  }
  render(camera) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.root.render(this.ctx);
    this.floatingText.render(this.ctx, camera);
  }
  _setupEventListeners() {
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
      const hit = this._hitTest(this.root, x, y);
      if (hit !== this._hoveredNode) {
        if (this._hoveredNode instanceof UIButton) this._hoveredNode.onPointerLeave();
        this._hoveredNode = hit;
        if (this._hoveredNode instanceof UIButton) this._hoveredNode.onPointerEnter();
      }
    });
    this.canvas.addEventListener("mousedown", (e) => {
      if (this._hoveredNode instanceof UIButton) {
        this._pressedNode = this._hoveredNode;
        this._hoveredNode.onPointerDown();
      }
    });
    this.canvas.addEventListener("mouseup", (e) => {
      if (this._pressedNode instanceof UIButton) {
        this._pressedNode.onPointerUp();
        this._pressedNode = null;
      }
    });
  }
  _hitTest(node, x, y) {
    if (!node.isVisible || !node.isInteractive) return null;
    for (let i = node.children.length - 1; i >= 0; i--) {
      const childHit = this._hitTest(node.children[i], x, y);
      if (childHit) return childHit;
    }
    if (node.containsPoint(x, y)) {
      return node;
    }
    return null;
  }
};

// src/ui/UIProgressBar.ts
var UIProgressBar = class extends UINode {
  currentValue = 100;
  maxValue = 100;
  fillColor = new Color(0.85, 0.2, 0.2, 1);
  // Default Red for HP
  showText = true;
  labelPrefix = "";
  _displayedValue = 100;
  constructor(current = 100, max = 100, fillColor = new Color(0.85, 0.2, 0.2, 1)) {
    super("UIProgressBar");
    this.currentValue = current;
    this.maxValue = max;
    this._displayedValue = current;
    this.fillColor = fillColor;
    this.size.set(200, 20);
  }
  update(dt) {
    this._displayedValue = MathUtils.damp(this._displayedValue, this.currentValue, 10, dt);
  }
  onRenderContent(ctx) {
    const fraction = Math.max(0, Math.min(1, this.maxValue > 0 ? this._displayedValue / this.maxValue : 0));
    const fillWidth = (this.computedWidth - 2) * fraction;
    if (fillWidth > 0) {
      ctx.fillStyle = this.fillColor.toRGBA();
      ctx.fillRect(this.computedX + 1, this.computedY + 1, fillWidth, this.computedHeight - 2);
    }
    if (this.showText) {
      ctx.font = "bold 11px Segoe UI, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const label = `${this.labelPrefix}${Math.round(this.currentValue)} / ${Math.round(this.maxValue)}`;
      ctx.fillText(
        label,
        this.computedX + this.computedWidth * 0.5,
        this.computedY + this.computedHeight * 0.5
      );
    }
  }
};

// src/ui/UIMinimap.ts
var UIMinimap = class extends UINode {
  mapWidth = 2e3;
  mapHeight = 2e3;
  playerPos = new Vector2();
  blips = [];
  constructor() {
    super("UIMinimap");
    this.size.set(160, 160);
    this.backgroundColor = new Color(0.05, 0.08, 0.12, 0.85);
    this.borderColor = new Color(0.2, 0.4, 0.6, 1);
    this.borderWidth = 2;
  }
  onRenderContent(ctx) {
    const scaleX = this.computedWidth / this.mapWidth;
    const scaleY = this.computedHeight / this.mapHeight;
    for (let i = 0; i < this.blips.length; i++) {
      const blip = this.blips[i];
      const bx = this.computedX + blip.position.x * scaleX;
      const by = this.computedY + blip.position.y * scaleY;
      if (bx >= this.computedX && bx <= this.computedX + this.computedWidth && by >= this.computedY && by <= this.computedY + this.computedHeight) {
        ctx.fillStyle = blip.color;
        ctx.beginPath();
        ctx.arc(bx, by, blip.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const px = this.computedX + this.playerPos.x * scaleX;
    const py = this.computedY + this.playerPos.y * scaleY;
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
};

// src/editor/EditorState.ts
var EditorMode = {
  Play: 0,
  Edit: 1,
  Pause: 2
};
var EditorTool = {
  Select: 0,
  Translate: 1,
  Rotate: 2,
  PaintTiles: 3,
  EraseTiles: 4
};
var EditorState = class {
  mode = EditorMode.Play;
  activeTool = EditorTool.Select;
  selectedEntityId = null;
  activeTileId = 1;
  brushSize = 1;
  showGizmos = true;
  showPhysicsBounds = false;
  showProfiler = true;
};

// src/core/collections/RingBuffer.ts
var RingBuffer = class {
  _buffer;
  _head = 0;
  _tail = 0;
  _size = 0;
  _capacity;
  constructor(capacity) {
    if (capacity <= 0) {
      throw new Error("RingBuffer capacity must be greater than zero");
    }
    this._capacity = capacity;
    this._buffer = new Array(capacity);
  }
  get capacity() {
    return this._capacity;
  }
  get size() {
    return this._size;
  }
  get isFull() {
    return this._size === this._capacity;
  }
  get isEmpty() {
    return this._size === 0;
  }
  push(item) {
    let overwritten = false;
    if (this.isFull) {
      this._head = (this._head + 1) % this._capacity;
      this._size--;
      overwritten = true;
    }
    this._buffer[this._tail] = item;
    this._tail = (this._tail + 1) % this._capacity;
    this._size++;
    return overwritten;
  }
  pop() {
    if (this.isEmpty) return void 0;
    const item = this._buffer[this._head];
    this._buffer[this._head] = void 0;
    this._head = (this._head + 1) % this._capacity;
    this._size--;
    return item;
  }
  peek() {
    if (this.isEmpty) return void 0;
    return this._buffer[this._head];
  }
  peekLast() {
    if (this.isEmpty) return void 0;
    const lastIdx = (this._tail - 1 + this._capacity) % this._capacity;
    return this._buffer[lastIdx];
  }
  get(index) {
    if (index < 0 || index >= this._size) return void 0;
    const actualIdx = (this._head + index) % this._capacity;
    return this._buffer[actualIdx];
  }
  clear() {
    this._buffer.fill(void 0);
    this._head = 0;
    this._tail = 0;
    this._size = 0;
  }
  toArray() {
    const result = new Array(this._size);
    for (let i = 0; i < this._size; i++) {
      result[i] = this.get(i);
    }
    return result;
  }
};

// src/editor/PerformanceProfiler.ts
var PerformanceProfiler = class {
  _frameTimes = new RingBuffer(60);
  _lastTimestamp = performance.now();
  fps = 60;
  frameTimeMs = 16.6;
  totalDrawCalls = 0;
  totalEntities = 0;
  totalPhysicsBodies = 0;
  beginFrame() {
    const now = performance.now();
    const dt = now - this._lastTimestamp;
    this._lastTimestamp = now;
    this._frameTimes.push(dt);
    let sum = 0;
    const count = this._frameTimes.size;
    for (let i = 0; i < count; i++) {
      sum += this._frameTimes.get(i);
    }
    if (count > 0) {
      this.frameTimeMs = sum / count;
      this.fps = Math.round(1e3 / this.frameTimeMs);
    }
  }
};

// src/GameApp.ts
var GameApp = class {
  world;
  renderPipeline;
  physicsWorld;
  particleSystem;
  combatSystem;
  projectileSystem;
  playerController;
  enemyAI;
  lootDropSystem;
  uiManager;
  editorState;
  profiler;
  playerEntityId;
  _lastTime = 0;
  _isRunning = false;
  // HUD Elements
  _hpBar;
  _mpBar;
  _staminaBar;
  _minimap;
  constructor(canvas, uiContainer) {
    this.world = new World(1e4);
    this.renderPipeline = new RenderPipeline(canvas);
    this.physicsWorld = new PhysicsWorld(new Vector2(0, 0));
    this.particleSystem = new ParticleSystem();
    this.combatSystem = new CombatSystem();
    this.projectileSystem = new ProjectileSystem();
    this.playerController = new PlayerControllerSystem();
    this.enemyAI = new EnemyAISystem();
    this.lootDropSystem = new LootDropSystem();
    this.uiManager = new UIManager(uiContainer);
    this.editorState = new EditorState();
    this.profiler = new PerformanceProfiler();
    this.combatSystem.floatingTextManager = this.uiManager.floatingText;
    this.world.addSystem(this.playerController);
    this.world.addSystem(this.physicsWorld);
    this.world.addSystem(this.enemyAI);
    this.world.addSystem(this.projectileSystem);
    this.world.addSystem(this.combatSystem);
    this.world.addSystem(this.lootDropSystem);
    this.world.addSystem(this.particleSystem);
    this.world.addSystem(this.renderPipeline);
  }
  init() {
    this._setupUI();
    this._generateProceduralWorld();
    this._spawnPlayer();
    this._spawnMonsters();
    this._setupInputListeners();
    this._isRunning = true;
    this._lastTime = performance.now();
    requestAnimationFrame((t) => this._loop(t));
  }
  _setupUI() {
    this._hpBar = new UIProgressBar(100, 100, new Color(0.88, 0.2, 0.2, 1));
    this._hpBar.position.set(20, this.uiManager.canvas.height - 70);
    this._hpBar.labelPrefix = "HP: ";
    this.uiManager.root.addChild(this._hpBar);
    this._mpBar = new UIProgressBar(50, 50, new Color(0.2, 0.5, 0.95, 1));
    this._mpBar.position.set(20, this.uiManager.canvas.height - 44);
    this._mpBar.labelPrefix = "MP: ";
    this.uiManager.root.addChild(this._mpBar);
    this._staminaBar = new UIProgressBar(100, 100, new Color(0.2, 0.8, 0.3, 1));
    this._staminaBar.size.set(200, 8);
    this._staminaBar.showText = false;
    this._staminaBar.position.set(20, this.uiManager.canvas.height - 18);
    this.uiManager.root.addChild(this._staminaBar);
    this._minimap = new UIMinimap();
    this._minimap.position.set(this.uiManager.canvas.width - 180, 20);
    this.uiManager.root.addChild(this._minimap);
  }
  _generateProceduralWorld() {
    const dungeon = new BSPDungeonGenerator(80, 80);
    dungeon.generate(18, 8, 5);
    const baseTilemap = this.renderPipeline.tilemap;
    baseTilemap.width = 80;
    baseTilemap.height = 80;
    const floorLayer = baseTilemap.addLayer("Ground");
    const autotileData = TilemapGenerator.generateAutotileLayer(dungeon.grid, 80, 80, 0, 16);
    floorLayer.data.set(autotileData);
    for (let y = 0; y < 80; y++) {
      for (let x = 0; x < 80; x++) {
        if (dungeon.grid[y * 80 + x] === 1) {
          const wallEntity = this.world.createEntity();
          wallEntity.add(new Transform2D(x * 32 + 16, y * 32 + 16));
          wallEntity.add(new RigidBody2D({ type: BodyType.Static }));
          wallEntity.add(new Collider2D(ColliderShapeType.Box, { boxExtents: new Vector2(16, 16) }));
          this.physicsWorld.broadphase.register(wallEntity.id, wallEntity.get(Collider2D));
        }
      }
    }
    const props = DungeonDecorator.decorateRooms(dungeon.rooms, 32);
    for (const prop of props) {
      if (prop.type === PropType.Torch) {
        const torch = this.world.createEntity();
        torch.add(new Transform2D(prop.position.x, prop.position.y));
        torch.add(new Light2D({
          color: new Color(1, 0.7, 0.3, 1),
          radius: 180,
          flickering: true
        }));
        const flameEmitter = new ParticleEmitter({
          emissionRate: 15,
          shape: EmitterShape.Point,
          lifetime: [0.2, 0.5],
          speed: [10, 30],
          size: [2, 6],
          colorRamp: new ColorRamp([
            { position: 0, color: new Color(1, 0.9, 0.4, 1) },
            { position: 0.6, color: new Color(1, 0.3, 0.1, 0.8) },
            { position: 1, color: new Color(0.2, 0.2, 0.2, 0) }
          ])
        });
        flameEmitter.gravity.set(0, -40);
        torch.add(flameEmitter);
      }
    }
  }
  _spawnPlayer() {
    const player = this.world.createEntity();
    this.playerEntityId = player.id;
    player.add(new Transform2D(200, 200));
    player.add(new RigidBody2D({
      type: BodyType.Dynamic,
      mass: 70,
      linearDamping: 0.1,
      fixedRotation: true
    }));
    player.add(new Collider2D(ColliderShapeType.Circle, { circleRadius: 16 }));
    player.add(new Attributes({
      strength: 15,
      agility: 12,
      intelligence: 10,
      vitality: 14
    }));
    player.add(new LevelProgression());
    player.add(new Inventory(24));
    player.add(new EquipmentSlots());
    player.add(new SkillManager());
    player.add(new PlayerInput());
    player.add(new Light2D({
      color: new Color(0.9, 0.95, 1, 1),
      radius: 280,
      intensity: 1.2,
      flickering: false
    }));
    this.physicsWorld.broadphase.register(player.id, player.get(Collider2D));
    this.renderPipeline.camera.target = player.get(Transform2D).position;
  }
  _spawnMonsters() {
    const monsterSpawns = [
      new Vector2(400, 300),
      new Vector2(600, 450),
      new Vector2(500, 600),
      new Vector2(350, 500),
      new Vector2(700, 300)
    ];
    for (let i = 0; i < monsterSpawns.length; i++) {
      const pos = monsterSpawns[i];
      const monster = this.world.createEntity();
      monster.add(new Transform2D(pos.x, pos.y));
      monster.add(new RigidBody2D({
        type: BodyType.Dynamic,
        mass: 50,
        linearDamping: 0.1,
        fixedRotation: true
      }));
      monster.add(new Collider2D(ColliderShapeType.Circle, { circleRadius: 16 }));
      monster.add(new Attributes({
        maxHealth: 60,
        currentHealth: 60,
        attackPower: 12,
        moveSpeed: 110
      }));
      monster.add(new EnemyAI());
      this.physicsWorld.broadphase.register(monster.id, monster.get(Collider2D));
    }
  }
  _setupInputListeners() {
    window.addEventListener("mousemove", (e) => {
      const player = this.world.getEntity(this.playerEntityId);
      if (player) {
        const input = player.get(PlayerInput);
        if (input) {
          const worldPos = this.renderPipeline.camera.screenToWorld(new Vector2(e.clientX, e.clientY));
          input.mouseWorldPos.copy(worldPos);
        }
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "F1") {
        this.editorState.mode = this.editorState.mode === EditorMode.Play ? EditorMode.Edit : EditorMode.Play;
        const hudMode = document.getElementById("hud-mode");
        if (hudMode) hudMode.textContent = `Mode: ${this.editorState.mode === EditorMode.Play ? "Play" : "Editor"}`;
      } else if (e.key === "F3") {
        this.editorState.showPhysicsBounds = !this.editorState.showPhysicsBounds;
      }
    });
  }
  _loop(timestamp) {
    if (!this._isRunning) return;
    this.profiler.beginFrame();
    const dt = Math.min((timestamp - this._lastTime) / 1e3, 0.05);
    this._lastTime = timestamp;
    this.world.update(dt);
    const player = this.world.getEntity(this.playerEntityId);
    if (player) {
      const attrs = player.get(Attributes);
      const trans = player.get(Transform2D);
      if (attrs) {
        this._hpBar.currentValue = attrs.currentHealth;
        this._hpBar.maxValue = attrs.maxHealth;
        this._mpBar.currentValue = attrs.currentMana;
        this._mpBar.maxValue = attrs.maxMana;
        this._staminaBar.currentValue = attrs.currentStamina;
        this._staminaBar.maxValue = attrs.maxStamina;
      }
      if (trans) {
        this._minimap.playerPos.copy(trans.position);
      }
    }
    this._minimap.blips = [];
    const enemyQuery = this.world.createQuery({ all: [Transform2D, EnemyAI] });
    enemyQuery.forEach((id, trans) => {
      this._minimap.blips.push({
        position: trans.position,
        color: "#ef4444",
        size: 3
      });
    }, [Transform2D, EnemyAI]);
    this.uiManager.update(dt);
    this.uiManager.render(this.renderPipeline.camera);
    this._updateDebugHUD();
    requestAnimationFrame((t) => this._loop(t));
  }
  _updateDebugHUD() {
    const fpsEl = document.getElementById("hud-fps");
    const frameEl = document.getElementById("hud-frame-time");
    const entitiesEl = document.getElementById("hud-entities");
    const drawCallsEl = document.getElementById("hud-draw-calls");
    const bodiesEl = document.getElementById("hud-bodies");
    if (fpsEl) fpsEl.textContent = `${this.profiler.fps}`;
    if (frameEl) frameEl.textContent = `${this.profiler.frameTimeMs.toFixed(1)}ms`;
    if (entitiesEl) entitiesEl.textContent = `${this.world.entityManager.count}`;
    if (drawCallsEl) drawCallsEl.textContent = `${this.renderPipeline.batch.drawCalls}`;
    if (bodiesEl) bodiesEl.textContent = `${this.world.createQuery({ all: [RigidBody2D] }).count()}`;
  }
};

// src/main.ts
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas-render-target");
  const uiContainer = document.getElementById("ui-root");
  if (!canvas || !uiContainer) {
    console.error("Failed to locate canvas or UI root element");
    return;
  }
  const app = new GameApp(canvas, uiContainer);
  app.init();
  console.log("%c AetherEngine v1.0.0 Initialized Successfully ", "background: #0284c7; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;");
});
