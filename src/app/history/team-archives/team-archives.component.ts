import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { takeWhile } from 'rxjs/operators';
import { TeamsService } from 'src/app/teams/teams.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-archives',
  templateUrl: './team-archives.component.html',
  styleUrls: ['./team-archives.component.css']
})
export class TeamArchivesComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  team: any;

  short_team_name: string;
  goalsForPerGame: string;
  goalsAgainstPerGame: string;
  winPct: string;
  pimPerGame: string;
  goalDiff: string;
  ppPct: string;
  pkPct: string;
  totalShotDiff: string;
  seasonType: string = 'Regular';

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

  teams: MatTableDataSource<any[]>;
  teamsColumnsToDisplay = [
    'playing_year', 'season_type', 'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
    'home_record', 'away_record', 'trail_record'
  ];

  @ViewChild("overallSort", {static: false}) overallSort: MatSort;

  constructor(
    private _teamsService: TeamsService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.short_team_name = this._route.snapshot.paramMap.get("params");
    this.team = this._teamsService.getTeamInfo(this.short_team_name);
    this.seasonType = this._teamsService.currentSeasonType; 
  }

  ngOnInit() {
    this.checkString(this.team);
  }

  openTeam(shortName, season, type) {
    this._router.navigate([`/teams/${shortName}/${season}/${type}`]);
    window.scrollTo(0,0);
  }

  checkString(team) {
    if (team.shortName === "STA") {
      this.resetStats();
      this.getKillerBeesStats(team, this.seasonType);
    } else if (team.shortName === "ATL") {
      this.resetStats();
      this.getFlashersStats(team, this.seasonType);
    } else if (team.shortName === "CHY") {
      this.resetStats();
      this.getDesperadosStats(team, this.seasonType);
    } else if (team.shortName === "SCS") {
      this.resetStats();
      this.getStringraysStats(team, this.seasonType);
    } else if (team.shortName === "OAK") {
      this.resetStats();
      this.getAssassinsStats(team, this.seasonType);
    } else {
      this._teamsService.getAlltimeTeamStatsByType(team.shortName, this.seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        let teamStats = resp as [];
        this.isLoading = false;
        this.resetStats();
        this.getTeamTotals(teamStats);
        this.teams = new MatTableDataSource<any[]>(teamStats);
        this.teams.sort = this.overallSort;
      });
    }
  }

  getTeamTotals(stats) {
    stats.forEach(year => {
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

  changeSeason(value) {
    if (value === 'Playoffs') {
      this.isLoading = true;
      this.seasonType = value;
      this.checkString(this.team);
    } else {
      this.isLoading = true;
      this.seasonType = value;
      this.resetStats();
      this.checkString(this.team);
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
        this.getTeamTotals(teamStats);
        this.teams = new MatTableDataSource<any[]>(teamStats);
        this.teams.sort = this.overallSort;
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
        this.getTeamTotals(teamStats);
        this.teams = new MatTableDataSource<any[]>(teamStats);
        this.teams.sort = this.overallSort;
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
          this.getTeamTotals(teamStats);
          this.teams = new MatTableDataSource<any[]>(teamStats);
          this.teams.sort = this.overallSort;
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
        this.getTeamTotals(teamStats);
        this.teams = new MatTableDataSource<any[]>(teamStats);
        this.teams.sort = this.overallSort;
      });          
    });
  }

  getAssassinsStats(team, type) {
    this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as [];
      if (type === "Regular") {
        this._teamsService.getAlltimeTeamStatsByType("OAO", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          let oldTeamStats = resp as [];
          oldTeamStats.forEach(element => {
            teamStats.push(element);
          })
          // console.log(teamStats);
          this.isLoading = false;
          teamStats.sort((a,b) => b['playing_year'] - a['playing_year']);
          this.getTeamTotals(teamStats);
          this.teams = new MatTableDataSource<any[]>(teamStats);
          this.teams.sort = this.overallSort;
        }); 
      } else {
        this.isLoading = false;
        teamStats.sort((a,b) => b['playing_year'] - a['playing_year']);
        this.getTeamTotals(teamStats);
        this.teams = new MatTableDataSource<any[]>(teamStats);
        this.teams.sort = this.overallSort;
      }      
    }, error => {
      console.log("brrrrrrrr");
    });
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
