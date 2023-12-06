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

  add(developer: any): Observable<any> {
    return this.http.post(this.apiUrl, developer);
  }

  update(developer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update/`, developer);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${id}`);
  }}