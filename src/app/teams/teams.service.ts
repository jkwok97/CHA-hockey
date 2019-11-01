import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  currentTeam: any;

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

  constructor(
    private _http: HttpClient
  ) { }

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

  getLeagueTeamsStats() {
    return this._http.get(`${environment.back_end_url}/team-stats/`);
  }

  getTeamInfo(short) {
    console.log(short);
    this.league.conference.forEach( conference => {
      conference.division.forEach(division => {
        let found = division.teams.find(team => team.shortName === short);
        if (found !== undefined) { this.currentTeam = found; } 
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
}
