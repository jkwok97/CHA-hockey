import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsService } from 'src/app/teams/teams.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-team-season',
  templateUrl: './team-season.component.html',
  styleUrls: ['./team-season.component.css']
})
export class TeamSeasonComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  short_team_name: string;
  currentSeason: string;
  seasonType: string;

  stats: any[];

  pageSize: number = 30;
  length: number = 0;

  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = [
    'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
    'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots', 'player_status'
  ];

  goalies: MatTableDataSource<any[]>;
  goaliesColumnsToDisplay = [
    'player_name', 'games_played','minutes_played', 'goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct', 'player_status'
  ];

  @ViewChild("playerSort", {static: false}) playerSort: MatSort;
  @ViewChild("goalieSort", {static: false}) goalieSort: MatSort;

  constructor(
    private _route: ActivatedRoute,
    private _teamsService: TeamsService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.short_team_name = this._route.snapshot.url[1].path;
    this.currentSeason = this._route.snapshot.url[2].path;
    this.seasonType = this._route.snapshot.url[3].path;
    this._teamsService.getTeamPlayerStatsByYearByType(this.short_team_name, this.currentSeason, this.seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this.stats = resp as [];
      this.players = new MatTableDataSource<any[]>(this.stats);
      this.length = this.stats.length;
      this.isLoading = false;
      setTimeout(() => {
        this.players.sort = this.playerSort;
      }, 350);
    });
      this._teamsService.getTeamGoalieStatsByYearByType(this.short_team_name, this.currentSeason, this.seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let goalieStats = resp as [];
      this.goalies = new MatTableDataSource<any[]>(goalieStats);
      this.length = goalieStats.length;
      this.isLoading = false;  
      setTimeout(() => {
        this.goalies.sort = this.goalieSort;
      }, 350);
    });
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  openPlayer(name, team, position, hits) {
    this._router.navigate([`/stats/players/${name}`]);
    this._teamsService.setPlayerPosition(position);
    this._teamsService.setPlayerHits(hits);
    window.scrollTo(0,0);
  }

  openGoaliePlayer(name, team, position, hits) {
    this._router.navigate([`/stats/players/${name}`]);
    this._teamsService.setPlayerPosition(position);
    this._teamsService.setPlayerHits(hits);
    window.scrollTo(0,0);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
