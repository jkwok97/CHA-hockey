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
  isMobile: boolean;
  expand: boolean = false;

  stats: any;
  goalieStats: any;
  pointLeaders = [];
  dmenLeaders = [];
  rookieLeaders = [];
  goalLeaders = [];
  shGoalLeaders = [];
  ppGoalLeaders = [];
  assistLeaders = [];
  plusMinusLeader = [];
  plusMinusLoser = [];
  penaltyLeader = [];
  hitLeader = [];
  shotLeaders = [];
  blockedLeader = [];
  currPointStreakLeaders = [];
  longPointStreakLeaders = [];
  goalieLeaders = [];
  goaliesGAALeaders = [];
  goaliesSvPctLeaders = [];
  goaliesShutOutsLeaders = [];
  goaliesShotsFacedLeaders = [];
  leagueLeaders = [];
  goalDiffLeagueLeaders = [];
  shotDiffLeagueLeaders = [];
  ppLeagueLeaders = [];
  pkLeagueLeaders = [];
  pimLeagueLeaders = [];
  pointsPerSixtyLeaders = [];

  currentSeason: string;
  currentSeasonType: string;

  teamsLeaders: MatTableDataSource<any[]>;
  mobileTeamsColumnsToDisplay = ['team_logo', 'games_played', 'wins', 'loss', 'ties', 'points']
  teamsColumnsToDisplay = [ 'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'win_pct' ];

  teamsGoalDiffLeaders: MatTableDataSource<any[]>;
  mobileTeamsGoalDiffColumnsToDisplay = ['team_logo', 'goals_for', 'goals_against', 'goals_diff' ]
  teamsGoalDiffColumnsToDisplay = [ 'team_logo','team_name', 'goals_for', 'goals_against', 'goals_diff' ];

  teamsShotDiffLeaders: MatTableDataSource<any[]>;
  mobileTeamsShotDiffColumnsToDisplay = ['team_logo', 'shots_for', 'shots_against', 'shots_diff']
  teamsShotDiffColumnsToDisplay = [ 'team_logo','team_name', 'shots_for', 'shots_against', 'shots_diff' ];

  teamsPPLeaders: MatTableDataSource<any[]>;
  mobileTeamsPPColumnsToDisplay = [ 'team_logo', 'pp_attempts', 'pp_goals', 'pp_pct']
  teamsPPColumnsToDisplay = [ 'team_logo','team_name', 'pp_attempts', 'pp_goals', 'pp_pct' ];

  teamsPKLeaders: MatTableDataSource<any[]>;
  mobileTeamsPKColumnsToDisplay = [ 'team_logo', 'pk_attempts', 'pk_goals', 'pk_pct']
  teamsPKColumnsToDisplay = [ 'team_logo','team_name', 'pk_attempts', 'pk_goals', 'pk_pct' ];

  teamsPIMLeaders: MatTableDataSource<any[]>;
  mobileTeamsPIMColumnsToDisplay = ['team_logo', 'penalty_minutes', 'pim_game']
  teamsPIMColumnsToDisplay = [ 'team_logo','team_name', 'penalty_minutes', 'pim_game' ];

  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = ['team_logo','player_name', 'games_played', 'goals', 'assists', 'points'];
  mobilePlayersColumnsToDisplay = ['team_logo','player_name', 'games_played', 'points']
  dmen: MatTableDataSource<any[]>;
  dmenColumnsToDisplay = ['team_logo','player_name', 'games_played', 'goals', 'assists', 'points'];
  mobileDmenColumnsToDisplay = ['team_logo','player_name', 'games_played', 'points']
  rookies: MatTableDataSource<any[]>;
  rookieColumnsToDisplay = ['team_logo','player_name', 'games_played', 'goals', 'assists', 'points'];
  mobileRookiesColumnsToDisplay = ['team_logo','player_name', 'games_played', 'points']
  
  goalies: MatTableDataSource<any[]>;
  goaliesColumnsToDisplay = ['team_logo','player_name', 'games_played', 'wins'];
  goaliesGAA: MatTableDataSource<any[]>;
  goaliesGAAColumnsToDisplay = ['team_logo','player_name', 'goals_against_avg'];
  goaliesSvPct: MatTableDataSource<any[]>;
  goaliesSvPctColumnsToDisplay = ['team_logo','player_name', 'save_pct'];
  goaliesShotsFaced: MatTableDataSource<any[]>;
  goaliesShotsFacedColumnsToDisplay = ['team_logo','player_name', 'shots_for'];
  goaliesShutOuts: MatTableDataSource<any[]>;
  goaliesShutOutsColumnsToDisplay = ['team_logo','player_name', 'shutouts'];

  currPointLeaders: MatTableDataSource<any[]>;
  currPointLeadersColumnsToDisplay = ['team_logo','player_name', 'current_points_streak'];
  longPointLeaders: MatTableDataSource<any[]>;
  longPointLeadersColumnsToDisplay = ['team_logo','player_name', 'longest_points_streak'];
  goalsLeaders: MatTableDataSource<any[]>;
  playersGoalsColumnsToDisplay = ['team_logo','player_name','goals'];
  shGoalsLeaders: MatTableDataSource<any[]>;
  playersShGoalsColumnsToDisplay = ['team_logo','player_name','sh_goals'];
  ppGoalsLeaders: MatTableDataSource<any[]>;
  playersPpGoalsColumnsToDisplay = ['team_logo','player_name','pp_goals'];
  assistsLeaders: MatTableDataSource<any[]>;
  playersAssistsColumnsToDisplay = ['team_logo','player_name','assists'];
  plusMinusLeaders: MatTableDataSource<any[]>;
  plusMinusLosers: MatTableDataSource<any[]>;
  playersPlusMinusColumnsToDisplay = ['team_logo','player_name','plus_minus'];
  penaltiesLeaders: MatTableDataSource<any[]>;
  playersPenaltiesColumnsToDisplay = ['team_logo','player_name','penalty_minutes'];
  hitsLeaders: MatTableDataSource<any[]>;
  playersHitsColumnsToDisplay = ['team_logo','player_name','hits'];
  blockedLeaders: MatTableDataSource<any[]>;
  playersBlockedColumnsToDisplay = ['team_logo','player_name','blocked_shots'];
  shotsLeaders: MatTableDataSource<any[]>;
  playersShotsColumnsToDisplay = ['team_logo','player_name','shots'];
  pointsSixtyLeaders: MatTableDataSource<any[]>;
  playersPointsSixtyColumnsToDisplay = ['team_logo','player_name', 'minutes_played', 'points_per_sixty'];

  @ViewChild("overallSort", {static: false}) overallSort: MatSort;
  @ViewChild("diffSort", {static: false}) diffSort: MatSort;

  constructor(
    private _teamsService: TeamsService,
    private _route: Router
  ) { }

  ngOnInit() {
    this.checkMobile();
    // console.log(this.isMobile);
    this.isLeadersLoading = true;
    this.isGoaliesLoading = true;
    this.isLeagueLoading = true;
    this.currentSeason = this._teamsService.currentSeason;
    this.currentSeasonType = this._teamsService.currentSeasonType;
    this._teamsService.getPlayerStatsByYearByType(this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.stats = resp;
      console.log(resp);
      this.getPointLeaders(resp);
      this.getDmanPointLeaders(resp);
      this.getRookiePointLeaders(resp);
      this.getPointStreakLeaders(resp);
      this.getLongPointStreakLeaders(resp);
      this.getGoalsLeaders(resp);
      this.getAssistsLeaders(resp);
      this.getPlusMinusLeaders(resp);
      this.getPlusMinusLosers(resp);
      this.getPenaltiesLeaders(resp);
      this.getHitsLeaders(resp);
      this.getBlockedLeaders(resp);
      this.getShotsLeaders(resp);
      this.getPointsPerSixtyLeaders(resp);
      this.getShGoalsLeaders(resp);
      this.getPpGoalsLeaders(resp);
      this.isLeadersLoading = false;
    });
    this._teamsService.getGoalieStatsByYearByType(this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      this.goalieStats = resp;
      this.getGoalieLeaders(resp);
      this.getGAALeaders(resp);
      this.getSvPctLeaders(resp);
      this.getShotsFacedLeaders(resp);
      this.getShutOutsLeaders(resp);
      this.isGoaliesLoading = false;
    });
    this._teamsService.getLeagueTeamsStats(this.currentSeason).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.getLeagueLeaders(resp);
      this.getGoalDiffLeagueLeaders(resp);
      this.getShotDiffLeagueLeaders(resp);
      this.getPPLeagueLeaders(resp);
      this.getPKLeagueLeaders(resp);
      this.getPimLeagueLeaders(resp);
      this.isLeagueLoading = false;
    });
  }

  checkMobile() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) {
          this.isMobile = true;
          this.expand = false;
        } else {
          this.isMobile = false;
          this.expand = true;
        }
  }

  getShutOutsLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { 
      if (element.games_played > 0) {
        this.goaliesShutOutsLeaders.push(element);
      }
    });
    this.goaliesShutOutsLeaders.sort((a,b) => b.shutouts - a.shutouts);
    let leaders = this.goaliesShutOutsLeaders.splice(0, 10);
    this.goaliesShutOuts = new MatTableDataSource<any[]>(leaders);
  }

  getShotsFacedLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { 
      if (element.games_played > 0) {
        this.goaliesShotsFacedLeaders.push(element);
      }
    });
    this.goaliesShotsFacedLeaders.sort((a,b) => b.shots_for - a.shots_for);
    let leaders = this.goaliesShotsFacedLeaders.splice(0, 10);
    this.goaliesShotsFaced = new MatTableDataSource<any[]>(leaders);
  }

  getSvPctLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { 
      if (element.games_played > 0) {
        this.goaliesSvPctLeaders.push(element);
      }
    });
    this.goaliesSvPctLeaders.sort((a,b) => b.save_pct - a.save_pct);
    let leaders = this.goaliesSvPctLeaders.splice(0, 10);
    this.goaliesSvPct = new MatTableDataSource<any[]>(leaders);
  }

  getGAALeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { 
      if (element.games_played > 0) {
        this.goaliesGAALeaders.push(element);
      }
    });
    this.goaliesGAALeaders.sort((a,b) => a.goals_against_avg - b.goals_against_avg);
    let leaders = this.goaliesGAALeaders.splice(0, 10);
    this.goaliesGAA = new MatTableDataSource<any[]>(leaders);
  }

  getBlockedLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { this.blockedLeader.push(element) });
    this.blockedLeader.sort((a,b) => b.blocked_shots - a.blocked_shots);
    let leaders = this.blockedLeader.splice(0, 10);
    this.blockedLeaders = new MatTableDataSource<any[]>(leaders);
  }

  getHitsLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { this.hitLeader.push(element) });
    this.hitLeader.sort((a,b) => b.hits - a.hits);
    let leaders = this.hitLeader.splice(0, 10);
    this.hitsLeaders = new MatTableDataSource<any[]>(leaders);
  }

  getPenaltiesLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { this.penaltyLeader.push(element) });
    this.penaltyLeader.sort((a,b) => b.penalty_minutes - a.penalty_minutes);
    let leaders = this.penaltyLeader.splice(0, 10);
    this.penaltiesLeaders = new MatTableDataSource<any[]>(leaders);
  }

  getPlusMinusLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { this.plusMinusLeader.push(element) });
    this.plusMinusLeader.sort((a,b) => b.plus_minus - a.plus_minus);
    let leaders = this.plusMinusLeader.splice(0, 10);
    this.plusMinusLeaders = new MatTableDataSource<any[]>(leaders);
  }

  getPlusMinusLosers(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { this.plusMinusLoser.push(element) });
    this.plusMinusLoser.sort((a,b) => a.plus_minus - b.plus_minus);
    let leaders = this.plusMinusLoser.splice(0, 10);
    this.plusMinusLosers = new MatTableDataSource<any[]>(leaders);
  }

  getAssistsLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { this.assistLeaders.push(element) });
    this.assistLeaders.sort((a,b) => b.assists - a.assists);
    let leaders = this.assistLeaders.splice(0, 10);
    this.assistsLeaders = new MatTableDataSource<any[]>(leaders);
  }

  getRookiePointLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { 
      if (element.player_status === "Rookie") {
        this.rookieLeaders.push(element) 
      }
    });
    this.rookieLeaders.sort((a,b) => b.points - a.points);
    let leaders = this.rookieLeaders.splice(0, 10);
    this.rookies = new MatTableDataSource<any[]>(leaders);
  }

  getDmanPointLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { 
      if (element.position === "RD" || element.position === "LD") {
        this.dmenLeaders.push(element) 
      }
    });
    this.dmenLeaders.sort((a,b) => b.points - a.points);
    let leaders = this.dmenLeaders.splice(0, 10);
    this.dmen = new MatTableDataSource<any[]>(leaders);
  }

  getShotsLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { this.shotLeaders.push(element) });
    this.shotLeaders.sort((a,b) => b.shots - a.shots);
    let leaders = this.shotLeaders.splice(0, 10);
    this.shotsLeaders = new MatTableDataSource<any[]>(leaders);
  }

  getGoalsLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { this.goalLeaders.push(element) });
    this.goalLeaders.sort((a,b) => b.goals - a.goals);
    let leaders = this.goalLeaders.splice(0, 10);
    this.goalsLeaders = new MatTableDataSource<any[]>(leaders);
  }

  getShGoalsLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { this.shGoalLeaders.push(element) });
    this.shGoalLeaders.sort((a,b) => b.sh_goals - a.sh_goals);
    let leaders = this.shGoalLeaders.splice(0, 10);
    this.shGoalsLeaders = new MatTableDataSource<any[]>(leaders);
  }

  getPpGoalsLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => { this.ppGoalLeaders.push(element) });
    this.ppGoalLeaders.sort((a,b) => b.pp_goals - a.pp_goals);
    let leaders = this.ppGoalLeaders.splice(0, 10);
    this.ppGoalsLeaders = new MatTableDataSource<any[]>(leaders);
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

  getGoalDiffLeagueLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => {
      if (element.playing_year === this.currentSeason && element.season_type === this.currentSeasonType) {
        element.goal_diff = element.goals_for - element.goals_against;
        this.goalDiffLeagueLeaders.push(element);
      }
    })
    this.goalDiffLeagueLeaders.sort((a,b) => b.goal_diff - a.goal_diff);
    this.teamsGoalDiffLeaders = new MatTableDataSource<any[]>(this.goalDiffLeagueLeaders);
  }

  getShotDiffLeagueLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => {
      if (element.playing_year === this.currentSeason && element.season_type === this.currentSeasonType) {
        element.shot_diff = element.shots_for - element.shots_against
        this.shotDiffLeagueLeaders.push(element);
      }
    })
    this.shotDiffLeagueLeaders.sort((a,b) => b.shot_diff - a.shot_diff);
    this.teamsShotDiffLeaders = new MatTableDataSource<any[]>(this.shotDiffLeagueLeaders);
  }

  getPPLeagueLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => {
      if (element.playing_year === this.currentSeason && element.season_type === this.currentSeasonType) {
        element.pp_pct = ((element.pp_goals / element.pp_attempts) * 100).toFixed(1)
        this.ppLeagueLeaders.push(element);
      }
    })
    this.ppLeagueLeaders.sort((a,b) => b.pp_pct - a.pp_pct);
    this.teamsPPLeaders = new MatTableDataSource<any[]>(this.ppLeagueLeaders);
  }

  getPKLeagueLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => {
      if (element.playing_year === this.currentSeason && element.season_type === this.currentSeasonType) {
        element.pk_pct = (((element.pk_attempts - element.pk_goals) / element.pk_attempts) * 100).toFixed(1) 
        this.pkLeagueLeaders.push(element);
      }
    })
    this.pkLeagueLeaders.sort((a,b) => b.pk_pct - a.pk_pct);
    this.teamsPKLeaders = new MatTableDataSource<any[]>(this.pkLeagueLeaders);
  }

  getPimLeagueLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => {
      if (element.playing_year === this.currentSeason && element.season_type === this.currentSeasonType) {
        element.pim_game = (element.penalty_minutes / element.games_played).toFixed(1)
        this.pimLeagueLeaders.push(element);
      }
    })
    this.pimLeagueLeaders.sort((a,b) => b.pim_game - a.pim_game);
    this.teamsPIMLeaders = new MatTableDataSource<any[]>(this.pimLeagueLeaders);
  }

  getPointsPerSixtyLeaders(resp) {
    let tempLeaders = resp;
    tempLeaders.forEach(element => {
      if (element.playing_year === this.currentSeason && element.season_type === this.currentSeasonType) {
        if (element.minutes_played > 0) {
          element.points_per_sixty = ((element.points/element.minutes_played) * 60).toFixed(2);
          this.pointsPerSixtyLeaders.push(element);
        }
      }
    })
    this.pointsPerSixtyLeaders.sort((a,b) => b.points_per_sixty - a.points_per_sixty);
    let leaders = this.pointsPerSixtyLeaders.splice(0, 10);
    this.pointsSixtyLeaders = new MatTableDataSource<any[]>(leaders);
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

  openPlayer(player, type) {
    this._route.navigate([`/info/${type}s/${player.player_id}/${player.player_name}`]);
    window.scrollTo(0,0);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
