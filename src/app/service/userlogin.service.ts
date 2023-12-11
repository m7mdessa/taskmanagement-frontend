import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {

  private apiUrl = 'https://localhost:7212/api/Developers';

  constructor(private http: HttpClient) { }


  getAll(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Developer/${id}/UserLogins`);
    
   }

 
  getById(developerId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/UserLogin/${developerId}`);
  }

  delete(developerId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteUserLogin/${developerId}`);
  }
}
