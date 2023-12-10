import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  private apiUrl = 'https://localhost:7212/api/Developers';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetDeveloperById/${id}`);
  }

  getProfile(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetProfile/${id}`);
  }

  getDeveloperTask(projectId: number,developerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Project/${projectId}/DeveloperTask/${developerId}`);
  }

  add(developer: any): Observable<any> {
    return this.http.post(this.apiUrl, developer);
  }

  update(developer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update/`, developer);
  }

  updateProfile(developer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateProfile/`, developer);
  }

 updatePassword(developer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdatePassword/`, developer);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${id}`);
  }

}
