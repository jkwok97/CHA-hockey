import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { MainService } from '../main.service';
import { TeamsService } from 'src/app/teams/teams.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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

  currentSeason: string = "20192020";

  allPlayers: any[];

  points: MatTableDataSource<any[]>;
  pointsColumnsToDisplay = ['team_logo','playerName', 'points'];

  goals: MatTableDataSource<any[]>;
  goalsColumnsToDisplay = ['team_logo', 'playerName', 'goals'];

  assists: MatTableDataSource<any[]>;
  assistsColumnsToDisplay = ['team_logo', 'playerName', 'assists'];

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
    private _mainService: MainService,
    private _teamsService: TeamsService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.checkMobile();
    // this.getNHLPointLeaders();
    // this.getNHLGoalLeaders();
    // this.getNHLAssistsLeaders();
    // this.getNHLShPointsLeaders();
    // this.getNHLWinsLeaders();
    // this.getNHLGaaLeaders();
    // this.getNHLSavePctLeaders();
    // this.getNHLShutoutsLeaders();
  }

  sendToFullPlayers() {
    this._mainService.triggerFullPageStats("players");
  }

  sendToFullGoalies() {
    this._mainService.triggerFullPageStats("goalies");
  }

  openPlayer(player) {
    this._router.navigate([`/stats/players/${player.playerLastName}, ${player.playerFirstName}`]);
    this._teamsService.setPlayerPosition(player.playerPositionCode);
    this._teamsService.setPlayerHits(player.shots);
    window.scrollTo(0,0);
  }

  checkMobile() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
  }

  findChaTeam(name, player, type) {
    this._mainService.getChaTeam(name, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      player.chaTeam = resp;
      return player;
    }, error => {
      player.chaTeam = null;
      return player;
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

  getNHLPointLeaders() {
    this._mainService.getNhlLeaders(this.currentSeason, "skater", "points", "reverse", "trim").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let tempLeaders = resp as [];
      let pointLeaders = [];
      tempLeaders.forEach(element => { pointLeaders.push(element); });
      pointLeaders.forEach(player => {
        player = this.findChaTeam(`${player['playerLastName']}, ${player['playerFirstName']}`, player, "player");
      });
      this.points = new MatTableDataSource<any[]>(pointLeaders);
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.errored = true;
      this.isLoading = false;
    });
  }

  getNHLGoalLeaders() {
    this._mainService.getNhlLeaders(this.currentSeason, "skater", "goals", "reverse", "trim").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let tempLeaders = resp as [];
      let goalLeaders = [];
      tempLeaders.forEach(element => { goalLeaders.push(element); });
      goalLeaders.forEach(player => {
        player = this.findChaTeam(`${player['playerLastName']}, ${player['playerFirstName']}`, player, "player");
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
    this._mainService.getNhlLeaders(this.currentSeason, "skater", "assists", "reverse", "trim").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let tempLeaders = resp as [];
      let assistsLeaders = [];
      tempLeaders.forEach(element => { assistsLeaders.push(element); });
      assistsLeaders.forEach(player => {
        player = this.findChaTeam(`${player['playerLastName']}, ${player['playerFirstName']}`, player, "player");
      });
      this.assists = new MatTableDataSource<any[]>(assistsLeaders);
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.errored = true;
      this.isLoading = false;
    });
  }

  getNHLShPointsLeaders() {
    this._mainService.getNhlLeaders(this.currentSeason, "skater", "shPoints", "reverse", "trim").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let tempLeaders = resp as [];
      let shPointsLeaders = [];
      tempLeaders.forEach(element => { shPointsLeaders.push(element); });
      shPointsLeaders.forEach(player => {
        player = this.findChaTeam(`${player['playerLastName']}, ${player['playerFirstName']}`, player, "player");
      });
      this.shPoints = new MatTableDataSource<any[]>(shPointsLeaders);
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.errored = true;
      this.isLoading = false;
    });
  }

  getNHLWinsLeaders() {
    this._mainService.getNhlLeaders(this.currentSeason, "goalie", "wins", "reverse", "trim").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let tempLeaders = resp as [];
      let winsLeaders = [];
      tempLeaders.forEach(element => { winsLeaders.push(element); });
      winsLeaders.forEach(player => {
        player = this.findChaTeam(`${player['playerLastName']}, ${player['playerFirstName']}`, player, "goalie");
      });
      this.wins = new MatTableDataSource<any[]>(winsLeaders);
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.errored = true;
      this.isLoading = false;
    });
  }

  getNHLGaaLeaders() {
    this._mainService.getNhlLeaders(this.currentSeason, "goalie", "goalsAgainstAverage", "no", "trim").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let tempLeaders = resp as [];
      let gaaLeaders = [];
      tempLeaders.forEach(element => { gaaLeaders.push(element); });
      gaaLeaders.forEach(player => {
        player = this.findChaTeam(`${player['playerLastName']}, ${player['playerFirstName']}`, player, "goalie");
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
    this._mainService.getNhlLeaders(this.currentSeason, "goalie", "savePctg", "reverse", "trim").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let tempLeaders = resp as [];
      let savePctgLeaders = [];
      tempLeaders.forEach(element => { savePctgLeaders.push(element); });
      savePctgLeaders.forEach(player => {
        player = this.findChaTeam(`${player['playerLastName']}, ${player['playerFirstName']}`, player, "goalie");
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
    this._mainService.getNhlLeaders(this.currentSeason, "goalie", "shutouts", "reverse", "trim").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let tempLeaders = resp as [];
      let shutoutsLeaders = [];
      tempLeaders.forEach(element => { shutoutsLeaders.push(element); });
      shutoutsLeaders.forEach(player => {
        player = this.findChaTeam(`${player['playerLastName']}, ${player['playerFirstName']}`, player, "goalie");
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
