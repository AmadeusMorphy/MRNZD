import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor() {}

  checkLoginStatus(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  login(email: string): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email.toLowerCase());
    this.loggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    this.loggedInSubject.next(false);
  }
}
