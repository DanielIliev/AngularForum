import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/app/constants/constants';
import { LoginCredentials } from 'src/app/types/Auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials) {
    const url = baseUrl + '/login';
    const body = JSON.stringify(credentials);
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.http.post(url, body, { headers });
  }
}
