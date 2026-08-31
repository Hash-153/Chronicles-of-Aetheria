/**
 * @file EventBus.ts
 * @description Central high-throughput publish-subscribe event bus with priorities and unsubscribe handles.
 */

export type EventHandler<T = any> = (event: T) => void;

interface Subscription<T = any> {
  handler: EventHandler<T>;
  priority: number;
  once: boolean;
}

export class EventBus {
  private _subscriptions: Map<string, Subscription[]> = new Map();

  public on<T>(eventName: string, handler: EventHandler<T>, priority = 0): () => void {
    let list = this._subscriptions.get(eventName);
    if (!list) {
      list = [];
      this._subscriptions.set(eventName, list);
    }

    const sub: Subscription<T> = { handler, priority, once: false };
    list.push(sub);
    list.sort((a, b) => b.priority - a.priority);

    return () => this.off(eventName, handler);
  }

  public once<T>(eventName: string, handler: EventHandler<T>, priority = 0): () => void {
    let list = this._subscriptions.get(eventName);
    if (!list) {
      list = [];
      this._subscriptions.set(eventName, list);
    }

    const sub: Subscription<T> = { handler, priority, once: true };
    list.push(sub);
    list.sort((a, b) => b.priority - a.priority);

    return () => this.off(eventName, handler);
  }

  public off<T>(eventName: string, handler: EventHandler<T>): boolean {
    const list = this._subscriptions.get(eventName);
    if (!list) return false;

    const idx = list.findIndex(s => s.handler === handler);
    if (idx !== -1) {
      list.splice(idx, 1);
      if (list.length === 0) {
        this._subscriptions.delete(eventName);
      }
      return true;
    }
    return false;
  }

  public emit<T>(eventName: string, event: T): void {
    const list = this._subscriptions.get(eventName);
    if (!list || list.length === 0) return;

    // Snapshot current listeners to protect against mutation during dispatch
    const snapshot = [...list];
    for (let i = 0; i < snapshot.length; i++) {
      const sub = snapshot[i];
      sub.handler(event);

      if (sub.once) {
        this.off(eventName, sub.handler);
      }
    }
  }

  public clear(eventName?: string): void {
    if (eventName) {
      this._subscriptions.delete(eventName);
    } else {
      this._subscriptions.clear();
    }
  }
}
