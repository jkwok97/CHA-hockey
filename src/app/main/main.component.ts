import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';
import { Team, TeamStat } from '../_models/team';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamsService } from '../teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { TeamInfoService } from '../services/team-info.service';
import { Observable } from 'rxjs';
import { CurrentSeasonService } from '../services/current-season.service';
import { DisplayService } from '../services/display.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean;

  currentUser: User;

  teams$: Observable<Team[]>

  team: Team;
  teams: Team[];
  player: any;
  stats: any;
  playerStats = [];

  currentSeason: string;
  currentSeasonType: string;

  playersData: MatTableDataSource<any[]>;
  playersColumnsToDisplay = [
    'player_name', 'position', 'games_played','goals', 'assists', 'points', 'points_per_sixty', 'plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
    'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots'
  ];

  goaliesData: MatTableDataSource<any[]>;
  goaliesColumnsToDisplay = [
    'player_name', 'games_played','minutes_played', 'goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct'
  ];

  teamsData: MatTableDataSource<any[]>;
  teamsColumnsToDisplay = [
    'playing_year', 'season_type', 'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
    'home_record', 'away_record', 'trail_record'
  ];

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _teamInfoService: TeamInfoService,
    private _currentSeasonService: CurrentSeasonService,
    private _displayService: DisplayService,

    private _teamsService: TeamsService,
    private _route: ActivatedRoute,
  ) {
    this._authService.currentUser.subscribe(x => this.currentUser = x[0]);

    if (!this.currentUser) {
      this._router.navigate(['/login']);
    }

    this.teams$ = this._teamInfoService.getUserTeams(this.currentUser.id);

   }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;

    this.currentSeason = this._currentSeasonService.currentSeason;
    this.currentSeasonType = this._currentSeasonService.currentSeasonType;

    this.teams$.pipe(
      takeWhile(() => this._alive)
    ).subscribe((teams: Team[]) => {
      this.teams = teams;
      this.team = teams.find((team: Team) => team.isactive);
      this.routeToTeam(this.team);
      this.getAllTeamStatsForSeason();
      this.getTeamPlayerStatsForSeason(this.team);
      this.getTeamGoalieStatsForSeason(this.team);
    })

  }

  getAllTeamStatsForSeason() {
    this._teamsService.getLeagueTeamsStats(this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      this.stats = resp as Team[];

      // this.stats = allTeams.map(team => )
      // allTeams.forEach(team => {
      //   if (team['playing_year'] === this.currentSeason && team['season_type'] === this.currentSeasonType) { this.stats.push(team); }
      // });
      this.isLoading = false;
    });
  }

  getTeamPlayerStatsForSeason(team: Team) {
    this._teamsService.getTeamPlayerStatsByYearByType(team.shortname, this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      const stats = resp as [{}];

      this.playerStats = stats.map(stat => ({
        ...stat,
        points_per_sixty: ((stat['points']/stat['minutes_played']) * 60).toFixed(2)
      }))

      this.playersData = new MatTableDataSource<any[]>(this.playerStats);
    });
  }

  getTeamGoalieStatsForSeason(team: Team) {
    this._teamsService.getTeamGoalieStatsByYearByType(team.shortname, this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          const stats = resp as [];
          this.goaliesData = new MatTableDataSource<any[]>(stats);
        });
  }

  routeToTeam(team: Team) {
    this._router.navigate([`/main/`], {
      relativeTo: this._route,
      queryParams: { team: team.shortname },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    })
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

  // checkString(team) {
  //   if (team.shortName === "STA") {
  //     this.getKillerBeesStats(team, this.seasonType);
  //   } else if (team.shortName === "ATL") {
  //     this.getFlashersStats(team, this.seasonType);
  //   } else if (team.shortName === "CHY") {
  //     this.getDesperadosStats(team, this.seasonType);
  //   } else if (team.shortName === "SCS") {
  //     this.getStringraysStats(team, this.seasonType);
  //   } else if (team.shortName === "OAK") {
  //     this.getAssassinsStats(team, this.seasonType);
  //   } else {
  //     this._teamsService.getAlltimeTeamStatsByType(team.shortName, this.seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
  //       // console.log(resp);
  //       let teamStats = resp as [];
  //       this.isLoading = false;
  //       this.teamsData = new MatTableDataSource<any[]>(teamStats);
  //     });
  //   }
  // }

  // changeSeason(value) {
  //   if (value === 'Playoffs') {
  //     this.isLoading = true;
  //     this.seasonType = value;
  //     this.checkString(this.team);
  //   } else {
  //     this.isLoading = true;
  //     this.seasonType = value;
  //     // this.resetStats();
  //     this.checkString(this.team);
  //   }
  // }

  onTabChange(event) {
    // console.log(event);
    if (event.tab.textLabel === "Player Charts") {

    } else if (event.tab.textLabel === "Team History") {
      // this.checkString(this.team);
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
        this.teamsData = new MatTableDataSource<any[]>(teamStats);
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
        this.teamsData = new MatTableDataSource<any[]>(teamStats);
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
          this.teamsData = new MatTableDataSource<any[]>(teamStats);
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
        this.teamsData = new MatTableDataSource<any[]>(teamStats);
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
        this.teamsData = new MatTableDataSource<any[]>(teamStats);
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
