/**
 * @file game.js
 * @description Standalone Production Game Engine Bundle for Chronicles of Aetheria.
 */

class Vector2 {
  constructor(x = 0, y = 0) { this.x = x; this.y = y; }
  set(x, y) { this.x = x; this.y = y; return this; }
  add(v) { return new Vector2(this.x + v.x, this.y + v.y); }
  subtract(v) { return new Vector2(this.x - v.x, this.y - v.y); }
  scale(s) { return new Vector2(this.x * s, this.y * s); }
  length() { return Math.sqrt(this.x * this.x + this.y * this.y); }
  lengthSquared() { return this.x * this.x + this.y * this.y; }
  distanceTo(v) { return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2); }
  normalize() { const l = this.length(); return l > 0 ? this.scale(1 / l) : new Vector2(); }
  angle() { return Math.atan2(this.y, this.x); }
  clone() { return new Vector2(this.x, this.y); }
}

// Sound Synthesizer via Web Audio API
class AudioSynth {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }
  playFireball() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }
  playHit() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }
  playLevelUp() {
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.08 + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + i * 0.08);
      osc.stop(this.ctx.currentTime + i * 0.08 + 0.2);
    });
  }
}

class GameEngine {
  constructor() {
    this.canvas = document.getElementById('canvas-render-target');
    this.ctx = this.canvas.getContext('2d');
    this.audio = new AudioSynth();

    // World & Dungeon
    this.gridWidth = 60;
    this.gridHeight = 60;
    this.tileSize = 32;
    this.grid = new Uint8Array(this.gridWidth * this.gridHeight).fill(1); // 1 = wall, 0 = floor
    this.torches = [];
    this.particles = [];
    this.floatingTexts = [];
    this.projectiles = [];
    this.loot = [];
    this.enemies = [];

    // Player Stats
    this.player = {
      pos: new Vector2(300, 300),
      vel: new Vector2(),
      rotation: 0,
      radius: 16,
      hp: 100,
      maxHp: 100,
      mp: 60,
      maxMp: 60,
      stamina: 100,
      maxStamina: 100,
      speed: 180,
      isRolling: false,
      rollTimer: 0,
      rollDir: new Vector2(),
      gold: 0,
      kills: 0,
    };

    // Camera
    this.camera = {
      pos: new Vector2(300, 300),
      zoom: 1.0,
    };

    // Controls
    this.keys = new Set();
    this.mouseScreen = new Vector2();
    this.mouseWorld = new Vector2();
    this.editorMode = false;
    this.showBounds = false;

    // Profiler
    this.fps = 60;
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.lastFpsUpdate = performance.now();

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.setupInput();
    this.generateDungeon();
    this.spawnEntities();

    requestAnimationFrame((t) => this.loop(t));
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  setupInput() {
    window.addEventListener('keydown', (e) => {
      this.keys.add(e.key.toLowerCase());
      if (e.key === 'F1') {
        this.editorMode = !this.editorMode;
        const m = document.getElementById('hud-mode');
        if (m) m.textContent = `Mode: ${this.editorMode ? 'Editor' : 'Play'}`;
      } else if (e.key === 'F3') {
        this.showBounds = !this.showBounds;
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.key.toLowerCase());
    });

    window.addEventListener('mousemove', (e) => {
      this.mouseScreen.set(e.clientX, e.clientY);
    });

    window.addEventListener('mousedown', (e) => {
      this.audio.init();
      if (e.button === 0) {
        this.castFireball();
      }
    });
  }

  generateDungeon() {
    // Carve main rooms
    const rooms = [];
    for (let r = 0; r < 9; r++) {
      const rw = Math.floor(6 + Math.random() * 8);
      const rh = Math.floor(6 + Math.random() * 8);
      const rx = Math.floor(2 + Math.random() * (this.gridWidth - rw - 4));
      const ry = Math.floor(2 + Math.random() * (this.gridHeight - rh - 4));

      for (let y = ry; y < ry + rh; y++) {
        for (let x = rx; x < rx + rw; x++) {
          this.grid[y * this.gridWidth + x] = 0;
        }
      }

      const center = new Vector2((rx + rw / 2) * this.tileSize, (ry + rh / 2) * this.tileSize);
      rooms.push({ x: rx, y: ry, w: rw, h: rh, center });

      // Add torch
      this.torches.push(center.clone());
    }

    // Connect rooms with corridors
    for (let i = 0; i < rooms.length - 1; i++) {
      const rA = rooms[i];
      const rB = rooms[i + 1];
      let cx = Math.floor(rA.x + rA.w / 2);
      let cy = Math.floor(rA.y + rA.h / 2);
      const tx = Math.floor(rB.x + rB.w / 2);
      const ty = Math.floor(rB.y + rB.h / 2);

      while (cx !== tx) {
        this.grid[cy * this.gridWidth + cx] = 0;
        this.grid[(cy + 1) * this.gridWidth + cx] = 0;
        cx += cx < tx ? 1 : -1;
      }
      while (cy !== ty) {
        this.grid[cy * this.gridWidth + cx] = 0;
        this.grid[cy * this.gridWidth + (cx + 1)] = 0;
        cy += cy < ty ? 1 : -1;
      }
    }

    if (rooms.length > 0) {
      this.player.pos = rooms[0].center.clone();
    }
  }

  spawnEntities() {
    // Spawn 8 Demon enemies
    for (let i = 0; i < 10; i++) {
      let x = Math.floor(4 + Math.random() * (this.gridWidth - 8));
      let y = Math.floor(4 + Math.random() * (this.gridHeight - 8));
      if (this.grid[y * this.gridWidth + x] === 0) {
        this.enemies.push({
          pos: new Vector2(x * this.tileSize + 16, y * this.tileSize + 16),
          vel: new Vector2(),
          hp: 60,
          maxHp: 60,
          radius: 15,
          speed: 95,
          attackTimer: 0,
          rotation: 0,
        });
      }
    }
  }

  castFireball() {
    if (this.player.mp < 10) return;
    this.player.mp -= 10;

    const dir = this.mouseWorld.subtract(this.player.pos).normalize();
    this.projectiles.push({
      pos: this.player.pos.clone(),
      vel: dir.scale(420),
      radius: 8,
      damage: 35,
      life: 2.0,
    });

    this.audio.playFireball();
  }

  castFrostNova() {
    if (this.player.mp < 25) return;
    this.player.mp -= 25;

    // Freeze all nearby enemies
    for (const enemy of this.enemies) {
      const d = enemy.pos.distanceTo(this.player.pos);
      if (d <= 140) {
        enemy.hp -= 25;
        this.spawnFloatingText(enemy.pos, '-25 Frost', '#38bdf8');
        this.spawnExplosion(enemy.pos, '#38bdf8', 12);
      }
    }
    this.audio.playHit();
  }

  spawnExplosion(pos, color = '#f59e0b', count = 16) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = 40 + Math.random() * 120;
      this.particles.push({
        pos: pos.clone(),
        vel: new Vector2(Math.cos(angle) * spd, Math.sin(angle) * spd),
        color,
        size: 3 + Math.random() * 4,
        life: 0.4 + Math.random() * 0.3,
        maxLife: 0.7,
      });
    }
  }

  spawnFloatingText(pos, text, color = '#ef4444') {
    this.floatingTexts.push({
      pos: pos.clone().add(new Vector2((Math.random() - 0.5) * 20, -15)),
      text,
      color,
      life: 0.8,
    });
  }

  update(dt) {
    // 1. Player Input & WASD Movement
    let dx = 0, dy = 0;
    if (this.keys.has('w') || this.keys.has('arrowup')) dy -= 1;
    if (this.keys.has('s') || this.keys.has('arrowdown')) dy += 1;
    if (this.keys.has('a') || this.keys.has('arrowleft')) dx -= 1;
    if (this.keys.has('d') || this.keys.has('arrowright')) dx += 1;

    const moveDir = new Vector2(dx, dy).normalize();

    // Dodge Roll
    if (this.keys.has(' ') && !this.player.isRolling && this.player.stamina >= 25 && moveDir.lengthSquared() > 0) {
      this.player.isRolling = true;
      this.player.rollTimer = 0.25;
      this.player.rollDir = moveDir.clone();
      this.player.stamina -= 25;
    }

    if (this.player.isRolling) {
      this.player.rollTimer -= dt;
      this.player.vel = this.player.rollDir.scale(360);
      if (this.player.rollTimer <= 0) this.player.isRolling = false;
    } else {
      this.player.vel = moveDir.scale(this.player.speed);
    }

    // Skills
    if (this.keys.has('1') || this.keys.has('q')) {
      this.castFireball();
      this.keys.delete('1'); this.keys.delete('q');
    } else if (this.keys.has('2') || this.keys.has('w')) {
      this.castFrostNova();
      this.keys.delete('2');
    }

    // Move Player & Wall Collisions
    const newPos = this.player.pos.add(this.player.vel.scale(dt));
    const tx = Math.floor(newPos.x / this.tileSize);
    const ty = Math.floor(newPos.y / this.tileSize);
    if (tx >= 0 && tx < this.gridWidth && ty >= 0 && ty < this.gridHeight) {
      if (this.grid[ty * this.gridWidth + tx] === 0) {
        this.player.pos = newPos;
      }
    }

    // Aiming
    this.mouseWorld = this.player.pos.add(this.mouseScreen.subtract(new Vector2(this.canvas.width / 2, this.canvas.height / 2)));
    this.player.rotation = this.mouseWorld.subtract(this.player.pos).angle();

    // Stats Regeneration
    this.player.hp = Math.min(this.player.maxHp, this.player.hp + dt * 2);
    this.player.mp = Math.min(this.player.maxMp, this.player.mp + dt * 5);
    this.player.stamina = Math.min(this.player.maxStamina, this.player.stamina + dt * 25);

    // 2. Camera follow smoothing
    this.camera.pos = this.camera.pos.add(this.player.pos.subtract(this.camera.pos).scale(dt * 6));

    // 3. Projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.pos = p.pos.add(p.vel.scale(dt));
      p.life -= dt;

      // Hit enemy
      let hit = false;
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        const e = this.enemies[j];
        if (p.pos.distanceTo(e.pos) <= e.radius + p.radius) {
          e.hp -= p.damage;
          hit = true;
          this.audio.playHit();
          this.spawnExplosion(p.pos, '#f59e0b', 14);
          this.spawnFloatingText(e.pos, `-${p.damage}`, '#ef4444');

          if (e.hp <= 0) {
            this.enemies.splice(j, 1);
            this.player.kills++;
            this.audio.playLevelUp();
            this.spawnExplosion(e.pos, '#ef4444', 24);
            // Drop loot
            this.loot.push({ pos: e.pos.clone(), gold: 20 + Math.floor(Math.random() * 30) });
          }
          break;
        }
      }

      // Hit wall
      const ptx = Math.floor(p.pos.x / this.tileSize);
      const pty = Math.floor(p.pos.y / this.tileSize);
      if (this.grid[pty * this.gridWidth + ptx] === 1) hit = true;

      if (hit || p.life <= 0) {
        this.projectiles.splice(i, 1);
      }
    }

    // 4. Enemy AI & Aggro Chase
    for (const enemy of this.enemies) {
      const dist = enemy.pos.distanceTo(this.player.pos);
      if (dist < 260) {
        const dir = this.player.pos.subtract(enemy.pos).normalize();
        enemy.pos = enemy.pos.add(dir.scale(enemy.speed * dt));
        enemy.rotation = dir.angle();

        // Melee hit player
        if (dist < enemy.radius + this.player.radius) {
          enemy.attackTimer -= dt;
          if (enemy.attackTimer <= 0) {
            enemy.attackTimer = 1.0;
            this.player.hp = Math.max(0, this.player.hp - 12);
            this.spawnFloatingText(this.player.pos, '-12', '#fb7171');
            this.audio.playHit();
          }
        }
      }
    }

    // 5. Loot magnetic collection
    for (let i = this.loot.length - 1; i >= 0; i--) {
      const item = this.loot[i];
      const dist = item.pos.distanceTo(this.player.pos);
      if (dist < 120) {
        const pull = this.player.pos.subtract(item.pos).normalize();
        item.pos = item.pos.add(pull.scale(240 * dt));
      }
      if (dist < 24) {
        this.player.gold += item.gold;
        this.spawnFloatingText(this.player.pos, `+${item.gold} Gold`, '#facc15');
        this.loot.splice(i, 1);
      }
    }

    // 6. Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const pt = this.particles[i];
      pt.pos = pt.pos.add(pt.vel.scale(dt));
      pt.life -= dt;
      if (pt.life <= 0) this.particles.splice(i, 1);
    }

    // 7. Floating Text
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.pos.y -= dt * 30;
      ft.life -= dt;
      if (ft.life <= 0) this.floatingTexts.splice(i, 1);
    }

    // 8. Update HTML HUD stats
    this.updateHUD();
  }

  updateHUD() {
    this.frameCount++;
    const now = performance.now();
    if (now - this.lastFpsUpdate >= 500) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsUpdate));
      this.frameCount = 0;
      this.lastFpsUpdate = now;

      const fpsEl = document.getElementById('hud-fps');
      const entitiesEl = document.getElementById('hud-entities');
      const bodiesEl = document.getElementById('hud-bodies');
      const collisionsEl = document.getElementById('hud-collisions');

      if (fpsEl) fpsEl.textContent = `${this.fps}`;
      if (entitiesEl) entitiesEl.textContent = `${1 + this.enemies.length + this.torches.length + this.projectiles.length}`;
      if (bodiesEl) bodiesEl.textContent = `${1 + this.enemies.length}`;
      if (collisionsEl) collisionsEl.textContent = `${this.player.kills}`;
    }
  }

  render() {
    const ctx = this.ctx;
    ctx.fillStyle = '#080a0f';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.save();
    // Camera Transform
    ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    ctx.scale(this.camera.zoom, this.camera.zoom);
    ctx.translate(-this.camera.pos.x, -this.camera.pos.y);

    // 1. Draw Dungeon Floor and Walls
    for (let y = 0; y < this.gridHeight; y++) {
      for (let x = 0; x < this.gridWidth; x++) {
        const wx = x * this.tileSize;
        const wy = y * this.tileSize;
        const isWall = this.grid[y * this.gridWidth + x] === 1;

        if (isWall) {
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(wx, wy, this.tileSize, this.tileSize);
          ctx.strokeStyle = '#334155';
          ctx.strokeRect(wx, wy, this.tileSize, this.tileSize);
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(wx + 3, wy + 3, this.tileSize - 6, this.tileSize - 6);
        } else {
          ctx.fillStyle = ((x + y) % 2 === 0) ? '#111827' : '#141e30';
          ctx.fillRect(wx, wy, this.tileSize, this.tileSize);
        }
      }
    }

    // 2. Torch Lighting Auras
    for (const t of this.torches) {
      const flick = Math.sin(performance.now() * 0.015 + t.x) * 6;
      const grad = ctx.createRadialGradient(t.x, t.y, 4, t.x, t.y, 160 + flick);
      grad.addColorStop(0, 'rgba(255, 180, 70, 0.45)');
      grad.addColorStop(0.5, 'rgba(234, 88, 12, 0.15)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(t.x, t.y, 160 + flick, 0, Math.PI * 2);
      ctx.fill();

      // Torch post
      ctx.fillStyle = '#78350f';
      ctx.fillRect(t.x - 3, t.y - 8, 6, 16);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(t.x, t.y - 8, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Loot
    for (const l of this.loot) {
      ctx.fillStyle = '#facc15';
      ctx.strokeStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(l.pos.x, l.pos.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // 4. Enemies
    for (const e of this.enemies) {
      ctx.save();
      ctx.translate(e.pos.x, e.pos.y);
      ctx.rotate(e.rotation);

      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(0, 0, e.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Horns
      ctx.fillStyle = '#450a0a';
      ctx.beginPath();
      ctx.moveTo(-6, -10); ctx.lineTo(-12, -18); ctx.lineTo(-2, -12);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(6, -10); ctx.lineTo(12, -18); ctx.lineTo(2, -12);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(4, -4, 3, 3);
      ctx.fillRect(4, 2, 3, 3);
      ctx.restore();

      // HP bar
      const pct = Math.max(0, e.hp / e.maxHp);
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(e.pos.x - 16, e.pos.y - 24, 32, 4);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(e.pos.x - 16, e.pos.y - 24, 32 * pct, 4);
    }

    // 5. Player
    ctx.save();
    ctx.translate(this.player.pos.x, this.player.pos.y);
    ctx.rotate(this.player.rotation);

    // Aura
    const pGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, 180);
    pGrad.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
    pGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = pGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 180, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(0, 0, this.player.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Sword
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(10, -3, 14, 6);
    ctx.restore();

    // 6. Projectiles (Fireballs)
    for (const p of this.projectiles) {
      const fGrad = ctx.createRadialGradient(p.pos.x, p.pos.y, 2, p.pos.x, p.pos.y, 16);
      fGrad.addColorStop(0, '#ffffff');
      fGrad.addColorStop(0.3, '#f59e0b');
      fGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = fGrad;
      ctx.beginPath();
      ctx.arc(p.pos.x, p.pos.y, 16, 0, Math.PI * 2);
      ctx.fill();
    }

    // 7. Particles
    for (const pt of this.particles) {
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.pos.x, pt.pos.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // 8. Floating Texts
    ctx.font = 'bold 13px system-ui, sans-serif';
    for (const ft of this.floatingTexts) {
      ctx.fillStyle = ft.color;
      ctx.fillText(ft.text, ft.pos.x, ft.pos.y);
    }

    ctx.restore();

    // 9. Draw Screen UI HUD (Health / Mana / Stamina / Minimap)
    this.renderUI(ctx);
  }

  renderUI(ctx) {
    const W = this.canvas.width;
    const H = this.canvas.height;

    // HP Bar
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(20, H - 72, 220, 18);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(20, H - 72, 220 * (this.player.hp / this.player.maxHp), 18);
    ctx.strokeStyle = '#334155';
    ctx.strokeRect(20, H - 72, 220, 18);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(`HP: ${Math.round(this.player.hp)} / ${this.player.maxHp}`, 26, H - 59);

    // Mana Bar
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(20, H - 50, 220, 18);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(20, H - 50, 220 * (this.player.mp / this.player.maxMp), 18);
    ctx.strokeStyle = '#334155';
    ctx.strokeRect(20, H - 50, 220, 18);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`MP: ${Math.round(this.player.mp)} / ${this.player.maxMp}`, 26, H - 37);

    // Stamina Bar
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(20, H - 28, 220, 10);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(20, H - 28, 220 * (this.player.stamina / this.player.maxStamina), 10);
    ctx.strokeStyle = '#334155';
    ctx.strokeRect(20, H - 28, 220, 10);

    // Hotbar Actions
    const spells = ['[1/LMB] Fireball', '[2] Frost Nova', '[3] Chain Lightning', '[Space] Roll'];
    for (let i = 0; i < spells.length; i++) {
      const bx = W / 2 - 200 + i * 105;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(bx, H - 42, 95, 30);
      ctx.strokeStyle = '#38bdf8';
      ctx.strokeRect(bx, H - 42, 95, 30);
      ctx.fillStyle = '#f8fafc';
      ctx.font = '10px system-ui, sans-serif';
      ctx.fillText(spells[i], bx + 6, H - 23);
    }

    // Minimap (Top-Right)
    const mw = 140, mh = 140;
    const mx = W - mw - 16, my = 16;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(mx, my, mw, mh);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(mx, my, mw, mh);

    // Player Dot
    const px = mx + (this.player.pos.x / (this.gridWidth * this.tileSize)) * mw;
    const py = my + (this.player.pos.y / (this.gridHeight * this.tileSize)) * mh;
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();

    // Enemy Dots
    ctx.fillStyle = '#ef4444';
    for (const e of this.enemies) {
      const ex = mx + (e.pos.x / (this.gridWidth * this.tileSize)) * mw;
      const ey = my + (e.pos.y / (this.gridHeight * this.tileSize)) * mh;
      ctx.beginPath();
      ctx.arc(ex, ey, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  loop(timestamp) {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05);
    this.lastTime = timestamp;

    this.update(dt);
    this.render();

    requestAnimationFrame((t) => this.loop(t));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new GameEngine();
});
