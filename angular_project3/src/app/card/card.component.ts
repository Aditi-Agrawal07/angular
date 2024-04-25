import { Component } from '@angular/core';
import { ApiCallingService } from '../api-calling.service';
import { DatePipe } from '@angular/common';
import { NumberPipe } from '../number.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DatePipe,NumberPipe,RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  products: any;

  constructor(private apiCalling: ApiCallingService){

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
