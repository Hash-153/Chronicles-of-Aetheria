/**
 * @file ChecksumVerifier.ts
 * @description CRC32 checksum generator and validator for tampering detection in save games.
 */

export class ChecksumVerifier {
  private static _table: Uint32Array;

  private static _initTable(): void {
    if (this._table) return;
    this._table = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      this._table[i] = c >>> 0;
    }
  }

  public static calculate(text: string): number {
    this._initTable();
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < text.length; i++) {
      const byte = text.charCodeAt(i) & 0xFF;
      crc = (crc >>> 8) ^ this._table[(crc ^ byte) & 0xFF];
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  public static verify(text: string, expectedChecksum: number): boolean {
    return this.calculate(text) === expectedChecksum;
  }
}
