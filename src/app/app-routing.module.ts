import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeagueComponent } from './league/league.component';
import { RulesComponent } from './rules/rules.component';
import { TeamStatsComponent } from './teams/team-stats/team-stats.component';
import { OverallTeamStatsComponent } from './overall-stats/overall-team-stats/overall-team-stats.component';
import { TradesComponent } from './trades/trades.component';
import { WaiverPriorityComponent } from './waiver-priority/waiver-priority.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';
import { AuthGuard } from './_services/auth.guard';
import { SalaryComponent } from './salary/salary.component';
import { PicksComponent } from './draft-overall/picks/picks.component';
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
import { TeamsDetailComponent } from './overall-stats/teams-detail/teams-detail.component';
import { PlayersDetailComponent } from './overall-stats/players-detail/players-detail.component';
import { GoaliesDetailComponent } from './overall-stats/goalies-detail/goalies-detail.component';
import { LeagueDetailComponent } from './overall-stats/teams-detail/league-detail/league-detail.component';
import { ConferenceDetailComponent } from './overall-stats/teams-detail/conference-detail/conference-detail.component';
import { DivisionDetailComponent } from './overall-stats/teams-detail/division-detail/division-detail.component';
import { ForwardsDetailComponent } from './overall-stats/players-detail/forwards-detail/forwards-detail.component';
import { DefenseDetailComponent } from './overall-stats/players-detail/defense-detail/defense-detail.component';
import { AllPlayersDetailComponent } from './overall-stats/players-detail/all-players-detail/all-players-detail.component';
import { TeamArchivesComponent } from './teams/team-archives/team-archives.component';
import { PlayerArchivesComponent } from './teams/player-archives/player-archives.component';
import { GoalieArchivesComponent } from './teams/goalie-archives/goalie-archives.component';
import { TeamCurrentComponent } from './teams/team-stats/team-current/team-current.component';
import { TeamCurrentSalaryComponent } from './teams/team-current-salary/team-current-salary.component';
import { TeamDetailArchivesComponent } from './overall-stats/team-detail-archives/team-detail-archives.component';
import { PlayersDetailArchivesComponent } from './overall-stats/players-detail-archives/players-detail-archives.component';
import { GoaliesDetailArchivesComponent } from './overall-stats/goalies-detail-archives/goalies-detail-archives.component';
import { AllPlayersDetailArchiveComponent } from './overall-stats/players-detail-archives/all-players-detail-archive/all-players-detail-archive.component';
import { AllForwardsDetailArchiveComponent } from './overall-stats/players-detail-archives/all-forwards-detail-archive/all-forwards-detail-archive.component';
import { AllDefenseDetailArchiveComponent } from './overall-stats/players-detail-archives/all-defense-detail-archive/all-defense-detail-archive.component';
import { DraftSummaryComponent } from './draft-overall/draft-summary/draft-summary.component';
import { DraftOverallComponent } from './draft-overall/draft-overall.component';
import { EqualizationComponent } from './rules/equalization/equalization.component';
import { LotteryComponent } from './rules/lottery/lottery.component';
import { EgrComponent } from './rules/egr/egr.component';
import { ProtectionComponent } from './rules/protection/protection.component';
import { RostersComponent } from './rules/rosters/rosters.component';
import { WaiversComponent } from './rules/waivers/waivers.component';
import { WinningsComponent } from './rules/winnings/winnings.component';
import { OverallAwardsComponent } from './overall-awards/overall-awards.component';
import { ChampionsAwardComponent } from './overall-awards/champions-award/champions-award.component';
import { ScorerAwardComponent } from './overall-awards/scorer-award/scorer-award.component';
import { DefenseAwardComponent } from './overall-awards/defense-award/defense-award.component';
import { RookieAwardComponent } from './overall-awards/rookie-award/rookie-award.component';
import { GoalieAwardComponent } from './overall-awards/goalie-award/goalie-award.component';
import { GmAwardComponent } from './overall-awards/gm-award/gm-award.component';
import { SeasonAwardComponent } from './overall-awards/season-award/season-award.component';
import { PlayerInformationComponent } from './player-information/player-information.component';
import { PlayerInformationStatsComponent } from './player-information/player-information-stats/player-information-stats.component';
import { PlayerInformationNhlStatsComponent } from './player-information/player-information-nhl-stats/player-information-nhl-stats.component';
import { PlayerInformationRatingsComponent } from './player-information/player-information-ratings/player-information-ratings.component';
import { TeamAwardsComponent } from './teams/team-awards/team-awards.component';
import { UserTeamAwardsComponent } from './main/main-history/user-team-awards/user-team-awards.component';
import { GamesComponent } from './games/games.component';
import { AllGamesComponent } from './games/all-games/all-games.component';
import { DayGamesComponent } from './games/day-games/day-games.component';
import { PlayoffTreeGamesComponent } from './games/playoff-tree-games/playoff-tree-games.component';

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
            { path: 'awards', component: UserTeamAwardsComponent },
          ]
        },
      ]
  },
  { path: 'stats', component: OverallStatsComponent, canActivate: [AuthGuard],
      children: [
        { path: 'teams/leaders', component: OverallTeamStatsComponent },
        { path: 'players/leaders', component: OverallPlayerStatsComponent },
        { path: 'goalies/leaders', component: OverallGoalieStatsComponent },
        { path: 'teams/detail', component: TeamsDetailComponent, canActivate: [AuthGuard], 
          children: [ 
            { path: 'league', component: LeagueDetailComponent},
            { path: 'conference', component: ConferenceDetailComponent}, 
            { path: 'division', component: DivisionDetailComponent} 
          ] 
        },
        { path: 'players/detail', component: PlayersDetailComponent, canActivate: [AuthGuard], 
          children: [
            { path: 'all', component: AllPlayersDetailComponent},
            { path: 'forwards', component: ForwardsDetailComponent},
            { path: 'defense', component: DefenseDetailComponent},
          ]
        },
        { path: 'goalies/detail', component: GoaliesDetailComponent },
        { path: 'teams/archive', component: TeamDetailArchivesComponent },
        { path: 'players/archive', component: PlayersDetailArchivesComponent, canActivate: [AuthGuard], 
          children: [
            { path: 'all', component: AllPlayersDetailArchiveComponent},
            { path: 'forwards', component: AllForwardsDetailArchiveComponent},
            { path: 'defense', component: AllDefenseDetailArchiveComponent},
          ]
        },
        { path: 'goalies/archive', component: GoaliesDetailArchivesComponent },
      ]
  },
  { path: 'teams', component: LeagueComponent, canActivate: [AuthGuard] },
  { path: 'teams/:team/:id', component: TeamStatsComponent, canActivate: [AuthGuard], 
    children: [
      { path: 'salaries', component: TeamCurrentSalaryComponent},
      { path: 'current', component: TeamCurrentComponent},
      { path: 'awards', component: TeamAwardsComponent},
      { path: 'archives/team', component: TeamArchivesComponent},
      { path: 'archives/players', component: PlayerArchivesComponent},
      { path: 'archives/goalies', component: GoalieArchivesComponent},
    ] 
  },
  { path: 'salary', component: SalaryComponent, canActivate: [AuthGuard]}, 
  { path: 'draft', component: DraftOverallComponent, canActivate: [AuthGuard],
    children: [
      { path: 'picks', component: PicksComponent},
      { path: 'summary', component:DraftSummaryComponent},
    ]
  },
  { path: 'trades', component: TradesComponent, canActivate: [AuthGuard] },
  { path: 'waiver-priority', component: WaiverPriorityComponent, canActivate: [AuthGuard] },
  { path: 'rules', component: RulesComponent, canActivate: [AuthGuard], 
    children: [
      { path: 'equalization', component: EqualizationComponent },
      { path: 'lottery', component: LotteryComponent },
      { path: 'egr', component: EgrComponent },
      { path: 'protection', component: ProtectionComponent },
      { path: 'rosters', component: RostersComponent },
      { path: 'waivers', component: WaiversComponent },
      { path: 'winnings', component: WinningsComponent },
    ]
  },
  { path: 'awards', component: OverallAwardsComponent, canActivate: [AuthGuard], 
    children: [
      { path: 'champions', component: ChampionsAwardComponent },
      { path: 'scorer', component: ScorerAwardComponent },
      { path: 'defense', component: DefenseAwardComponent },
      { path: 'rookie', component: RookieAwardComponent },
      { path: 'goalie', component: GoalieAwardComponent },
      { path: 'gm', component: GmAwardComponent },
      { path: 'season', component: SeasonAwardComponent },
    ]
  },
  { path: 'player-info/:id/:type', component: PlayerInformationComponent, canActivate: [AuthGuard],
    children: [
      { path: 'stats', component: PlayerInformationStatsComponent },
      { path: 'nhl-stats', component: PlayerInformationNhlStatsComponent },
      { path: 'ratings', component: PlayerInformationRatingsComponent },
    ]
  },
  { path: 'games', component: GamesComponent, canActivate: [AuthGuard], 
    children: [
      { path: 'all', component: AllGamesComponent },
      { path: 'day', component: DayGamesComponent },
      { path: 'playoffs', component: PlayoffTreeGamesComponent },
    ]
  }
];

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
