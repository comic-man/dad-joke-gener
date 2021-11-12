import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  // need to get this to authenticate that signed in user can access restricted components
  onSignIn(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email
    const password = form.value.password
    this.userService.signIn(email, password).subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
    })

    form.reset()
  }

}
