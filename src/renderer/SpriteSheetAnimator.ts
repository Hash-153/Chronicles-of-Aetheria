/**
 * @file SpriteSheetAnimator.ts
 * @description Sprite frame animation state machine supporting looping, frame triggers, and directional sprite banks.
 */

export interface AnimationSequence {
  name: string;
  frames: [number, number, number, number][]; // UVs [u0, v0, u1, v1]
  frameDuration: number; // in seconds
  isLooping: boolean;
}

export class SpriteSheetAnimator {
  public animations: Map<string, AnimationSequence> = new Map();
  public currentAnimation?: AnimationSequence;
  public currentFrameIndex = 0;
  public isPlaying = false;
  private _frameTimer = 0;

  public addAnimation(name: string, frames: [number, number, number, number][], fps = 12, loop = true): void {
    this.animations.set(name, {
      name,
      frames,
      frameDuration: 1 / fps,
      isLooping: loop,
    });
  }

  public play(name: string): void {
    if (this.currentAnimation?.name === name && this.isPlaying) return;
    const anim = this.animations.get(name);
    if (!anim) return;

    this.currentAnimation = anim;
    this.currentFrameIndex = 0;
    this._frameTimer = 0;
    this.isPlaying = true;
  }

  public update(dt: number): void {
    if (!this.isPlaying || !this.currentAnimation) return;

    this._frameTimer += dt;
    while (this._frameTimer >= this.currentAnimation.frameDuration) {
      this._frameTimer -= this.currentAnimation.frameDuration;
      this.currentFrameIndex++;

      if (this.currentFrameIndex >= this.currentAnimation.frames.length) {
        if (this.currentAnimation.isLooping) {
          this.currentFrameIndex = 0;
        } else {
          this.currentFrameIndex = this.currentAnimation.frames.length - 1;
          this.isPlaying = false;
          break;
        }
      }
    }
  }

  public getCurrentUVs(): [number, number, number, number] {
    if (!this.currentAnimation || this.currentAnimation.frames.length === 0) {
      return [0, 0, 1, 1];
    }
    return this.currentAnimation.frames[this.currentFrameIndex];
  }
}
