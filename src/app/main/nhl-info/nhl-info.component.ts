import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { DisplayService } from 'src/app/_services/display.service';

@Component({
  selector: 'app-nhl-info',
  templateUrl: './nhl-info.component.html',
  styleUrls: ['./nhl-info.component.css']
})
export class NhlInfoComponent implements OnInit {

  isMobile: boolean;
  private _alive:boolean = true;
  showPlayersStats: boolean = false;
  showGoalieStats: boolean = false;
  showRookieStats: boolean = false;

  constructor(
    private _displayService: DisplayService
  ) { 
    this.isMobile = this._displayService.isMobile;
  }

  ngOnInit() {
    this._displayService.listenerFullPageStats().pipe(
      takeWhile(() => this._alive)
      ).subscribe(resp => {
      this.setDisplay(resp);
    });
  }

  setDisplay(statType: string) {
    switch (statType) {
      case 'players':
        this.showPlayersStats = true;
        this.showGoalieStats = false;
        this.showRookieStats = false;
        break;
      case 'goalies':
        this.showGoalieStats = true;
        this.showRookieStats = false;
        this.showPlayersStats = false;
        break;
      case 'rookies':
        this.showRookieStats = true;
        this.showPlayersStats = false;
        this.showGoalieStats = false;
        break;
      default:
        null;
        break;
    }
  }

  showLeaders() {
    this.showPlayersStats = false;
    this.showGoalieStats = false;
    this.showRookieStats = false;
  }

}
