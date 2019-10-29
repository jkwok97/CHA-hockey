import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamsService } from '../teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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
  goalieLeaders = [];
  leagueLeaders = [];

  teamsLeaders: MatTableDataSource<any[]>;
  teamsColumnsToDisplay = [ 'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_diff', 'win_pct' ];
  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = ['team_logo','player_name', 'games_played','goals', 'assists', 'points'];
  goalies: MatTableDataSource<any[]>;
  goaliesColumnsToDisplay = ['team_logo','player_name', 'games_played', 'wins','loss', 'ties','save_pct'];
  currPointLeaders: MatTableDataSource<any[]>;
  currPointLeadersColumnsToDisplay = ['team_logo','player_name', 'current_points_streak', 'points'];

  constructor(
    private _teamsService: TeamsService,
    private _route: Router
  ) { }

  ngOnInit() {
    this.isLeadersLoading = true;
    this.isGoaliesLoading = true;
    this.isLeagueLoading = true;
    this._teamsService.getPlayerStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      this.stats = resp;
      this.getPointLeaders(resp);
      this.isLeadersLoading = false;
    });
    // this._teamsService.getPlayerStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
    //   console.log(resp);
    //   this.stats = resp;
    //   this.getPointStreakLeaders(resp);
    //   this.isLeadersLoading = false;
    // });
    this._teamsService.getGoalieStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.getGoalieLeaders(resp);
      this.isGoaliesLoading = false;
    });
    this._teamsService.getLeagueTeamsStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.getLeagueLeaders(resp);
      this.isLeagueLoading = false;
    });
  }

  getPointLeaders(resp) {
    this.pointLeaders = resp.sort((a,b) => b.points - a.points);
    this.pointLeaders.splice(10, this.pointLeaders.length-10);
    this.players = new MatTableDataSource<any[]>(this.pointLeaders);
    console.log(this.stats);
    console.log(this.pointLeaders);
    console.log(resp);
  }

  getPointStreakLeaders(resp) {
    console.log(resp);
    // this.currPointStreakLeaders = resp as [];
    this.currPointStreakLeaders = resp.sort((a,b) => b.current_points_streak - a.current_points_streak);
    this.currPointStreakLeaders.splice(10, this.currPointStreakLeaders.length-10);
    console.log(this.currPointStreakLeaders)
    // this.currPointStreakLeaders.sort((a,b) => b.current_points_streak - a.current_points_streak).splice(10, this.currPointStreakLeaders.length-10);
    this.currPointLeaders = new MatTableDataSource<any[]>(this.currPointStreakLeaders);
  }

  getGoalieLeaders(resp) {
    console.log(resp);
    this.goalieLeaders = resp as [];
    this.goalieLeaders.sort((a,b) => b.wins - a.wins).splice(10, this.goalieLeaders.length-10);
    this.goalies = new MatTableDataSource<any[]>(this.goalieLeaders);
  }

  getLeagueLeaders(resp) {
    console.log(resp);
    this.leagueLeaders = resp as [];
    this.leagueLeaders.sort((a,b) => b.points - a.points);
    this.teamsLeaders = new MatTableDataSource<any[]>(this.leagueLeaders);
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
