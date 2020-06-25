import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material-module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LeagueComponent } from './league/league.component';
import { AppRoutingModule } from './app-routing.module';
import { TeamsComponent } from './teams/teams-header.component';
import { RulesComponent } from './rules/rules.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { HistoryComponent } from './history/history.component';
import { TeamStatsComponent } from './teams/team-stats/team-stats.component';
import { PlayersStatsComponent } from './stats/players-stats/players-stats.component';
import { GoalieStatsComponent } from './stats/goalie-stats/goalie-stats.component';
import { ChampionsComponent } from './history/champions/champions.component';
import { TradesComponent } from './trades/trades.component';
import { EqualizationComponent } from './rules/equalization/equalization.component';
import { LotteryComponent } from './rules/lottery/lottery.component';
import { EgrComponent } from './rules/egr/egr.component';
import { ProtectionComponent } from './rules/protection/protection.component';
import { RostersComponent } from './rules/rosters/rosters.component';
import { WaiversComponent } from './rules/waivers/waivers.component';
import { WinningsComponent } from './rules/winnings/winnings.component';
import { WaiverPriorityComponent } from './waiver-priority/waiver-priority.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';
import { AuthService } from './_services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerInfoComponent } from './stats/player-info/player-info.component';
import { PlayerArchivesComponent } from './teams/player-archives/player-archives.component';
import { GoalieArchivesComponent } from './teams/goalie-archives/goalie-archives.component';
import { HistoricalTeamStatsComponent } from './teams/historical-team-stats/historical-team-stats.component';
import { TeamArchivesComponent } from './teams/team-archives/team-archives.component';
import { AwardsComponent } from './history/awards/awards.component';
import { SalaryComponent } from './salary/salary.component';
import { PicksComponent } from './draft-overall/picks/picks.component';
import { TwitterComponent } from './main/nhl-info/twitter/twitter.component';
import { NhlLeadersComponent } from './main/nhl-info/nhl-leaders/nhl-leaders.component';
import { NhlPlayersStatsComponent } from './main/nhl-info/nhl-players-stats/nhl-players-stats.component';
import { NhlGoalieStatsComponent } from './main/nhl-info/nhl-goalie-stats/nhl-goalie-stats.component';
import { PlayoffTreeComponent } from './schedule/playoff-tree/playoff-tree.component';
import { NhlRookieStatsComponent } from './main/nhl-info/nhl-rookie-stats/nhl-rookie-stats.component';
import { MatchupComponent } from './schedule/playoff-tree/matchup/matchup.component';
import { ChampionComponent } from './schedule/playoff-tree/champion/champion.component';
import { NewPlayoffTreeComponent } from './schedule/playoff-tree/new-playoff-tree/new-playoff-tree.component';
import { TeamCardComponent } from './schedule/playoff-tree/matchup/team-card/team-card.component';
import { ConferenceComponent } from './schedule/playoff-tree/conference/conference.component';
import { GoalieStatsTableComponent } from './stats/goalie-stats-table/goalie-stats-table.component';
import { TeamStatsTableComponent } from './stats/team-stats-table/team-stats-table.component';
import { PlayerStatsTableComponent } from './stats/player-stats-table/player-stats-table.component';
import { TeamChartComponent } from './main/charts/team-chart/team-chart.component';
import { PlayerChartComponent } from './main/charts/player-chart/player-chart.component';
import { AwardTableViewComponent } from './history/awards/award-table-view/award-table-view.component';
import { NhlInfoComponent } from './main/nhl-info/nhl-info.component';
import { RosterComponent } from './main/roster/roster.component';
import { ChartsComponent } from './main/charts/charts.component';
import { MainHistoryComponent } from './main/main-history/main-history.component';
import { UserTeamHistoryComponent } from './main/main-history/user-team-history/user-team-history.component';
import { UserTeamPlayerHistoryComponent } from './main/main-history/user-team-player-history/user-team-player-history.component';
import { UserTeamGoalieHistoryComponent } from './main/main-history/user-team-goalie-history/user-team-goalie-history.component';
import { TeamPointsComponent } from './main/charts/team-chart/team-points/team-points.component';
import { TeamGoalsForComponent } from './main/charts/team-chart/team-goals-for/team-goals-for.component';
import { TeamGoalsAgainstComponent } from './main/charts/team-chart/team-goals-against/team-goals-against.component';
import { TeamGoalsDiffComponent } from './main/charts/team-chart/team-goals-diff/team-goals-diff.component';
import { TeamPpRankComponent } from './main/charts/team-chart/team-pp-rank/team-pp-rank.component';
import { TeamPkRankComponent } from './main/charts/team-chart/team-pk-rank/team-pk-rank.component';
import { TeamPlayerGoalsComponent } from './main/charts/player-chart/team-player-goals/team-player-goals.component';
import { TeamPlayerPpGoalsComponent } from './main/charts/player-chart/team-player-pp-goals/team-player-pp-goals.component';
import { TeamPlayerAssistsComponent } from './main/charts/player-chart/team-player-assists/team-player-assists.component';
import { TeamPlayerPointsComponent } from './main/charts/player-chart/team-player-points/team-player-points.component';
import { TeamPlayerShGoalsComponent } from './main/charts/player-chart/team-player-sh-goals/team-player-sh-goals.component';
import { TeamPlayerPlusMinusComponent } from './main/charts/player-chart/team-player-plus-minus/team-player-plus-minus.component';
import { OverallStatsComponent } from './overall-stats/overall-stats.component';
import { OverallPlayerStatsComponent } from './overall-stats/overall-player-stats/overall-player-stats.component';
import { OverallGoalieStatsComponent } from './overall-stats/overall-goalie-stats/overall-goalie-stats.component';
import { OverallTeamStatsComponent } from './overall-stats/overall-team-stats/overall-team-stats.component';
import { TeamPointLeaderTableComponent } from './overall-stats/overall-team-stats/team-point-leader-table/team-point-leader-table.component';
import { TeamPenaltiesLeaderTableComponent } from './overall-stats/overall-team-stats/team-penalties-leader-table/team-penalties-leader-table.component';
import { TeamGoalDiffLeaderTableComponent } from './overall-stats/overall-team-stats/team-goal-diff-leader-table/team-goal-diff-leader-table.component';
import { TeamPpLeaderTableComponent } from './overall-stats/overall-team-stats/team-pp-leader-table/team-pp-leader-table.component';
import { TeamWinStreakLeaderTableComponent } from './overall-stats/overall-team-stats/team-win-streak-leader-table/team-win-streak-leader-table.component';
import { TeamPkLeaderTableComponent } from './overall-stats/overall-team-stats/team-pk-leader-table/team-pk-leader-table.component';
import { PlayerPointLeaderTableComponent } from './overall-stats/overall-player-stats/player-point-leader-table/player-point-leader-table.component';
import { PlayerRookieLeaderTableComponent } from './overall-stats/overall-player-stats/player-rookie-leader-table/player-rookie-leader-table.component';
import { PlayerGoalLeaderTableComponent } from './overall-stats/overall-player-stats/player-goal-leader-table/player-goal-leader-table.component';
import { PlayerPpgLeaderTableComponent } from './overall-stats/overall-player-stats/player-ppg-leader-table/player-ppg-leader-table.component';
import { PlayerPlusMinusLeaderTableComponent } from './overall-stats/overall-player-stats/player-plus-minus-leader-table/player-plus-minus-leader-table.component';
import { PlayerPenaltyLeaderTableComponent } from './overall-stats/overall-player-stats/player-penalty-leader-table/player-penalty-leader-table.component';
import { PlayerShotLeaderTableComponent } from './overall-stats/overall-player-stats/player-shot-leader-table/player-shot-leader-table.component';
import { PlayerStreakLeaderTableComponent } from './overall-stats/overall-player-stats/player-streak-leader-table/player-streak-leader-table.component';
import { PlayerDefenseLeaderTableComponent } from './overall-stats/overall-player-stats/player-defense-leader-table/player-defense-leader-table.component';
import { PlayerAssistLeaderTableComponent } from './overall-stats/overall-player-stats/player-assist-leader-table/player-assist-leader-table.component';
import { PlayerShgLeaderTableComponent } from './overall-stats/overall-player-stats/player-shg-leader-table/player-shg-leader-table.component';
import { PlayerWorstPlusMinussLeaderTableComponent } from './overall-stats/overall-player-stats/player-worst-plus-minuss-leader-table/player-worst-plus-minuss-leader-table.component';
import { PlayerBsLeaderTableComponent } from './overall-stats/overall-player-stats/player-bs-leader-table/player-bs-leader-table.component';
import { PlayerHitLeaderTableComponent } from './overall-stats/overall-player-stats/player-hit-leader-table/player-hit-leader-table.component';
import { PlayerLongStreakLeaderTableComponent } from './overall-stats/overall-player-stats/player-long-streak-leader-table/player-long-streak-leader-table.component';
import { PlayerLeaderCardComponent } from './overall-stats/overall-player-stats/player-leader-card/player-leader-card.component';
import { PlayerMinutesLeaderTableComponent } from './overall-stats/overall-player-stats/player-minutes-leader-table/player-minutes-leader-table.component';
import { GoalieWinsLeaderTableComponent } from './overall-stats/overall-goalie-stats/goalie-wins-leader-table/goalie-wins-leader-table.component';
import { GoalieSavePctLeaderTableComponent } from './overall-stats/overall-goalie-stats/goalie-save-pct-leader-table/goalie-save-pct-leader-table.component';
import { GoalieShutoutLeaderTableComponent } from './overall-stats/overall-goalie-stats/goalie-shutout-leader-table/goalie-shutout-leader-table.component';
import { GoalieGaaLeaderTableComponent } from './overall-stats/overall-goalie-stats/goalie-gaa-leader-table/goalie-gaa-leader-table.component';
import { GoalieShotsFacedLeaderTableComponent } from './overall-stats/overall-goalie-stats/goalie-shots-faced-leader-table/goalie-shots-faced-leader-table.component';
import { GoalieLeaderCardComponent } from './overall-stats/overall-goalie-stats/goalie-leader-card/goalie-leader-card.component';
import { PlayersDetailComponent } from './overall-stats/players-detail/players-detail.component';
import { GoaliesDetailComponent } from './overall-stats/goalies-detail/goalies-detail.component';
import { TeamsDetailComponent } from './overall-stats/teams-detail/teams-detail.component';
import { LeagueDetailComponent } from './overall-stats/teams-detail/league-detail/league-detail.component';
import { ConferenceDetailComponent } from './overall-stats/teams-detail/conference-detail/conference-detail.component';
import { DivisionDetailComponent } from './overall-stats/teams-detail/division-detail/division-detail.component';
import { ForwardsDetailComponent } from './overall-stats/players-detail/forwards-detail/forwards-detail.component';
import { DefenseDetailComponent } from './overall-stats/players-detail/defense-detail/defense-detail.component';
import { AllPlayersDetailComponent } from './overall-stats/players-detail/all-players-detail/all-players-detail.component';
import { TeamCurrentComponent } from './teams/team-stats/team-current/team-current.component';
import { TeamCurrentSalaryComponent } from './teams/team-current-salary/team-current-salary.component';
import { CurrentForwardSalariesComponent } from './teams/team-current-salary/current-forward-salaries/current-forward-salaries.component';
import { CurrentDefenseSalariesComponent } from './teams/team-current-salary/current-defense-salaries/current-defense-salaries.component';
import { CurrentGoaliesSalariesComponent } from './teams/team-current-salary/current-goalies-salaries/current-goalies-salaries.component';
import { CurrentTeamTotalsComponent } from './teams/team-current-salary/current-team-totals/current-team-totals.component';
import { TeamCurrentRecordComponent } from './teams/team-stats/team-current/team-current-record/team-current-record.component';
import { TeamDetailArchivesComponent } from './overall-stats/team-detail-archives/team-detail-archives.component';
import { GoaliesDetailArchivesComponent } from './overall-stats/goalies-detail-archives/goalies-detail-archives.component';
import { PlayersDetailArchivesComponent } from './overall-stats/players-detail-archives/players-detail-archives.component';
import { AllPlayersDetailArchiveComponent } from './overall-stats/players-detail-archives/all-players-detail-archive/all-players-detail-archive.component';
import { AllForwardsDetailArchiveComponent } from './overall-stats/players-detail-archives/all-forwards-detail-archive/all-forwards-detail-archive.component';
import { AllDefenseDetailArchiveComponent } from './overall-stats/players-detail-archives/all-defense-detail-archive/all-defense-detail-archive.component';
import { DraftSummaryComponent } from './draft-overall/draft-summary/draft-summary.component';
import { DraftOverallComponent } from './draft-overall/draft-overall.component';
import { DraftSummaryTableComponent } from './draft-overall/draft-summary-table/draft-summary-table.component';
import { OverallAwardsComponent } from './overall-awards/overall-awards.component';
import { ChampionsAwardComponent } from './overall-awards/champions-award/champions-award.component';
import { ScorerAwardComponent } from './overall-awards/scorer-award/scorer-award.component';
import { DefenseAwardComponent } from './overall-awards/defense-award/defense-award.component';
import { RookieAwardComponent } from './overall-awards/rookie-award/rookie-award.component';
import { GoalieAwardComponent } from './overall-awards/goalie-award/goalie-award.component';
import { GmAwardComponent } from './overall-awards/gm-award/gm-award.component';
import { SeasonAwardComponent } from './overall-awards/season-award/season-award.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LeagueComponent,
    TeamsComponent,
    RulesComponent,
    ScheduleComponent,
    HistoryComponent,
    TeamStatsComponent,
    PlayersStatsComponent,
    GoalieStatsComponent,
    OverallTeamStatsComponent,
    ChampionsComponent,
    TradesComponent,
    EqualizationComponent,
    LotteryComponent,
    EgrComponent,
    ProtectionComponent,
    RostersComponent,
    WaiversComponent,
    WinningsComponent,
    WaiverPriorityComponent,
    MainComponent,
    LoginComponent,
    PlayerInfoComponent,
    PlayerArchivesComponent,
    GoalieArchivesComponent,
    HistoricalTeamStatsComponent,
    TeamArchivesComponent,
    AwardsComponent,
    SalaryComponent,
    PicksComponent,
    TwitterComponent,
    NhlLeadersComponent,
    NhlPlayersStatsComponent,
    NhlGoalieStatsComponent,
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
    PlayerChartComponent,
    AwardTableViewComponent,
    NhlInfoComponent,
    RosterComponent,
    ChartsComponent,
    MainHistoryComponent,
    UserTeamHistoryComponent,
    UserTeamPlayerHistoryComponent,
    UserTeamGoalieHistoryComponent,
    TeamPointsComponent,
    TeamGoalsForComponent,
    TeamGoalsAgainstComponent,
    TeamGoalsDiffComponent,
    TeamPpRankComponent,
    TeamPkRankComponent,
    TeamPlayerGoalsComponent,
    TeamPlayerPpGoalsComponent,
    TeamPlayerAssistsComponent,
    TeamPlayerPointsComponent,
    TeamPlayerShGoalsComponent,
    TeamPlayerPlusMinusComponent,
    OverallStatsComponent,
    OverallPlayerStatsComponent,
    OverallGoalieStatsComponent,
    TeamPointLeaderTableComponent,
    TeamPenaltiesLeaderTableComponent,
    TeamGoalDiffLeaderTableComponent,
    TeamPpLeaderTableComponent,
    TeamWinStreakLeaderTableComponent,
    TeamPkLeaderTableComponent,
    PlayerPointLeaderTableComponent,
    PlayerRookieLeaderTableComponent,
    PlayerGoalLeaderTableComponent,
    PlayerPpgLeaderTableComponent,
    PlayerPlusMinusLeaderTableComponent,
    PlayerPenaltyLeaderTableComponent,
    PlayerShotLeaderTableComponent,
    PlayerStreakLeaderTableComponent,
    PlayerDefenseLeaderTableComponent,
    PlayerAssistLeaderTableComponent,
    PlayerShgLeaderTableComponent,
    PlayerWorstPlusMinussLeaderTableComponent,
    PlayerBsLeaderTableComponent,
    PlayerHitLeaderTableComponent,
    PlayerLongStreakLeaderTableComponent,
    PlayerLeaderCardComponent,
    PlayerMinutesLeaderTableComponent,
    GoalieWinsLeaderTableComponent,
    GoalieSavePctLeaderTableComponent,
    GoalieShutoutLeaderTableComponent,
    GoalieGaaLeaderTableComponent,
    GoalieShotsFacedLeaderTableComponent,
    GoalieLeaderCardComponent,
    PlayersDetailComponent,
    GoaliesDetailComponent,
    TeamsDetailComponent,
    LeagueDetailComponent,
    ConferenceDetailComponent,
    DivisionDetailComponent,
    ForwardsDetailComponent,
    DefenseDetailComponent,
    AllPlayersDetailComponent,
    TeamCurrentComponent,
    TeamCurrentSalaryComponent,
    CurrentForwardSalariesComponent,
    CurrentDefenseSalariesComponent,
    CurrentGoaliesSalariesComponent,
    CurrentTeamTotalsComponent,
    TeamCurrentRecordComponent,
    TeamDetailArchivesComponent,
    GoaliesDetailArchivesComponent,
    PlayersDetailArchivesComponent,
    AllPlayersDetailArchiveComponent,
    AllForwardsDetailArchiveComponent,
    AllDefenseDetailArchiveComponent,
    DraftSummaryComponent,
    DraftOverallComponent,
    DraftSummaryTableComponent,
    OverallAwardsComponent,
    ChampionsAwardComponent,
    ScorerAwardComponent,
    DefenseAwardComponent,
    RookieAwardComponent,
    GoalieAwardComponent,
    GmAwardComponent,
    SeasonAwardComponent,
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
  entryComponents: []
})
export class AppModule { }
