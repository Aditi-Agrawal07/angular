import { Component, Input } from '@angular/core';
import { ApiCallingService } from '../api-calling.service';
import { NumberPipe } from '../number.pipe';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [NumberPipe],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {

  panelResult: any;
  selectedProduct:any
  products: any;
  result: any[] =[]; // Array to hold processed daily data

  @Input() cardItem: string = "";
  marketName: string = "";

  constructor(private apiCalling: ApiCallingService) {}

  ngOnInit(): void {
    
    this.getMarketList()
    console.log(this.cardItem)
    this.getpanelResult(this.cardItem);
   
  }

  getMarketList(){
    this.apiCalling.getProducts().subscribe((response)=>{
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
  getpanelResult(cardItem: string) {
    console.log(cardItem)
    this.apiCalling.getResults(cardItem).subscribe((response) => {
      this.panelResult = response.data;
      this.processData(this.panelResult); // Call function to process the data
    });
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
    
  getDay(createdAt: string): number {
    const date = new Date(createdAt);
    return date.getDay(); // Sunday = 0, Monday = 1, etc.
  }

   getValue(obj: { [x: string]: any; }, key: string) {
    return key in obj ? obj[key] : ""; // Efficiently check for key existence using "in"
  }

}
