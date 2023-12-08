import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private apiUrl = 'https://localhost:7212/api/Projects';

  constructor(private http: HttpClient) { }

  getAll(id: any): Observable<any[]> {
   return this.http.get<any[]>(`${this.apiUrl}/Project/${id}/Sprints`);
   
  }

  getById(projectId: any,id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Project/${projectId}/Sprint/${id}`);
  }

  add(sprint: any): Observable<any> {

    const url = `${this.apiUrl}/Project/CreateSprint`; 

    return this.http.post(url, sprint);
  }

  update(sprint: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Sprint/Update/`, sprint);
  }

  delete(projectId: number, sprintid: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Project/${projectId}/Delete/Sprint/${sprintid}`);
  }
}
