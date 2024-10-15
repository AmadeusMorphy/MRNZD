import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Database, ref, get, child, getDatabase, push, object } from '@angular/fire/database';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


interface User {
  email: string;
  password: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: Database, private auth: Auth, private http: HttpClient) { }


accounts: any;

  getApi(): Observable<any> {
    this.http.get(`${environment.firebaseAPI}`).subscribe(
      (res: any) => {

        this.accounts = Object.values(res).map((item: any) => {
          return {
            email: item.email,
            username: item.username,
            password: item.password
          }
        })
      }
    )
    return this.http.get(`${environment.firebaseAPI}`);
  }

  getData(path: string) {
    const dbRef = ref(this.db);
    return get(child(dbRef, path))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log('No data available');
          return null;
        }
      })
      .catch((error) => {
        console.error('Error getting data:', error);
        return null;
      });
  }

  /****FIREBASE LOGIN CONNECTION*****/
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('Login successful:', userCredential);
        return userCredential.user
      })
      .catch((error) => {
        console.error('Login failed:', error);
        return null;
      });
  }
  /********************************* */


/***********FIREBASE REST API LOGGING IN****************/
  signin(email: string, password: string): Observable<User | null> {
    return this.http.get<{ [key: string]: User }>(environment.firebaseAPI).pipe(
      map((users) => {
        const user = Object.values(users).find(
          (user) => user.email === email && user.password === password
        );
        return user || null;
      })
    );
  }
/********************************************************** */

  postData(username: string, email: string, password: string) {
    const db = getDatabase();
    const userRef = ref(db, 'users');

    return push(userRef, {
      username: username,
      email: email,
      password: password
    })
      .then(() => {
        console.log('User data saved successfully.');
      })
      .catch((error) => {
        console.error('Error saving user data:', error);
      });
  }
}