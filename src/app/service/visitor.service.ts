import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {API_URL} from './config';
import {IpDataService} from "./ip-data.service";
import {IpData} from "../models/ip-data.model";

@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  private apiUrl = API_URL+'/visitor'; //

  constructor(private http: HttpClient, private ipDataService : IpDataService) {
  }

  logVisit(): Observable<string> {
    return this.ipDataService.getIpData().pipe(
        switchMap((ipData: IpData) => {
          const ip = ipData.ip;
          return this.http.post<string>(`${this.apiUrl}/log`, { ip });
        })
    );
  }


  getTodayVisitors(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/today`);
  }

  getVisitsSince(date: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/since?date=${date}`);
  }

  getVisitsDailySince(date: string): Observable<{ totalVisits: number; dailyVisits: { date: string; count: number }[] }> {
    return this.http.get<{ totalVisits: number; dailyVisits: { date: string; count: number }[] }>(
        `${this.apiUrl}/since-daily?date=${date}`
    );
  }


}
