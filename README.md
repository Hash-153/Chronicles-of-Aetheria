# ⚔️ AetherEngine & Chronicles of Aetheria

A ground-up, clean-room 2D/Isometric Game Development Engine and full Action-RPG written in pure TypeScript. Designed for high throughput, zero garbage-collection pauses, modular extensibility, and 60 FPS performance.

---

## 🚀 Installation

Install the required dependencies using npm:

```bash
npm install
```

---

## 🛠️ Build

Compile and bundle the TypeScript source code for production:

```bash
npm run build
```

---

## 🎮 Running the Project

Start the local development web server:

```bash
npm start
# or
npm run dev
```

Then open your browser and navigate to `http://localhost:3000` or the URL displayed in the terminal.

---

## 🧪 Testing & Verification

Run the automated test suite covering Math, ECS, Physics, AI, Procedural Generation, and Gameplay systems:

```bash
npm test
```

To run the 10,000-entity stress test simulation benchmark:

```bash
npm run benchmark
```

---

## 🌟 Key Architecture & Subsystems

```
src/
├── core/
│   ├── math/            # Vector2/3, Matrix2/3/4, Quaternion, Bezier, Geometry2D, FixedPointMath, AABB, OBB, Ray2D, Polygon, Noise, Splines
│   ├── collections/     # ObjectPool, RingBuffer, PriorityQueue, BitSet, SparseSet, SpatialHashGrid, QuadTree, BVHTree
│   ├── ecs/             # Archetype Graph, Column Arrays, Bitmask Queries, Systems Scheduler, CommandBuffer
│   └── events/          # EventBus, Typed Signals, HFSM StateMachine, MessageQueue
├── physics/             # Dynamic AABB Tree, SoftBody2D, RopeConstraint, SAT Narrowphase, GJK 2D, Sequential Impulse Solver, Joint Constraints, CCD
├── renderer/            # WebGL2 Shaders, Instanced Sprite Batching, FontAtlasRenderer, SpriteSheetAnimator, 2D Dynamic Lighting & Shadows, Post-Processing FX
├── particles/           # GPU/CPU Particle Emitters, Force Fields, Multi-stop Color Ramps, Explosive Bursts
├── audio/               # WebAudio Procedural Synth, ADSR Envelopes, AudioDspEffects, SoundBank, 4-Channel Music Tracker, Spatial Audio Panning
├── ai/                  # 8-Directional A*, Hierarchical Pathfinding (HPA*), Sensory perception, Formations, Behavior Trees, GOAP, Threat Matrix
├── procgen/             # BSP Dungeon Carver, TownGenerator, MazeGenerator, Cellular Automata Caves, Wave Function Collapse (WFC), ItemAffixDatabase, Bestiary
├── ui/                  # Flexbox Layout Engine, UIWindow, UISlider, UITooltip, Interactive Buttons, Animated Progress Bars, Inventory Grid, Minimap
├── gameplay/            # RPG Attributes, Combat Matrix, SkillTreeDatabase, TalentTreeSystem, ItemCatalog, CraftingSystem, DialogueTreeDatabase, Quests
├── save/                # Game State Serialization, Delta Compression, CRC32 Checksum Verification, Migrations
├── network/             # NetworkPacket binary serializer, ClientPrediction, SnapshotInterpolator
├── editor/              # In-Engine Tile Painter, Live Entity Inspector, Performance Profiler, Developer Console
├── GameApp.ts           # Master Game Application Bootstrap & Orchestrator
└── main.ts              # Entrypoint
```

---

## 🎮 Game Controls

- **WASD / Arrow Keys**: Move character
- **Mouse Cursor**: Aim spell direction
- **Spacebar**: Dodge Roll (uses stamina with i-frames)
- **1 / Q**: Cast *Aetherial Fireball*
- **2 / W**: Cast *Frost Nova*
- **3 / E**: Cast *Chain Lightning*
- **4 / R**: Cast *Whirlwind*
- **F1**: Toggle In-Engine Level Editor Mode
- **F3**: Toggle Physics Wireframe Collision Bounds

---

## 🛡️ License & Ownership

- **Proprietary & Clean-room Handcrafted**: 100% original, bespoke architecture.
- **Zero Third-Party Engine / GPL Dependencies**: Pure modular TypeScript.
- **Zero API Keys or Sensitive Data**: Completely self-contained offline architecture.
- **Privacy Guaranteed**: Environment configurations, build caches, and sensitive files excluded.
