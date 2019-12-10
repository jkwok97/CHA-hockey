import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  page: number = 1;
  pageSize: number = 20;
  length: number = 0;

  seasonType: string = 'Regular';
  showType: string = 'Season';

  teams: MatTableDataSource<any[]>;
  teamsColumnsToDisplay = [
    'playing_year', 'season_type', 'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
    'home_record', 'away_record', 'trail_record'
  ];

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _teamsService: TeamsService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.getStats(this.seasonType, this.showType);
  }

  getStats(type, group) {
    if (group === "Season") {
      this._teamsService.getAlltimeLeagueTeamsStatsByType(type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        let teamStats = resp as [];
        teamStats.sort((a,b) => b['points'] - a['points']);
        this.teams = new MatTableDataSource<any[]>(teamStats);
        this.teamsColumnsToDisplay = [
          'playing_year', 'season_type', 'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
          'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
          'home_record', 'away_record', 'trail_record'
        ];
        this.length = teamStats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.teams.paginator = this.paginator;
          this.teams.sort = this.sort;
        }, 350);
      });
    } else {
      this._teamsService.getAlltimeLeagueTeamsStatsByType(type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        let teamStats = resp['rows'] as [];
        teamStats.sort((a,b) => b['points'] - a['points']);
        this.teams = new MatTableDataSource<any[]>(teamStats);
        this.teamsColumnsToDisplay = [
          'season_type', 'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
          'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff'
        ];
        this.length = teamStats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.teams.paginator = this.paginator;
          this.teams.sort = this.sort;
        }, 350);
      });
    }
  }

  changeSeason(value) {
    if (value === 'Playoffs') {
      this.isLoading = true;
      this.seasonType = value;
      this.getStats(value, this.showType);
    } else {
      this.isLoading = true;
      this.seasonType = value;
      this.getStats(value, this.showType);
    }
  }

  changeShow(value) {
    if (value === 'Alltime') {
      this.isLoading = true;
      this.showType = value;
      this.getStats(this.seasonType, value);
    } else {
      this.isLoading = true;
      this.showType = value;
      this.getStats(this.seasonType, value);
    }
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  applyFilter(filterValue: string) {
    this.teams.filter = filterValue.trim().toLowerCase();
    if (this.teams.paginator) {
      this.teams.paginator.firstPage();
    }
  }

  openTeam(shortName, season, type) {
    this._router.navigate([`/teams/${shortName}/${season}/${type}`]);
    window.scrollTo(0,0);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
