/**
 * @file GameApp.ts
 * @description Master Game Application bootstrapping ECS World, Graphics, Physics, Audio, Procedural World Generation, and UI.
 */

import { World } from './core/ecs/World.ts';
import { Transform2D } from './core/math/Transform2D.ts';
import { Vector2 } from './core/math/Vector2.ts';
import { Color } from './core/math/Color.ts';
import { PhysicsWorld } from './physics/PhysicsWorld.ts';
import { RigidBody2D, BodyType } from './physics/RigidBody2D.ts';
import { Collider2D, ColliderShapeType } from './physics/Collider2D.ts';
import { RenderPipeline } from './renderer/RenderPipeline.ts';
import { ParticleSystem } from './particles/ParticleSystem.ts';
import { ParticleEmitter, EmitterShape } from './particles/ParticleEmitter.ts';
import { ColorRamp } from './particles/ColorRamp.ts';
import { Light2D, LightType } from './renderer/Lighting2D.ts';
import { CombatSystem } from './gameplay/CombatSystem.ts';
import { ProjectileSystem } from './gameplay/ProjectileSystem.ts';
import { PlayerControllerSystem, PlayerInput } from './gameplay/PlayerController.ts';
import { EnemyAISystem, EnemyAI } from './gameplay/EnemyAIController.ts';
import { LootDropSystem } from './gameplay/LootDropSystem.ts';
import { Attributes } from './gameplay/Attributes.ts';
import { LevelProgression } from './gameplay/LevelProgression.ts';
import { Inventory } from './gameplay/InventorySystem.ts';
import { EquipmentSlots } from './gameplay/EquipmentSlots.ts';
import { SkillManager } from './gameplay/SkillManager.ts';
import { BSPDungeonGenerator } from './procgen/BSPDungeonGenerator.ts';
import { TilemapGenerator } from './procgen/TilemapGenerator.ts';
import { DungeonDecorator, PropType } from './procgen/DungeonDecorator.ts';
import { BiomeGenerator } from './procgen/BiomeGenerator.ts';
import { UIManager } from './ui/UIManager.ts';
import { UIProgressBar } from './ui/UIProgressBar.ts';
import { UIMinimap } from './ui/UIMinimap.ts';
import { EditorState, EditorMode } from './editor/EditorState.ts';
import { PerformanceProfiler } from './editor/PerformanceProfiler.ts';
import { SoundFXGenerator } from './audio/SoundFXGenerator.ts';

export class GameApp {
  public world: World;
  public renderPipeline: RenderPipeline;
  public physicsWorld: PhysicsWorld;
  public particleSystem: ParticleSystem;
  public combatSystem: CombatSystem;
  public projectileSystem: ProjectileSystem;
  public playerController: PlayerControllerSystem;
  public enemyAI: EnemyAISystem;
  public lootDropSystem: LootDropSystem;
  public uiManager: UIManager;
  public editorState: EditorState;
  public profiler: PerformanceProfiler;

  public playerEntityId!: number;
  private _lastTime = 0;
  private _isRunning = false;

  // HUD Elements
  private _hpBar!: UIProgressBar;
  private _mpBar!: UIProgressBar;
  private _staminaBar!: UIProgressBar;
  private _minimap!: UIMinimap;

  constructor(canvas: HTMLCanvasElement, uiContainer: HTMLElement) {
    this.world = new World(10000);
    this.renderPipeline = new RenderPipeline(canvas);
    this.physicsWorld = new PhysicsWorld(new Vector2(0, 0)); // Top-down / isometric
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

    // Register all systems to ECS World
    this.world.addSystem(this.playerController);
    this.world.addSystem(this.physicsWorld);
    this.world.addSystem(this.enemyAI);
    this.world.addSystem(this.projectileSystem);
    this.world.addSystem(this.combatSystem);
    this.world.addSystem(this.lootDropSystem);
    this.world.addSystem(this.particleSystem);
    this.world.addSystem(this.renderPipeline);
  }

  public init(): void {
    this._setupUI();
    this._generateProceduralWorld();
    this._spawnPlayer();
    this._spawnMonsters();
    this._setupInputListeners();

    this._isRunning = true;
    this._lastTime = performance.now();
    requestAnimationFrame((t) => this._loop(t));
  }

