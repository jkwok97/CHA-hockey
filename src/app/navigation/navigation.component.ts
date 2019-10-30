import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { takeWhile, filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  route: string;

  activeLinkIndex = -1;

  routes = [
    {name: 'Statistics', url: 'stats', current: false},
    {name: 'Teams', url: 'teams', current: false},
    {name: 'History', url: 'history', current: false},
    {name: 'Rules & Prizes', url: 'rules', current: false},
    {name: 'Schedule', url: 'schedule', current: false},
    {name: 'Trades & Picks', url: 'trades-picks', current: false},
    {name: 'Waiver Priority', url: 'waiver-priority', current: false},
  ];

  constructor(
    private _router: Router
  ) { 
    this._router.events.subscribe((res) => {
      this.activeLinkIndex = this.routes.indexOf(this.routes.find(tab => tab.url === '.' + this._router.url));
    });
  }

  onTabChange(event) {
    console.log(event);
    if (event.tab.textLabel === "Statistics") {
      this._router.navigate(['stats']);
    } else if (event.tab.textLabel === "Conference") {
      
    } else if (event.tab.textLabel === "Division") {
      
    }
  }

  ngOnInit() {
    this._router.navigate(['main']);
  }

}
