import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  currentTeam: any;
  allPlayerInfo: any;
  teamPlayerStats: any;
  currentSeason: string = "2019-20";
  currentSeasonType: string = "Regular"

  private _subjectPlayerStats = new Subject<any>();

  league = {
    conference: [{
      name: "western conference",
      division: [{
        name: "north west division",
        teams: [
          { name: "Seattle Storm", shortName: "SEA", image: "../../assets/team_logos/Storm.png", owner: "Matt Hamilton", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=7&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "Oakland Assassins", shortName: "OAK", image: "../../assets/team_logos/Assassins.png", owner: "Joseph Sutherland", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=15&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "Kelowna Mountaineers", shortName: "KEL", image: "../../assets/team_logos/Mountaineers.png", owner: "Randy Foster", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=32&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "Victoria Vipers", shortName: "VIC", image: "../../assets/team_logos/Vipers.png", owner: "Ryan Bender", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=33&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "San Francisco Fighting Cocks", shortName: "SFC", image: "../../assets/team_logos/Cocks.png", owner: "Darren Koyata", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=8&amp;single=true&amp;widget=true&amp;headers=false" },
        ]
      },{
        name: "south west division",
        teams: [
          { name: "Memphis Hound Dogs", shortName: "MEM", image: "../../assets/team_logos/HoundDogs.png", owner: "Rick Lundy", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=13&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "Oklahoma City Oil Barons", shortName: "OKL", image: "../../assets/team_logos/OilBarons.png", owner: "Colin Baillon", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=12&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "Cheyenne Desperado", shortName: "CHY", image: "../../assets/team_logos/Desperado.png", owner: "Ferrel Hedberg", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=5&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "Wichita Wolfpack", shortName: "WIT", image: "../../assets/team_logos/Wolfpack.png", owner: "Lucas Bristow", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=21&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "Lone Star Brahmas", shortName: "LSB", image: "../../assets/team_logos/Brahmas.png", owner: "Graham Witherspoon", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=34&amp;single=true&amp;widget=true&amp;headers=false" },
        ]
      }]
    },{
      name: "eastern conference",
      division: [{
        name: "north east division",
        teams: [
          { name: "Milwaukee Ice Dragons", shortName: "MIL", image: "../../assets/team_logos/Dragons.png", owner: "Lee Snowden", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=14&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "Indianapolis Goats", shortName: "IND", image: "../../assets/team_logos/Goats.png", owner: "Scott Snowden", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=17&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "Peoria Prowlers", shortName: "PEO", image: "../../assets/team_logos/Prowlers.png", owner: "Barry Bristow", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=24&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "Mississauga North Stars", shortName: "MSG", image: "../../assets/team_logos/NorthStars.png", owner: "Joe Scardigno", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=11&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "Green Bay Glory", shortName: "GRE", image: "../../assets/team_logos/Glory.png", owner: "Brian Dillon", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=9&amp;single=true&amp;widget=true&amp;headers=false" },
        ]
      },{
        name: "south east division",
        teams: [
          { name: "Augusta Green Jackets", shortName: "AUG", image: "../../assets/team_logos/GreenJackets.png", owner: "Darcy Donaldson", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=16&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "Staten Island Killer Bees", shortName: "STA", image: "../../assets/team_logos/KillerBees.png", owner: "Jeff Kwok", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=23&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "Cincinnati Cyclones", shortName: "CIN", image: "../../assets/team_logos/Cyclones.png", owner: "John Chin", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=25&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "South Carolina Stingrays", shortName: "SCS", image: "../../assets/team_logos/Rays.png", owner: "Kelly Gardner", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=18&amp;single=true&amp;widget=true&amp;headers=false" },
          { name: "Atlanta Flashers", shortName: "ATL", image: "../../assets/team_logos/Flashers.png", owner: "Patrick Ryan", link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=31&amp;single=true&amp;widget=true&amp;headers=false" },
        ]
      }]
    }]
  }

  archivedLeague = {
    teams: [
      { name: "Mississippi Mudbugs", shortName: "MIS", image: "../../assets/team_logos/mudbugs.png", owner: "Jeff Kwok" },
      { name: "Charlotte Storm", shortName: "CHA", image: "../../assets/team_logos/chastorm.png", owner: "Patrick Ryan" },
      { name: "Seattle Surge", shortName: "STS", image: "../../assets/team_logos/surge.png", owner: "Corey Abbott" },
      { name: "Las Vegas Desperado", shortName: "LVD", image: "../../assets/team_logos/lasdesperado.png", owner: "Ferrel Hedberg" },
      { name: "San Antonio Outlaws", shortName: "SAO", image: "../../assets/team_logos/outlaws.png", owner: "Kelly Gardner" },
      { name: "Oakland Oceanus", shortName: "OAO", image: "../../assets/team_logos/oceanus.png", owner: "Joseph Sutherland" },
      { name: "Atlantic City Aces", shortName: "ATC", image: "../../assets/team_logos/aces.png", owner: "Michael Stafford" },
      { name: "Toledo Honey Badgers", shortName: "TOL", image: "../../assets/team_logos/badgers.png", owner: "Jordan Schartner" },
      { name: "Brandon Bandits", shortName: "BRA", image: "../../assets/team_logos/bandits.png", owner: "Jason Stanier" },
      { name: "Cleveland Barons", shortName: "CLE", image: "../../assets/team_logos/barons.png", owner: "Kevin Schmitz" },
      { name: "Albuquerque Chupacabras", shortName: "ALB", image: "../../assets/team_logos/chupacabras.png", owner: "Chad Fisher" },
      { name: "Halifax Conquerers", shortName: "HAL", image: "../../assets/team_logos/conquerers.png", owner: "Greg Abbott" },
      { name: "San Diego Crush", shortName: "SDC", image: "../../assets/team_logos/crush.png", owner: "Ferrel Hedberg" },
      { name: "Winnepeg Hellcats", shortName: "WIN", image: "../../assets/team_logos/hellcats.png", owner: "Ciaran Murtagh" },
      { name: "Mississauga Indians", shortName: "MGA", image: "../../assets/team_logos/indians.png", owner: "Tim Ross" },
      { name: "Salem Indians", shortName: "SAL", image: "../../assets/team_logos/indians.png", owner: "Tim Ross" },
      { name: "Jacksonville Jokers", shortName: "JAC", image: "../../assets/team_logos/jokers.png", owner: "Scott Cochrane" },
      { name: "Louisville Lionhearts", shortName: "LVL", image: "../../assets/team_logos/lionhearts.png", owner: "Nick McCurry" },
      { name: "Abbotsford Loggerheads", shortName: "ABB", image: "../../assets/team_logos/loggerheads.png", owner: "Kyle Einar" },
      { name: "Hamilton Predators", shortName: "HAM", image: "../../assets/team_logos/predators.png", owner: "Matt Beatty" },
      { name: "Hamilton Rednecks", shortName: "HAR", image: "../../assets/team_logos/rednecks.png", owner: "Travis Quinn" },
      { name: "Cape Breton Royals", shortName: "CBR", image: "../../assets/team_logos/royals.png", owner: "Ben Bruchet" },
      { name: "Red Deer Rustlers", shortName: "RDR", image: "../../assets/team_logos/rustlers.png", owner: "Dan Wood" },
      { name: "Halifax Schooners", shortName: "HAS", image: "../../assets/team_logos/schooners.png", owner: "Adam Martin" },
      { name: "Quebec City Thundercats", shortName: "QUE", image: "../../assets/team_logos/thundercats.png", owner: "Jordan Schartner" },
      { name: "Louisiana Voodoo", shortName: "LOU", image: "../../assets/team_logos/voodoo.png", owner: "Ryan Pollock" },
      { name: "Washington Whiskeyjacks", shortName: "WAS", image: "../../assets/team_logos/whiskeyjacks.png", owner: "Randy Lazzarotto" },
      { name: "Tallahasse Crimsontide", shortName: "TAL", image: "../../assets/team_logos/crimsontide.png", owner: "Darren Ward" },
    ]
  }

  constructor(
    private _http: HttpClient
  ) { 
    this.getPlayerInfo().subscribe(resp => {
      this.allPlayerInfo = resp;
    });
  }

  getTeamPlayerStats(team) {
    return this._http.get(`${environment.back_end_url}/players-stats/${team}`);
  }

  getPlayerStats() {
    return this._http.get(`${environment.back_end_url}/players-stats/`);
  }

  getTeamGoalieStats(team) {
    return this._http.get(`${environment.back_end_url}/goalies-stats/${team}`);
  }

  getGoalieStats() {
    return this._http.get(`${environment.back_end_url}/goalies-stats/`);
  }

  getTeamStats(team) {
    return this._http.get(`${environment.back_end_url}/team-stats/${team}`);
  }

  getTeamStatsByYear(team, year) {
    let options = {params: new HttpParams()
      .set('year', year)}
    return this._http.get(`${environment.back_end_url}/team-stats/${team}`, options);
  }

  getLeagueTeamsStats(year) {
    let options = {params: new HttpParams()
      .set('year', year)}
    return this._http.get(`${environment.back_end_url}/team-stats/`, options);
  }

  getAlltimeLeagueTeamsStats() {
    return this._http.get(`${environment.back_end_url}/team-stats/`);
  }

  getTeamInfo(short) {
    let found;
    this.league.conference.forEach( conference => {
      conference.division.forEach(division => {
        found = division.teams.find(team => team.shortName === short);
        if (found !== undefined) { this.currentTeam = found; }
        else { 
          found = this.archivedLeague.teams.find(element => element.shortName === short);
          if (found) { this.currentTeam = found; } 
        }
      })
    })
    return this.currentTeam;
  }

  getChampions() {
    return this._http.get(`${environment.back_end_url}/champions/`);
  }

  getDrafts() {
    return this._http.get(`${environment.back_end_url}/drafts/`);
  }

  getPlayerInfo() {
    return this._http.get(`${environment.back_end_url}/player-info/`);
  }

  sendPlayerStatsTrigger(stats) {
    // console.log(stats);
    this.teamPlayerStats = stats;
    this._subjectPlayerStats.next(stats);
  }

  sendPlayerStatsListener(): Observable<any> {
    return this._subjectPlayerStats.asObservable();
  }

  getPlayerStatsByType(type, group) {
    let options = {params: new HttpParams()
      .set('type', type)
      .set('group', group)}
    return this._http.get(`${environment.back_end_url}/players-stats/`, options);
  }

  getGoalieStatsByType(type) {
    let options = {params: new HttpParams()
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/goalies-stats/`, options);
  }

  getAlltimeLeagueTeamsStatsByType(type) {
    let options = {params: new HttpParams()
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/team-stats/`, options);
  }

  getPlayerStatsByYearByType(year, type) {
    // console.log(year, type)
    let options = {params: new HttpParams()
      .set('year', year)
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/players-stats/`, options);
  }

  getGoalieStatsByYearByType(year, type) {
    // console.log(year, type)
    let options = {params: new HttpParams()
      .set('year', year)
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/goalies-stats/`, options)
  }

  getTeamPlayerStatsByYearByType(team, year, type) {
    // console.log(team, year, type)
    let options = {params: new HttpParams()
      .set('year', year)
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/players-stats/${team}`, options);
  }

  getTeamGoalieStatsByYearByType(team, year, type) {
    // console.log(team, year, type)
    let options = {params: new HttpParams()
      .set('year', year)
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/goalies-stats/${team}`, options);
  }

  getAlltimeTeamPlayerStatsByType(team, type, group) {
    // console.log(team, type)
    let options = {params: new HttpParams()
      .set('type', type)
      .set('group', group)}
    return this._http.get(`${environment.back_end_url}/players-stats/${team}`, options);
  }

  getAlltimeTeamGoalieStatsByType(team, type) {
    // console.log(team, type)
    let options = {params: new HttpParams()
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/goalies-stats/${team}`, options);
  }

}
