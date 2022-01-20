import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../interfaces/todo.interface';
import { IDate } from '../interfaces/date.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodosListComponent {
  @Input() todoList!: Todo[];
  @Output() onChangedList = new EventEmitter();
  @Output() onClickAdd = new EventEmitter();
  @Output() onClickDelete = new EventEmitter();

  constructor(private authService: AuthService) {}

  todoAdd: Todo = { date: new Date(), title: '', task: '' };
  date: IDate = { day: 0, month: 0, year: 0, date: '' };
  displayedColumns: string[] = ['date', 'title', 'task', 'delete'];

  deleteTodo(_id: string) {
    this.onClickDelete.emit(_id);
  }

  addTodo() {
    this.date.date = `${this.date.year}-${this.date.month}-${this.date.day}`;
    const num = Date.parse(this.date.date);
    this.todoAdd.date = new Date(num);

    this.onClickAdd.emit(this.todoAdd);
  }
}
