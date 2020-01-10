import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
import { TeamsService } from '../teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isMobile: boolean = false;
  isLoading: boolean = false;
  showAll: boolean = false;

  schedulePage: any;
  currentSeason: string;
  range: string = 'a402:f821';
  currentDay: number = 121;
  scheduleType: string = "next";

  days = [];
  matchups: any[] = [];
  teams = [];
  versus: any;

  allSchedule: MatTableDataSource<any[]>;
  mobileAllScheduleColumnsToDisplay = [ 'game_day', 'vis_team', 'versus', 'home_team', 'result' ];
  allScheduleColumnsToDisplay = [ 'game_day', 'vis_team', 'vis_team_name', 'vis_team_score', 'versus', 'home_team', 'home_team_name', 'home_team_score' ];

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    // private sanitizer: DomSanitizer,
    private _teamsService: TeamsService
  ) { 
    this.currentSeason = this._teamsService.currentSeason;
    this.teams = this._teamsService.currentLeague.teams;
  }

  ngOnInit() {
    this.isLoading = true;
    this.checkMobile();
    this.getMatchupTotals();
    this.getNextDaysSchedule(this.currentDay);
    // this.schedulePage = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/spreadsheets/d/e/2PACX-1vS0JKYVSkNRwOZavK_pCosNcgCFxf45mLJlRQJMmppO12SPHINN4DQpdOtu-0Wn0ZbxIQmuSpiCymcF/pubhtml?gid=0&single=true&widget=false&headers=false&chrome=false&gridlines=false&range=${this.range}`)
    // this.isLoading = false;
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

  applyFilter(filterValue: string) {
    this.allSchedule.filter = filterValue.trim().toLowerCase();
    if (this.allSchedule.paginator) {
      this.allSchedule.paginator.firstPage();
    }
  }

  changeSchedule(value) {
    // console.log(value);
    if (value === "all") {
      this.showAll = true;
      this.isLoading = true;
      this.getAllSchedule();
    } else if (value === "next") {
      this.showAll = false;
      this.isLoading = true;
      this.getNextDaysSchedule(this.currentDay);
    }
  }

  getMatchupTotals() {
    // console.log(this.teams);
    this.separateTeams();
    this._teamsService.getAllSchedule().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let games = resp as any[];
      this.populateMatchups(games);
      this.getMatchupRecord();
    });
  }

  getMatchupRecord() {
    this.matchups.forEach(matchup => {
      matchup.versus.forEach(team => {
        let matchupWins = 0;
        let matchupLoss = 0;
        let matchupTie = 0;
        team.games.forEach(game => {
          if (game.home_team_name === matchup.team) {
            if (game.home_team_score > game.vis_team_score) {
              matchupWins++;
            } else if (game.home_team_score < game.vis_team_score) {
              matchupLoss++;
            } else if ((game.home_team_score == game.vis_team_score) && (game.home_team_score !== null)) {
              matchupTie++;
            }
          } else {
            if (game.vis_team_score > game.home_team_score) {
              matchupWins++;
            } else if (game.vis_team_score < game.home_team_score) {
              matchupLoss++;
            } else if ((game.home_team_score == game.vis_team_score) && (game.home_team_score !== null)) {
              matchupTie++;
            }
          }
        });
        team.matchupWins = matchupWins;
        team.matchupLoss = matchupLoss;
        team.matchupTie = matchupTie;
      })
    })
  }

  populateMatchups(games) {
    // console.log(this.matchups);
    this.matchups.forEach(team => {
      games.forEach(game => {
        if (game.home_team_name === team.team) {
          let versus = game.vis_team_name;
          let index = team.versus.findIndex(name => name.team === versus);
          if (index !== null) {
            team.versus[index].games.push(game);
          }
        } 
        if (game.vis_team_name === team.team) {
          let versus = game.home_team_name;
          let index = team.versus.findIndex(name => name.team === versus);
          if (index !== null) {
            team.versus[index].games.push(game);
          }
        }
      })
    })
  }

  separateTeams() {
    this.teams.forEach(team => {
      this.matchups.push({
        team: team.shortName,
        versus: this.getVersus(team.shortName)
      })
      // console.log(this.matchups);
    });
    
  }

  getVersus(name) {
    let versusArray = [];
    this.teams.forEach(team => {
      if (team.shortName !== name) {
        versusArray.push({team: team.shortName, games: []});
      }
    });
    return versusArray;
  }

  getNextDaysSchedule(currentDay) {
    this.isLoading = true;
    this.days = [];
    this.days.push(
      {day: currentDay, games: []},
      {day: currentDay+1, games: []},
      {day: currentDay+2, games: []},
      {day: currentDay+3, games: []},
      {day: currentDay+4, games: []}
      );
    this.days.forEach(day => {
      this._teamsService.getDaySchedule(day.day).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        day.games.push(resp);
      });
      setTimeout(() => {
        day.games[0].forEach(element => {
        this._teamsService.getTeamStats(element.vis_team_name).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          element.vis_team_stats = resp[0];
        });
        this._teamsService.getTeamStats(element.home_team_name).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          element.home_team_stats = resp[0];
        });
      });
      }, 750);
    })
    this.populateMatchUpRecord(this.days);
    setTimeout(() => {
      this.isLoading = false;
    },1500);
  }

  populateMatchUpRecord(days) {
    days.forEach(day => {
      setTimeout(() => {
        day.games[0].forEach(game => {
          let found = this.matchups.find(matchup => matchup.team === game.home_team_name );
          let versusFound = found.versus.find(team => team.team === game.vis_team_name);
          game.vis_team_wins = versusFound.matchupLoss;
          game.vis_team_loss = versusFound.matchupWins;
          game.vis_team_ties = versusFound.matchupTie;
        })
      }, 350);
    })
  }

  getAllSchedule() {
    this._teamsService.getAllSchedule().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this.days = resp as [];
      this.allSchedule = new MatTableDataSource<any[]>(this.days);
      this.length = this.days.length;
      this.isLoading = false;
      setTimeout(() => {
        this.allSchedule.paginator = this.paginator;
        this.allSchedule.sort = this.sort;
      }, 350);
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
