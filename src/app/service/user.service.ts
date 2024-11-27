import { Injectable } from '@angular/core';
import { API_URL } from './config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserDto, UserDtoList} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiurl = API_URL + '/user';

  constructor(private http: HttpClient) { }

  public getUserById(userId: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiurl}/${userId}`);
  }


  public getMyInfos(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiurl}/myinfos`);
  }

  public searchUsers(term: string): Observable<UserDtoList[]> {
    return this.http.get<UserDtoList[]>(`${this.apiurl}/search?term=${term}`);
  }

}
