import { Component, Input, input } from '@angular/core';
import { ApiCallingService } from '../api-calling.service';
import { NumberPipe } from '../number.pipe';

@Component({
  selector: 'app-jodi',
  standalone: true,
  imports: [NumberPipe],
  templateUrl: './jodi.component.html',
  styleUrl: './jodi.component.css'
})
export class JodiComponent {
  jodiResult: any;
  selectedProduct:any
  products: any;
  result: any[] = []; // Array to hold processed daily data

  @Input() cardItem: string = "";
  marketName: string = "";

  constructor(private apiCalling: ApiCallingService) {}

  ngOnInit(): void {

    this.getMarketList()
    this.getJodiResult(this.cardItem);
   
  }

  getMarketList(){
    this.apiCalling.getProducts().subscribe((response: { data: any; })=>{
      this.products = response.data
      this.getMarketDetail()
    })
  }

  getMarketDetail(){
    this.products.forEach((element: { _id: string; }) => {
      if(element._id == this.cardItem){
         this.selectedProduct = element
      }
      
      
    });
  }
  getJodiResult(cardItem: string) {
    this.apiCalling.getResults(cardItem).subscribe((response: { data: any; }) => {
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
let groupedByWeek: any[] = [];
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
getWeekNumber(date:Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const daysOffset = firstDayOfYear.getDay() - 1;
  const firstMonday = new Date(firstDayOfYear);
  firstMonday.setDate(firstMonday.getDate() + (daysOffset > 0 ? 7 - daysOffset : 0));

  const firstday = +(firstMonday)
  const diffInDays = Math.floor(((+date) - firstday) / (1000 * 60 * 60 * 24));
  console.log(Math.floor((diffInDays+1)/7))
  return Math.floor((diffInDays + 1) / 7);
}
}
