import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-goalie-archives',
  templateUrl: './goalie-archives.component.html',
  styleUrls: ['./goalie-archives.component.css']
})
export class GoalieArchivesComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  page: number = 1;
  pageSize: number = 20;
  length: number = 0;

  goalies: MatTableDataSource<any[]>;
  goaliesColumnsToDisplay = [ 'playing_year', 'season_type',
    'team_logo', 'team_name', 'player_name', 'games_played','minutes_played', 'goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct'
  ];

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this._teamsService.getGoalieStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      let stats = resp as [];
      this.goalies = new MatTableDataSource<any[]>(stats);
      this.pageSize = 25;
      this.length = stats.length;
      this.isLoading = false;
      setTimeout(() => {
        this.goalies.paginator = this.paginator;
        this.goalies.sort = this.sort;
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

  applyFilter(filterValue: string) {
    this.goalies.filter = filterValue.trim().toLowerCase();
    if (this.goalies.paginator) {
      this.goalies.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
