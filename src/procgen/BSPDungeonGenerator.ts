/**
 * @file BSPDungeonGenerator.ts
 * @description Binary Space Partitioning (BSP) dungeon room and corridor generator.
 */

export interface RoomRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

class BSPLeaf {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public leftChild?: BSPLeaf;
  public rightChild?: BSPLeaf;
  public room?: RoomRect;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public split(minLeafSize = 8): boolean {
    if (this.leftChild || this.rightChild) return false;

    // Determine split orientation
    let splitH = Math.random() > 0.5;
    if (this.width > this.height && this.width / this.height >= 1.25) splitH = false;
    else if (this.height > this.width && this.height / this.width >= 1.25) splitH = true;

    const max = (splitH ? this.height : this.width) - minLeafSize;
    if (max <= minLeafSize) return false;

    const split = Math.floor(Math.random() * (max - minLeafSize) + minLeafSize);

    if (splitH) {
      this.leftChild = new BSPLeaf(this.x, this.y, this.width, split);
      this.rightChild = new BSPLeaf(this.x, this.y + split, this.width, this.height - split);
    } else {
      this.leftChild = new BSPLeaf(this.x, this.y, split, this.height);
      this.rightChild = new BSPLeaf(this.x + split, this.y, this.width - split, this.height);
    }

    return true;
  }

  public createRooms(minRoomSize = 4): void {
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

  public getRoom(): RoomRect | undefined {
    if (this.room) return this.room;
    if (this.leftChild) {
      const lRoom = this.leftChild.getRoom();
      if (lRoom) return lRoom;
    }
    if (this.rightChild) {
      const rRoom = this.rightChild.getRoom();
      if (rRoom) return rRoom;
    }
    return undefined;
  }
}

export class BSPDungeonGenerator {
  public width: number;
  public height: number;
  public grid: Uint8Array; // 0 = floor, 1 = wall
  public rooms: RoomRect[] = [];

  constructor(width = 64, height = 64) {
    this.width = width;
    this.height = height;
    this.grid = new Uint8Array(width * height).fill(1); // Start filled with solid walls
  }

  public generate(maxLeafSize = 20, minLeafSize = 8, minRoomSize = 4): void {
    this.grid.fill(1);
    this.rooms = [];

    const root = new BSPLeaf(0, 0, this.width, this.height);
    const leaves: BSPLeaf[] = [root];

    let didSplit = true;
    while (didSplit) {
      didSplit = false;
      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];
        if (!leaf.leftChild && !leaf.rightChild) {
          if (leaf.width > maxLeafSize || leaf.height > maxLeafSize || Math.random() > 0.2) {
            if (leaf.split(minLeafSize)) {
              leaves.push(leaf.leftChild!);
              leaves.push(leaf.rightChild!);
              didSplit = true;
            }
          }
        }
      }
    }

    root.createRooms(minRoomSize);

    // Carve rooms into grid
    this._carveLeaves(root);
  }

  private _carveLeaves(leaf: BSPLeaf): void {
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

  private _carveCorridor(x1: number, y1: number, x2: number, y2: number): void {
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
}
