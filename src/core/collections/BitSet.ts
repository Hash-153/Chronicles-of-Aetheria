/**
 * @file BitSet.ts
 * @description Dynamic arbitrary-length bit set for lightning-fast archetype bitmask matching, flags, and query filtering.
 */

export class BitSet {
  private _words: Uint32Array;

  constructor(bitCapacity = 64) {
    const wordCount = Math.ceil(bitCapacity / 32);
    this._words = new Uint32Array(Math.max(2, wordCount));
  }

  public set(index: number, value = true): this {
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

  public get(index: number): boolean {
    const wordIndex = index >>> 5;
    if (wordIndex >= this._words.length) return false;
    return (this._words[wordIndex] & (1 << (index & 31))) !== 0;
  }

  public toggle(index: number): this {
    this._ensureCapacity(index + 1);
    const wordIndex = index >>> 5;
    this._words[wordIndex] ^= 1 << (index & 31);
    return this;
  }

  public clear(): this {
    this._words.fill(0);
    return this;
  }

  public containsAll(other: BitSet): boolean {
    const minWords = Math.min(this._words.length, other._words.length);
    for (let i = 0; i < minWords; i++) {
      const otherWord = other._words[i];
      if ((this._words[i] & otherWord) !== otherWord) {
        return false;
      }
    }
    // If other has more words, check if any remaining bits are set
    for (let i = minWords; i < other._words.length; i++) {
      if (other._words[i] !== 0) return false;
    }
    return true;
  }

  public intersects(other: BitSet): boolean {
    const minWords = Math.min(this._words.length, other._words.length);
    for (let i = 0; i < minWords; i++) {
      if ((this._words[i] & other._words[i]) !== 0) {
        return true;
      }
    }
    return false;
  }

  public and(other: BitSet): BitSet {
    const result = new BitSet(Math.max(this._words.length, other._words.length) * 32);
    const minWords = Math.min(this._words.length, other._words.length);
    for (let i = 0; i < minWords; i++) {
      result._words[i] = this._words[i] & other._words[i];
    }
    return result;
  }

  public or(other: BitSet): BitSet {
    const maxLen = Math.max(this._words.length, other._words.length);
    const result = new BitSet(maxLen * 32);
    for (let i = 0; i < this._words.length; i++) {
      result._words[i] = this._words[i];
    }
    for (let i = 0; i < other._words.length; i++) {
      result._words[i] |= other._words[i];
    }
    return result;
  }

  public xor(other: BitSet): BitSet {
    const maxLen = Math.max(this._words.length, other._words.length);
    const result = new BitSet(maxLen * 32);
    for (let i = 0; i < maxLen; i++) {
      const a = i < this._words.length ? this._words[i] : 0;
      const b = i < other._words.length ? other._words[i] : 0;
      result._words[i] = a ^ b;
    }
    return result;
  }

  public clone(): BitSet {
    const copy = new BitSet(this._words.length * 32);
    copy._words.set(this._words);
    return copy;
  }

  public countBits(): number {
    let count = 0;
    for (let i = 0; i < this._words.length; i++) {
      let v = this._words[i];
      // Hamming weight algorithm
      v = v - ((v >>> 1) & 0x55555555);
      v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
      count += (((v + (v >>> 4)) & 0xf0f0f0f) * 0x1010101) >>> 24;
    }
    return count;
  }

  private _ensureCapacity(bits: number): void {
    const requiredWords = Math.ceil(bits / 32);
    if (requiredWords > this._words.length) {
      const newWords = new Uint32Array(Math.max(requiredWords, this._words.length * 2));
      newWords.set(this._words);
      this._words = newWords;
    }
  }
}
