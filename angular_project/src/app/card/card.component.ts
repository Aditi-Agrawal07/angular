import { Component, ElementRef, Input } from '@angular/core';
import { ApicallingService } from '../apicalling.service';
import { response } from 'express';
import { NumberPipe } from '../number.pipe';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink, RouterOutlet, provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NumberPipe, DatePipe, RouterLink,RouterOutlet,NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
 
})
export class CardComponent {
  products: any;

  constructor(private apiCalling: ApicallingService){

  }

  ngOnInit() {
    this.getProduct()
  }
  getProduct() {
    this.apiCalling.getProducts().subscribe((response)=>{
      this.products =  response.data
     
  
    })

    
  }






}
