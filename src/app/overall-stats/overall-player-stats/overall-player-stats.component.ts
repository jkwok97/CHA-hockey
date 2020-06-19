import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { DisplayService } from 'src/app/_services/display.service';

@Component({
  selector: 'app-overall-player-stats',
  templateUrl: './overall-player-stats.component.html',
  styleUrls: ['./overall-player-stats.component.css']
})
export class OverallPlayerStatsComponent implements OnInit, AfterViewInit {

  expand: boolean = false;
  disablePlayoffButton: boolean;

  currentSeason: string;
  currentSeasonType: string;

  constructor(
    private _currentSeasonService: CurrentSeasonService,
    private _displayService: DisplayService
  ) { 
    this.currentSeason = this._currentSeasonService.currentSeason;
    this.currentSeasonType = this._currentSeasonService.currentSeasonType;
    this.disablePlayoffButton = this._currentSeasonService.seasonHasPlayoffs;
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
