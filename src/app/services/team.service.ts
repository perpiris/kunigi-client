import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponse } from '../models/pagedResponse';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = 'https://localhost:5001/teams';

  constructor(private http: HttpClient) { }

  createTeam(request: FormData): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, request);
  }

  getTeamById(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/${id}`);
  }

  getPagedTeams(pageNumber: number = 1, pageSize: number = 10): Observable<PagedResponse<Team>> {
    const params = { pageNumber, pageSize };
    return this.http.get<PagedResponse<Team>>(`${this.apiUrl}`, { params });
  }

  updateTeam(request: FormData): Observable<any> {
    console.log('lol')
    return this.http.put<void>(`${this.apiUrl}`, request);
  }
}
