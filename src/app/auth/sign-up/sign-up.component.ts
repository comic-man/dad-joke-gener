import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private userService: UsersService) {}

  ngOnInit(): void {}

  onSignUp(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email
    const password = form.value.password
    this.userService.signUp(email, password).subscribe((data) => {
      console.log(data)
    }, error => {
      console.log(error)
    })
    form.reset();
  }
}
