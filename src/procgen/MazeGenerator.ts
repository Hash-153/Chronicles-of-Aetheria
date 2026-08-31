/**
 * @file MazeGenerator.ts
 * @description Perfect labyrinth and maze generation via Recursive Backtracking and Randomized Kruskal.
 */

export class MazeGenerator {
  public width: number;
  public height: number;
  public grid: Uint8Array;

  constructor(width = 31, height = 31) {
    this.width = width % 2 === 0 ? width + 1 : width;
    this.height = height % 2 === 0 ? height + 1 : height;
    this.grid = new Uint8Array(this.width * this.height).fill(1); // 1 = wall, 0 = path
  }

  public generateRecursiveBacktracker(): Uint8Array {
    const visited = new Uint8Array(this.width * this.height);
    const stack: [number, number][] = [];

    const startX = 1;
    const startY = 1;
    this.grid[startY * this.width + startX] = 0;
    visited[startY * this.width + startX] = 1;
    stack.push([startX, startY]);

    const dirs = [[0, -2], [0, 2], [-2, 0], [2, 0]];

    while (stack.length > 0) {
      const [cx, cy] = stack[stack.length - 1];
      const unvisitedNeighbors: [number, number, number, number][] = [];

      for (const [dx, dy] of dirs) {
        const nx = cx + dx;
        const ny = cy + dy;
        if (nx > 0 && nx < this.width - 1 && ny > 0 && ny < this.height - 1) {
          if (visited[ny * this.width + nx] === 0) {
            unvisitedNeighbors.push([nx, ny, dx / 2, dy / 2]);
          }
        }
      }

      if (unvisitedNeighbors.length > 0) {
        const [nx, ny, wx, wy] = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
        this.grid[(cy + wy) * this.width + (cx + wx)] = 0;
        this.grid[ny * this.width + nx] = 0;
        visited[ny * this.width + nx] = 1;
        stack.push([nx, ny]);
      } else {
        stack.pop();
      }
    }

    return this.grid;
  }
}
