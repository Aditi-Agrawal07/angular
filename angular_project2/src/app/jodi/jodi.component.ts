import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiCallingService } from '../api-calling.service';

@Component({
  selector: 'app-jodi',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
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
    console.log("hello from jodi");
    this.getMarketList()
    this.getJodiResult(this.cardItem);
   
  }

  getMarketList(){
    this.apiCalling.getProducts().subscribe((response:any)=>{
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
    this.apiCalling.getResults(cardItem).subscribe((response) => {
      this.jodiResult = response.data;
      this.processData(this.jodiResult); // Call function to process the data
    });
  }

  processData(data: any[]) {
    console.log(data)
    const sortedData = data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    

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

 

}
