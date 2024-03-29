import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { takeWhile } from 'rxjs/operators';
import { DisplayService } from '../../_services/display.service';
import { Observable } from 'rxjs';
import { Team, TeamStat } from '../../_models/team';
import { TeamInfoService } from '../../_services/team-info.service';
import { CurrentSeasonService } from '../../_services/current-season.service';
import { DraftService } from '../../_services/draft.service';
import { DraftTable } from '../../_models/draft-table';
import { TeamStatsService } from '../../_services/team-stats.service';

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

  draftSeason: string = '2021';
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
    this.draftSeason = '2022';
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
    // console.log(draftSeason);
    this._draftService.getDraftTableByYear(draftSeason).pipe(
      takeWhile(() => this._alive)
    ).subscribe((table: DraftTable[]) => {
      this.table = table;
      this.getTeamStats(this.currentSeasonType);
    })
  }

  // USE FOR NEXT SEASON ASSUMING NO NEW TEAMS ???
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
    this._teamStatsService.getTeamStatsBySeasonByType('2021-22', seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((teamStats: TeamStat[]) => {
      this.teamStats = teamStats;
      this.getLeagueLeaders(teamStats, this.table)
    })
  }

  getLeagueLeaders(resp, drafts) {
    
    let tempLeaders = resp;
    
    drafts.forEach(element => {

      let tempTeam = tempLeaders.find(team => team.shortname === element.shortname);
      element.points = tempTeam.points;
      element.wins = tempTeam.wins;
      element.goals_for = tempTeam.goals_for;
      element.goals_against = tempTeam.goals_against;

      // THIS IS TEMPORARY
      // if (element.shortname === 'VSJ') {
      //  let tempTeam = tempLeaders.find(team => team.shortname === 'VIC');
      //  element.points = tempTeam.points;
      // } else if (element.shortname === 'SJV') {
      //   let tempTeam = tempLeaders.find(team => team.shortname === 'SCS');
      //   element.points = tempTeam.points;
      // } else {
      //   let tempTeam = tempLeaders.find(team => team.shortname === element.shortname);
      //   element.points = tempTeam.points;
      // }
    });

    drafts.sort((a,b) => {
      if (b.points === a.points) {
        if (b.wins === a.wins) {
          if ((b.goals_for-b.goals_against) === (a.goals_for-a.goals_against)) {
            return b.goals_for - a.goals_for;
          } else {
            return (b.goals_for-b.goals_against) - (a.goals_for-a.goals_against);
          }
        } else {
          return b.wins - a.wins;
        }
      } else {
        return b.points - a.points;
      }
    }).reverse();

    
    setTimeout(() => {
      this.draft = new MatTableDataSource<any[]>(drafts);
      this.isLoading = false;
    }, 250)
    
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
