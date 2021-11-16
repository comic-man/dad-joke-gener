import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthUserModel } from './auth/users.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  user = new BehaviorSubject<AuthUserModel | undefined>(undefined);

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this.user.next(JSON.parse(token));
    }
  }

  saveToken(token: AuthUserModel) {
    localStorage.setItem('token', JSON.stringify(token));
    this.user.next(token)
  }

  isLoggedIn() {
    return this.user.pipe(
      map((user) => {
        return !!user;
      })
    );
  }
}
