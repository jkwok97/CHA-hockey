import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MainService } from '../main.service';
import { takeWhile } from 'rxjs/operators';
import { TeamsService } from 'src/app/teams/teams.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-nhl-goalie-stats',
  templateUrl: './nhl-goalie-stats.component.html',
  styleUrls: ['./nhl-goalie-stats.component.css']
})
export class NhlGoalieStatsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  playersList = [];

  goalies: MatTableDataSource<any[]>;
  goaliesColumnsToDisplay = [
    'team_logo', 'playerName', 'gamesPlayed', 'goalsAgainstAverage', 'wins','losses', 'ties',
    'shutouts', 'goalsAgainst', 'saves', 'shotsAgainst', 'savePctg', 'goals', 'assists', 'points', 'penaltyMinutes'
  ];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _mainService: MainService,
    private _teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this._mainService.getNhlLeaders("20192020", "goalie", "wins", "reverse", "all").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      let stats = resp as [];
      stats.forEach( element => { this.playersList.push(element); });
      this.playersList.forEach(player => {
        player = this.findChaTeam(`${player['playerLastName']}, ${player['playerFirstName']}`, player, "goalie");
      });
      this.goalies = new MatTableDataSource<any[]>(stats);
      this.length = stats.length;
      this.isLoading = false;
      setTimeout(() => {
        this.goalies.paginator = this.paginator;
        this.goalies.sort = this.sort;
      }, 350);
    });
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

  ngOnDestroy() {
    this._alive = false;
  }

}
