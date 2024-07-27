import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodosListComponent } from '@app/features';

@Component({
  selector: 'todos-page',
  standalone: true,
  imports: [TodosListComponent],
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosPageComponent {
  protected readonly todosUrl = 'https://jsonplaceholder.typicode.com/todos';
}
