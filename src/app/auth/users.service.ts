import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export class AuthUserModel {
  idToken?: string;
  email?: string;
  refreshToken?: string;
  expiresIn?: string;
  localId?: string;
  registered?: boolean;
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



  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  // sing up working just fine just needs password confirmation to work
  signUp(email: string, password: string) {
    return this.http.post<AuthUserModel>(this.signUpEndpoint + this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }

  // sign in is communicating with firebase but not doing anything else. Cannot access rescricted components
  signIn(email: string, password: string) {
    return this.http
      .post<AuthUserModel>(this.signInEndpoint + this.apiKey, {
        email: email,
        password: password,
      })
      .pipe(
        tap((user) => {
          this.localStorageService.saveToken(user);
        })
      );
  }

  logOut() {
    this.localStorageService.user.next(undefined);
    localStorage.removeItem('token')
    this.router.navigate([''])
  }
}
