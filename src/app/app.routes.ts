

import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';


const APP_ROUTER: Routes = [
    { path: '', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    // { path: 'sign-in', component: LoginComponent, canActivate: [AccessAuthGuard]},
	// { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
	// //{ path: 'config', loadChildren: 'app/config/config.module#ConfigModule', canActivate: []},
    // { path: '**', component: LandingComponent, canActivate: [AuthGuard] }
    // { path: 'new-event', component: NewEventComponent, children: NEW_EVENT_ROUTES},
    // { path: 'campaigns', component: CampaignsComponent, children: CAMPAIGNS_ROUTES},

];

export const routing = RouterModule.forRoot(APP_ROUTER);