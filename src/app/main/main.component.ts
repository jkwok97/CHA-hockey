import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { Team, TeamStat } from '../_models/team';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamsService } from '../teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { TeamInfoService } from '../_services/team-info.service';
import { Observable } from 'rxjs';
import { CurrentSeasonService } from '../_services/current-season.service';
import { DisplayService } from '../_services/display.service';

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

  activeLinkIndex = -1;

  routes = [
    {name: 'NHL Info', url: 'nhl-info', current: false},
    {name: 'Roster', url: 'roster', current: false},
    // {name: 'Charts', url: 'charts', current: false},
    {name: 'History', url: 'history/team', current: false},
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
  ) {
    this._authService.currentUser.subscribe( x => this.currentUser = x[0]);

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
    })

  }

  getAllTeamStatsForSeason() {
    this._teamsService.getLeagueTeamsStats(this.currentSeason, this.currentSeasonType).pipe(
      takeWhile(() => this._alive)
      ).subscribe(resp => {
        this.stats = resp as Team[];
        this.isLoading = false;
      });
  }

  routeToTeam(team: Team) {
    this._router.navigate([`/main/${team.shortname}/nhl-info`], {
        queryParamsHandling: 'merge',
    });
  }

  openTeam(shortName, season, type) {
    this._router.navigate([`/teams/${shortName}/${season}/${type}`]);
    window.scrollTo(0,0);
  }

  toSalaryPage(link) {
    window.open(link);
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
