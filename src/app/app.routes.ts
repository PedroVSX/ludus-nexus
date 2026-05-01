import { Routes } from '@angular/router';
import { UserSearch } from './pages/user-search/user-search';
import { Home } from './pages/home/home';

export const routes: Routes = [
    { path: '', redirectTo: 'user-search', pathMatch: 'full' },
    { path: 'user-search', component: UserSearch },
    { path: 'home', component: Home }
];
