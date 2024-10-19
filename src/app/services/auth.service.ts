import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  private loggedIn = new BehaviorSubject<boolean>(false);

  private usernameSubject = new BehaviorSubject<string | null>(localStorage.getItem('userName'));
  username$ = this.usernameSubject.asObservable();

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(email: string, username: string): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email.toLowerCase());
    localStorage.setItem('userName', username);
    this.usernameSubject.next(username);
    this.loggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('profileImg')
    this.usernameSubject.next(null);
    this.loggedIn.next(false);
  }
  checkLoginStatus(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
