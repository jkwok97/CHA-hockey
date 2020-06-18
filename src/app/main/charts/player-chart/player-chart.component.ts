import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Observable } from 'rxjs';
import { Team } from 'src/app/_models/team';
import { AuthService } from 'src/app/_services/auth.service';
import { TeamInfoService } from 'src/app/_services/team-info.service';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { PlayerStatsService } from 'src/app/_services/player-stats.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-player-chart',
  templateUrl: './player-chart.component.html',
  styleUrls: ['./player-chart.component.css']
})
export class PlayerChartComponent implements OnInit {

  private _alive: boolean = true;

  isLoading: boolean;

  currentUser: User;

  currentSeason: string;
  currentSeasonType: string;

  teams$: Observable<Team[]>;
  team: Team;
  teams: Team[];

  playerStats = [];

  constructor(
    private _authService: AuthService,
    private _teamInfoService: TeamInfoService,
    private _currentSeasonService: CurrentSeasonService,
    private _playerStatsService: PlayerStatsService,
  ) { 
    this._authService.currentUser.subscribe( x => this.currentUser = x[0] );
    this.teams$ = this._teamInfoService.getUserTeams(this.currentUser.id);
    this.currentSeason = this._currentSeasonService.currentSeason;
    this.currentSeasonType = this._currentSeasonService.currentSeasonType;
  }

  ngOnInit(): void {

    this.isLoading = true;

    this.teams$.pipe(
      takeWhile(() => this._alive)
    ).subscribe((teams: Team[]) => {
      this.teams = teams;
      this.team = teams.find((team: Team) => team.isactive);
      this.getTeamPlayerStatsForSeason(this.team);
    })
    
  }

  getTeamPlayerStatsForSeason(team: Team) {
    this._playerStatsService.getPlayersBySeasonByTypeByTeam(team.id, this.currentSeason, this.currentSeasonType).pipe(
      takeWhile(() => this._alive)
      ).subscribe(resp => {

        const stats = resp;

        this.playerStats = stats.map(stat => ({
          ...stat,
          points_per_sixty: ((stat['points']/stat['minutes_played']) * 60).toFixed(2)
        }))

        this.isLoading = false;
      });
  }

}
