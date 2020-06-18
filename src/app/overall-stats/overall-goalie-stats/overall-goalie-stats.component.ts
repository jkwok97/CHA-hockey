import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { DisplayService } from 'src/app/_services/display.service';

@Component({
  selector: 'app-overall-goalie-stats',
  templateUrl: './overall-goalie-stats.component.html',
  styleUrls: ['./overall-goalie-stats.component.css']
})
export class OverallGoalieStatsComponent implements OnInit, AfterViewInit {

  expand: boolean = false;

  currentSeason: string;
  currentSeasonType: string;

  constructor(
    private _currentSeasonService: CurrentSeasonService,
    private _displayService: DisplayService
  ) { 
    this.currentSeason = this._currentSeasonService.currentSeason;
    this.currentSeasonType = this._currentSeasonService.currentSeasonType;
  }

  ngOnInit() {
    this.expand = !this._displayService.isMobile;
  }

  ngAfterViewInit() {
    this._displayService.triggerSeasonTypeChange(this.currentSeasonType);
  }

  changeSeason(seasonType: string) {
    this._displayService.triggerSeasonTypeChange(seasonType);
  }

}
