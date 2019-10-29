import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TeamsService } from '../teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLeadersLoading: boolean = false;
  isGoaliesLoading: boolean = false;
  isLeagueLoading: boolean = false;

  stats: any;
  pointLeaders = [];
  currPointStreakLeaders = [];
  longPointStreakLeaders = [];
  goalieLeaders = [];
  leagueLeaders = [];
  diffLeagueLeaders = [];

  teamsLeaders: MatTableDataSource<any[]>;
  teamsColumnsToDisplay = [ 'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'win_pct' ];
  teamsDiffLeaders: MatTableDataSource<any[]>;
  teamsDiffColumnsToDisplay = [ 'team_logo','team_name', 'goals_for', 'goals_against', 'goals_diff', 'shots_for', 'shots_against', 'shots_diff' ];
  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = ['team_logo','player_name', 'games_played','goals', 'assists', 'points'];
  goalies: MatTableDataSource<any[]>;
  goaliesColumnsToDisplay = ['team_logo','player_name', 'games_played', 'wins','loss', 'ties','save_pct'];
  currPointLeaders: MatTableDataSource<any[]>;
  currPointLeadersColumnsToDisplay = ['team_logo','player_name', 'current_points_streak', 'points'];
  longPointLeaders: MatTableDataSource<any[]>;
  longPointLeadersColumnsToDisplay = ['team_logo','player_name', 'longest_points_streak', 'points'];

  @ViewChild("overallSort", {static: false}) overallSort: MatSort;
  @ViewChild("diffSort", {static: false}) diffSort: MatSort;

  constructor(
    private _teamsService: TeamsService,
    private _route: Router
  ) { }

  ngOnInit() {
    this.isLeadersLoading = true;
    this.isGoaliesLoading = true;
    this.isLeagueLoading = true;
    this._teamsService.getPlayerStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.stats = resp;
      this.getPointLeaders(resp);
      this.isLeadersLoading = false;
    });
    this._teamsService.getPlayerStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.stats = resp;
      this.getPointStreakLeaders(resp);
      this.isLeadersLoading = false;
    });
    this._teamsService.getPlayerStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.stats = resp;
      this.getLongPointStreakLeaders(resp);
      this.isLeadersLoading = false;
    });
    this._teamsService.getGoalieStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.getGoalieLeaders(resp);
      this.isGoaliesLoading = false;
    });
    this._teamsService.getLeagueTeamsStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.getLeagueLeaders(resp);
      this.isLeagueLoading = false;
    });
    this._teamsService.getLeagueTeamsStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.getDiffLeagueLeaders(resp);
      this.isLeagueLoading = false;
    });
  }

  getPointLeaders(resp) {
    this.pointLeaders = resp.sort((a,b) => b.points - a.points);
    this.pointLeaders.splice(10, this.pointLeaders.length-10);
    this.players = new MatTableDataSource<any[]>(this.pointLeaders);
  }

  getPointStreakLeaders(resp) {
    this.currPointStreakLeaders = resp.sort((a,b) => b.current_points_streak - a.current_points_streak);
    this.currPointStreakLeaders.splice(10, this.currPointStreakLeaders.length-10);
    this.currPointLeaders = new MatTableDataSource<any[]>(this.currPointStreakLeaders);
  }

  getLongPointStreakLeaders(resp) {
    this.longPointStreakLeaders = resp.sort((a,b) => b.longest_points_streak - a.longest_points_streak);
    this.longPointStreakLeaders.splice(10, this.longPointStreakLeaders.length-10);
    this.longPointLeaders = new MatTableDataSource<any[]>(this.longPointStreakLeaders);
  }

  getGoalieLeaders(resp) {
    this.goalieLeaders = resp as [];
    this.goalieLeaders.sort((a,b) => b.wins - a.wins).splice(10, this.goalieLeaders.length-10);
    this.goalies = new MatTableDataSource<any[]>(this.goalieLeaders);
  }

  getLeagueLeaders(resp) {
    this.leagueLeaders = resp as [];
    this.leagueLeaders.sort((a,b) => b.points - a.points);
    this.teamsLeaders = new MatTableDataSource<any[]>(this.leagueLeaders);
  }

  getDiffLeagueLeaders(resp) {
    this.diffLeagueLeaders = resp as [];
    this.diffLeagueLeaders.sort((a,b) => b.goals_for - a.goals_for);
    this.teamsDiffLeaders = new MatTableDataSource<any[]>(this.diffLeagueLeaders);
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  openTeam(shortName) {
    this._route.navigate([`teams/${shortName}`])
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
