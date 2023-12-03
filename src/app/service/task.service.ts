import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7212/api/Tasks';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetTaskById/${id}`);
  }

  add(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  update(task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update/`, task);
  }

  delete(userId: number, taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${userId}${taskId}`);
  }
}
