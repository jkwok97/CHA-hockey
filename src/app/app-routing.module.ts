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
import { ChampionsComponent } from './history/champions/champions.component';
import { DraftsComponent } from './history/drafts/drafts.component';
import { TradesComponent } from './trades/trades.component';
import { WaiverPriorityComponent } from './waiver-priority/waiver-priority.component';
import { ArchivesComponent } from './history/archives/archives.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';
import { AuthGuard } from './main/auth.guard';

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },
  { path: 'stats/players', component: PlayersStatsComponent, canActivate: [AuthGuard] },
  { path: 'stats/goalies', component: GoalieStatsComponent, canActivate: [AuthGuard] },
  { path: 'stats/league', component: OverallTeamStatsComponent, canActivate: [AuthGuard] },
  { path: 'teams', component: LeagueComponent, canActivate: [AuthGuard] },
  { path: 'teams/:params', component: TeamStatsComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'history/champions', component: ChampionsComponent, canActivate: [AuthGuard] },
  { path: 'history/drafts', component: DraftsComponent, canActivate: [AuthGuard] },
  { path: 'history/archives', component: ArchivesComponent, canActivate: [AuthGuard] },
  { path: 'rules', component: RulesComponent, canActivate: [AuthGuard] },
  { path: 'rules/equalization', component: RulesComponent, canActivate: [AuthGuard] },
  { path: 'rules/lottery', component: RulesComponent, canActivate: [AuthGuard] },
  { path: 'rules/egr', component: RulesComponent, canActivate: [AuthGuard] },
  { path: 'rules/protection', component: RulesComponent, canActivate: [AuthGuard] },
  { path: 'rules/rosters', component: RulesComponent, canActivate: [AuthGuard] },
  { path: 'rules/waivers', component: RulesComponent, canActivate: [AuthGuard] },
  { path: 'rules/winnings', component: RulesComponent, canActivate: [AuthGuard] },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
  { path: 'trades-picks', component: TradesComponent, canActivate: [AuthGuard] },
  { path: 'waiver-priority', component: WaiverPriorityComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
