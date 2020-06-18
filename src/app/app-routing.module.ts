import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeagueComponent } from './league/league.component';
// import { StatsComponent } from './stats/stats.component';
import { HistoryComponent } from './history/history.component';
import { RulesComponent } from './rules/rules.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TeamStatsComponent } from './teams/team-stats/team-stats.component';
// import { PlayersStatsComponent } from './stats/players-stats/players-stats.component';
// import { GoalieStatsComponent } from './stats/goalie-stats/goalie-stats.component';
import { OverallTeamStatsComponent } from './overall-stats/overall-team-stats/overall-team-stats.component';
import { ChampionsComponent } from './history/champions/champions.component';
import { DraftsComponent } from './history/drafts/drafts.component';
import { TradesComponent } from './trades/trades.component';
import { WaiverPriorityComponent } from './waiver-priority/waiver-priority.component';
import { ArchivesComponent } from './history/archives/archives.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';
import { AuthGuard } from './_services/auth.guard';
import { PlayerInfoComponent } from './stats/player-info/player-info.component';
import { SalaryComponent } from './salary/salary.component';
import { PicksComponent } from './picks/picks.component';
import { TeamSalaryComponent } from './salary/team-salary/team-salary.component';
import { NewPlayoffTreeComponent } from './schedule/playoff-tree/new-playoff-tree/new-playoff-tree.component';
import { TeamSeasonComponent } from './history/team-archives/team-season/team-season.component';
import { NhlInfoComponent } from './main/nhl-info/nhl-info.component';
import { RosterComponent } from './main/roster/roster.component';
import { ChartsComponent } from './main/charts/charts.component';
import { MainHistoryComponent } from './main/main-history/main-history.component';
import { UserTeamHistoryComponent } from './main/main-history/user-team-history/user-team-history.component';
import { UserTeamPlayerHistoryComponent } from './main/main-history/user-team-player-history/user-team-player-history.component';
import { UserTeamGoalieHistoryComponent } from './main/main-history/user-team-goalie-history/user-team-goalie-history.component';
import { TeamChartComponent } from './main/charts/team-chart/team-chart.component';
import { PlayerChartComponent } from './main/charts/player-chart/player-chart.component';
import { OverallStatsComponent } from './overall-stats/overall-stats.component';
import { OverallPlayerStatsComponent } from './overall-stats/overall-player-stats/overall-player-stats.component';
import { OverallGoalieStatsComponent } from './overall-stats/overall-goalie-stats/overall-goalie-stats.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},

  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'main/:teamName', component: MainComponent,
      children: [
        { path: 'nhl-info', component: NhlInfoComponent, canActivate: [AuthGuard] },
        { path: 'roster', component: RosterComponent },
        { path: 'charts', component: ChartsComponent, canActivate: [AuthGuard], 
          children: [
            { path: 'team', component: TeamChartComponent },
            { path: 'players', component: PlayerChartComponent },
          ] 
        },
        { path: 'history', component: MainHistoryComponent, canActivate: [AuthGuard], 
          children: [
            { path: 'team', component: UserTeamHistoryComponent },
            { path: 'players', component: UserTeamPlayerHistoryComponent },
            { path: 'goalies', component: UserTeamGoalieHistoryComponent },
          ]
        },
      ]
  },
  { path: 'stats', component: OverallStatsComponent, canActivate: [AuthGuard],
      children: [
        { path: 'teams', component: OverallTeamStatsComponent },
        { path: 'players', component: OverallPlayerStatsComponent },
        { path: 'goalies', component: OverallGoalieStatsComponent },
      ]
  },



  { path: 'info/:type/:id/:name', component: PlayerInfoComponent, canActivate: [AuthGuard] },
  { path: 'info/goalies/:id/:name', component: PlayerInfoComponent, canActivate: [AuthGuard] },
  { path: 'teams', component: LeagueComponent, canActivate: [AuthGuard] },
  { path: 'teams/:params', component: TeamStatsComponent, canActivate: [AuthGuard] },
  { path: 'teams/:params/:params/:params', component: TeamSeasonComponent, canActivate: [AuthGuard] },
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
  { path: 'salary', component: SalaryComponent, 
    children: [
      { path: ':params', component: TeamSalaryComponent, canActivate: [AuthGuard]},
    ]}, 
  // { path: 'salary/:params', component: SalaryComponent, canActivate: [AuthGuard] },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
  { path: 'playoffTree', component: NewPlayoffTreeComponent, canActivate: [AuthGuard] },
  { path: 'trades', component: TradesComponent, canActivate: [AuthGuard] },
  { path: 'picks', component: PicksComponent, canActivate: [AuthGuard] },
  { path: 'waiver-priority', component: WaiverPriorityComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
