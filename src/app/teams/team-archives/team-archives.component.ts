import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { filter, takeWhile } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { TeamStat } from 'src/app/_models/team';
import { Observable } from 'rxjs';
import { TeamStatsService } from 'src/app/_services/team-stats.service';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { TeamInfoService } from 'src/app/_services/team-info.service';
import { DisplayService } from 'src/app/_services/display.service';

@Component({
  selector: 'app-team-archives',
  templateUrl: './team-archives.component.html',
  styleUrls: ['./team-archives.component.css']
})
export class TeamArchivesComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean;

  team: any;
  stats$: Observable<TeamStat[]>;

  currentUser: User;

  teamUserId: number;

  short_team_name: string;
  seasonType: string = 'Regular';

  teams: MatTableDataSource<any[]>;
  mobileColumns = [
    'playing_year', 'team_logo', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
    'home_record', 'away_record', 'trail_record'
  ];
  columns = [
    'playing_year', 'season_type', 'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
    'home_record', 'away_record', 'trail_record'
  ];

  constructor(
    private _teamInfoService: TeamInfoService,
    private _teamStatsService: TeamStatsService,
    private _currentSeasonService: CurrentSeasonService,
    private _displayService: DisplayService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

    this.seasonType = this._currentSeasonService.currentSeasonType;
  }

  ngOnInit() {
    this.isLoading = true;
    this.isMobile = this._displayService.isMobile;

    const teamSelected = this._route.snapshot['_urlSegment'].segments[1].path;

    this.getUserId(teamSelected);

    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeWhile(() => this._alive)
    ).subscribe((event) => {
      this.isLoading = true;
      const splitUrl = event['url'].split("/");
      this.getUserId(splitUrl[2]);
    });

  }

  getUserId(teamSelected: string) {
    this._teamInfoService.getUserByTeamName(teamSelected).pipe(
      takeWhile(() => this._alive)
    ).subscribe((id: number) => {
      this.teamUserId = id['users_id'];
      this.getTeamStats(this.teamUserId, this.seasonType);
    })
  }

  getTeamStats(id: number, seasonType: string) {
    this._teamStatsService.getTeamStatsByUser(id, seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((teamStats: TeamStat[]) => {
      this.isLoading = false;
      this.teams = new MatTableDataSource<any[]>(teamStats as []);
    })

  }

  changeSeason(value) {
    if (value === 'Playoffs') {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamStats(this.teamUserId, this.seasonType)
    } else {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamStats(this.teamUserId, this.seasonType)
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
