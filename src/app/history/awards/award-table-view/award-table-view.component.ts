import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { TeamsService } from 'src/app/teams/teams.service';

@Component({
  selector: 'app-award-table-view',
  templateUrl: './award-table-view.component.html',
  styleUrls: ['./award-table-view.component.css']
})
export class AwardTableViewComponent implements OnInit {

  @Input() winnersStats: any[];

  isOwnerAward: boolean = false;

  winners: MatTableDataSource<any[]>;

  playerAwardsColumns = [ 'year_won', 'name', 'team_logo' ];
  ownerAwardsColumns = [ 'year_won', 'owner_name', 'team_logo' ];

  constructor(
    private _router: Router,
    private _teamsService: TeamsService,
  ) { }

  ngOnInit() {
    if (this.winnersStats[0].owner_name) {
      this.isOwnerAward = true;
    }
    this.winners = new MatTableDataSource<any[]>(this.winnersStats);
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  openPlayer(player, type) {
    this._router.navigate([`/info/${type}s/${player.player_id}/${player.player_name}`]);
    window.scrollTo(0,0);
  }

}
