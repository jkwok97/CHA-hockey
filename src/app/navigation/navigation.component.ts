import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  loggedIn: boolean = false;
  private _alive:boolean = true;

  currentUser: User;

  route: string;
  currentSeasonType: string;

  activeLinkIndex = -1;

  routes = [
    {name: 'Statistics', url: 'stats/teams/leaders', current: false},
    {name: 'Teams', url: 'teams', current: false},
    {name: 'Draft', url: 'draft/picks', current: false},
    {name: 'Games', url: 'games/day', current: false},
    {name: 'Salaries', url: 'salary', current: false},
    {name: 'Trades', url: 'trades', current: false},
    {name: 'Ratings', url: 'ratings', current: false},
    {name: 'Waiver Priority', url: 'waiver-priority', current: false},
    {name: 'Awards', url: 'awards/champions', current: false},
    {name: 'Rules & Prizes', url: 'rules/equalization', current: false},
  ];

  constructor(
    private _router: Router, 
    private _authService: AuthService,
  ) { 

    if (this._authService.currentUserValue) { 
      this.loggedIn = true;
      this._router.navigate(['login']);
    } else {
      this._router.navigate(['login']);
    }

    this._authService.currentUser.subscribe(x => this.currentUser = x);

    this._router.events.subscribe((res) => {
      this.activeLinkIndex = this.routes.indexOf(this.routes.find(tab => tab.url === '.' + this._router.url));
    });
  }

  ngOnInit() {
    this._router.navigate(['login']);
    
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
