/**
 * @file QuestManager.ts
 * @description Quest objective tracking state machine: Kill objectives, item collection, and reward distribution.
 */

export const QuestState = {
  NotStarted: 0,
  Active: 1,
  Completed: 2,
  Claimed: 3,
} as const;
export type QuestState = typeof QuestState[keyof typeof QuestState];

export interface QuestObjective {
  description: string;
  targetCount: number;
  currentCount: number;
  isComplete: boolean;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  state: QuestState;
  objectives: QuestObjective[];
  xpReward: number;
  goldReward: number;
}

export class QuestManager {
  public quests: Map<string, Quest> = new Map();

  public registerQuest(quest: Quest): void {
    this.quests.set(quest.id, quest);
  }

  public startQuest(questId: string): boolean {
    const quest = this.quests.get(questId);
    if (!quest || quest.state !== QuestState.NotStarted) return false;
    quest.state = QuestState.Active;
    return true;
  }

  public updateObjective(questId: string, objectiveIndex: number, delta = 1): void {
    const quest = this.quests.get(questId);
    if (!quest || quest.state !== QuestState.Active) return;

    const obj = quest.objectives[objectiveIndex];
    if (!obj || obj.isComplete) return;

    obj.currentCount = Math.min(obj.targetCount, obj.currentCount + delta);
    if (obj.currentCount >= obj.targetCount) {
      obj.isComplete = true;
    }

    // Check all objectives complete
    if (quest.objectives.every(o => o.isComplete)) {
      quest.state = QuestState.Completed;
    }
  }

  public getActiveQuests(): Quest[] {
    return Array.from(this.quests.values()).filter(q => q.state === QuestState.Active);
  }
}
