import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { DisplayService } from 'src/app/services/display.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  isLoading: boolean = false;
  showNotification: boolean = false;
  submitted: boolean = false;

  returnUrl: string;
  error: string = '';

  constructor(
    private router: Router,
    private _authService: AuthService,
    private _displayService: DisplayService
  ) {
      if (this._authService.currentUserValue) { 
        this.router.navigate(['main']);
      } 
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email])
    });

    this._displayService.checkMobile();
  }

  getError(prop) {
    if (this[prop].hasError('email')) return 'not a valid email address';
    if (this[prop].hasError('required')) return 'required';
  }

  toLowerCase(value: string) {
    this.email.setValue(value.toLowerCase());
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }

    this.isLoading = true;

    const { email } = this.loginForm.value;

    this._authService.login(email).pipe(
      first()
      ).subscribe( 
        data => this.router.navigate(['main']),
        error => {
          this.error = error.error;
          this.showNotification = true;
          this.isLoading = false;
      });
  }

  get email() { return this.loginForm.get('email'); }

}