import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../interfaces/user.interface';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthenticated: BehaviorSubject<boolean>;
  private userSubject: BehaviorSubject<User>;
  private user: Observable<User>;
  private token: string = '';

  constructor(
    protected httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.isAuthenticated = new BehaviorSubject<boolean>(null as any);
    this.loadToken();
    this.userSubject = new BehaviorSubject<User>(null as any);
    this.user = this.userSubject.asObservable();
  }

  public login(login: String, password: String) {
    const formData: FormData = new FormData();
    formData.append('login', login.valueOf());
    formData.append('password', password.valueOf());
    return this.httpClient.post<any>(
      `${environment.apiURL}/user/login`,
      formData,
      { withCredentials: true }
    );
  }

  public loadToken() {
    const token = this.getStoredToken();
    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  private getStoredToken(): String {
    if (this.getToken() === null) {
      this.token = this.localStorageService.get('token') ?? '';
    }
    return this.getToken();
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string): void {
    this.token = token;
  }
}
