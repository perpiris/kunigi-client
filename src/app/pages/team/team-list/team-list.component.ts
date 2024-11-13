import { Component } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { PagedResponse } from '../../../models/pagedResponse';
import { Team } from '../../../models/team';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css'
})
export class TeamListComponent {
  teams: Team[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalCount = 0;
  Math = Math;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamService.getPagedTeams(this.currentPage, this.pageSize)
      .subscribe((response: PagedResponse<Team>) => {
        this.teams = response.items;
        this.totalCount = response.totalItems;
        this.totalPages = Math.ceil(response.totalItems / this.pageSize);
      });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadTeams();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxButtons = 5;

    let start = Math.max(1, this.currentPage - Math.floor(maxButtons / 2));
    let end = Math.min(this.totalPages, start + maxButtons - 1);

    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
}
