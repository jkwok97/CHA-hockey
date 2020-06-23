import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TeamsService } from '../teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { DisplayService } from '../_services/display.service';
import { Observable } from 'rxjs';
import { Team, TeamStat } from '../_models/team';
import { TeamInfoService } from '../_services/team-info.service';
import { CurrentSeasonService } from '../_services/current-season.service';
import { DraftService } from '../_services/draft.service';
import { DraftTable } from '../_models/draft-table';
import { TeamStatsService } from '../_services/team-stats.service';

@Component({
  selector: 'app-picks',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.css']
})
export class PicksComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isMobile: boolean = false;
  isLoading: boolean = false;

  teams$: Observable<Team[]>;

  draftSeason: string = '2020';
  currentSeason: string;
  currentSeasonType: string = 'Regular';

  table: DraftTable[];
  teamStats: TeamStat[];

  draftTableData: MatTableDataSource<any[]>;
  columns = [ 'pick', 'logo', 'team_name','round_one', 'round_two', 'round_three', 'round_four', 'round_five'];
  mobileColumns = [ 'pick', 'logo', 'round_one', 'round_two', 'round_three', 'round_four', 'round_five'];

  teams = [];
  drafts: any;

  draft: MatTableDataSource<any[]>;

  constructor(
    private _teamStatsService: TeamStatsService,
    private _teamInfoService: TeamInfoService,
    private _currentSeasonService: CurrentSeasonService,
    private _displayService: DisplayService,
    private _draftService: DraftService
  ) { 
    this.teams$ = this._teamInfoService.getTeamsByActive('true');
    this.draftSeason = this._currentSeasonService.draftSeason;
    this.currentSeason = this._currentSeasonService.currentSeason;
  }

  ngOnInit() {
    this.isLoading = true;
    this.isMobile = this._displayService.isMobile;

    this.getDraftTableByYear(this.draftSeason);

    this.teams$.pipe(
      takeWhile(() => this._alive),
    ).subscribe((teams: Team[]) => {
      this.teams = teams;
    })
  }

  changeActive(season) {
    this.isLoading = true;
    this.draftSeason = season;
    this.getDraftTableByYear(season);
  }

  getTeamLogo(id: number) {
    if (this.teams) {
      return this.teams.find((team: Team) => team.id === id).teamlogo;
    }
  }

  getDraftTableByYear(draftSeason: string) {
    this._draftService.getDraftTableByYear(draftSeason).pipe(
      takeWhile(() => this._alive)
    ).subscribe((table: DraftTable[]) => {
      this.table = table;
      this.getTeamStats(this.currentSeasonType);
    })
  }

  // USE FOR NEXT SEASON ASSUMING NO NEW TEAMS
  // getDraftTableByYearByStandings(draftSeason: string, season: string, seasonType: string) {
  //   this._draftService.getDraftTableByStandings(draftSeason, season, seasonType).pipe(
  //     takeWhile(() => this._alive)
  //   ).subscribe((table: DraftTable[]) => {
  //     console.log(table);
  //     this.isLoading = false;
  //     this.table = table;
  //     this.draftTableData = new MatTableDataSource<any[]>(this.table as any[]);
  //   })
  // }

  getTeamStats(seasonType: string) {
    this._teamStatsService.getTeamStatsBySeasonByType(this.currentSeason, seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((teamStats: TeamStat[]) => {
      this.teamStats = teamStats;
      this.getLeagueLeaders(teamStats, this.table)
    })
  }

  getLeagueLeaders(resp, drafts) {
    let tempLeaders = resp;
    drafts.forEach(element => {

      // THIS IS TEMPORARY
      if (element.shortname === 'VSJ') {
       let tempTeam = tempLeaders.find(team => team.shortname === 'VIC');
       element.points = tempTeam.points;
      } else {
        let tempTeam = tempLeaders.find(team => team.shortname === element.shortname);
        element.points = tempTeam.points;
      }
    });
    drafts.sort((a,b) => a.points - b.points);
    this.draft = new MatTableDataSource<any[]>(drafts);
    this.isLoading = false;
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
