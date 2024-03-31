import { Routes } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { JodiComponent } from './jodi/jodi.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    {path: '', component:LandingComponent},
    {path:'jodi/:cardItem', component:JodiComponent},
    {path:'panel/:cardItem', component:PanelComponent}
];
