import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallingService {


  constructor(private httpClient:HttpClient) { 


  }

  getProducts(): Observable<any> {
    return this.httpClient.get("https://mobile.kalyanam.online/api/market")
  }
  getResults(marketId:string):Observable<any>{
    return this.httpClient.get(`https://mobile.kalyanam.online/api/public/result/market-result-history/${marketId}`)
  }

}
