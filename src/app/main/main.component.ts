import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamsService } from '../teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean;
  showPlayersStats: boolean = false;
  showGoalieStats: boolean = false;
  showRookieStats: boolean = false;

  currentUser: User;

  team: any;
  stats = [];
  player: any;
  playerStats = [];
  goalieStats: any;

  currentSeason: string;
  currentSeasonType: string;
  seasonType: string = 'Regular';

  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = [
    'player_name', 'position', 'games_played','goals', 'assists', 'points', 'points_per_sixty', 'plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
    'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots'
  ];

  goalies: MatTableDataSource<any[]>;
  goaliesColumnsToDisplay = [
    'player_name', 'games_played','minutes_played', 'goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct'
  ];

  teams: MatTableDataSource<any[]>;
  teamsColumnsToDisplay = [
    'playing_year', 'season_type', 'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
    'home_record', 'away_record', 'trail_record'
  ];

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _teamsService: TeamsService,
    private _mainService: MainService,
    private _route: ActivatedRoute,
  ) {
    this._authService.currentUser.subscribe(x => this.currentUser = x);
    if (!this.currentUser) {
      this._router.navigate(['/login']);
    }
    // console.log(this.currentUser);
    this.team = this._teamsService.getTeamInfo(this.currentUser[0].short_name);
    // console.log(this.team);
    this._router.navigate([`/main/`], {
      relativeTo: this._route,
      queryParams: { team: this.team.shortName },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    })
   }

  ngOnInit() {
    this.checkMobile();
    this.currentSeason = this._teamsService.currentSeason;
    this.currentSeasonType = this._teamsService.currentSeasonType;
    this._mainService.listenerFullPageStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      if (resp === "players") {
        this.showPlayersStats = true;
        this.showGoalieStats = false;
        this.showRookieStats = false;
      } else if (resp === "goalies") {
        this.showGoalieStats = true;
        this.showRookieStats = false;
        this.showPlayersStats = false;
      } else if (resp === "rookies") {
        this.showRookieStats = true;
        this.showPlayersStats = false;
        this.showGoalieStats = false;
      }
    });
    this._teamsService.getLeagueTeamsStats(this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let allTeams = resp as [];
      allTeams.forEach(team => {
        if (team['playing_year'] === this.currentSeason && team['season_type'] === this.currentSeasonType) { this.stats.push(team); }
      });
      this.isLoading = false;
    });
    this._teamsService.getTeamPlayerStatsByYearByType(this.team.shortName, this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(this.playerStats);
      let stats = resp as any;
      stats.forEach(player => {
        player.points_per_sixty = ((player.points/player.minutes_played) * 60).toFixed(2);
        this.playerStats.push(player);
      });
      this.players = new MatTableDataSource<any[]>(this.playerStats);
    });
    this._teamsService.getTeamGoalieStatsByYearByType(this.team.shortName, this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.goalieStats = resp as [];
      // console.log(this.goalieStats);
      this.goalies = new MatTableDataSource<any[]>(this.goalieStats);
    });
  }

  showLeaders() {
    this.showPlayersStats = false;
    this.showGoalieStats = false;
    this.showRookieStats = false;
  }

  checkMobile() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) {
          this.isMobile = true;
          this._teamsService.setMobile(true);
        } else {
          this.isMobile = false;
          this._teamsService.setMobile(false);
        }
  }

  openTeam(shortName, season, type) {
    this._router.navigate([`/teams/${shortName}/${season}/${type}`]);
    window.scrollTo(0,0);
  }

  toSalaryPage(link) {
    window.open(link);
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  checkString(team) {
    if (team.shortName === "STA") {
      this.getKillerBeesStats(team, this.seasonType);
    } else if (team.shortName === "ATL") {
      this.getFlashersStats(team, this.seasonType);
    } else if (team.shortName === "CHY") {
      this.getDesperadosStats(team, this.seasonType);
    } else if (team.shortName === "SCS") {
      this.getStringraysStats(team, this.seasonType);
    } else if (team.shortName === "OAK") {
      this.getAssassinsStats(team, this.seasonType);
    } else {
      this._teamsService.getAlltimeTeamStatsByType(team.shortName, this.seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        let teamStats = resp as [];
        this.isLoading = false;
        this.teams = new MatTableDataSource<any[]>(teamStats);
      });
    }
  }

  changeSeason(value) {
    if (value === 'Playoffs') {
      this.isLoading = true;
      this.seasonType = value;
      this.checkString(this.team);
    } else {
      this.isLoading = true;
      this.seasonType = value;
      // this.resetStats();
      this.checkString(this.team);
    }
  }

  onTabChange(event) {
    // console.log(event);
    if (event.tab.textLabel === "Player Charts") {

    } else if (event.tab.textLabel === "Team History") {
      this.checkString(this.team);
    } else if (event.tab.textLabel === "Team Charts") {
      
    } else if (event.tab.textLabel === 'NHL Info') {
      
    }
  }

  getKillerBeesStats(team, type) {
    this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as [];
      this._teamsService.getAlltimeTeamStatsByType("MIS", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        // console.log(teamStats);
        this.isLoading = false;
        teamStats.sort((a,b) => b['playing_year'] - a['playing_year']);
        this.teams = new MatTableDataSource<any[]>(teamStats);
      });          
    });
  }

  getFlashersStats(team, type) {
    this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as [];
      this._teamsService.getAlltimeTeamStatsByType("CHA", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        // console.log(teamStats);
        this.isLoading = false;
        teamStats.sort((a,b) => b['playing_year'] - a['playing_year']);
        this.teams = new MatTableDataSource<any[]>(teamStats);
      });          
    });
  }

  getDesperadosStats(team, type) {
    this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as [];
      this._teamsService.getAlltimeTeamStatsByType("LVD", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        this._teamsService.getAlltimeTeamStatsByType("SDC", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          let oldTeamStats = resp as [];
          oldTeamStats.forEach(element => {
            teamStats.push(element);
          })
          // console.log(teamStats);
          this.isLoading = false;
          teamStats.sort((a,b) => b['playing_year'] - a['playing_year']);
          this.teams = new MatTableDataSource<any[]>(teamStats);
        });
      });          
    });
  }

  getStringraysStats(team, type) {
    this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as [];
      this._teamsService.getAlltimeTeamStatsByType("SAO", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        // console.log(teamStats);
        this.isLoading = false;
        teamStats.sort((a,b) => b['playing_year'] - a['playing_year']);
        this.teams = new MatTableDataSource<any[]>(teamStats);
      });          
    });
  }

  getAssassinsStats(team, type) {
    this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as [];
      this._teamsService.getAlltimeTeamStatsByType("OAO", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        // console.log(teamStats);
        this.isLoading = false;
        teamStats.sort((a,b) => b['playing_year'] - a['playing_year']);
        this.teams = new MatTableDataSource<any[]>(teamStats);
      });          
    }, error => {
      console.log("baaaaaaaaaaaaaaa");
    });
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
