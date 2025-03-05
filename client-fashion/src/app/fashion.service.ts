import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FashionService {
  private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  getAllFashions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/fashions`);
  }

  getFashionsByStyle(style: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/fashions?style=${style}`);
  }

  getFashionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fashions/${id}`);
  }
}