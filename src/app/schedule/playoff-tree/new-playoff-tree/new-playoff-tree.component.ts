import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-new-playoff-tree',
  templateUrl: './new-playoff-tree.component.html',
  styleUrls: ['./new-playoff-tree.component.css']
})
export class NewPlayoffTreeComponent implements OnInit, OnDestroy {

  easternQuarterMatchups: any[] = [];
  westernQuarterMatchups: any[] = [];
  easternSemiMatchups: any[] = [];
  westernSemiMatchups: any[] = [];
  easternConferenceMatchups: any[] = [];
  westernConferenceMatchups: any[] = [];
  northwestTeams = [];
  southwestTeams = [];
  northeastTeams = [];
  southeastTeams = [];
  westernStats: any[];
  easternStats: any[];
  regularSeasonstats = [];

  currentSeason: string;

  private _alive:boolean = true;
  isMobile: boolean = false;
  isLoading: boolean = false;

  constructor(
    private _teamsService:TeamsService,
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
    this._teamsService.getLeagueTeamsStats(this.currentSeason).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let tempLeaders = resp as any;
      tempLeaders.forEach(element => {
        this.regularSeasonstats.push(element);
      });
      this.getConferenceStandings(tempLeaders);
    });
  }

  getConferenceStandings(teams) {
    let westTeams = this.northwestTeams.concat(this.southwestTeams);
    let eastTeams = this.northeastTeams.concat(this.southeastTeams);
    this.westernStats = this.regularSeasonstats.filter(team => westTeams.find(divTeam => divTeam.shortName === team.team_name));
    this.westernStats.sort((a,b) => b['points'] - a['points']);
    // console.log(this.westernStats);
    this.setSeeds(this.westernStats, 'west');
    this.easternStats = this.regularSeasonstats.filter(team => eastTeams.find(divTeam => divTeam.shortName === team.team_name));
    this.easternStats.sort((a,b) => b['points'] - a['points']);
    // console.log(this.easternStats);
    this.setSeeds(this.easternStats, 'east');
  }

  setSeeds(teams: any[], type: string) {
    let i;
    for (i = 0; i < teams.length; i++) { teams[i].seed = i + 1; };
    this.setQuarterMatchups(teams, type);
    this.setSemiMatchups(teams,type);
    this.setConferenceMatchups(teams,type);
  }

  setQuarterMatchups(teams: any[], type: string) {
    if (type === 'west') {
      this.westernQuarterMatchups.push({homeTeam: teams.find(team => team.seed === 1), visitingTeam: teams.find(team => team.seed === 8), series: "0 - 0"});
      this.westernQuarterMatchups.push({homeTeam: teams.find(team => team.seed === 4), visitingTeam: teams.find(team => team.seed === 5), series: "0 - 0"});
      this.westernQuarterMatchups.push({homeTeam: teams.find(team => team.seed === 3), visitingTeam: teams.find(team => team.seed === 6), series: "0 - 0"});
      this.westernQuarterMatchups.push({homeTeam: teams.find(team => team.seed === 2), visitingTeam: teams.find(team => team.seed === 7), series: "0 - 0"});
    } else if (type === 'east') {
      this.easternQuarterMatchups.push({homeTeam: teams.find(team => team.seed === 1), visitingTeam: teams.find(team => team.seed === 8), series: "0 - 0"});
      this.easternQuarterMatchups.push({homeTeam: teams.find(team => team.seed === 4), visitingTeam: teams.find(team => team.seed === 5), series: "0 - 0"});
      this.easternQuarterMatchups.push({homeTeam: teams.find(team => team.seed === 3), visitingTeam: teams.find(team => team.seed === 6), series: "0 - 0"});
      this.easternQuarterMatchups.push({homeTeam: teams.find(team => team.seed === 2), visitingTeam: teams.find(team => team.seed === 7), series: "0 - 0"});
    }
  }

  setSemiMatchups(teams: any[], type: string) {
    if (type === 'west') {
      this.westernSemiMatchups.push({homeTeam:null, visitingTeam: null, series: null});
      this.westernSemiMatchups.push({homeTeam: null, visitingTeam: null, series: null});
    } else if (type === 'east') {
      this.easternSemiMatchups.push({homeTeam:null, visitingTeam: null, series: null});
      this.easternSemiMatchups.push({homeTeam: null, visitingTeam: null, series: null});
    }
  }

  setConferenceMatchups(teams: any[], type: string) {
    if (type === 'west') {
      this.westernConferenceMatchups.push({homeTeam:null, visitingTeam: null, series: null});
    } else if (type === 'east') {
      this.easternConferenceMatchups.push({homeTeam:null, visitingTeam: null, series: null});
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}

