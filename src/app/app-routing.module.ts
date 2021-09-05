import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {PostPageComponent} from "./post-page/post-page.component";

const routes: Routes = [{
  path:'',component:MainComponent,children:[
    {path:'',redirectTo:'/',pathMatch:'full'},
    {path:'',component:HomePageComponent},
    {path:'post/:id',component:PostPageComponent}
    ]
},
  {path:'admin',loadChildren:()=>import ('./admin/admin.module').then(m=>m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
