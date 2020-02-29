import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{
  path:'',
  redirectTo :'/descriptions',
  pathMatch:'full'
},
{
  path:'descriptions',
  loadChildren:() => import(`./description/description.module`).then(m => m.DescriptionModule) 
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
