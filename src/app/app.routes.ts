import { Routes } from '@angular/router';
import { UserSearch } from './pages/user-search/user-search';
import { HardwareChoice } from './pages/hardware-choice/hardware-choice';
import { Home } from './pages/home/home';

export const routes: Routes = [
    { path: '', redirectTo: 'user-search', pathMatch: 'full' },
    { path: 'user-search', component: UserSearch },
    { path: 'hardware-choice', component: HardwareChoice },
    { path: 'home/:username', component: Home }
];