  private _setupUI(): void {
    // 1. Health Bar
    this._hpBar = new UIProgressBar(100, 100, new Color(0.88, 0.2, 0.2, 1));
    this._hpBar.position.set(20, this.uiManager.canvas.height - 70);
    this._hpBar.labelPrefix = 'HP: ';
    this.uiManager.root.addChild(this._hpBar);

    // 2. Mana Bar
    this._mpBar = new UIProgressBar(50, 50, new Color(0.2, 0.5, 0.95, 1));
    this._mpBar.position.set(20, this.uiManager.canvas.height - 44);
    this._mpBar.labelPrefix = 'MP: ';
    this.uiManager.root.addChild(this._mpBar);

    // 3. Stamina Bar
    this._staminaBar = new UIProgressBar(100, 100, new Color(0.2, 0.8, 0.3, 1));
    this._staminaBar.size.set(200, 8);
    this._staminaBar.showText = false;
    this._staminaBar.position.set(20, this.uiManager.canvas.height - 18);
    this.uiManager.root.addChild(this._staminaBar);

    // 4. Minimap (Top Right)
    this._minimap = new UIMinimap();
    this._minimap.position.set(this.uiManager.canvas.width - 180, 20);
    this.uiManager.root.addChild(this._minimap);
  }

  private _generateProceduralWorld(): void {
    const dungeon = new BSPDungeonGenerator(80, 80);
    dungeon.generate(18, 8, 5);

    const baseTilemap = this.renderPipeline.tilemap;
    baseTilemap.width = 80;
    baseTilemap.height = 80;
    const floorLayer = baseTilemap.addLayer('Ground');

    const autotileData = TilemapGenerator.generateAutotileLayer(dungeon.grid, 80, 80, 0, 16);
    floorLayer.data.set(autotileData);

    // Build physical static colliders for walls
    for (let y = 0; y < 80; y++) {
      for (let x = 0; x < 80; x++) {
        if (dungeon.grid[y * 80 + x] === 1) {
          const wallEntity = this.world.createEntity();
          wallEntity.add(new Transform2D(x * 32 + 16, y * 32 + 16));
          wallEntity.add(new RigidBody2D({ type: BodyType.Static }));
          wallEntity.add(new Collider2D(ColliderShapeType.Box, { boxExtents: new Vector2(16, 16) }));
          this.physicsWorld.broadphase.register(wallEntity.id, wallEntity.get(Collider2D)!);
        }
      }
    }

    // Decorate rooms
    const props = DungeonDecorator.decorateRooms(dungeon.rooms, 32);
    for (const prop of props) {
      if (prop.type === PropType.Torch) {
        const torch = this.world.createEntity();
        torch.add(new Transform2D(prop.position.x, prop.position.y));
        torch.add(new Light2D({
          color: new Color(1, 0.7, 0.3, 1),
          radius: 180,
          flickering: true,
        }));
        // Torch flame particle emitter
        const flameEmitter = new ParticleEmitter({
          emissionRate: 15,
          shape: EmitterShape.Point,
          lifetime: [0.2, 0.5],
          speed: [10, 30],
          size: [2, 6],
          colorRamp: new ColorRamp([
            { position: 0, color: new Color(1, 0.9, 0.4, 1) },
            { position: 0.6, color: new Color(1, 0.3, 0.1, 0.8) },
            { position: 1, color: new Color(0.2, 0.2, 0.2, 0) },
          ]),
        });
        flameEmitter.gravity.set(0, -40); // Float upward
        torch.add(flameEmitter);
      }
    }
  }

  private _spawnPlayer(): void {
    const player = this.world.createEntity();
    this.playerEntityId = player.id;

    player.add(new Transform2D(200, 200));
    player.add(new RigidBody2D({
      type: BodyType.Dynamic,
      mass: 70,
      linearDamping: 0.1,
      fixedRotation: true,
    }));
    player.add(new Collider2D(ColliderShapeType.Circle, { circleRadius: 16 }));
    player.add(new Attributes({
      strength: 15,
      agility: 12,
      intelligence: 10,
      vitality: 14,
    }));
    player.add(new LevelProgression());
    player.add(new Inventory(24));
    player.add(new EquipmentSlots());
    player.add(new SkillManager());
    player.add(new PlayerInput());

    // Flashy Player Torch Aura
    player.add(new Light2D({
      color: new Color(0.9, 0.95, 1.0, 1),
      radius: 280,
      intensity: 1.2,
      flickering: false,
    }));

    this.physicsWorld.broadphase.register(player.id, player.get(Collider2D)!);
    this.renderPipeline.camera.target = player.get(Transform2D)!.position;
  }

