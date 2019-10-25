import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeagueComponent } from './league/league.component';
import { StatsComponent } from './stats/stats.component';
import { TeamsComponent } from './teams/teams.component';
import { HistoryComponent } from './history/history.component';
import { RulesComponent } from './rules/rules.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TeamStatsComponent } from './teams/team-stats/team-stats.component';
import { PlayersStatsComponent } from './stats/players-stats/players-stats.component';
import { GoalieStatsComponent } from './stats/goalie-stats/goalie-stats.component';
import { OverallTeamStatsComponent } from './stats/overall-team-stats/overall-team-stats.component';

const routes: Routes = [
  { path: 'main', component: LeagueComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'stats/players', component: PlayersStatsComponent },
  { path: 'stats/goalies', component: GoalieStatsComponent },
  { path: 'stats/league', component: OverallTeamStatsComponent },
  { path: 'teams', component: LeagueComponent },
  { path: 'teams/:params', component: TeamStatsComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'schedule', component: ScheduleComponent },
];

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
