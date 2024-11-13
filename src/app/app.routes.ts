import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TeamListComponent } from './pages/team/team-list/team-list.component';
import { TeamCreateComponent } from './pages/team/team-create/team-create.component';
import { TeamDetailsComponent } from './pages/team/team-details/team-details.component';
import { AuthenticateComponent } from './pages/authenticate/authenticate.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TeamUpdateComponent } from './pages/team/team-update/team-update.component';
import { TeamManagementComponent } from './pages/team/team-management/team-management.component';
import { TeamActionsComponent } from './pages/team/team-actions/team-actions.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'authenticate', component: AuthenticateComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'teams', component: TeamListComponent },
    { path: 'teams/create', component: TeamCreateComponent },
    { path: 'teams/update', component: TeamUpdateComponent },
    { path: 'teams/:id', component: TeamDetailsComponent },
    { path: 'team-management', component: TeamManagementComponent },
    { path: 'team-actions', component: TeamActionsComponent },
    { path: '**', redirectTo: 'home' }
];
