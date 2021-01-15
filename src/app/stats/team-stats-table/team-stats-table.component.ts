import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, MatPaginator } from '@angular/material';
import { Team } from 'src/app/_models/team';

@Component({
  selector: 'app-team-stats-table',
  templateUrl: './team-stats-table.component.html',
  styleUrls: ['./team-stats-table.component.css']
})
export class TeamStatsTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() teams:any;
  @Input() statsColumnsToDisplay: [];
  @Input() sortByPoints: boolean;
  @Input() showAll: boolean;

  page: number = 1;
  pageSize: number;
  length: number = 0;

  goalsForPerGame: string;
  goalsAgainstPerGame: string;
  winPct: string;
  pimPerGame: string;
  goalDiff: string;
  ppPct: string;
  pkPct: string;
  totalShotDiff: string;

  totalGP: number = 0;
  totalWins: number = 0;
  totalLoss: number = 0;
  totalTies: number = 0;
  totalPoints: number = 0;
  totalGF: number = 0;
  totalGA: number = 0;
  totalPP: number = 0;
  totalPPA: number = 0;
  totalPK: number = 0;
  totalPKA: number = 0;
  totalSHG: number = 0;
  totalPIM: number = 0;
  totalShotsFor: number = 0;
  totalShotsAgainst: number = 0;

  @ViewChild("overallSort", {static: false}) overallSort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
    // this.length = this.teams.length;
  }

  ngAfterViewInit() {
    this.resetStats();
    if (this.teams) {
      this.getTeamTotals(this.teams);
      this.teams.sort = this.overallSort;
      this.teams.paginator = this.paginator;
    }
  }

  ngOnChanges() {
    this.resetStats();
    if (this.teams) {
      this.getTeamTotals(this.teams);
      this.teams.sort = this.overallSort;
      this.teams.paginator = this.paginator;
    }
  }

  routeToTeam(team: Team) {
    if (team.isactive) {
      this._router.navigate([`/teams/${team.shortname}/${team['team_id']}/salaries`])
    } else {
      this._router.navigate([`/teams/${team.shortname}/${team['team_id']}/archives/team`])
    }
  }

  getTeamTotals(stats) {
    if (stats && stats['data']) {
      stats['data'].forEach(year => {
        this.totalGP += Number(year.games_played);
        this.totalWins += Number(year.wins);
        this.totalLoss += Number(year.loss);
        this.totalTies += Number(year.ties);
        this.totalPoints += Number(year.points);
        this.totalGF += Number(year.goals_for);
        this.totalGA += Number(year.goals_against);
        this.totalPP += Number(year.pp_goals);
        this.totalPPA += Number(year.pp_attempts);
        this.totalPK += Number(year.pk_goals);
        this.totalPKA += Number(year.pk_attempts);
        this.totalSHG += Number(year.sh_goals);
        this.totalPIM += Number(year.penalty_minutes);
        this.totalShotsFor += Number(year.shots_for);
        this.totalShotsAgainst += Number(year.shots_against);
      });
      this.goalsForPerGame = (this.totalGF / this.totalGP).toFixed(2);
      this.goalsAgainstPerGame = (this.totalGA / this.totalGP).toFixed(2);
      this.goalDiff = (this.totalGF - this.totalGA).toString();
      this.winPct = ((this.totalWins / this.totalGP) * 100).toFixed(1);
      this.ppPct = ((this.totalPP / this.totalPPA) * 100).toFixed(1);
      this.pkPct = (((this.totalPKA - this.totalPK) / this.totalPKA) * 100).toFixed(1);
      this.pimPerGame = (this.totalPIM / this.totalGP).toFixed(1);
      this.totalShotDiff = (this.totalShotsFor - this.totalShotsAgainst).toString();
    }
  }

  resetStats() {
    this.totalGP = 0;
    this.totalWins = 0;
    this.totalLoss = 0;
    this.totalTies = 0;
    this.totalGF = 0;
    this.totalGA = 0;
    this.totalPP = 0;
    this.totalPPA = 0;
    this.totalPK = 0;
    this.totalPKA = 0;
    this.totalSHG = 0;
    this.totalPIM = 0;
    this.totalShotsFor = 0;
    this.totalShotsAgainst = 0;
  }

}
