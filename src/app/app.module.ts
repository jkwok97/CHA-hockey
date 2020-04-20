import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material-module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LeagueComponent } from './league/league.component';
import { AppRoutingModule } from './app-routing.module';
import { TeamsComponent } from './teams/teams.component';
import { RulesComponent } from './rules/rules.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StatsComponent } from './stats/stats.component';
import { HistoryComponent } from './history/history.component';
import { TeamStatsComponent } from './teams/team-stats/team-stats.component';
import { PlayersStatsComponent } from './stats/players-stats/players-stats.component';
import { GoalieStatsComponent } from './stats/goalie-stats/goalie-stats.component';
import { OverallTeamStatsComponent } from './stats/overall-team-stats/overall-team-stats.component';
import { ChampionsComponent } from './history/champions/champions.component';
import { DraftsComponent } from './history/drafts/drafts.component';
import { TradesComponent } from './trades/trades.component';
import { EqualizationComponent } from './rules/equalization/equalization.component';
import { LotteryComponent } from './rules/lottery/lottery.component';
import { EgrComponent } from './rules/egr/egr.component';
import { ProtectionComponent } from './rules/protection/protection.component';
import { RostersComponent } from './rules/rosters/rosters.component';
import { WaiversComponent } from './rules/waivers/waivers.component';
import { WinningsComponent } from './rules/winnings/winnings.component';
import { WaiverPriorityComponent } from './waiver-priority/waiver-priority.component';
import { ArchivesComponent } from './history/archives/archives.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';
import { AuthService } from './main/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerInfoComponent } from './stats/player-info/player-info.component';
import { PlayerArchivesComponent } from './history/player-archives/player-archives.component';
import { GoalieArchivesComponent } from './history/goalie-archives/goalie-archives.component';
import { HistoricalTeamStatsComponent } from './teams/historical-team-stats/historical-team-stats.component';
import { TeamArchivesComponent } from './history/team-archives/team-archives.component';
import { AwardsComponent } from './history/awards/awards.component';
import { SalaryComponent } from './salary/salary.component';
import { PicksComponent } from './picks/picks.component';
import { TwitterComponent } from './main/twitter/twitter.component';
import { NhlLeadersComponent } from './main/nhl-leaders/nhl-leaders.component';
import { NhlPlayersStatsComponent } from './main/nhl-players-stats/nhl-players-stats.component';
import { NhlGoalieStatsComponent } from './main/nhl-goalie-stats/nhl-goalie-stats.component';
import { TeamSalaryComponent } from './salary/team-salary/team-salary.component';
import { PlayoffTreeComponent } from './schedule/playoff-tree/playoff-tree.component';
import { NhlRookieStatsComponent } from './main/nhl-rookie-stats/nhl-rookie-stats.component';
import { MatchupComponent } from './schedule/playoff-tree/matchup/matchup.component';
import { ChampionComponent } from './schedule/playoff-tree/champion/champion.component';
import { NewPlayoffTreeComponent } from './schedule/playoff-tree/new-playoff-tree/new-playoff-tree.component';
import { TeamCardComponent } from './schedule/playoff-tree/matchup/team-card/team-card.component';
import { ConferenceComponent } from './schedule/playoff-tree/conference/conference.component';
import { GoalieStatsTableComponent } from './stats/goalie-stats-table/goalie-stats-table.component';
import { TeamStatsTableComponent } from './stats/team-stats-table/team-stats-table.component';
import { PlayerStatsTableComponent } from './stats/player-stats-table/player-stats-table.component';
import { TeamChartComponent } from './stats/team-chart/team-chart.component';
import { PlayerChartComponent } from './stats/player-chart/player-chart.component';
import { TeamSeasonComponent } from './history/team-archives/team-season/team-season.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LeagueComponent,
    TeamsComponent,
    RulesComponent,
    ScheduleComponent,
    StatsComponent,
    HistoryComponent,
    TeamStatsComponent,
    PlayersStatsComponent,
    GoalieStatsComponent,
    OverallTeamStatsComponent,
    ChampionsComponent,
    DraftsComponent,
    TradesComponent,
    EqualizationComponent,
    LotteryComponent,
    EgrComponent,
    ProtectionComponent,
    RostersComponent,
    WaiversComponent,
    WinningsComponent,
    WaiverPriorityComponent,
    ArchivesComponent,
    MainComponent,
    LoginComponent,
    PlayerInfoComponent,
    PlayerArchivesComponent,
    GoalieArchivesComponent,
    HistoricalTeamStatsComponent,
    TeamArchivesComponent,
    TeamSeasonComponent,
    AwardsComponent,
    SalaryComponent,
    PicksComponent,
    TwitterComponent,
    NhlLeadersComponent,
    NhlPlayersStatsComponent,
    NhlGoalieStatsComponent,
    TeamSalaryComponent,
    PlayoffTreeComponent,
    NhlRookieStatsComponent,
    MatchupComponent,
    ChampionComponent,
    NewPlayoffTreeComponent,
    TeamCardComponent,
    ConferenceComponent,
    PlayerStatsTableComponent,
    GoalieStatsTableComponent,
    TeamStatsTableComponent,
    TeamChartComponent,
    PlayerChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [
    EqualizationComponent, LotteryComponent,
    EgrComponent, ProtectionComponent,
    RostersComponent, WaiversComponent,
    WinningsComponent
  ]
})
export class AppModule { }
