import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private apiUrl = 'https://localhost:7212/api/Sprints';

  constructor(private http: HttpClient) { }

  getAll(id: any): Observable<any[]> {
   return this.http.get<any[]>(`${this.apiUrl}/Project/${id}/Sprints`);
   
  }

  getById(projectId: number,id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Project/${projectId}/Sprint/${id}`);
  }

  add(sprint: any): Observable<any> {
    return this.http.post(this.apiUrl, sprint);
  }

  update(sprint: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update/`, sprint);
  }

  delete(projectId: number, sprintid: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Project/${projectId}/Delete/Sprints/${sprintid}`);
  }
}
