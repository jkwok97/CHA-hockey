import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;

  currentChamp: any;
  champions = [];
  champs: MatTableDataSource<any[]>;

  champsColumns = ['year_won', 'team_logo', 'team_name', 'owner_name'];

  constructor(
    private _teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.currentChamp = this._teamsService.getTeamInfo("STA");
    this._teamsService.getChampions("champs").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this.champions = resp as [];
      this.champs = new MatTableDataSource<any[]>(this.champions);
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
