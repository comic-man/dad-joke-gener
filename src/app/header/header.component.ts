import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../auth/users.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub?: Subscription;

  constructor(private userService: UsersService, public localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.userSub = this.localStorage.user.subscribe(user => {
      this.isAuthenticated = !!user
      console.log(user)
    })
  }

  onLogOut() {
    this.userService.logOut();
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }

}
