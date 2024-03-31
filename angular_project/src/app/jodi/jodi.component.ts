import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApicallingService } from '../apicalling.service';
import { DatePipe, NgClass, WeekDay } from '@angular/common';
import { response } from 'express';
import { CardComponent } from '../card/card.component';
import { NumberPipe } from '../number.pipe';

@Component({
  selector: 'app-jodi',
  standalone: true, // Remove this attribute if not using Angular version 14+
  imports: [HeaderComponent, DatePipe,CardComponent,NumberPipe,NgClass],
  templateUrl: './jodi.component.html',
  styleUrls: ['./jodi.component.css']
})
export class JodiComponent implements OnInit {

  jodiResult: any;
  selectedProduct:any
  products: any;
  result: any[]; // Array to hold processed daily data

  @Input() cardItem: string = "";
  marketName: string = "";

  constructor(private apiCalling: ApicallingService) {}

  ngOnInit(): void {

    this.getMarketList()
    this.getJodiResult(this.cardItem);
   
  }

  getMarketList(){
    this.apiCalling.getProducts().subscribe((response)=>{
      this.products = response.data
      this.getMarketDetail()
    })
  }

  getMarketDetail(){
    this.products.forEach(element => {
      if(element._id == this.cardItem){
         this.selectedProduct = element
      }
      
      
    });
  }
  getJodiResult(cardItem: string) {
    this.apiCalling.getResults(cardItem).subscribe((response) => {
      this.jodiResult = response.data;
      this.processData(this.jodiResult); // Call function to process the data
    });
  }

  // processData(data: any[]) {
  //  const sortedData = data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  //  console.log(sortedData)
  

  //   // Create an array representing all seven days of the week (assuming Sunday = 0):
  //   const weekDays = [0, 1, 2, 3, 4, 5, 6];

  //   const dailyResults = weekDays.map(day => {
  //     // Find items matching the day:
  //     const dayItems = data.filter(item => this.getDay(item.createdAt) === day);

  //     console.log("Day Items",dayItems)
      
  //     return dayItems.length > 0 ? dayItems : [{}]; // Return empty object if no items
  //   });

  //   this.result = dailyResults;
  //   console.log(this.result)
  // }

  // getWeekNumber(date: Date): number {
  //   const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  //   const daysOffset = firstDayOfYear.getDay() - 1;
  //   const firstMonday = new Date(firstDayOfYear);
  //   firstMonday.setDate(firstMonday.getDate() + (daysOffset > 0 ? 7 - daysOffset : 0));

  //   const diffInDays = Math.floor((date.getTime() - firstMonday.getTime()) / (1000 * 60 * 60 * 24));
  //   return Math.ceil((diffInDays + 1) / 7);
  // }

  getDay(createdAt: string): number {
    const date = new Date(createdAt);
    return date.getDay(); // Sunday = 0, Monday = 1, etc.
  }

  // Step 1: Sort the array based on the date
  processData(data:any[]){
const sortedData = data.sort(
  (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
console.log(sortedData)
// Step 2: Iterate through the sorted array and group entries by week
let groupedByWeek = [];
data.forEach(item => {
  const dateKey =new Date(item.createdAt)
  
  
  const date = new Date(dateKey);


  
  const weekNumber = this.getWeekNumber(date);



  if (!groupedByWeek[weekNumber]) {
      // groupedByWeek[weekNumber] = [];
      groupedByWeek[weekNumber] = Array(7).fill({});
   
  }
const weekDay = [0,1, 2,3,4,5,6]
const currDate = new Date(item.createdAt)



const dayOfWeek = date.getDay();

console.log(dayOfWeek)

// Push the item into the groupedByWeek array
groupedByWeek[weekNumber][dayOfWeek] = item;
});
this.result = groupedByWeek
console.log(this.result)
}

// Step 3: Define a function to get the week number of a given date
getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const daysOffset = firstDayOfYear.getDay() - 1;
  const firstMonday = new Date(firstDayOfYear);
  firstMonday.setDate(firstMonday.getDate() + (daysOffset > 0 ? 7 - daysOffset : 0));

  const firstday = +(firstMonday)
  const diffInDays = Math.floor((date - firstday) / (1000 * 60 * 60 * 24));
  console.log(Math.floor((diffInDays+1)/7))
  return Math.floor((diffInDays + 1) / 7);
}

// Step 4: Store each week's entries in a separate array
// weeksArray = Object.values(groupedByWeek);




 
}
