import { Directive, inject } from '@angular/core';
import {
  AdkListDirective,
  AdkSelectionDirective,
  AdkHttpClientDirective,
  AdkPaginationDirective,
} from '@app/directives';
import { Id, PaginationParam } from '@app/types';
import { Todo } from '../../types/todo';

@Directive({
  selector: '[adk-todos]',
  exportAs: 'adkTodos',
  standalone: true,
  hostDirectives: [
    { directive: AdkHttpClientDirective, inputs: ['adkUrl', 'adkPage', 'adkLimit'] },
    AdkListDirective,
    AdkSelectionDirective,
    AdkPaginationDirective,
  ],
})
export class TodosDirective<T extends Todo> {
  #httpClient = inject(AdkHttpClientDirective, { self: true }); // { self: true } to optimizate the search in Id
  #list = inject<AdkListDirective<T>>(AdkListDirective, { self: true });
  #selection = inject(AdkSelectionDirective, { self: true });
  #pagination = inject(AdkPaginationDirective, { self: true });

  readonly items = this.#list.items;
  readonly first = this.#pagination.first;
  readonly last = this.#pagination.last;
  readonly selectedCount = this.#selection.count;
  readonly total = this.#pagination.total.asReadonly();

  async fetch(): Promise<void> {
    const pagination: PaginationParam = {
      page: this.#pagination.page(),
      limit: this.#pagination.limit(),
    };
    const { total, items } = await this.#httpClient.getListPage<T>(pagination);
    this.#pagination.total.set(total);
    this.#list.add(...items);
  }

  async next(): Promise<void> {
    this.#pagination.next();
    this.#list.clear();
    await this.fetch();
  }

  async previous(): Promise<void> {
    this.#pagination.previous();
    this.#list.clear();
    await this.fetch();
  }

  select(...ids: Id[]): void {
    this.#selection.select(...ids);
  }

  selectAll(): void {
    this.#selection.select(...this.items().map((todo) => todo.id));
  }

  reset(): void {
    this.#selection.clear();
  }

  selected(id: Id): boolean {
    return this.#selection.selected(id);
  }

  deselect(id: Id): void {
    this.#selection.deselect(id);
  }
}
