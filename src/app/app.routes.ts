import { Routes } from '@angular/router';
import { UserSearch } from './pages/user-search/user-search';
import { HardwareChoice } from './pages/hardware-choice/hardware-choice';
import { Home } from './pages/home/home';
import { Loading } from './pages/loading/loading';

export const routes: Routes = [
    { path: '', redirectTo: 'user-search', pathMatch: 'full' },
    { path: 'user-search', component: UserSearch },
    { path: 'hardware-choice/:username', component: HardwareChoice },
    { path: 'loading/:username', component: Loading },
    { path: 'home/:username', component: Home }
];
