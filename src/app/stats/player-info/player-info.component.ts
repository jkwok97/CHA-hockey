import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;

  allPlayersInfo: any[];
  playerInfo: any;
  teamPlayersStats: any;

  player: string;

  playerStats: MatTableDataSource<any[]>;
  playersColumnsToDisplay = [
    'team_logo', 'playing_year', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
    'gw_goals', 'gt_goals', 'shooting_pct', 'minutes_per_game'
  ];

  constructor(
    private _teamsService: TeamsService,
    private _route: ActivatedRoute
  ) {
    this.allPlayersInfo = this._teamsService.allPlayerInfo;
    console.log(this.allPlayersInfo);
    this.teamPlayersStats = this._teamsService.teamPlayerStats;
    console.log(this.teamPlayersStats);
   }

  ngOnInit() {
    this.player = this.splitName(this._route.snapshot.params.params);
    if (this.player[0].includes(". ") && this.player[1].includes("*")) {
      let temp = this.player[0].lastIndexOf(". ");
      this.player[0].slice(0, temp+2);
      let tempString1 = this.player[0].slice(temp+1);
      let tempString2 = this.player[1].slice(0, -1);
      // console.log(tempString1);
      // console.log(tempString2);
      this.playerInfo = this.teamPlayersStats.find( player => (player.player_name.toLowerCase().includes(this.player[0].toLowerCase())) && (player.player_name.toLowerCase().includes(this.player[1].toLowerCase())));
      this.playerInfo.picture = this.allPlayersInfo.find( player => (player.playerName.toLowerCase().includes(tempString1.toLowerCase())) && (player.playerName.toLowerCase().includes(tempString2.toLowerCase())));
      this.playerInfo.team = this.findLogo(this.playerInfo.team_name);
    } else if (this.player[0].includes(". ")) {
      let temp = this.player[0].lastIndexOf(". ");
      this.player[0].slice(0, temp+2);
      let tempString = this.player[0].slice(temp+1);
      // console.log(tempString);
      this.playerInfo = this.teamPlayersStats.find( player => (player.player_name.toLowerCase().includes(this.player[0].toLowerCase())) && (player.player_name.toLowerCase().includes(this.player[1].toLowerCase())));
      this.playerInfo.picture = this.allPlayersInfo.find( player => (player.playerName.toLowerCase().includes(tempString.toLowerCase())) && (player.playerName.toLowerCase().includes(this.player[1].toLowerCase())));
      this.playerInfo.team = this.findLogo(this.playerInfo.team_name);
    } else if (this.player[1].includes("*")) {
      let tempString = this.player[1].slice(0, -1);
      // console.log(tempString)
      // console.log(this.playerStats);
      this.playerInfo = this.teamPlayersStats.find( player => (player.player_name.toLowerCase().includes(this.player[0].toLowerCase())) && (player.player_name.toLowerCase().includes(this.player[1].toLowerCase())));
      // console.log(this.playerInfo);
      // console.log(this.allPlayersInfo);
      this.playerInfo.picture = this.allPlayersInfo.find( player => (player.playerName.toLowerCase().includes(this.player[0].toLowerCase())) && (player.playerName.toLowerCase().includes(tempString.toLowerCase())));
      this.playerInfo.team = this.findLogo(this.playerInfo.team_name);
    } else {
      // console.log(this.playerStats);
      this.playerInfo = this.teamPlayersStats.find( player => (player.player_name.toLowerCase().includes(this.player[0].toLowerCase())) && (player.player_name.toLowerCase().includes(this.player[1].toLowerCase())));
      this.playerInfo.picture = this.allPlayersInfo.find( player => (player.playerName.toLowerCase().includes(this.player[0].toLowerCase())) && (player.playerName.toLowerCase().includes(this.player[1].toLowerCase())));
      this.playerInfo.team = this.findLogo(this.playerInfo.team_name);
    }
    console.log([this.playerInfo]);
    this.playerStats = new MatTableDataSource<any[]>([this.playerInfo]);
    console.log(this.playerStats);
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  splitName(name) {
    return name.split(", ");
  }

  onTabChange(event) {
    console.log(event);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
