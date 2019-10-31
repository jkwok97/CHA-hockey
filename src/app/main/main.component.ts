import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentUser: User;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    this._authService.currentUser.subscribe(x => this.currentUser = x);
    if (!this.currentUser) {
      this._router.navigate(['/login']);
    }
    console.log(this.currentUser);
   }

  ngOnInit() {

  }

  logout() {
    console.log(this.currentUser);
    this._authService.logout();
    this._router.navigate(['/login']);
    console.log(this.currentUser);
  }

}
