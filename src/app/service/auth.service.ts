import {Injectable} from '@angular/core';
import {API_URL} from './config';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ERole, UserCreateDto, UserLoginDto} from '../models/user.model';
import {JwtPayload, JwtTokenDto} from '../models/auth.model';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiurl = API_URL + '/auth';
  private USER_JWT_TOKEN_KEY = 'USER_JWT_TOKEN_KEY';
  private jwtHelper = new JwtHelperService();
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!this.getCurrentSession());
  public authStateChanged = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  public login(userLoginDto: UserLoginDto): Observable<JwtTokenDto> {
    console.log('Login request payload:', userLoginDto);
    return this.http.post<UserLoginDto>(`${this.apiurl}/login`, userLoginDto).pipe(
      tap((response: any) => {
        this.setCurrentToken(response);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  public register(userCreateDto: UserCreateDto): Observable<JwtTokenDto> {
    return this.http.post<JwtTokenDto>(`${this.apiurl}/register`, userCreateDto);

  }

  public logout() {
    localStorage.removeItem(this.USER_JWT_TOKEN_KEY);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  public getCurrentSession(): JwtPayload | null {
    const userJwtToken = localStorage.getItem(this.USER_JWT_TOKEN_KEY);
    return userJwtToken && !this.jwtHelper.isTokenExpired(userJwtToken)
      ? this.jwtHelper.decodeToken(userJwtToken) : null;
  }

  public getCurrentToken(): JwtTokenDto | null {
    const userJwtToken = localStorage.getItem(this.USER_JWT_TOKEN_KEY);
    return userJwtToken && !this.jwtHelper.isTokenExpired(userJwtToken)
      ? JSON.parse(userJwtToken) : null;
  }


  public isLoggedIn(): boolean {
    return this.getCurrentSession() != null;
  }

  private setCurrentToken(loginStatus: JwtTokenDto) {
    const userJwtTokenString = JSON.stringify(loginStatus);
    localStorage.setItem(this.USER_JWT_TOKEN_KEY, userJwtTokenString);
  }


  public hasRole(role: ERole): boolean {
    const currentSession = this.getCurrentSession();
    return currentSession !== null && currentSession.role === role;
  }


}
