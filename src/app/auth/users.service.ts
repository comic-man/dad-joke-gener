import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthUserModel {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiKey = 'AIzaSyCK7UoEIqqNd4uhRWO2zhjmsU3JuV5t2BQ';
  private signUpEndpoint =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private signInEndpoint =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthUserModel>(this.signUpEndpoint + this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthUserModel>(this.signInEndpoint + this.apiKey, {
      email: email,
      password: password
    })
  }
}
