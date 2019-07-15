import { Component, OnInit } from '@angular/core';
import {MainServiceService} from '../shared/main-service.service';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loginRes: any;

  constructor(private service: MainServiceService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.service.emailPatt)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {
  }

  loginFunc(val): void {
    this.service.login(val.email, val.password).subscribe(res => {
      this.loginRes = res;
      console.log('Login Response: ', this.loginRes);
      if (this.loginRes.statusCode == 200) {
        this.router.navigate(['/orders']);
      }
    });
  }

}
