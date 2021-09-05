import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../shared.module";
import {AuthService} from "../services/auth.service";
import {AuthGuard} from "../services/auth.guard";

// @ts-ignore
// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminLoginComponent,
    DashboardComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
        path: '', component:AdminLayoutComponent,children:[
        {path:'',redirectTo:'/admin/login',pathMatch:'full'},
        {path:'login',component:AdminLoginComponent},
        {path:'create', component:CreateComponent, canActivate:[AuthGuard]},
        {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
        {path:'post/:id/edit', component:EditComponent, canActivate:[AuthGuard]},
      ]
      }]
    )],
  exports: [RouterModule],
  providers:[AuthService,AuthGuard]
})

export class AdminModule {

}
