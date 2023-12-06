import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7212/api/SprintTasks';

  constructor(private http: HttpClient) { }

  getAll(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Project/${id}/SprintTasks`);
    
   }
 
   getById(projectId: any,id: number): Observable<any> {
     return this.http.get<any>(`${this.apiUrl}/Project/${projectId}/SprintTask/${id}`);
   }
  add(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  update(task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update/`, task);
  }


  delete( projectId: any,sprintId: number,sprintTaskId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/Projects/${projectId}/Sprints/${sprintId}/SprintTasks/Delete/${sprintTaskId}`);
  }
}
