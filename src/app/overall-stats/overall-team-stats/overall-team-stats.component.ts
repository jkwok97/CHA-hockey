import { Component, OnInit, OnDestroy } from "@angular/core";
import { CurrentSeasonService } from "src/app/_services/current-season.service";
import { TeamStatsService } from "src/app/_services/team-stats.service";
import { takeWhile } from "rxjs/operators";
import { TeamStat } from "src/app/_models/team";
import { DisplayService } from "src/app/_services/display.service";

@Component({
  selector: "app-overall-team-stats",
  templateUrl: "./overall-team-stats.component.html",
  styleUrls: ["./overall-team-stats.component.css"],
})
export class OverallTeamStatsComponent implements OnInit, OnDestroy {
  private _alive: boolean = true;
  isLoading: boolean = true;
  expand: boolean = false;
  disablePlayoffButton: boolean;
  isMobile: boolean;

  currentSeason: string;
  currentSeasonType: string;

  teamStats: TeamStat[];

  constructor(
    private _currentSeasonService: CurrentSeasonService,
    private _teamStatsService: TeamStatsService,
    private _displayService: DisplayService
  ) {
    this.currentSeason = this._currentSeasonService.currentSeason;
    this.currentSeasonType = this._currentSeasonService.currentSeasonType;
    this.disablePlayoffButton = this._currentSeasonService.seasonHasPlayoffs;
    this.isMobile = this._displayService.isMobile;
  }

  ngOnInit() {
    this.isLoading = true;
    this.expand = !this._displayService.isMobile;

    this.getTeamStats(this.currentSeasonType);
  }

  getTeamStats(seasonType: string) {
    this._teamStatsService
      .getTeamStatsBySeasonByType(this.currentSeason, seasonType)
      .pipe(takeWhile(() => this._alive))
      .subscribe((teamStats: TeamStat[]) => {
        this.teamStats = teamStats;
        this.isLoading = false;
      });
  }

  changeSeason(seasonType: string) {
    this.isLoading = true;
    this.getTeamStats(seasonType);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }
}
