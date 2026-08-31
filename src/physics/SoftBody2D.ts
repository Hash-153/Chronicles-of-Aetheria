/**
 * @file SoftBody2D.ts
 * @description 2D Soft Body physics simulation using a mass-spring-damper particle lattice.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Component } from '../core/ecs/Component.ts';

export interface SoftBodyNode {
  position: Vector2;
  previousPosition: Vector2;
  velocity: Vector2;
  force: Vector2;
  mass: number;
  invMass: number;
  isPinned: boolean;
}

export interface SoftBodySpring {
  nodeA: number;
  nodeB: number;
  restLength: number;
  stiffness: number;
  damping: number;
}

export class SoftBody2D {
  public nodes: SoftBodyNode[] = [];
  public springs: SoftBodySpring[] = [];
  public pressure = 100.0;
  public volume = 0;

  public addNode(pos: Vector2, mass = 1.0, isPinned = false): number {
    const id = this.nodes.length;
    this.nodes.push({
      position: pos.clone(),
      previousPosition: pos.clone(),
      velocity: new Vector2(),
      force: new Vector2(),
      mass,
      invMass: isPinned ? 0 : 1.0 / mass,
      isPinned,
    });
    return id;
  }

  public addSpring(nodeA: number, nodeB: number, stiffness = 300, damping = 5): void {
    const pA = this.nodes[nodeA].position;
    const pB = this.nodes[nodeB].position;
    const restLength = pA.distanceTo(pB);

    this.springs.push({
      nodeA,
      nodeB,
      restLength,
      stiffness,
      damping,
    });
  }

  public update(dt: number, gravity = new Vector2(0, 98)): void {
    // 1. Apply gravity & integrate forces
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      if (node.isPinned) continue;

      node.force.addSelf(gravity.scale(node.mass));
      node.velocity.addSelf(node.force.scale(node.invMass * dt));
      node.position.addSelf(node.velocity.scale(dt));
      node.force.set(0, 0);
    }

    // 2. Solve Spring Constraints
    for (let iter = 0; iter < 4; iter++) {
      for (let i = 0; i < this.springs.length; i++) {
        const spring = this.springs[i];
        const nA = this.nodes[spring.nodeA];
        const nB = this.nodes[spring.nodeB];

        const delta = nB.position.subtract(nA.position);
        const dist = delta.length();
        if (dist === 0) continue;

        const diff = (dist - spring.restLength) / dist;
        const norm = delta.normalize();

        const totalInvMass = nA.invMass + nB.invMass;
        if (totalInvMass <= 0) continue;

        const relVel = nB.velocity.subtract(nA.velocity);
        const dampingForce = relVel.dot(norm) * spring.damping;
        const springForce = diff * spring.stiffness;
        const totalImpulse = (springForce + dampingForce) / totalInvMass;

        if (!nA.isPinned) {
          nA.position.addSelf(norm.scale(totalImpulse * nA.invMass * 0.5));
          nA.velocity.addSelf(norm.scale(totalImpulse * nA.invMass * dt));
        }
        if (!nB.isPinned) {
          nB.position.subtractSelf(norm.scale(totalImpulse * nB.invMass * 0.5));
          nB.velocity.subtractSelf(norm.scale(totalImpulse * nB.invMass * dt));
        }
      }
    }
  }
}
