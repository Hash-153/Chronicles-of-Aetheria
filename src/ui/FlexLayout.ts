/**
 * @file FlexLayout.ts
 * @description Flexbox-style automatic layout container distributing child UINodes.
 */

import { UINode } from './UINode.ts';

export type FlexDirection = 'row' | 'column';
export type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between';
export type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch';

export class FlexLayout extends UINode {
  public direction: FlexDirection = 'row';
  public justify: JustifyContent = 'flex-start';
  public align: AlignItems = 'center';
  public gap = 8;
  public padding = 8;

  public override calculateLayout(parentWidth: number, parentHeight: number, parentX = 0, parentY = 0): void {
    super.calculateLayout(parentWidth, parentHeight, parentX, parentY);

    const isRow = this.direction === 'row';
    const mainAvailable = (isRow ? this.computedWidth : this.computedHeight) - this.padding * 2;
    const crossAvailable = (isRow ? this.computedHeight : this.computedWidth) - this.padding * 2;

    const visibleChildren = this.children.filter(c => c.isVisible);
    if (visibleChildren.length === 0) return;

    let totalChildMain = 0;
    for (const child of visibleChildren) {
      totalChildMain += isRow ? child.size.x : child.size.y;
    }
    const totalGaps = (visibleChildren.length - 1) * this.gap;
    const freeMain = Math.max(0, mainAvailable - (totalChildMain + totalGaps));

    let mainOffset = this.padding;
    let stepSpacing = this.gap;

    if (this.justify === 'center') {
      mainOffset += freeMain * 0.5;
    } else if (this.justify === 'flex-end') {
      mainOffset += freeMain;
    } else if (this.justify === 'space-between' && visibleChildren.length > 1) {
      stepSpacing = (mainAvailable - totalChildMain) / (visibleChildren.length - 1);
    }

    for (let i = 0; i < visibleChildren.length; i++) {
      const child = visibleChildren[i];
      const childMain = isRow ? child.size.x : child.size.y;
      const childCross = isRow ? child.size.y : child.size.x;

      let crossOffset = this.padding;
      if (this.align === 'center') {
        crossOffset += (crossAvailable - childCross) * 0.5;
      } else if (this.align === 'flex-end') {
        crossOffset += crossAvailable - childCross;
      }

      if (isRow) {
        child.position.set(mainOffset, crossOffset);
      } else {
        child.position.set(crossOffset, mainOffset);
      }

      mainOffset += childMain + stepSpacing;
      child.calculateLayout(this.computedWidth, this.computedHeight, this.computedX, this.computedY);
    }
  }
}
