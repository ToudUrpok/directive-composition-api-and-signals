import { computed, Directive, signal } from '@angular/core';
import { Id, Identifiable } from '../../types';

@Directive({
  selector: '[adk-list]',
  exportAs: 'adkList',
  standalone: true
})
export class AdkListDirective<T extends Identifiable> {
  #items = signal<Record<Id, T>>({});
  readonly items = computed(() => Object.values(this.#items()));

  get(id: Id): T | undefined {
    return this.#items()[id];
  }

  add(...newItems: T[]): void {
    this.#items.update((items) =>
      newItems.reduce(
        (accumulator, item) => ({ ...accumulator, [item.id]: item }),
        items
      )
    );
  }

  update(item: T): void {
    this.#items.update((items) => ({ ...items, [item.id]: item }));
  }

  remove(item: T): void {
    this.#items.update((items) => {
      const { [item.id]: _, ...rest } = items;
      return rest;
    });
  }

  clear(): void {
    this.#items.set({});
  }
}
