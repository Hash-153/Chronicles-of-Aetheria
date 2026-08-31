/**
 * @file MessageQueue.ts
 * @description Thread-safe and frame-synced message queue with topic routing and batch dispatching.
 */

export interface Message<T = any> {
  topic: string;
  payload: T;
  timestamp: number;
}

export type MessageHandler<T = any> = (payload: T, message: Message<T>) => void;

export class MessageQueue {
  private _queue: Message[] = [];
  private _handlers: Map<string, MessageHandler[]> = new Map();

  public subscribe<T>(topic: string, handler: MessageHandler<T>): () => void {
    let list = this._handlers.get(topic);
    if (!list) {
      list = [];
      this._handlers.set(topic, list);
    }
    list.push(handler);

    return () => {
      const idx = list!.indexOf(handler);
      if (idx !== -1) {
        list!.splice(idx, 1);
      }
    };
  }

  public enqueue<T>(topic: string, payload: T): void {
    this._queue.push({
      topic,
      payload,
      timestamp: performance.now(),
    });
  }

  public process(): void {
    if (this._queue.length === 0) return;

    const messages = [...this._queue];
    this._queue.length = 0;

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      const handlers = this._handlers.get(msg.topic);
      if (handlers) {
        for (let h = 0; h < handlers.length; h++) {
          handlers[h](msg.payload, msg);
        }
      }

      // Universal wildcard handlers
      const wildcard = this._handlers.get('*');
      if (wildcard) {
        for (let h = 0; h < wildcard.length; h++) {
          wildcard[h](msg.payload, msg);
        }
      }
    }
  }

  public clear(): void {
    this._queue.length = 0;
    this._handlers.clear();
  }
}
