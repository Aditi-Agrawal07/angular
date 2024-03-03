import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ApicallingService } from './apicalling.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule,CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_project';
  constructor(private ApiCalling: ApicallingService){}

  downloadApk(): void {
    const fileId = '1lSNtBZHHHrUMpIvPs8odIwugwE3hmBN_'; // Replace with your actual file ID
    this.ApiCalling.downloadFile(fileId);
  }
}
