import { Component, OnInit, ViewChild, Input, AfterViewInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from 'src/app/teams/teams.service';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-goalie-stats-table',
  templateUrl: './goalie-stats-table.component.html',
  styleUrls: ['./goalie-stats-table.component.css']
})
export class GoalieStatsTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() goalies:any;
  @Input() statsColumnsToDisplay: [];
  @Input() inPlayerInfo: boolean = false;

  @ViewChild("goalieSort", {static: false}) goalieSort: MatSort;

  constructor(
    private _router: Router,
    private _teamsService: TeamsService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.goalies.sort = this.goalieSort;
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
