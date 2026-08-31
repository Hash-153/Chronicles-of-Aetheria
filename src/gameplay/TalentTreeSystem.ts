/**
 * @file TalentTreeSystem.ts
 * @description Giant passive talent constellation matrix with stat modifiers, keystone masteries, and path nodes.
 */

export interface TalentNode {
  id: string;
  name: string;
  x: number;
  y: number;
  isKeystone: boolean;
  connectedNodes: string[];
  statModifiers: Record<string, number>;
  description: string;
}

export const TALENT_CONSTELLATION: TalentNode[] = [
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 60.0,
    y: 0.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      strength: 2,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 42.4,
    y: 42.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 2,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 0.0,
    y: 60.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      intelligence: 2,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -42.4,
    y: 42.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 2,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -60.0,
    y: 0.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      strength: 2,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -42.4,
    y: -42.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 2,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -0.0,
    y: -60.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      intelligence: 2,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 42.4,
    y: -42.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 2,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 120.0,
    y: 0.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 4,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 110.9,
    y: 45.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 4,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 84.9,
    y: 84.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 4,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 45.9,
    y: 110.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 4,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 0.0,
    y: 120.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 4,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -45.9,
    y: 110.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 4,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -84.9,
    y: 84.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 4,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -110.9,
    y: 45.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 4,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -120.0,
    y: 0.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 4,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -110.9,
    y: -45.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 4,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -84.9,
    y: -84.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 4,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -45.9,
    y: -110.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 4,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -0.0,
    y: -120.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 4,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 45.9,
    y: -110.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 4,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 84.9,
    y: -84.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 4,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 110.9,
    y: -45.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 4,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 180.0,
    y: 0.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 6,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 173.9,
    y: 46.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 6,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 155.9,
    y: 90.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 6,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 127.3,
    y: 127.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 6,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 90.0,
    y: 155.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 6,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 46.6,
    y: 173.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 6,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 0.0,
    y: 180.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 6,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -46.6,
    y: 173.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 6,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -90.0,
    y: 155.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 6,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -127.3,
    y: 127.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 6,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -155.9,
    y: 90.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 6,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -173.9,
    y: 46.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 6,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -180.0,
    y: 0.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 6,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -173.9,
    y: -46.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 6,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -155.9,
    y: -90.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 6,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -127.3,
    y: -127.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 6,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -90.0,
    y: -155.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 6,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -46.6,
    y: -173.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 6,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -0.0,
    y: -180.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 6,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 46.6,
    y: -173.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 6,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 90.0,
    y: -155.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 6,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 127.3,
    y: -127.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 6,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 155.9,
    y: -90.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 6,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 173.9,
    y: -46.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 6,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 240.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 8,
      
      
      
      attackPower: 40, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 235.4,
    y: 46.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 8,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 221.7,
    y: 91.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 8,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 199.6,
    y: 133.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 8,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 169.7,
    y: 169.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 8,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 133.3,
    y: 199.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 8,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 91.8,
    y: 221.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 8,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 46.8,
    y: 235.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 8,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 0.0,
    y: 240.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 8,
      
      
      
      attackPower: 40, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -46.8,
    y: 235.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 8,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -91.8,
    y: 221.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 8,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -133.3,
    y: 199.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 8,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -169.7,
    y: 169.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 8,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -199.6,
    y: 133.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 8,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -221.7,
    y: 91.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 8,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -235.4,
    y: 46.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 8,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -240.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 8,
      
      
      
      attackPower: 40, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -235.4,
    y: -46.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 8,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -221.7,
    y: -91.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 8,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -199.6,
    y: -133.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 8,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -169.7,
    y: -169.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 8,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -133.3,
    y: -199.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 8,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -91.8,
    y: -221.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 8,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -46.8,
    y: -235.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 8,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -0.0,
    y: -240.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 8,
      
      
      
      attackPower: 40, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 46.8,
    y: -235.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 8,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 91.8,
    y: -221.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 8,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 133.3,
    y: -199.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 8,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 169.7,
    y: -169.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 8,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 199.6,
    y: -133.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 8,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 221.7,
    y: -91.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 8,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 235.4,
    y: -46.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 8,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 300.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 10,
      
      
      
      attackPower: 50, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 296.3,
    y: 46.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 10,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 285.3,
    y: 92.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 10,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 267.3,
    y: 136.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 10,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 242.7,
    y: 176.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 10,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 212.1,
    y: 212.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 10,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 176.3,
    y: 242.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 10,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 136.2,
    y: 267.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 10,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 92.7,
    y: 285.3,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 10,
      
      
      
      attackPower: 50, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 46.9,
    y: 296.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 10,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 0.0,
    y: 300.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 10,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -46.9,
    y: 296.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 10,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -92.7,
    y: 285.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 10,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -136.2,
    y: 267.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 10,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -176.3,
    y: 242.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 10,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -212.1,
    y: 212.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 10,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -242.7,
    y: 176.3,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 10,
      
      
      
      attackPower: 50, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -267.3,
    y: 136.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 10,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -285.3,
    y: 92.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 10,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -296.3,
    y: 46.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 10,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -300.0,
    y: 0.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 10,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -296.3,
    y: -46.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 10,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -285.3,
    y: -92.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 10,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -267.3,
    y: -136.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 10,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -242.7,
    y: -176.3,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 10,
      
      
      
      attackPower: 50, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -212.1,
    y: -212.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 10,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -176.3,
    y: -242.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 10,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -136.2,
    y: -267.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 10,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -92.7,
    y: -285.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 10,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -46.9,
    y: -296.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 10,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -0.0,
    y: -300.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 10,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 46.9,
    y: -296.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 10,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 92.7,
    y: -285.3,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 10,
      
      
      
      attackPower: 50, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 136.2,
    y: -267.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 10,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 176.3,
    y: -242.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 10,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 212.1,
    y: -212.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 10,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 242.7,
    y: -176.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 10,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 267.3,
    y: -136.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 10,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 285.3,
    y: -92.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 10,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 296.3,
    y: -46.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 10,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 360.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 12,
      
      
      
      attackPower: 60, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 356.9,
    y: 47.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 12,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 347.7,
    y: 93.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 12,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 332.6,
    y: 137.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 12,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 311.8,
    y: 180.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 12,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 285.6,
    y: 219.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 12,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 254.6,
    y: 254.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 12,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 219.2,
    y: 285.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 12,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 180.0,
    y: 311.8,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 12,
      
      
      
      attackPower: 60, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 137.8,
    y: 332.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 12,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 93.2,
    y: 347.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 12,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.0,
    y: 356.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 12,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 0.0,
    y: 360.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 12,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.0,
    y: 356.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 12,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -93.2,
    y: 347.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 12,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -137.8,
    y: 332.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 12,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -180.0,
    y: 311.8,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 12,
      
      
      
      attackPower: 60, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -219.2,
    y: 285.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 12,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -254.6,
    y: 254.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 12,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -285.6,
    y: 219.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 12,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -311.8,
    y: 180.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 12,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -332.6,
    y: 137.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 12,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -347.7,
    y: 93.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 12,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -356.9,
    y: 47.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 12,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -360.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 12,
      
      
      
      attackPower: 60, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -356.9,
    y: -47.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 12,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -347.7,
    y: -93.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 12,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -332.6,
    y: -137.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 12,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -311.8,
    y: -180.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 12,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -285.6,
    y: -219.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 12,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -254.6,
    y: -254.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 12,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -219.2,
    y: -285.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 12,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -180.0,
    y: -311.8,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 12,
      
      
      
      attackPower: 60, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -137.8,
    y: -332.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 12,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -93.2,
    y: -347.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 12,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.0,
    y: -356.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 12,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -0.0,
    y: -360.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 12,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.0,
    y: -356.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 12,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 93.2,
    y: -347.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 12,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 137.8,
    y: -332.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 12,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 180.0,
    y: -311.8,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 12,
      
      
      
      attackPower: 60, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 219.2,
    y: -285.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 12,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 254.6,
    y: -254.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 12,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 285.6,
    y: -219.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 12,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 311.8,
    y: -180.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 12,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 332.6,
    y: -137.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 12,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 347.7,
    y: -93.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 12,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 356.9,
    y: -47.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 12,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 420.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 14,
      
      
      
      attackPower: 70, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 417.4,
    y: 47.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 14,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 409.5,
    y: 93.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 14,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 396.4,
    y: 138.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 14,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 378.4,
    y: 182.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 14,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 355.6,
    y: 223.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 14,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 328.4,
    y: 261.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 14,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 297.0,
    y: 297.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 14,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 261.9,
    y: 328.4,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 14,
      
      
      
      attackPower: 70, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 223.5,
    y: 355.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 14,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 182.2,
    y: 378.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 14,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 138.7,
    y: 396.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 14,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 93.5,
    y: 409.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 14,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.0,
    y: 417.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 14,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 0.0,
    y: 420.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 14,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.0,
    y: 417.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 14,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -93.5,
    y: 409.5,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 14,
      
      
      
      attackPower: 70, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -138.7,
    y: 396.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 14,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -182.2,
    y: 378.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 14,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -223.5,
    y: 355.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 14,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -261.9,
    y: 328.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 14,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -297.0,
    y: 297.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 14,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -328.4,
    y: 261.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 14,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -355.6,
    y: 223.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 14,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -378.4,
    y: 182.2,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 14,
      
      
      
      attackPower: 70, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -396.4,
    y: 138.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 14,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -409.5,
    y: 93.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 14,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -417.4,
    y: 47.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 14,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -420.0,
    y: 0.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 14,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -417.4,
    y: -47.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 14,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -409.5,
    y: -93.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 14,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -396.4,
    y: -138.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 14,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -378.4,
    y: -182.2,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 14,
      
      
      
      attackPower: 70, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -355.6,
    y: -223.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 14,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -328.4,
    y: -261.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 14,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -297.0,
    y: -297.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 14,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -261.9,
    y: -328.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 14,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -223.5,
    y: -355.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 14,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -182.2,
    y: -378.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 14,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -138.7,
    y: -396.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 14,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -93.5,
    y: -409.5,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 14,
      
      
      
      attackPower: 70, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.0,
    y: -417.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 14,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -0.0,
    y: -420.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 14,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.0,
    y: -417.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 14,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 93.5,
    y: -409.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 14,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 138.7,
    y: -396.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 14,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 182.2,
    y: -378.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 14,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 223.5,
    y: -355.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 14,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 261.9,
    y: -328.4,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 14,
      
      
      
      attackPower: 70, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 297.0,
    y: -297.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 14,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 328.4,
    y: -261.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 14,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 355.6,
    y: -223.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 14,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 378.4,
    y: -182.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 14,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 396.4,
    y: -138.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 14,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 409.5,
    y: -93.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 14,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 417.4,
    y: -47.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 14,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 480.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      attackPower: 80, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 477.7,
    y: 47.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 470.8,
    y: 93.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 459.3,
    y: 139.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 443.5,
    y: 183.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 423.3,
    y: 226.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 399.1,
    y: 266.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 371.0,
    y: 304.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 339.4,
    y: 339.4,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      attackPower: 80, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 304.5,
    y: 371.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 266.7,
    y: 399.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 226.3,
    y: 423.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 183.7,
    y: 443.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 139.3,
    y: 459.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 93.6,
    y: 470.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.0,
    y: 477.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 0.0,
    y: 480.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      attackPower: 80, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.0,
    y: 477.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -93.6,
    y: 470.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -139.3,
    y: 459.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -183.7,
    y: 443.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -226.3,
    y: 423.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -266.7,
    y: 399.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -304.5,
    y: 371.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -339.4,
    y: 339.4,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      attackPower: 80, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -371.0,
    y: 304.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -399.1,
    y: 266.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -423.3,
    y: 226.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -443.5,
    y: 183.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -459.3,
    y: 139.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -470.8,
    y: 93.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -477.7,
    y: 47.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -480.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      attackPower: 80, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -477.7,
    y: -47.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -470.8,
    y: -93.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -459.3,
    y: -139.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -443.5,
    y: -183.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -423.3,
    y: -226.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -399.1,
    y: -266.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -371.0,
    y: -304.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -339.4,
    y: -339.4,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      attackPower: 80, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -304.5,
    y: -371.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -266.7,
    y: -399.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -226.3,
    y: -423.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -183.7,
    y: -443.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -139.3,
    y: -459.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -93.6,
    y: -470.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.0,
    y: -477.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -0.0,
    y: -480.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      attackPower: 80, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.0,
    y: -477.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 93.6,
    y: -470.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 139.3,
    y: -459.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 183.7,
    y: -443.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 226.3,
    y: -423.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 266.7,
    y: -399.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 304.5,
    y: -371.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 339.4,
    y: -339.4,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      attackPower: 80, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 371.0,
    y: -304.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 399.1,
    y: -266.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 423.3,
    y: -226.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 443.5,
    y: -183.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 16,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 459.3,
    y: -139.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 16,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 470.8,
    y: -93.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 16,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 477.7,
    y: -47.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 16,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 540.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      attackPower: 90, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 537.9,
    y: 47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 531.8,
    y: 93.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 521.6,
    y: 139.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 507.4,
    y: 184.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 489.4,
    y: 228.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 467.7,
    y: 270.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 442.3,
    y: 309.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 413.7,
    y: 347.1,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      attackPower: 90, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 381.8,
    y: 381.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 347.1,
    y: 413.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 309.7,
    y: 442.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 270.0,
    y: 467.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 228.2,
    y: 489.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 184.7,
    y: 507.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 139.8,
    y: 521.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 93.8,
    y: 531.8,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      attackPower: 90, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.1,
    y: 537.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 0.0,
    y: 540.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.1,
    y: 537.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -93.8,
    y: 531.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -139.8,
    y: 521.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -184.7,
    y: 507.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -228.2,
    y: 489.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -270.0,
    y: 467.7,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      attackPower: 90, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -309.7,
    y: 442.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -347.1,
    y: 413.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -381.8,
    y: 381.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -413.7,
    y: 347.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -442.3,
    y: 309.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -467.7,
    y: 270.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -489.4,
    y: 228.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -507.4,
    y: 184.7,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      attackPower: 90, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -521.6,
    y: 139.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -531.8,
    y: 93.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -537.9,
    y: 47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -540.0,
    y: 0.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -537.9,
    y: -47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -531.8,
    y: -93.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -521.6,
    y: -139.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -507.4,
    y: -184.7,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      attackPower: 90, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -489.4,
    y: -228.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -467.7,
    y: -270.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -442.3,
    y: -309.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -413.7,
    y: -347.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -381.8,
    y: -381.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -347.1,
    y: -413.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -309.7,
    y: -442.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -270.0,
    y: -467.7,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      attackPower: 90, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -228.2,
    y: -489.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -184.7,
    y: -507.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -139.8,
    y: -521.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -93.8,
    y: -531.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.1,
    y: -537.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -0.0,
    y: -540.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.1,
    y: -537.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 93.8,
    y: -531.8,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      attackPower: 90, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 139.8,
    y: -521.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 184.7,
    y: -507.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 228.2,
    y: -489.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 270.0,
    y: -467.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 309.7,
    y: -442.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 347.1,
    y: -413.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 381.8,
    y: -381.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 413.7,
    y: -347.1,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      attackPower: 90, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 442.3,
    y: -309.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 467.7,
    y: -270.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 489.4,
    y: -228.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 507.4,
    y: -184.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 18,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 521.6,
    y: -139.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 18,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 531.8,
    y: -93.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 18,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 537.9,
    y: -47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 18,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 600.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      attackPower: 100, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 598.2,
    y: 47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 592.6,
    y: 93.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 583.4,
    y: 140.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 570.6,
    y: 185.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 554.3,
    y: 229.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 534.6,
    y: 272.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 511.6,
    y: 313.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 485.4,
    y: 352.7,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      attackPower: 100, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 456.2,
    y: 389.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 424.3,
    y: 424.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 389.7,
    y: 456.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 352.7,
    y: 485.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 313.5,
    y: 511.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 272.4,
    y: 534.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 229.6,
    y: 554.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 185.4,
    y: 570.6,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      attackPower: 100, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 140.1,
    y: 583.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 93.9,
    y: 592.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.1,
    y: 598.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 0.0,
    y: 600.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.1,
    y: 598.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -93.9,
    y: 592.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -140.1,
    y: 583.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -185.4,
    y: 570.6,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      attackPower: 100, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -229.6,
    y: 554.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -272.4,
    y: 534.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -313.5,
    y: 511.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -352.7,
    y: 485.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -389.7,
    y: 456.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -424.3,
    y: 424.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -456.2,
    y: 389.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -485.4,
    y: 352.7,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      attackPower: 100, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -511.6,
    y: 313.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -534.6,
    y: 272.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -554.3,
    y: 229.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -570.6,
    y: 185.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -583.4,
    y: 140.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -592.6,
    y: 93.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -598.2,
    y: 47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -600.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      attackPower: 100, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -598.2,
    y: -47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -592.6,
    y: -93.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -583.4,
    y: -140.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -570.6,
    y: -185.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -554.3,
    y: -229.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -534.6,
    y: -272.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -511.6,
    y: -313.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -485.4,
    y: -352.7,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      attackPower: 100, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -456.2,
    y: -389.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -424.3,
    y: -424.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -389.7,
    y: -456.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -352.7,
    y: -485.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -313.5,
    y: -511.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -272.4,
    y: -534.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -229.6,
    y: -554.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -185.4,
    y: -570.6,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      attackPower: 100, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -140.1,
    y: -583.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -93.9,
    y: -592.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.1,
    y: -598.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -0.0,
    y: -600.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.1,
    y: -598.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 93.9,
    y: -592.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 140.1,
    y: -583.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 185.4,
    y: -570.6,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      attackPower: 100, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 229.6,
    y: -554.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 272.4,
    y: -534.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 313.5,
    y: -511.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 352.7,
    y: -485.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 389.7,
    y: -456.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 424.3,
    y: -424.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 456.2,
    y: -389.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 485.4,
    y: -352.7,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      attackPower: 100, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 511.6,
    y: -313.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 534.6,
    y: -272.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 554.3,
    y: -229.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 570.6,
    y: -185.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 20,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 583.4,
    y: -140.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 20,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 592.6,
    y: -93.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 20,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 598.2,
    y: -47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 20,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 660.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      attackPower: 110, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 658.3,
    y: 47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 653.3,
    y: 93.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 644.9,
    y: 140.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 633.3,
    y: 185.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 618.4,
    y: 230.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 600.4,
    y: 274.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 579.3,
    y: 316.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 555.2,
    y: 356.8,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      attackPower: 110, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 528.4,
    y: 395.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 498.8,
    y: 432.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 466.7,
    y: 466.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 432.2,
    y: 498.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 395.5,
    y: 528.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 356.8,
    y: 555.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 316.3,
    y: 579.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 274.2,
    y: 600.4,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      attackPower: 110, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 230.6,
    y: 618.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 185.9,
    y: 633.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 140.3,
    y: 644.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 93.9,
    y: 653.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.1,
    y: 658.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 0.0,
    y: 660.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.1,
    y: 658.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -93.9,
    y: 653.3,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      attackPower: 110, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -140.3,
    y: 644.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -185.9,
    y: 633.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -230.6,
    y: 618.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -274.2,
    y: 600.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -316.3,
    y: 579.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -356.8,
    y: 555.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -395.5,
    y: 528.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -432.2,
    y: 498.8,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      attackPower: 110, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -466.7,
    y: 466.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -498.8,
    y: 432.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -528.4,
    y: 395.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -555.2,
    y: 356.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -579.3,
    y: 316.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -600.4,
    y: 274.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -618.4,
    y: 230.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -633.3,
    y: 185.9,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      attackPower: 110, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -644.9,
    y: 140.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -653.3,
    y: 93.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -658.3,
    y: 47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -660.0,
    y: 0.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -658.3,
    y: -47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -653.3,
    y: -93.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -644.9,
    y: -140.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -633.3,
    y: -185.9,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      attackPower: 110, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -618.4,
    y: -230.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -600.4,
    y: -274.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -579.3,
    y: -316.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -555.2,
    y: -356.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -528.4,
    y: -395.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -498.8,
    y: -432.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -466.7,
    y: -466.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -432.2,
    y: -498.8,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      attackPower: 110, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -395.5,
    y: -528.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -356.8,
    y: -555.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -316.3,
    y: -579.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -274.2,
    y: -600.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -230.6,
    y: -618.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -185.9,
    y: -633.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -140.3,
    y: -644.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -93.9,
    y: -653.3,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      attackPower: 110, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.1,
    y: -658.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -0.0,
    y: -660.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.1,
    y: -658.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 93.9,
    y: -653.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 140.3,
    y: -644.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 185.9,
    y: -633.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 230.6,
    y: -618.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 274.2,
    y: -600.4,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      attackPower: 110, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 316.3,
    y: -579.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 356.8,
    y: -555.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 395.5,
    y: -528.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 432.2,
    y: -498.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 466.7,
    y: -466.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 498.8,
    y: -432.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 528.4,
    y: -395.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 555.2,
    y: -356.8,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      attackPower: 110, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 579.3,
    y: -316.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 600.4,
    y: -274.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 618.4,
    y: -230.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 633.3,
    y: -185.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 22,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 644.9,
    y: -140.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 22,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 653.3,
    y: -93.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 22,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 658.3,
    y: -47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 22,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 720.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      attackPower: 120, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 718.5,
    y: 47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 713.8,
    y: 94.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 706.2,
    y: 140.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 695.5,
    y: 186.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 681.8,
    y: 231.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 665.2,
    y: 275.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 645.7,
    y: 318.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 623.5,
    y: 360.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      attackPower: 120, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 598.7,
    y: 400.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 571.2,
    y: 438.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 541.3,
    y: 474.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 509.1,
    y: 509.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 474.7,
    y: 541.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 438.3,
    y: 571.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 400.0,
    y: 598.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 360.0,
    y: 623.5,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      attackPower: 120, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 318.4,
    y: 645.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 275.5,
    y: 665.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 231.4,
    y: 681.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 186.3,
    y: 695.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 140.5,
    y: 706.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 94.0,
    y: 713.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.1,
    y: 718.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 0.0,
    y: 720.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      attackPower: 120, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.1,
    y: 718.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -94.0,
    y: 713.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -140.5,
    y: 706.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -186.3,
    y: 695.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -231.4,
    y: 681.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -275.5,
    y: 665.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -318.4,
    y: 645.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -360.0,
    y: 623.5,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      attackPower: 120, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -400.0,
    y: 598.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -438.3,
    y: 571.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -474.7,
    y: 541.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -509.1,
    y: 509.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -541.3,
    y: 474.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -571.2,
    y: 438.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -598.7,
    y: 400.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -623.5,
    y: 360.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      attackPower: 120, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -645.7,
    y: 318.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -665.2,
    y: 275.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -681.8,
    y: 231.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -695.5,
    y: 186.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -706.2,
    y: 140.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -713.8,
    y: 94.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -718.5,
    y: 47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -720.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      attackPower: 120, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -718.5,
    y: -47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -713.8,
    y: -94.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -706.2,
    y: -140.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -695.5,
    y: -186.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -681.8,
    y: -231.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -665.2,
    y: -275.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -645.7,
    y: -318.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -623.5,
    y: -360.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      attackPower: 120, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -598.7,
    y: -400.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -571.2,
    y: -438.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -541.3,
    y: -474.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -509.1,
    y: -509.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -474.7,
    y: -541.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -438.3,
    y: -571.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -400.0,
    y: -598.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -360.0,
    y: -623.5,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      attackPower: 120, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -318.4,
    y: -645.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -275.5,
    y: -665.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -231.4,
    y: -681.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -186.3,
    y: -695.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -140.5,
    y: -706.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -94.0,
    y: -713.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.1,
    y: -718.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -0.0,
    y: -720.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      attackPower: 120, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.1,
    y: -718.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 94.0,
    y: -713.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 140.5,
    y: -706.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 186.3,
    y: -695.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 231.4,
    y: -681.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 275.5,
    y: -665.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 318.4,
    y: -645.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 360.0,
    y: -623.5,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      attackPower: 120, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 400.0,
    y: -598.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 438.3,
    y: -571.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 474.7,
    y: -541.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 509.1,
    y: -509.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 541.3,
    y: -474.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 571.2,
    y: -438.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 598.7,
    y: -400.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 623.5,
    y: -360.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      attackPower: 120, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 645.7,
    y: -318.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 665.2,
    y: -275.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 681.8,
    y: -231.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 695.5,
    y: -186.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 24,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 706.2,
    y: -140.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 24,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 713.8,
    y: -94.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 24,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 718.5,
    y: -47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 24,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 780.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      attackPower: 130, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 778.6,
    y: 47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 774.3,
    y: 94.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 767.2,
    y: 140.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 757.3,
    y: 186.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 744.7,
    y: 232.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 729.3,
    y: 276.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 711.3,
    y: 320.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 690.7,
    y: 362.5,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      attackPower: 130, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 667.5,
    y: 403.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 641.9,
    y: 443.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 614.0,
    y: 481.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 583.8,
    y: 517.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 551.5,
    y: 551.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 517.2,
    y: 583.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 481.0,
    y: 614.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 443.1,
    y: 641.9,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      attackPower: 130, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 403.5,
    y: 667.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 362.5,
    y: 690.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 320.1,
    y: 711.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 276.6,
    y: 729.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 232.1,
    y: 744.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 186.7,
    y: 757.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 140.6,
    y: 767.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 94.0,
    y: 774.3,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      attackPower: 130, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.1,
    y: 778.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 0.0,
    y: 780.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.1,
    y: 778.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -94.0,
    y: 774.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -140.6,
    y: 767.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -186.7,
    y: 757.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -232.1,
    y: 744.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -276.6,
    y: 729.3,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      attackPower: 130, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -320.1,
    y: 711.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -362.5,
    y: 690.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -403.5,
    y: 667.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -443.1,
    y: 641.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -481.0,
    y: 614.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -517.2,
    y: 583.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -551.5,
    y: 551.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -583.8,
    y: 517.2,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      attackPower: 130, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -614.0,
    y: 481.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -641.9,
    y: 443.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -667.5,
    y: 403.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -690.7,
    y: 362.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -711.3,
    y: 320.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -729.3,
    y: 276.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -744.7,
    y: 232.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -757.3,
    y: 186.7,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      attackPower: 130, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -767.2,
    y: 140.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -774.3,
    y: 94.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -778.6,
    y: 47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -780.0,
    y: 0.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -778.6,
    y: -47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -774.3,
    y: -94.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -767.2,
    y: -140.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -757.3,
    y: -186.7,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      attackPower: 130, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -744.7,
    y: -232.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -729.3,
    y: -276.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -711.3,
    y: -320.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -690.7,
    y: -362.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -667.5,
    y: -403.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -641.9,
    y: -443.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -614.0,
    y: -481.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -583.8,
    y: -517.2,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      attackPower: 130, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -551.5,
    y: -551.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -517.2,
    y: -583.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -481.0,
    y: -614.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -443.1,
    y: -641.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -403.5,
    y: -667.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -362.5,
    y: -690.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -320.1,
    y: -711.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -276.6,
    y: -729.3,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      attackPower: 130, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -232.1,
    y: -744.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -186.7,
    y: -757.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -140.6,
    y: -767.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -94.0,
    y: -774.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.1,
    y: -778.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -0.0,
    y: -780.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.1,
    y: -778.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 94.0,
    y: -774.3,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      attackPower: 130, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 140.6,
    y: -767.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 186.7,
    y: -757.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 232.1,
    y: -744.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 276.6,
    y: -729.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 320.1,
    y: -711.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 362.5,
    y: -690.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 403.5,
    y: -667.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 443.1,
    y: -641.9,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      attackPower: 130, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 481.0,
    y: -614.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 517.2,
    y: -583.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 551.5,
    y: -551.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 583.8,
    y: -517.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 614.0,
    y: -481.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 641.9,
    y: -443.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 667.5,
    y: -403.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 690.7,
    y: -362.5,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      attackPower: 130, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 711.3,
    y: -320.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 729.3,
    y: -276.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 744.7,
    y: -232.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 757.3,
    y: -186.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 26,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 767.2,
    y: -140.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 26,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 774.3,
    y: -94.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 26,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 778.6,
    y: -47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 26,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 840.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      attackPower: 140, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 838.7,
    y: 47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 834.7,
    y: 94.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 828.1,
    y: 140.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 818.9,
    y: 186.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 807.2,
    y: 232.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 792.9,
    y: 277.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 776.1,
    y: 321.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 756.8,
    y: 364.5,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      attackPower: 140, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 735.2,
    y: 406.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 711.2,
    y: 446.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 685.1,
    y: 486.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 656.7,
    y: 523.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 626.3,
    y: 559.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 594.0,
    y: 594.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 559.7,
    y: 626.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 523.7,
    y: 656.7,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      attackPower: 140, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 486.1,
    y: 685.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 446.9,
    y: 711.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 406.3,
    y: 735.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 364.5,
    y: 756.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 321.5,
    y: 776.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 277.4,
    y: 792.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 232.5,
    y: 807.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 186.9,
    y: 818.9,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      attackPower: 140, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 140.7,
    y: 828.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 94.1,
    y: 834.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.1,
    y: 838.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 0.0,
    y: 840.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.1,
    y: 838.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -94.1,
    y: 834.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -140.7,
    y: 828.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -186.9,
    y: 818.9,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      attackPower: 140, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -232.5,
    y: 807.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -277.4,
    y: 792.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -321.5,
    y: 776.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -364.5,
    y: 756.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -406.3,
    y: 735.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -446.9,
    y: 711.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -486.1,
    y: 685.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -523.7,
    y: 656.7,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      attackPower: 140, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -559.7,
    y: 626.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -594.0,
    y: 594.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -626.3,
    y: 559.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -656.7,
    y: 523.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -685.1,
    y: 486.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -711.2,
    y: 446.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -735.2,
    y: 406.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -756.8,
    y: 364.5,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      attackPower: 140, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -776.1,
    y: 321.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -792.9,
    y: 277.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -807.2,
    y: 232.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -818.9,
    y: 186.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -828.1,
    y: 140.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -834.7,
    y: 94.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -838.7,
    y: 47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -840.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      attackPower: 140, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -838.7,
    y: -47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -834.7,
    y: -94.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -828.1,
    y: -140.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -818.9,
    y: -186.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -807.2,
    y: -232.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -792.9,
    y: -277.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -776.1,
    y: -321.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -756.8,
    y: -364.5,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      attackPower: 140, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -735.2,
    y: -406.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -711.2,
    y: -446.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -685.1,
    y: -486.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -656.7,
    y: -523.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -626.3,
    y: -559.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -594.0,
    y: -594.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -559.7,
    y: -626.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -523.7,
    y: -656.7,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      attackPower: 140, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -486.1,
    y: -685.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -446.9,
    y: -711.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -406.3,
    y: -735.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -364.5,
    y: -756.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -321.5,
    y: -776.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -277.4,
    y: -792.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -232.5,
    y: -807.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -186.9,
    y: -818.9,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      attackPower: 140, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -140.7,
    y: -828.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -94.1,
    y: -834.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.1,
    y: -838.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -0.0,
    y: -840.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.1,
    y: -838.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 94.1,
    y: -834.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 140.7,
    y: -828.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 186.9,
    y: -818.9,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      attackPower: 140, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 232.5,
    y: -807.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 277.4,
    y: -792.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 321.5,
    y: -776.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 364.5,
    y: -756.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 406.3,
    y: -735.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 446.9,
    y: -711.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 486.1,
    y: -685.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 523.7,
    y: -656.7,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      attackPower: 140, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 559.7,
    y: -626.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 594.0,
    y: -594.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 626.3,
    y: -559.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 656.7,
    y: -523.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 685.1,
    y: -486.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 711.2,
    y: -446.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 735.2,
    y: -406.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 756.8,
    y: -364.5,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      attackPower: 140, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 776.1,
    y: -321.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 792.9,
    y: -277.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 807.2,
    y: -232.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 818.9,
    y: -186.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 28,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 828.1,
    y: -140.7,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 28,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 834.7,
    y: -94.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 28,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 838.7,
    y: -47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 28,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 900.0,
    y: 0.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      attackPower: 150, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 898.8,
    y: 47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 895.1,
    y: 94.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 888.9,
    y: 140.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 880.3,
    y: 187.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 869.3,
    y: 232.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 856.0,
    y: 278.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 840.2,
    y: 322.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 822.2,
    y: 366.1,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      attackPower: 150, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 801.9,
    y: 408.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 779.4,
    y: 450.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 754.8,
    y: 490.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 728.1,
    y: 529.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 699.4,
    y: 566.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 668.8,
    y: 602.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 636.4,
    y: 636.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 602.2,
    y: 668.8,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      attackPower: 150, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 566.4,
    y: 699.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 529.0,
    y: 728.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 490.2,
    y: 754.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 450.0,
    y: 779.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 408.6,
    y: 801.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 366.1,
    y: 822.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 322.5,
    y: 840.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 278.1,
    y: 856.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      attackPower: 150, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 232.9,
    y: 869.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 187.1,
    y: 880.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 140.8,
    y: 888.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 94.1,
    y: 895.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.1,
    y: 898.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 0.0,
    y: 900.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.1,
    y: 898.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -94.1,
    y: 895.1,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      attackPower: 150, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -140.8,
    y: 888.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -187.1,
    y: 880.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -232.9,
    y: 869.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -278.1,
    y: 856.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -322.5,
    y: 840.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -366.1,
    y: 822.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -408.6,
    y: 801.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -450.0,
    y: 779.4,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      attackPower: 150, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -490.2,
    y: 754.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -529.0,
    y: 728.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -566.4,
    y: 699.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -602.2,
    y: 668.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -636.4,
    y: 636.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -668.8,
    y: 602.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -699.4,
    y: 566.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -728.1,
    y: 529.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      attackPower: 150, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -754.8,
    y: 490.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -779.4,
    y: 450.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -801.9,
    y: 408.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -822.2,
    y: 366.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -840.2,
    y: 322.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -856.0,
    y: 278.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -869.3,
    y: 232.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -880.3,
    y: 187.1,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      attackPower: 150, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -888.9,
    y: 140.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -895.1,
    y: 94.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -898.8,
    y: 47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -900.0,
    y: 0.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -898.8,
    y: -47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -895.1,
    y: -94.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -888.9,
    y: -140.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -880.3,
    y: -187.1,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      attackPower: 150, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -869.3,
    y: -232.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -856.0,
    y: -278.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -840.2,
    y: -322.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -822.2,
    y: -366.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -801.9,
    y: -408.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -779.4,
    y: -450.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -754.8,
    y: -490.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -728.1,
    y: -529.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      attackPower: 150, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -699.4,
    y: -566.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -668.8,
    y: -602.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -636.4,
    y: -636.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -602.2,
    y: -668.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -566.4,
    y: -699.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -529.0,
    y: -728.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -490.2,
    y: -754.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -450.0,
    y: -779.4,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      attackPower: 150, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -408.6,
    y: -801.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -366.1,
    y: -822.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -322.5,
    y: -840.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -278.1,
    y: -856.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -232.9,
    y: -869.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -187.1,
    y: -880.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -140.8,
    y: -888.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: -94.1,
    y: -895.1,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      attackPower: 150, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -47.1,
    y: -898.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: -0.0,
    y: -900.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 47.1,
    y: -898.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 94.1,
    y: -895.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 140.8,
    y: -888.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 187.1,
    y: -880.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 232.9,
    y: -869.3,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 278.1,
    y: -856.0,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      attackPower: 150, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 322.5,
    y: -840.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 366.1,
    y: -822.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 408.6,
    y: -801.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 450.0,
    y: -779.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 490.2,
    y: -754.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 529.0,
    y: -728.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 566.4,
    y: -699.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 602.2,
    y: -668.8,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      attackPower: 150, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 636.4,
    y: -636.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 668.8,
    y: -602.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 699.4,
    y: -566.4,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 728.1,
    y: -529.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 754.8,
    y: -490.2,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 779.4,
    y: -450.0,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 801.9,
    y: -408.6,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Keystone: Celestial ${ring}-${i}',
    x: 822.2,
    y: -366.1,
    isKeystone: true,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      attackPower: 150, critChance: 0.05,
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 840.2,
    y: -322.5,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 856.0,
    y: -278.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 869.3,
    y: -232.9,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 880.3,
    y: -187.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      strength: 30,
      
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 888.9,
    y: -140.8,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      agility: 30,
      
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 895.1,
    y: -94.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}","talent_r${ring - 1}_${Math.floor(i * ((ring - 1) / ring))}"],
    statModifiers: {
      
      
      intelligence: 30,
      
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
  {
    id: 'talent_r${ring}_${i}',
    name: 'Node: Essence of ${ring}-${i}',
    x: 898.8,
    y: -47.1,
    isKeystone: false,
    connectedNodes: ["talent_r${ring}_${(i + 1) % nodeCount}","talent_r${ring}_${(i - 1 + nodeCount) % nodeCount}"],
    statModifiers: {
      
      
      
      vitality: 30,
      
    },
    description: 'Increases fundamental attributes and grants deep attunement.',
  },
];

export class TalentTreeSystem {
  public allocatedNodes: Set<string> = new Set(['talent_r1_0']);

  public allocate(nodeId: string): boolean {
    const node = TALENT_CONSTELLATION.find(n => n.id === nodeId);
    if (!node) return false;

    // Must be connected to an already allocated node
    const isConnected = node.connectedNodes.some(neighborId => this.allocatedNodes.has(neighborId));
    if (!isConnected) return false;

    this.allocatedNodes.add(nodeId);
    return true;
  }
}
