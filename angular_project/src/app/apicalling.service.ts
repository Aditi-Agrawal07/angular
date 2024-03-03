import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApicallingService {

  constructor(private httpClient:HttpClient) { 


  }

  getProducts(): Observable<any> {
    return this.httpClient.get("http://mobile.kalyanam.online/api/market")
  }

  downloadFile(fileId: string): void {
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
    this.httpClient.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob([response]));
      downloadLink.setAttribute('download', 'filename.apk'); // Set your desired filename here
      downloadLink.setAttribute('rel', 'noopener'); 
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }
}
