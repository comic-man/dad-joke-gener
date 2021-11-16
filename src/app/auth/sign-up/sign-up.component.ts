import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {}

  // get confirmation to actually check if passwords match
  onSignUp(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email
    const password = form.value.password
    this.userService.signUp(email, password).subscribe((data) => {
      this.router.navigate([''])
      console.log(data)
    }, error => {
      console.log(error)
    })
    form.reset();
  }
}
