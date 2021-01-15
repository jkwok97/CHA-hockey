import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile, take, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { DisplayService } from 'src/app/_services/display.service';
import { NhlService } from 'src/app/_services/nhl.service';
import { PlayerService } from 'src/app/_services/player.service';

@Component({
  selector: 'app-nhl-leaders',
  templateUrl: './nhl-leaders.component.html',
  styleUrls: ['./nhl-leaders.component.css']
})
export class NhlLeadersComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean;
  errored: boolean = false;

  currentSeason: string = "20202021";

  allPlayers: any[];

  points: MatTableDataSource<any[]>;
  pointsColumnsToDisplay = ['team_logo','playerName', 'points'];

  rookiePoints: MatTableDataSource<any[]>;
  rookiePointsColumnsToDisplay = ['team_logo','playerName', 'points'];

  goals: MatTableDataSource<any[]>;
  goalsColumnsToDisplay = ['team_logo', 'playerName', 'goals'];

  rookieGoals: MatTableDataSource<any[]>;
  rookieGoalsColumnsToDisplay = ['team_logo', 'playerName', 'goals'];

  assists: MatTableDataSource<any[]>;
  assistsColumnsToDisplay = ['team_logo', 'playerName', 'assists'];

  rookieAssists: MatTableDataSource<any[]>;
  rookieAssistsColumnsToDisplay = ['team_logo', 'playerName', 'assists'];

  shPoints: MatTableDataSource<any[]>;
  shPointsColumnsToDisplay = ['team_logo', 'playerName', 'shPoints'];

  wins: MatTableDataSource<any[]>;
  winsColumnsToDisplay = ['team_logo', 'playerName', 'wins'];

  gaa: MatTableDataSource<any[]>;
  gaaColumnsToDisplay = ['team_logo', 'playerName', 'goalsAgainstAverage'];

  savePctg: MatTableDataSource<any[]>;
  savePctgColumnsToDisplay = ['team_logo', 'playerName', 'savePctg'];

  shutouts: MatTableDataSource<any[]>;
  shutoutsColumnsToDisplay = ['team_logo', 'playerName', 'shutouts'];

  constructor(
    private _displayService: DisplayService,
    private _nhlService: NhlService,
    private _playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.isMobile = this._displayService.isMobile;
    this.getNHLPointLeaders();
    this.getNHLGoalLeaders();
    this.getNHLAssistsLeaders();
    // this.getNHLWinsLeaders();
    this.getNHLGaaLeaders();
    this.getNHLSavePctLeaders();
    this.getNHLShutoutsLeaders();
    this.getNHLRookieLeaders("points");
    this.getNHLRookieLeaders("goals");
    this.getNHLRookieLeaders("assists");
  }

  displayFullStats(type: string) {
    this._displayService.triggerFullPageStats(type);
  }

  getPlayerLogo(id: number, leader: any) {
    this._playerService.getPlayerTeamLogo(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe(logo => {
      leader.cha_logo = logo;
      return leader;
    });
  }

  getGoalieLogo(id: number, leader: any) {
    this._playerService.getGoalieTeamLogo(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe(logo => {
      leader.cha_logo = logo;
      return leader;
    });
  }

  findNHLLogo(player) {
    // console.log(player.team.logos);
    let logo = player.team.logos.filter((logo) => logo.background === 'light').sort((a,b) => b['endSeason'] - a['endSeason']);
    return logo[0].secureUrl;
  }

  getNHLRookieLeaders(type) {
    this._nhlService.getNhlRookieLeaders(this.currentSeason, "skater", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let tempLeaders = resp as [];
      if (type === "points") {
        this.getRookiePointLeaders(tempLeaders);
      } else if (type === "goals") {
        this.getRookieGoalsLeaders(tempLeaders);
      } else if (type === "assists") {
        this.getRookieAssistsLeaders(tempLeaders);
      }
    }, error => {
      console.log(error);
      this.errored = true;
      this.isLoading = false;
    });
  }
  
  getRookieAssistsLeaders(leaders) {
    let rookieAssistsLeaders = [];
    leaders.forEach(element => { rookieAssistsLeaders.push(element); });
    this.rookieAssists = new MatTableDataSource<any[]>(rookieAssistsLeaders);
    this.isLoading = false;
  }

  getRookieGoalsLeaders(leaders) {
    let rookieGoalsLeaders = [];
    leaders.forEach(element => { rookieGoalsLeaders.push(element); });
    this.rookieGoals = new MatTableDataSource<any[]>(rookieGoalsLeaders);
    this.isLoading = false;
  }

  getRookiePointLeaders(leaders) {
    let rookiePointLeaders = [];
    leaders.forEach(element => { rookiePointLeaders.push(element); });
    this.rookiePoints = new MatTableDataSource<any[]>(rookiePointLeaders);
    this.isLoading = false;
  }

  getNHLPointLeaders() {
    this._nhlService.getNhlLeaders(this.currentSeason, "skater", "points", "no", "trim").pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      let leaders = [];
      leaders = resp as [];
      leaders.forEach((leader) => {
        leader = this.getPlayerLogo(leader['player']['id'], leader);
      });
      this.points = new MatTableDataSource<any[]>(resp as []);
      this.isLoading = false;
    }, error => {
      this.errored = true;
      this.isLoading = false;
    });
  }

  getNHLGoalLeaders() {
    this._nhlService.getNhlLeaders(this.currentSeason, "skater", "goals", "no", "trim").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let tempLeaders = resp as [];
      let goalLeaders = [];
      tempLeaders.forEach(element => { goalLeaders.push(element); });
      goalLeaders.forEach(player => {
        player = this.getPlayerLogo(player.player.id, player);
      });
      this.goals = new MatTableDataSource<any[]>(goalLeaders);
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.errored = true;
      this.isLoading = false;
    });
  }

  getNHLAssistsLeaders() {
    this._nhlService.getNhlLeaders(this.currentSeason, "skater", "assists", "no", "trim").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let tempLeaders = resp as [];
      let assistsLeaders = [];
      tempLeaders.forEach(element => { assistsLeaders.push(element); });
      assistsLeaders.forEach(player => {
        player = this.getPlayerLogo(player.player.id, player);
      });
      this.assists = new MatTableDataSource<any[]>(assistsLeaders);
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.errored = true;
      this.isLoading = false;
    });
  }

  // getNHLWinsLeaders() {
  //   this._nhlService.getNhlLeaders(this.currentSeason, "goalie", "wins", "reverse", "trim").pipe(takeWhile(() => this._alive)).subscribe(resp => {
  //     // console.log(resp);
  //     let tempLeaders = resp as [];
  //     let winsLeaders = [];
  //     tempLeaders.forEach(element => { winsLeaders.push(element); });
  //     winsLeaders.forEach(player => {
  //       player = this.findChaTeam(`${player['playerLastName']}, ${player['playerFirstName']}`, player, "goalie");
  //     });
  //     this.wins = new MatTableDataSource<any[]>(winsLeaders);
  //     this.isLoading = false;
  //   }, error => {
  //     console.log(error);
  //     this.errored = true;
  //     this.isLoading = false;
  //   });
  // }

  getNHLGaaLeaders() {
    this._nhlService.getNhlLeaders(this.currentSeason, "goalie", "gaa", "no", "trim").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let tempLeaders = resp as [];
      let gaaLeaders = [];
      tempLeaders.forEach(element => { gaaLeaders.push(element); });
      gaaLeaders.forEach(player => {
        player = this.getGoalieLogo(player.player.id, player);
      });
      this.gaa = new MatTableDataSource<any[]>(gaaLeaders);
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.errored = true;
      this.isLoading = false;
    });
  }

  getNHLSavePctLeaders() {
    this._nhlService.getNhlLeaders(this.currentSeason, "goalie", "savePctg", "no", "trim").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let tempLeaders = resp as [];
      let savePctgLeaders = [];
      tempLeaders.forEach(element => { savePctgLeaders.push(element); });
      savePctgLeaders.forEach(player => {
        player = this.getGoalieLogo(player.player.id, player);
      });
      this.savePctg = new MatTableDataSource<any[]>(savePctgLeaders);
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.errored = true;
      this.isLoading = false;
    });
  }

  getNHLShutoutsLeaders() {
    this._nhlService.getNhlLeaders(this.currentSeason, "goalie", "shutouts", "no", "trim").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let tempLeaders = resp as [];
      let shutoutsLeaders = [];
      tempLeaders.forEach(element => { shutoutsLeaders.push(element); });
      shutoutsLeaders.forEach(player => {
        player = this.getGoalieLogo(player.player.id, player);
      });
      this.shutouts = new MatTableDataSource<any[]>(shutoutsLeaders);
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.errored = true;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
