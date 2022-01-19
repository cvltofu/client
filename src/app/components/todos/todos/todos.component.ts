import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../interfaces/todo.interface';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService) {}

  todoList!: Todo[];
  todoItem?: Todo;

  ngOnInit(): void {
    this.getTodosList();
  }

  private getTodosList(): void {
    this.todosService.getTodosList().subscribe((value) => {
      this.todoList = value;
    });
  }

  postItem(todo: Todo): void {
    this.todosService
      .postTodo(todo)
      .pipe(mergeMap(() => this.todosService.getTodosList()))
      .subscribe((value) => {
        this.todoList = value;
      });
  }

  deleteItem(_id: string): void {
    this.todosService
      .deleteTodo(_id)
      .pipe(mergeMap(() => this.todosService.getTodosList()))
      .subscribe((value) => {
        this.todoList = value;
      });
  }

  setItem(todo: Todo): void {
    this.todoItem = todo;
  }

  unsetItem(): void {
    this.todoItem = undefined;
  }
}
