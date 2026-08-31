/**
 * @file DialogueSystem.ts
 * @description Branching NPC conversation graph with conditional dialog gates and quest triggers.
 */

import { UIDialogueBox, type DialogueChoice } from '../ui/UIDialogueBox.ts';

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  choices: DialogueChoice[];
  onEnter?: () => void;
}

export class DialogueSystem {
  private _nodes: Map<string, DialogueNode> = new Map();
  public dialogueBox?: UIDialogueBox;

  public registerNode(node: DialogueNode): void {
    this._nodes.set(node.id, node);
  }

  public startDialogue(nodeId: string): void {
    const node = this._nodes.get(nodeId);
    if (!node || !this.dialogueBox) return;

    if (node.onEnter) node.onEnter();

    this.dialogueBox.setDialogue(node.speaker, node.text, node.choices);
    this.dialogueBox.onChoiceSelected = (choice) => {
      if (choice.nextDialogueId) {
        this.startDialogue(choice.nextDialogueId);
      } else {
        this.dialogueBox!.isVisible = false;
      }
    };
  }
}
