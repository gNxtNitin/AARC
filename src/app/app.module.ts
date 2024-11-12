import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthenticationService } from './service/authentication/authentication.service';
import {HttpClientModule, HTTP_INTERCEPTORS }  from '@angular/common/http';
import { UserService } from './service/user.service';
import { TokenInterceptorService } from './service/authentication/token-interceptor.service';
import { LogoutComponent } from './component/logout/logout.component';
import { SignupComponent } from './component/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { SidebarMenuComponent } from './component/sidebar-menu/sidebar-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ToastService } from './service/toast-service';
import { HeaderComponent } from './component/header/header.component';
import { MainContentComponent } from './component/main-content/main-content.component';
import { RightPanelComponent } from './component/right-panel/right-panel.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { UserInfoComponent } from './component/user-info/user-info.component';
import { AddUserComponent } from './component/add-user/add-user.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { TeamInfoComponent } from './component/team-info/team-info.component';
import { AgencyInfoComponent } from './component/agency-info/agency-info.component';  
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CarrierManintainanceComponent } from './component/carrier-manintainance/carrier-manintainance.component';
import { AgencyAdminComponent } from './component/agency-admin/agency-admin.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { AarcDocumnetComponent } from './component/aarc-documnet/aarc-documnet.component';
import { AarcLinksComponent } from './component/aarc-links/aarc-links.component';
import { GuidelineComponent } from './component/guideline/guideline.component';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatterService } from './service/ngb-date-custom-parser-formatter.service';
import { ProucerCodeService } from './service/proucer-code.service';
import { TeamService } from './service/team.service';
import { AddAgencyComponent } from './component/add-agency/add-agency.component';
import { AddCarrierComponent } from './component/add-carrier/add-carrier.component';
import {NewsEventService} from './service/news-event.service'
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SupportComponent } from './component/support/support.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    SignupComponent,
    ForgetPasswordComponent,
    SidebarMenuComponent,
    HeaderComponent,
    MainContentComponent,
    RightPanelComponent,
    ChangePasswordComponent,
    UserInfoComponent,
    AddUserComponent,
    TeamInfoComponent,
    AgencyInfoComponent,
    CarrierManintainanceComponent,
    AgencyAdminComponent,
    InventoryComponent,
    AarcDocumnetComponent,
    AarcLinksComponent,
    GuidelineComponent,
    ConfirmDialogComponent,
    AddAgencyComponent,
    AddCarrierComponent,
    SupportComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
     NgxSpinnerModule,
     MatSelectModule,
     MatButtonModule,
     MatFormFieldModule,
     NgxMatSelectSearchModule,
     NgbModule,
     AngularEditorModule
  ],
  providers: [
    AuthGuard, 
    AuthenticationService,
    ToastService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatterService },
    BsModalService,
    ProucerCodeService,
    TeamService,
    NewsEventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
