import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://fakestoreapi.com/auth/';
const AUTH_API = 'https://json-server-vercel-krgi-b04g317ux-esraasarhan.vercel.app/users?';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserHomePage(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getAdminHomePage(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  // updateSelectedLanguage(langugae: string, userId: number): Observable<any> {
  //   return this.http.post('https://json-server-vercel-krgi-b04g317ux-esraasarhan.vercel.app/users?Id=1');
  // }
}