import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IpData} from '../models/ip-data.model';

@Injectable({
  providedIn: 'root'
})
export class IpDataService {

  constructor(private http : HttpClient) { }


  public getIpData(ipAddress?: string): Observable<IpData> {
    const url = ipAddress ? `https://ipwho.is/${ipAddress}` : 'https://ipwho.is/';
    return this.http.get<IpData>(url);
  }

  public getClientIp(): Observable<{ ip: string }> {
    return this.http.get<{ ip: string }>('https://api.ipify.org?format=json');
  }

}
