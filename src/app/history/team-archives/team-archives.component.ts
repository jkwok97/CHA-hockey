import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs/operators';
import { TeamsService } from 'src/app/teams/teams.service';
import { ActivatedRoute } from '@angular/router';

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
  seasonType: string = 'Regular';

  teams: MatTableDataSource<any[]>;
  teamsColumnsToDisplay = [
    'playing_year', 'season_type', 'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
    'home_record', 'away_record', 'trail_record'
  ];

  constructor(
    private _teamsService: TeamsService,
    private _route: ActivatedRoute,
  ) {
    this.short_team_name = this._route.snapshot.queryParams['team'];
    // this.short_team_name = this._route.snapshot.paramMap.get("params");
    this.team = this._teamsService.getTeamInfo(this.short_team_name);
    this.seasonType = this._teamsService.currentSeasonType; 
  }

  ngOnInit() {
    this.checkString(this.team);
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
      if (type === "Regular") {
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
      } else {
        this.isLoading = false;
        teamStats.sort((a,b) => b['playing_year'] - a['playing_year']);
        this.teams = new MatTableDataSource<any[]>(teamStats);
      }      
    }, error => {
      console.log("brrrrrrrr");
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
