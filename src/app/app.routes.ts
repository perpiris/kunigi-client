import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TeamListComponent } from './pages/team/team-list/team-list.component';
import { TeamCreateComponent } from './pages/team/team-create/team-create.component';
import { TeamDetailsComponent } from './pages/team/team-details/team-details.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'teams', component: TeamListComponent },
    { path: 'teams/create', component: TeamCreateComponent },
    { path: 'teams/:id', component: TeamDetailsComponent },
    { path: '**', redirectTo: 'home' },

];
