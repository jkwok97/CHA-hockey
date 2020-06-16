import { Component, OnInit, ViewChild, Input, AfterViewInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from 'src/app/teams/teams.service';
import { MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-goalie-stats-table',
  templateUrl: './goalie-stats-table.component.html',
  styleUrls: ['./goalie-stats-table.component.css']
})
export class GoalieStatsTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() goalies:any;
  @Input() statsColumnsToDisplay: [];
  @Input() inPlayerInfo: boolean = false;

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  @ViewChild("goalieSort", {static: false}) goalieSort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _router: Router,
    private _teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.length = this.goalies.length;
  }

  ngAfterViewInit() {
    this.goalies.sort = this.goalieSort;
    this.goalies.paginator = this.paginator;
  }

  ngOnChanges() {
    this.goalies.sort = this.goalieSort;
  }

  openPlayer(player, type) {
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

  calcGAA(goalsAgainst, minutes) {
    return (goalsAgainst*60) / minutes;
  }

  calcSvPct(saves, shots) {
    return (saves / shots);
  }

}
