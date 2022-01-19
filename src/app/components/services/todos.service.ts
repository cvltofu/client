import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlTodos } from 'src/environments/environment';
import { Todo } from '../todos/interfaces/todo.interface';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private apiUrlTodos = apiUrlTodos;

  constructor(private readonly httpService: HttpClient) {}

  getTodosList(): Observable<any> {
    return this.httpService.get(this.apiUrlTodos);
  }

  postTodo(todo: Todo): Observable<any> {
    return this.httpService.post(this.apiUrlTodos, todo);
  }

  deleteTodo(id: string): Observable<any> {
    return this.httpService.delete(`${this.apiUrlTodos}${id}`);
  }
}
