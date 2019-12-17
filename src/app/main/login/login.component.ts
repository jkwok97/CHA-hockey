import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first, takeWhile } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  isLoading: boolean = false;
  showNotification: boolean = false;
  submitted: boolean = false;
  private _alive = false;

  returnUrl: string;
  error:string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService
  ) {
    // redirect to home if already logged in
      if (this._authService.currentUserValue) { 
        // console.log(this._authService.currentUserValue)
        this.router.navigate(['main']);
      } 
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email])
    })

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  // get f() { return this.loginForm.controls; }

  get email() { return this.loginForm.get('email'); }

  getError(prop) {
    if (this[prop].hasError('email')) return 'not a valid email address';
    if (this[prop].hasError('required')) return 'required';
  }

  toLowerCase(value: string) {
    this.email.setValue(value.toLowerCase());
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.isLoading = true;

    const { email } = this.loginForm.value;

    this._authService.login(email).pipe(first()).subscribe(
      data => {
        // console.log(data);
        this.router.navigate(['main']);
      },
      error => {
        // console.log(error);
          this.error = error.error;
          this.showNotification = true;
          this.isLoading = false;
      });
  }

    ngOnDestroy() {
      this._alive = false;
    }

}