import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TodosDirective } from '../../directives/todos/todos.directive';

@Component({
  selector: 'todos-list',
  standalone: true,
  hostDirectives: [TodosDirective],
  imports: [],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent implements OnInit {
  todos = inject(TodosDirective, { self: true });

  ngOnInit(): void {
    this.todos.fetch();
  }
}
