/**
 * @file NetworkPacket.ts
 * @description Binary serializer and opcode definitions for multiplayer network state sync.
 */

export const PacketOpcode = {
  Ping: 0,
  Pong: 1,
  PlayerInput: 2,
  WorldSnapshot: 3,
  EntitySpawn: 4,
  EntityDestroy: 5,
  CombatHit: 6,
  ChatMessage: 7,
} as const;
export type PacketOpcode = typeof PacketOpcode[keyof typeof PacketOpcode];

export class NetworkPacketWriter {
  private _buffer = new ArrayBuffer(1024);
  private _view = new DataView(this._buffer);
  private _offset = 0;

  constructor(opcode: PacketOpcode) {
    this.writeUint8(opcode);
  }

  public writeUint8(val: number): void {
    this._view.setUint8(this._offset++, val);
  }

  public writeInt32(val: number): void {
    this._view.setInt32(this._offset, val, true);
    this._offset += 4;
  }

  public writeFloat32(val: number): void {
    this._view.setFloat32(this._offset, val, true);
    this._offset += 4;
  }

  public getBuffer(): Uint8Array {
    return new Uint8Array(this._buffer, 0, this._offset);
  }
}
