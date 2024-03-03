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

}
