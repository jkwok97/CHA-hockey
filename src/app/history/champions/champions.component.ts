import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TeamArchivesComponent } from '../team-archives/team-archives.component';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isMobile: boolean;
  isStatsLoading: boolean = false;
  isStatsPlayoffsLoading: boolean = false;
  champFound: boolean = false;
  playoffChampFound: boolean = false;

  currentChamp: any;
  champions = [];
  champs: MatTableDataSource<any[]>;

  champsColumns = ['year_won', 'team_logo', 'team_name', 'owner_name'];
  mobileChampsColumns = ['year_won', 'team_logo', 'owner_name'];

  teams: MatTableDataSource<any[]>;
  teamsPlayoff: MatTableDataSource<any[]>;
  teamsColumnsToDisplay = [
    'playing_year', 'season_type', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
    'home_record', 'away_record', 'trail_record'
  ];

  constructor(
    private _teamsService: TeamsService,
    private _router: Router
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

  onClosePanel(champ) {
    this.champFound = false;
    this.playoffChampFound = false;
  }

  onOpenPanel(year, team) {
    this.isStatsLoading = true;
    this.isStatsPlayoffsLoading = true;
    this._teamsService.getAlltimeTeamStatsByType(team, "Regular").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as any;
      if (teamStats[0].playing_year) {
        let champYear = teamStats.find(season => season.playing_year === year);
        let champChosen = this.champions.find(champ => champ.team_short === team && champ.year_won === year);
        champChosen.team_stats = champYear;
        if (!champChosen.team_stats) {
          this.champFound = false;
          this.isStatsLoading = false;
        } else {
          setTimeout(() => {
            this.champFound = true;
            this.teams = new MatTableDataSource<any[]>([champYear]);
            this.isStatsLoading = false;
          }, 250);
        }
      } else {
        this.champFound = false;
        this.isStatsLoading = false;
      }
    }, error => {
      console.log(error);
      this.champFound = false;
      this.isStatsLoading = false;
    });
    this._teamsService.getAlltimeTeamStatsByType(team, "Playoffs").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as any;
      if (teamStats[0].playing_year) {
        let champYear = teamStats.find(season => season.playing_year === year);
        let champChosen = this.champions.find(champ => champ.team_short === team && champ.year_won === year);
        champChosen.team_stats_playoffs = champYear;
        if (!champChosen.team_stats_playoffs) {
          this.playoffChampFound = false;
          this.isStatsPlayoffsLoading = false;
        } else {
          setTimeout(() => {
            this.playoffChampFound = true;
            this.teamsPlayoff = new MatTableDataSource<any[]>([champChosen.team_stats_playoffs]);
            this.isStatsPlayoffsLoading = false;
          }, 250);
        }
      } else {
        this.playoffChampFound = false;
        this.isStatsPlayoffsLoading = false;
      }
    }, error => {
      console.log(error);
      this.playoffChampFound = false;
      this.isStatsPlayoffsLoading = false;
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

  toPlayoffPlayers(champ) {
    this._router.navigate([`/teams/${champ.team_short}/${champ.year_won}/Playoffs`]);
    window.scrollTo(0,0);
  }

  toSeasonPlayers(champ) {
    this._router.navigate([`/teams/${champ.team_short}/${champ.year_won}/Regular`]);
    window.scrollTo(0,0);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
