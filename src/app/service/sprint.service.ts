import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private apiUrl = 'https://localhost:7212/api/Sprints';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetSprintById/${id}`);
  }

  add(sprint: any): Observable<any> {
    return this.http.post(this.apiUrl, sprint);
  }

  update(sprint: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update/`, sprint);
  }

  delete(projectId: number, sprintId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${projectId}${sprintId}`);
  }
}
