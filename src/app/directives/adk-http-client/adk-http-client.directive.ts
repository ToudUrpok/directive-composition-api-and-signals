import { HttpClient } from '@angular/common/http';
import { Directive, inject, input } from '@angular/core';
import { PaginationParam } from '../../types';
import { firstValueFrom } from 'rxjs';

@Directive({
  selector: '[adk-http-client]',
  exportAs: 'adkHttpClient',
  standalone: true
})
export class AdkHttpClientDirective {
  #http = inject(HttpClient);

  url = input.required<string>({ alias: 'adkUrl' });
  page = input(1, { alias: 'adkPage' });
  limit = input(10, { alias: 'adkLimit' });

  async getListPage<T>(
    pagination: PaginationParam = { page: 1, limit: 10 }
  ): Promise<{ total: number; items: T[] }> {
    const response = await firstValueFrom(
      this.#http.get<T[]>(this.url(), {
        params: {
          _page: pagination.page,
          _limit: pagination.limit,
        },
        observe: 'response',
      })
    );

    const total = parseInt(response.headers.get('X-Total-Count') ?? '0', 10);
    const items = response.body!;

    return { total, items };
  }
}
