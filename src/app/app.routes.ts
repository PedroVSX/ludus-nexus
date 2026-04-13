import { Routes } from '@angular/router';
import { SignUp } from './pages/sign-up/sign-up';
import { SignIn } from './pages/sign-in/sign-in';
import { Home } from './pages/home/home';

export const routes: Routes = [
    { path: '', redirectTo: 'sign-up', pathMatch: 'full' },
    { path: 'sign-up', component: SignUp },
    { path: 'sign-in', component: SignIn },
    { path: 'home', component: Home }
];
