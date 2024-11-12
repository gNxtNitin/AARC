import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { LogoutComponent } from './component/logout/logout.component';
import { SignupComponent } from './component/signup/signup.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { UserInfoComponent } from './component/user-info/user-info.component';
import { TeamInfoComponent } from './component/team-info/team-info.component';
import { AgencyInfoComponent } from './component/agency-info/agency-info.component';
import { UserInfoResolveService } from './service/user-info-resolve.service';
import { CarrierManintainanceComponent } from './component/carrier-manintainance/carrier-manintainance.component';
import { AgencyAdminComponent } from './component/agency-admin/agency-admin.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { AarcDocumnetComponent } from './component/aarc-documnet/aarc-documnet.component';
import { AarcLinksComponent } from './component/aarc-links/aarc-links.component';
import { GuidelineComponent } from './component/guideline/guideline.component';
import { SupportComponent } from './component/support/support.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve:{user:UserInfoResolveService},
    children: [
      { path: '', component: UserInfoComponent },
      { path: 'user', component: UserInfoComponent, resolve:{user: UserInfoResolveService} },
      { path: 'teamInfo', component: TeamInfoComponent },
      { path: 'agencyInfo', component: AgencyInfoComponent },
      { path: 'carrierMaintainance', component: CarrierManintainanceComponent },
      { path: 'agency-admin', component: AgencyAdminComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'document', component: AarcDocumnetComponent },
      { path: 'link', component: AarcLinksComponent },
      { path: 'guideline', component: GuidelineComponent },
      { path: 'support', component: SupportComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
