import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { JodiComponent } from './jodi/jodi.component';
import { PanelComponent } from './panel/panel.component';



export const routes: Routes = [
   {path:'', component:LandingComponent},
   {path:'jodi/:cardItem', component:JodiComponent},
   {path:'panel/:cardItem', component:PanelComponent}
   
   

];
