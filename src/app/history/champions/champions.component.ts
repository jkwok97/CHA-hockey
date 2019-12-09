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
  isMobile: boolean;

  currentChamp: any;
  champions = [];
  champs: MatTableDataSource<any[]>;

  champsColumns = ['year_won', 'team_logo', 'team_name', 'owner_name'];
  mobileChampsColumns = ['year_won', 'team_logo', 'owner_name'];

  constructor(
    private _teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.checkMobile();
    this.currentChamp = this._teamsService.getTeamInfo("STA");
    this._teamsService.getChampions("champ").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this.champions = resp as [];
      this.champs = new MatTableDataSource<any[]>(this.champions);
    });
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
