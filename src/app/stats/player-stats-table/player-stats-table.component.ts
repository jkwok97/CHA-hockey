import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from 'src/app/teams/teams.service';
import { MatSort, MatPaginator } from '@angular/material';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-player-stats-table',
  templateUrl: './player-stats-table.component.html',
  styleUrls: ['./player-stats-table.component.css']
})
export class PlayerStatsTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() players:any;
  @Input() statsColumnsToDisplay: [];
  @Input() inPlayerInfo: boolean = false;

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  @ViewChild("playerSort", {static: false}) playerSort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _router: Router,
    private _teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.length = this.players.length;
  }

  ngAfterViewInit() {
    this.players.sort = this.playerSort;
    this.players.paginator = this.paginator;
  }

  ngOnChanges() {
    this.players.sort = this.playerSort;
  }

  openPlayer(player, type) {
    console.log(player);
    this._router.navigate([`/info/${type}s/${player.player_id}/${player.player_name}`]);
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

  calcShPct(goals, shots) {
    return ((goals / shots) * 100)
  }

  calcMin(gamesPlayed, minutes) {
    return (minutes / gamesPlayed)
  }

}
