import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(email: string, username: string): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email.toLowerCase());
    localStorage.setItem('userName', username);
    this.loggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    this.loggedIn.next(false);
  }
  checkLoginStatus(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
