import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-playoff-tree',
  templateUrl: './playoff-tree.component.html',
  styleUrls: ['./playoff-tree.component.css']
})
export class PlayoffTreeComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isMobile: boolean = false;
  isLoading: boolean = false;

  currentSeason: any;

  northwestTeams = [];
  southwestTeams = [];
  northeastTeams = [];
  southeastTeams = [];
  westernStats: any[];
  easternStats: any[];
  stats = [];

  constructor(
    private _teamsService: TeamsService
  ) { 
    this.currentSeason = this._teamsService.currentSeason;
    this.northwestTeams = this._teamsService.league.conference[0].division[0].teams;
    this.southwestTeams = this._teamsService.league.conference[0].division[1].teams;
    this.northeastTeams = this._teamsService.league.conference[1].division[0].teams;
    this.southeastTeams = this._teamsService.league.conference[1].division[1].teams;
  }

  ngOnInit() {
    this.checkMobile();
    this.checkStandings();
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

  checkStandings() {
    this._teamsService.getLeagueTeamsStats(this.currentSeason, 'Regular').pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let tempLeaders = resp as any;
      tempLeaders.forEach(element => {
        this.stats.push(element);
      });
      this.getConferenceStandings(tempLeaders);
    });
  }

  getConferenceStandings(teams) {
    let westTeams = this.northwestTeams.concat(this.southwestTeams);
    let eastTeams = this.northeastTeams.concat(this.southeastTeams);
    this.westernStats = this.stats.filter(team => westTeams.find(divTeam => divTeam.shortName === team.team_name));
    this.westernStats.sort((a,b) => b['points'] - a['points']);
    // console.log(this.westernStats);
    this.easternStats = this.stats.filter(team => eastTeams.find(divTeam => divTeam.shortName === team.team_name));
    this.easternStats.sort((a,b) => b['points'] - a['points']);
    // console.log(this.easternStats);
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
