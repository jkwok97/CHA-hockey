import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Team, TeamStat } from 'src/app/_models/team';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { TeamInfoService } from 'src/app/_services/team-info.service';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { TeamStatsService } from 'src/app/_services/team-stats.service';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';

@Component({
  selector: 'app-team-chart',
  templateUrl: './team-chart.component.html',
  styleUrls: ['./team-chart.component.css']
})
export class TeamChartComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  isLoading: boolean = false;

  currentUser: User;

  stats: TeamStat[];
  userTeam: Team;
  teams: Team[];

  userTeams$: Observable<Team[]>;

  currentSeasonType: string;
  currentSeason: string;

  constructor(
    private _authService: AuthService,
    private _teamInfoService: TeamInfoService,
    private _teamStatsService: TeamStatsService,
    private _currentSeasonService: CurrentSeasonService
  ) {
    this._authService.currentUser.subscribe( x => this.currentUser = x[0]);
    this.userTeams$ = this._teamInfoService.getUserTeams(this.currentUser.id);
    this.currentSeason = this._currentSeasonService.currentSeason;
    this.currentSeasonType = this._currentSeasonService.currentSeasonType;
   }

  ngOnInit() {

    this.isLoading = true;

    this.userTeams$.pipe(
      takeWhile(() => this._alive)
    ).subscribe((teams: Team[]) => {
      this.userTeam = teams.find((team: Team) => team.isactive);
    });

    this._teamStatsService.getTeamStatsBySeasonByType(this.currentSeason, this.currentSeasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((teamStats: TeamStat[]) => {
      this.stats = teamStats;
      this.isLoading = false;
    })
    
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
