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

  routes = [
    {name: 'Statistics', url: 'stats', current: false},
    {name: 'Teams', url: 'teams', current: false},
    {name: 'History', url: 'history', current: false},
    {name: 'Rules & Prizes', url: 'rules', current: false},
    {name: 'Schedule', url: 'schedule', current: false},
  ];

  constructor(
    private _router: Router
  ) { 
    _router.events.pipe(filter((event: any) => event instanceof NavigationEnd)).subscribe(event => {
      this.routes.map((r) => {
        if (event['url'].includes(r.url)) {
          r.current = true;
          this.route = event['url'];
        } else {
          r.current = false;
        }
      });
    });
  }

  ngOnInit() {
    this._router.navigate(['main']);
  }

}
