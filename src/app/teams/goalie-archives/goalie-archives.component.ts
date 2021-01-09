import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { filter, takeWhile } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { GoalieStatsService } from 'src/app/_services/goalie-stats.service';
import { GoalieStat } from 'src/app/_models/player';
import { TeamInfoService } from 'src/app/_services/team-info.service';

@Component({
  selector: 'app-goalie-archives',
  templateUrl: './goalie-archives.component.html',
  styleUrls: ['./goalie-archives.component.css']
})
export class GoalieArchivesComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  teamUserId: number;

  columns = [];
  goalies: MatTableDataSource<any[]>;

  seasonType: string;
  showType: string = 'Season';
  currentSeason: string;
  
  columnsToDisplay = [ 'team_logo', 'player_name', 'games_played','minutes_played', 'goals_against_avg', 
    'wins','loss', 'ties', 'en_goals', 'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 
    'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct', 'playing_year', 'season_type', 'player_status'
  ];
  columnsToDisplayForAllTime = [ 'season_type',
    'player_name', 'games_played','minutes_played', 'calc_goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'calc_save_pct', 'goals', 'assists', 'points', 'penalty_minutes'
  ];

  constructor(
    private _currentSeasonService: CurrentSeasonService,
    private _goalieStatsService: GoalieStatsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _teamInfoService: TeamInfoService,
  ) { 
    this.seasonType = this._currentSeasonService.currentSeasonType;
    this.currentSeason = this._currentSeasonService.currentSeason;
  }

  ngOnInit() {
    this.isLoading = true;

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
      this.getTeamGoalieStats(this.teamUserId, this.seasonType);
    })
  }

  getTeamGoalieStats(userId: number, seasonType: string) {
    this._goalieStatsService.getGoaliesByUserByType(userId, seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((goalieStats: GoalieStat[]) => {
      this.goalies = new MatTableDataSource<any[]>(goalieStats as []);
      this.isLoading = false;
    })
  }

  getTeamGoalieAllTimeStats(userId: number, seasonType: string) {
    this._goalieStatsService.getGoaliesByUserByShowByType(userId, seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((goalieStats: GoalieStat[]) => {
      goalieStats.sort((a,b) => b['wins'] - a['wins']);
      this.goalies = new MatTableDataSource<any[]>(goalieStats as []);
      this.isLoading = false;
    })
  }

  changeSeason(value) {
    if (value === 'Playoffs' && this.showType === 'Alltime') {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamGoalieAllTimeStats(this.teamUserId, value);
    } else if (value === 'Playoffs' && this.showType === 'Season') {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamGoalieStats(this.teamUserId, value);
    } else if (value === 'Regular' && this.showType === 'Alltime') {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamGoalieAllTimeStats(this.teamUserId, value);
    } else {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamGoalieStats(this.teamUserId, value);
    }
  }

  changeShow(value) {
    if (value === 'Alltime' && this.seasonType === 'Regular') {
      this.isLoading = true;
      this.showType = value;
      this.getTeamGoalieAllTimeStats(this.teamUserId, this.seasonType);
    } else if (value === 'Alltime' && this.seasonType === 'Playoffs') {
      this.isLoading = true;
      this.showType = value;
      this.getTeamGoalieAllTimeStats(this.teamUserId, this.seasonType);
    } else if (value === 'Season' && this.seasonType === 'Regular') {
      this.isLoading = true;
      this.showType = value;
      this.getTeamGoalieStats(this.teamUserId, this.seasonType);
    } else {
      this.isLoading = true;
      this.showType = value;
      this.getTeamGoalieStats(this.teamUserId, this.seasonType);
    }
  }

  displayColumns() {
    return this.showType === 'Alltime' ? this.columnsToDisplayForAllTime : this.columnsToDisplay;
  }

  applyFilter(filterValue: string) {
    this.goalies.filter = filterValue.trim().toLowerCase();
    if (this.goalies.paginator) {
      this.goalies.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