  private _spawnMonsters(): void {
    const monsterSpawns = [
      new Vector2(400, 300),
      new Vector2(600, 450),
      new Vector2(500, 600),
      new Vector2(350, 500),
      new Vector2(700, 300),
    ];

    for (let i = 0; i < monsterSpawns.length; i++) {
      const pos = monsterSpawns[i];
      const monster = this.world.createEntity();

      monster.add(new Transform2D(pos.x, pos.y));
      monster.add(new RigidBody2D({
        type: BodyType.Dynamic,
        mass: 50,
        linearDamping: 0.1,
        fixedRotation: true,
      }));
      monster.add(new Collider2D(ColliderShapeType.Circle, { circleRadius: 16 }));
      monster.add(new Attributes({
        maxHealth: 60,
        currentHealth: 60,
        attackPower: 12,
        moveSpeed: 110,
      }));
      monster.add(new EnemyAI());

      this.physicsWorld.broadphase.register(monster.id, monster.get(Collider2D)!);
    }
  }

  private _setupInputListeners(): void {
    window.addEventListener('mousemove', (e) => {
      const player = this.world.getEntity(this.playerEntityId);
      if (player) {
        const input = player.get(PlayerInput);
        if (input) {
          const worldPos = this.renderPipeline.camera.screenToWorld(new Vector2(e.clientX, e.clientY));
          input.mouseWorldPos.copy(worldPos);
        }
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'F1') {
        this.editorState.mode = this.editorState.mode === EditorMode.Play ? EditorMode.Edit : EditorMode.Play;
        const hudMode = document.getElementById('hud-mode');
        if (hudMode) hudMode.textContent = `Mode: ${this.editorState.mode === EditorMode.Play ? 'Play' : 'Editor'}`;
      } else if (e.key === 'F3') {
        this.editorState.showPhysicsBounds = !this.editorState.showPhysicsBounds;
      }
    });
  }

  private _loop(timestamp: number): void {
    if (!this._isRunning) return;

    this.profiler.beginFrame();
    const dt = Math.min((timestamp - this._lastTime) / 1000, 0.05);
    this._lastTime = timestamp;

    // 1. Update World ECS
    this.world.update(dt);

    // 2. Sync UI state with player stats
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

    // 3. Update Minimap Blips
    this._minimap.blips = [];
    const enemyQuery = this.world.createQuery({ all: [Transform2D, EnemyAI] });
    enemyQuery.forEach((id, trans: Transform2D) => {
      this._minimap.blips.push({
        position: trans.position,
        color: '#ef4444',
        size: 3,
      });
    }, [Transform2D, EnemyAI]);

    // 4. Update and Render UI
    this.uiManager.update(dt);
    this.uiManager.render(this.renderPipeline.camera);

    // 5. Update HTML Debug HUD
    this._updateDebugHUD();

    requestAnimationFrame((t) => this._loop(t));
  }

  private _updateDebugHUD(): void {
    const fpsEl = document.getElementById('hud-fps');
    const frameEl = document.getElementById('hud-frame-time');
    const entitiesEl = document.getElementById('hud-entities');
    const drawCallsEl = document.getElementById('hud-draw-calls');
    const bodiesEl = document.getElementById('hud-bodies');

    if (fpsEl) fpsEl.textContent = `${this.profiler.fps}`;
    if (frameEl) frameEl.textContent = `${this.profiler.frameTimeMs.toFixed(1)}ms`;
    if (entitiesEl) entitiesEl.textContent = `${this.world.entityManager.count}`;
    if (drawCallsEl) drawCallsEl.textContent = `${this.renderPipeline.batch.drawCalls}`;
    if (bodiesEl) bodiesEl.textContent = `${this.world.createQuery({ all: [RigidBody2D] }).count()}`;
  }
}
