import { computed, Directive, signal } from '@angular/core';

@Directive({
  selector: '[adk-pagination]',
  exportAs: 'adkPagination',
  standalone: true
})
export class AdkPaginationDirective {
  #page = signal(1);
  readonly page = computed(() => this.#page());
  readonly limit = signal(10);
  readonly total = signal(0);

  first = computed(() => this.#page() === 1);

  last = computed(() => this.#page() * this.limit() >= this.total());

  next(): void {
    if (this.last()) {
      throw new Error('You are already on the last page');
    }
    this.#page.update((page) => page + 1);
  }

  previous(): void {
    if (this.first()) {
      throw new Error('You are already on the first page');
    }
    this.#page.update((page) => page - 1);
  }
}
