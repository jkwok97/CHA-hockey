import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean = false;
  expand: boolean = false;

  awards = [];

  constructor(
    private _teamsService: TeamsService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.checkMobile();
    this.isLoading = true;
    this._teamsService.getChampions("scorer").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.awards.push({title: "Wayne Gretzky Trophy", picture: "../../../assets/images/scorer.jpg", description: "Leading Scorer", winners: resp});
      this._teamsService.getChampions("defense").pipe(takeWhile(() => this._alive)).subscribe(resp => {
        this.awards.push({title: "Bobby Orr Trophy", picture: "../../../assets/images/dman.jpg", description: "Best Defenseman", winners: resp});
        this._teamsService.getChampions("rookie").pipe(takeWhile(() => this._alive)).subscribe(resp => {
          this.awards.push({title: "Teemu Selanne Trophy", picture: "../../../assets/images/rookie.jpg", description: "Best Rookie", winners: resp});
          this._teamsService.getChampions("goalie").pipe(takeWhile(() => this._alive)).subscribe(resp => {
            this.awards.push({title: "Martin Brodeur Trophy", picture: "../../../assets/images/goalie.jpg", description: "Best Goalie", winners: resp});
            this._teamsService.getChampions("gm").pipe(takeWhile(() => this._alive)).subscribe(resp => {
              this.awards.push({title: "Muggleston Trophy", picture: "../../../assets/images/gm.jpg", description: "Best GM", winners: resp});
              this._teamsService.getChampions("season").pipe(takeWhile(() => this._alive)).subscribe(resp => {
                this.awards.push({title: "Prime Minister's Trophy", picture: "../../../assets/images/president.jpg", description: "Season Winner", winners: resp});
                this.isLoading = false;
              });
            });
          });
        });
      });
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

  checkMobile() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) {
          this.isMobile = true;
          this.expand = false;
        } else {
          this.isMobile = false;
          this.expand = true;
        }
  }

  openPlayer(player, type) {
    this._router.navigate([`/info/${type}s/${player.player_id}/${player.player_name}`]);
    window.scrollTo(0,0);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
