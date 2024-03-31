import { Component, Input } from '@angular/core';
import { ApiCallingService } from '../api-calling.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { IsEmptyPipe } from '../is-empty.pipe';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [NavbarComponent,IsEmptyPipe,FooterComponent],
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

  processData(data: any[]) {
    data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    // Create an array representing all seven days of the week (assuming Sunday = 0):
    const weekDays = [0, 1, 2, 3, 4, 5, 6];

    const dailyResults = weekDays.map(day => {
      // Find items matching the day:
      const dayItems = data.filter(item => this.getDay(item.createdAt) === day);
      
      return dayItems.length > 0 ? dayItems : [{}]; // Return empty object if no items
    });

    this.result = dailyResults;
    console.log(this.result)
  }

  getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const daysOffset = firstDayOfYear.getDay() - 1;
    const firstMonday = new Date(firstDayOfYear);
    firstMonday.setDate(firstMonday.getDate() + (daysOffset > 0 ? 7 - daysOffset : 0));

    const diffInDays = Math.floor((date.getTime() - firstMonday.getTime()) / (1000 * 60 * 60 * 24));
    return Math.ceil((diffInDays + 1) / 7);
  }

  getDay(createdAt: string): number {
    const date = new Date(createdAt);
    return date.getDay(); // Sunday = 0, Monday = 1, etc.
  }

   getValue(obj: { [x: string]: any; }, key: string) {
    return key in obj ? obj[key] : ""; // Efficiently check for key existence using "in"
  }


}
