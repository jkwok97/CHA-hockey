import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { TeamsService } from '../teams/teams.service';

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
    {name: 'Statistics', url: 'stats/teams', current: false},
    {name: 'Teams', url: 'teams', current: false},
    // {name: 'Schedule', url: 'schedule', current: false},
    {name: 'Playoff Tree', url: 'playoffTree', current: false},
    {name: 'Salaries', url: 'salary', current: false},
    {name: 'Picks', url: 'picks', current: false},
    {name: 'Trades', url: 'trades', current: false},
    {name: 'Waiver Priority', url: 'waiver-priority', current: false},
    {name: 'History', url: 'history', current: false},
    {name: 'Rules & Prizes', url: 'rules', current: false},
  ];

  constructor(
    private _router: Router, 
    private _authService: AuthService,
    private _teamsService: TeamsService
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

  onTabChange(event) {
    if (event.tab.textLabel === "Statistics") {
      this._router.navigate(['stats']);
    } else if (event.tab.textLabel === "Conference") {
      
    } else if (event.tab.textLabel === "Division") {
      
    }
  }

  ngOnInit() {
    this._router.navigate(['login']);
    this.currentSeasonType = this._teamsService.currentSeasonType;
    if (this.currentSeasonType === "Playoffs") {
      let found = this.routes.find(route => route.name === "Schedule");
      found.name = "Playoff Tree";
      found.url = "playoffTree";
      found.current = false;
      // found = {name: "Playoff Tree", url: "playoffTree", current: false};
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
