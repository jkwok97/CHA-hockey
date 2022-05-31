import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { TeamStat } from "src/app/_models/team";
import { CurrentSeasonService } from "src/app/_services/current-season.service";
import { TeamStatsService } from "src/app/_services/team-stats.service";

@Component({
  selector: "app-playoff-tree-games",
  templateUrl: "./playoff-tree-games.component.html",
  styleUrls: ["./playoff-tree-games.component.css"],
})
export class PlayoffTreeGamesComponent implements OnInit {
  playoffTeams$: Observable<any[]>;

  westernTeams: TeamStat[];
  easternTeams: TeamStat[];

  constructor(
    private teamStatsService: TeamStatsService,
    private currentSeasonService: CurrentSeasonService
  ) {
    this.playoffTeams$ =
      this.teamStatsService.getTeamStatsBySeasonByTypeByConference(
        this.currentSeasonService.currentSeason,
        "Regular"
      );
  }

  ngOnInit() {
    this.playoffTeams$.pipe(first()).subscribe((teams) => {
      this.westernTeams = this.setConferenceStandings(
        teams
          .find((conference) => conference["name"] === "Western")
          .teams.slice(0, 8)
      );
      this.easternTeams = this.setConferenceStandings(
        teams
          .find((conference) => conference["name"] === "Eastern")
          .teams.slice(0, 8)
      );
    });
  }

  setConferenceStandings(teams) {
    const tempLeaders = teams;

    teams.forEach((element) => {
      let tempTeam = tempLeaders.find(
        (team) => team.shortname === element.shortname
      );

      element.points = tempTeam.points;
      element.wins = tempTeam.wins;
      element.goals_for = tempTeam.goals_for;
      element.goals_against = tempTeam.goals_against;
    });

    return teams
      .sort((a, b) => {
        if (b.points === a.points) {
          if (b.wins === a.wins) {
            if (
              b.goals_for - b.goals_against ===
              a.goals_for - a.goals_against
            ) {
              return b.goals_for - a.goals_for;
            } else {
              return (
                b.goals_for - b.goals_against - (a.goals_for - a.goals_against)
              );
            }
          } else {
            return b.wins - a.wins;
          }
        } else {
          return b.points - a.points;
        }
      })
      .map((team) => ({
        conferenceStanding:
          teams.findIndex((t) => t.shortname === team.shortname) + 1,
        teamlogo: team.teamlogo,
        shortname: team.shortname,
        teamcolor: team.teamcolor,
      }));
  }
}
