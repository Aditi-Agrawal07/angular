import { Component } from '@angular/core';
import { ApicallingService } from '../apicalling.service';
import { response } from 'express';
import { NumberPipe } from '../number.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NumberPipe, DatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
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
