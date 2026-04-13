import { Routes } from '@angular/router';
import { SignUp } from './pages/sign-up/sign-up';
import { SignIn } from './pages/sign-in/sign-in';

export const routes: Routes = [
    { path: '', redirectTo: 'sign-up', pathMatch: 'full' },
    { path: 'sign-up', component: SignUp },
    { path: 'sign-in', component: SignIn }
];
