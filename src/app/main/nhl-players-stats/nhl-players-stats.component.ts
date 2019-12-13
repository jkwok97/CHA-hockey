import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MainService } from '../main.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TeamsService } from 'src/app/teams/teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nhl-players-stats',
  templateUrl: './nhl-players-stats.component.html',
  styleUrls: ['./nhl-players-stats.component.css']
})
export class NhlPlayersStatsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  playersList = [];

  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = [
    'team_logo', 'playerName', 'playerPositionCode', 'gamesPlayed','goals', 'assists', 'points', 'plusMinus', 'penaltyMinutes', 'ppPoints', 'shPoints',
    'gameWinningGoals', 'shots', 'shootingPctg', 'faceoffWinPctg'
  ];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _mainService: MainService,
    private _teamsService: TeamsService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this._mainService.getNhlLeaders("20192020", "skater", "points", "reverse", "all").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let stats = resp as [];
      stats.forEach( element => { this.playersList.push(element); });
      this.playersList.forEach(player => {
        player = this.findChaTeam(`${player['playerLastName']}, ${player['playerFirstName']}`, player, "player");
      });
      this.players = new MatTableDataSource<any[]>(stats);
      this.length = stats.length;
      this.isLoading = false;
      setTimeout(() => {
        this.players.paginator = this.paginator;
        this.players.sort = this.sort;
      }, 350);
    });
  }

  openPlayer(player) {
    this._router.navigate([`/stats/players/${player.playerLastName}, ${player.playerFirstName}`]);
    this._teamsService.setPlayerPosition(player.playerPositionCode);
    this._teamsService.setPlayerHits(player.shots);
    window.scrollTo(0,0);
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
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

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();
    if (this.players.paginator) {
      this.players.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
