import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Team } from '../../../models/team';
import { TeamService } from '../../../services/team.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.css'
})
export class TeamDetailsComponent {
  team?: Team;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teamService.getTeamById(params['id']).subscribe(team => {
        this.team = team;
      });
    });
  }
}
