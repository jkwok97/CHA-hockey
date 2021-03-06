import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AwardsService } from 'src/app/_services/awards.service';
import { TeamInfoService } from 'src/app/_services/team-info.service';
import { filter, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-team-awards',
  templateUrl: './team-awards.component.html',
  styleUrls: ['./team-awards.component.css']
})
export class TeamAwardsComponent implements OnInit, OnDestroy {
  
  private _alive: boolean = true;

  awards$: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _awardsService: AwardsService,
    private _teamInfoService: TeamInfoService
    ) { 

      const teamSelected = this._route.snapshot.parent.params.team;

      this.getUserId(teamSelected)
      
    }

  getUserId(teamSelected: string) {
    this._teamInfoService.getUserByTeamName(teamSelected).pipe(
      takeWhile(() => this._alive)
    ).subscribe((id: number) => {
      const teamUserId = id['users_id'];
      this.awards$ = this._awardsService.getTeamAwardsByUserId(teamUserId);
    }, error => console.log(error));
  }

  ngOnInit() {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeWhile(() => this._alive)
    ).subscribe((event) => {
      const splitUrl = event['url'].split("/");
      this.getUserId(splitUrl[2]);
    });
  }

  getLogo(logo: string) {
    return `url(${logo})`
  }

  getColor(color:string) {
    return `${color}95`
  }

  getPlayerPicture(id: number) {
    return `url(https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${id}@2x.jpg)`
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
