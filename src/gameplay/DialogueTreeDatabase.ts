/**
 * @file DialogueTreeDatabase.ts
 * @description Branching narrative NPC conversations, lore scrolls, quest turn-ins, and merchant interactions.
 */

import { type DialogueNode } from './DialogueSystem.ts';

export const NPC_DIALOGUE_REGISTRY: DialogueNode[] = [
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Vaelin the Archmage',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Vaelin the Archmage',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Vaelin the Archmage',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Vaelin the Archmage',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Vaelin the Archmage',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Vaelin the Archmage',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Vaelin the Archmage',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Vaelin the Archmage',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Vaelin the Archmage',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Vaelin the Archmage',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Vaelin the Archmage',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Vaelin the Archmage',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Garrick the Blacksmith',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Garrick the Blacksmith',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Garrick the Blacksmith',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Garrick the Blacksmith',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Garrick the Blacksmith',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Garrick the Blacksmith',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Garrick the Blacksmith',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Garrick the Blacksmith',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Garrick the Blacksmith',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Garrick the Blacksmith',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Garrick the Blacksmith',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Garrick the Blacksmith',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Lyra the Shadow Rogue',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Lyra the Shadow Rogue',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Lyra the Shadow Rogue',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Lyra the Shadow Rogue',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Lyra the Shadow Rogue',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Lyra the Shadow Rogue',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Lyra the Shadow Rogue',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Lyra the Shadow Rogue',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Lyra the Shadow Rogue',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Lyra the Shadow Rogue',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Lyra the Shadow Rogue',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Lyra the Shadow Rogue',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Elder Oakhaven',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Elder Oakhaven',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Elder Oakhaven',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Elder Oakhaven',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Elder Oakhaven',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Elder Oakhaven',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Elder Oakhaven',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Elder Oakhaven',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Elder Oakhaven',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Elder Oakhaven',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Elder Oakhaven',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Elder Oakhaven',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Captain Thorne',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Captain Thorne',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Captain Thorne',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Captain Thorne',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Captain Thorne',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Captain Thorne',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Captain Thorne',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Captain Thorne',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Captain Thorne',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Captain Thorne',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Captain Thorne',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Captain Thorne',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Aria the Priestess',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Aria the Priestess',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Aria the Priestess',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Aria the Priestess',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Aria the Priestess',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Aria the Priestess',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Aria the Priestess',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Aria the Priestess',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Aria the Priestess',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Aria the Priestess',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Aria the Priestess',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Aria the Priestess',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Grimjaw the Hunter',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Grimjaw the Hunter',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Grimjaw the Hunter',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Grimjaw the Hunter',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Grimjaw the Hunter',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Grimjaw the Hunter',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Grimjaw the Hunter',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Grimjaw the Hunter',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Grimjaw the Hunter',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Grimjaw the Hunter',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Grimjaw the Hunter',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
  {
    id: 'dlg_npc${i}_b${b}',
    speaker: 'Grimjaw the Hunter',
    text: 'Greetings, traveler. The dark tides rise in the catacombs. We must prepare our defenses before nightfall.',
    choices: [
      {
        text: 'Tell me about the rumors in the crypt.',
        nextDialogueId: 'dlg_npc${i}_b${(b % 12) + 1}',
      },
      {
        text: 'I am ready to accept your quest.',
        nextDialogueId: 'dlg_npc${(i + 1) % 7}_b1',
      },
      {
        text: 'Farewell for now.',
      },
    ],
  },
];

export class DialogueTreeDatabase {
  public static getNode(id: string): DialogueNode | undefined {
    return NPC_DIALOGUE_REGISTRY.find(n => n.id === id);
  }
}
