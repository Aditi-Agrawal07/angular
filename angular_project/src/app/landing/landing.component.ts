import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CardComponent,HeaderComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
