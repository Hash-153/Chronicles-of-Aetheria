/**
 * @file UISkillTree.ts
 * @description Interactive RPG Skill Tree node graph view with unlock lines and point investment.
 */

import { UINode } from './UINode.ts';
import { Vector2 } from '../core/math/Vector2.ts';
import { Color } from '../core/math/Color.ts';

export interface SkillNodeData {
  id: string;
  name: string;
  position: Vector2;
  level: number;
  maxLevel: number;
  prerequisites: string[];
}

export class UISkillTree extends UINode {
  public skillNodes: SkillNodeData[] = [];
  public availableSkillPoints = 3;

  constructor() {
    super('UISkillTree');
    this.size.set(500, 400);
    this.backgroundColor = new Color(0.06, 0.08, 0.12, 0.95);
  }

  public addSkillNode(data: SkillNodeData): void {
    this.skillNodes.push(data);
  }

  public canUnlock(skill: SkillNodeData): boolean {
    if (this.availableSkillPoints <= 0 || skill.level >= skill.maxLevel) return false;
    for (const prereqId of skill.prerequisites) {
      const p = this.skillNodes.find(s => s.id === prereqId);
      if (!p || p.level === 0) return false;
    }
    return true;
  }

  public investPoint(skillId: string): boolean {
    const skill = this.skillNodes.find(s => s.id === skillId);
    if (!skill || !this.canUnlock(skill)) return false;

    skill.level++;
    this.availableSkillPoints--;
    return true;
  }

  protected override onRenderContent(ctx: CanvasRenderingContext2D): void {
    // 1. Draw connecting prerequisite lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;

    for (const skill of this.skillNodes) {
      for (const prereqId of skill.prerequisites) {
        const prereq = this.skillNodes.find(s => s.id === prereqId);
        if (prereq) {
          ctx.beginPath();
          ctx.moveTo(this.computedX + prereq.position.x, this.computedY + prereq.position.y);
          ctx.lineTo(this.computedX + skill.position.x, this.computedY + skill.position.y);
          ctx.stroke();
        }
      }
    }

    // 2. Draw skill node circles
    for (const skill of this.skillNodes) {
      const sx = this.computedX + skill.position.x;
      const sy = this.computedY + skill.position.y;
      const isUnlocked = skill.level > 0;

      ctx.beginPath();
      ctx.arc(sx, sy, 20, 0, Math.PI * 2);
      ctx.fillStyle = isUnlocked ? '#38bdf8' : '#334155';
      ctx.fill();
      ctx.strokeStyle = this.canUnlock(skill) ? '#facc15' : '#64748b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Node label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${skill.level}/${skill.maxLevel}`, sx, sy + 4);
    }
  }
}
