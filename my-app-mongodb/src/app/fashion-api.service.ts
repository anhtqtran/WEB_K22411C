import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FashionAPIService {
  private apiUrl = 'http://localhost:3002/fashions';

  constructor(private _http: HttpClient) {}

  getFashions(fashionId: string = ''): Observable<any[]> {
    const url = fashionId ? `${this.apiUrl}/${fashionId}` : this.apiUrl;
    return this._http.get<any[]>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getFashionById(fashionId: string): Observable<any> {
    const url = `${this.apiUrl}/${fashionId}`;
    return this._http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  // Lấy fashions theo style
  getFashionsByStyle(style: string): Observable<any[]> {
    const url = `${this.apiUrl}?style=${style}`; // Giả định API hỗ trợ query parameter
    return this._http.get<any[]>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    return throwError(() => new Error(error.message || 'Lỗi kết nối API'));

    
  }
}