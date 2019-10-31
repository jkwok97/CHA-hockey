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
    LoginComponent
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
