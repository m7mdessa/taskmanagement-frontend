import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintTaskService {
  private apiUrl = 'https://localhost:7212/api/Projects';

  constructor(private http: HttpClient) { }

  getAll(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Project/${id}/SprintTasks`);
    
   }
 
   getById(projectId: number,id: number): Observable<any> {
     return this.http.get<any>(`${this.apiUrl}/Project/${projectId}/SprintTask/${id}`);
   }

  add(task: any): Observable<any> {

    const url = `${this.apiUrl}/Project/CreateSprintTask`; 

    return this.http.post(url, task);
  }

  update(projectId: number,task: any): Observable<any> {

  const url = `${this.apiUrl}/Project/${projectId}/SprintTask/Update/`; 

  return this.http.put(url, task);

  }

  delete( projectId: number,sprintId: number,sprintTaskId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/Projects/${projectId}/Sprints/${sprintId}/SprintTask/Delete/${sprintTaskId}`);
  }
}
