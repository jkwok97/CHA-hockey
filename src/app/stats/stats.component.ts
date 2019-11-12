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
  goalieStats: any;
  pointLeaders = [];
  currPointStreakLeaders = [];
  longPointStreakLeaders = [];
  goalieLeaders = [];
  leagueLeaders = [];
  diffLeagueLeaders = [];

  currentSeason: string;
  currentSeasonType: string;

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
    this.currentSeason = this._teamsService.currentSeason;
    this.currentSeasonType = this._teamsService.currentSeasonType;
    this._teamsService.getPlayerStatsByYearByType(this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.stats = resp;
      this.getPointLeaders(resp);
      this.getPointStreakLeaders(resp);
      this.getLongPointStreakLeaders(resp);
      this.isLeadersLoading = false;
    });
    this._teamsService.getGoalieStatsByYearByType(this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.goalieStats = resp;
      this.getGoalieLeaders(resp);
      this.isGoaliesLoading = false;
    });
    this._teamsService.getLeagueTeamsStats(this.currentSeason).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.getLeagueLeaders(resp);
      this.getDiffLeagueLeaders(resp);
      this.isLeagueLoading = false;
    });
  }

  getPointLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { this.pointLeaders.push(element) });
    this.pointLeaders.sort((a,b) => b.points - a.points);
    let leaders = this.pointLeaders.splice(0, 10);
    this.players = new MatTableDataSource<any[]>(leaders);
  }

  getPointStreakLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { this.currPointStreakLeaders.push(element); });
    this.currPointStreakLeaders.sort((a,b) => b.current_points_streak - a.current_points_streak);
    let leaders = this.currPointStreakLeaders.splice(0, 10);
    this.currPointLeaders = new MatTableDataSource<any[]>(leaders);
  }

  getLongPointStreakLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { this.longPointStreakLeaders.push(element); });
    this.longPointStreakLeaders.sort((a,b) => b.longest_points_streak - a.longest_points_streak);
    let leaders = this.longPointStreakLeaders.splice(0, 10);
    this.longPointLeaders = new MatTableDataSource<any[]>(leaders);
  }

  getGoalieLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { this.goalieLeaders.push(element); });
    this.goalieLeaders.sort((a,b) => b.wins - a.wins);
    let leaders = this.goalieLeaders.splice(0, 10);
    this.goalies = new MatTableDataSource<any[]>(leaders);
  }

  getLeagueLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => {
      if (element.playing_year === this.currentSeason && element.season_type === this.currentSeasonType) {
        this.leagueLeaders.push(element);
      }
    })
    this.leagueLeaders.sort((a,b) => b.points - a.points);
    this.teamsLeaders = new MatTableDataSource<any[]>(this.leagueLeaders);
  }

  getDiffLeagueLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => {
      if (element.playing_year === this.currentSeason && element.season_type === this.currentSeasonType) {
        this.diffLeagueLeaders.push(element);
      }
    })
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
    this._route.navigate([`teams/${shortName}`]);
    window.scrollTo(0,0);
  }

  openPlayer(name, team, position) {
    this._route.navigate([`/stats/players/${name}`]);
    this._teamsService.setPlayerPosition(position);
    window.scrollTo(0,0);
  }

  openGoaliePlayer(name, team, position) {
    this._route.navigate([`/stats/players/${name}`]);
    this._teamsService.setPlayerPosition(position);
    window.scrollTo(0,0);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
