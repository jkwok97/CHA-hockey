import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DisplayService } from 'src/app/_services/display.service';
import { TeamStatsService } from 'src/app/_services/team-stats.service';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { takeWhile } from 'rxjs/operators';
import { TeamStat } from 'src/app/_models/team';
import { GamesService } from 'src/app/_services/games.service';

@Component({
  selector: 'app-game-team-card',
  templateUrl: './game-team-card.component.html',
  styleUrls: ['./game-team-card.component.css']
})
export class GameTeamCardComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  isMobile: boolean;

  currentSeason: string;

  record: any;
  lastFiveRecord: string[];

  @Input() team;
  @Input() opposingTeam;

  constructor(
    private _displayService: DisplayService,
    private _teamStatsService: TeamStatsService,
    private _currentSeasonService: CurrentSeasonService,
    private _gamesService: GamesService
  ) { 
    this.currentSeason = this._currentSeasonService.currentSeason;
   }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;
    this.getTeamStats(this.team.team_id, this.currentSeason);
    this.getLastFiveRecord(this.team.team_id, this.currentSeason);
    this.getMatchupRecord(this.team.team_id, this.opposingTeam.team_id, this.currentSeason);
  }

  getColor(color:string) {
    return `${color}95`
  }

  getTeamStats(id: number, season: string) {
    this._teamStatsService.getScheduleTeamStats(season, id).pipe(
      takeWhile(() => this._alive)
    ).subscribe((stat: TeamStat) => {
      this.record = stat;
    })
  }

  getLastFiveRecord(id: number, season: string) {
    this._gamesService.getLastFiveGamesRecordForTeam(id, season).pipe(
      takeWhile(() => this._alive)
    ).subscribe((data) => {
      this.lastFiveRecord = this.getLastFive(data, id);
    })
  }

  getMatchupRecord(teamIdOne: number, teamIdTwo: number, season: string) {
    this._gamesService.getMatchUpRecord(teamIdOne, teamIdTwo, season).pipe(
      takeWhile(() => this._alive)
    ).subscribe((data) => {
      console.log(data);
    })
  }

  getLastFive(data, id) {
    let lastFive = [];

    data.forEach((game) => {
        if (game.vis_team_id === id) {
            game.vis_team_score > game.home_team_score ? lastFive.push('W') : 
            game.vis_team_score === game.home_team_score ? lastFive.push('T') : lastFive.push('L')
        } else if (game.home_team_id === id) {
            game.home_team_score > game.vis_team_score ? lastFive.push('W') : 
            game.home_team_score === game.vis_team_score ? lastFive.push('T') : lastFive.push('L')
        }
    });

    return lastFive
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
