import { computed, Directive, signal } from '@angular/core';
import { Id } from '../../types';

@Directive({
  selector: '[adk-selection]',
  exportAs: 'adkSelection',
  standalone: true
})
export class AdkSelectionDirective {
  #items = signal<Record<Id, boolean>>({});
  count = computed(() => Object.values(this.#items()).filter(Boolean).length);

  select(...ids: Id[]): void {
    this.#items.update((items) =>
      ids.reduce((accumulator, id) => ({ ...accumulator, [id]: true }), items)
    );
  }

  deselect(id: Id): void {
    this.#items.update((items) => {
      const { [id]: _, ...rest } = items;
      return rest;
    });
  }

  clear(): void {
    this.#items.set({});
  }

  selected(id: Id): boolean {
    return this.#items()[id] ?? false;
  }
}
