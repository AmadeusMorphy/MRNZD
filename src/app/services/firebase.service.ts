import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Database, ref, get, child, getDatabase, push } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: Database, private auth: Auth, private http: HttpClient) { }


  MRNZDapi = 'https://mrnzd-d0f4d-default-rtdb.firebaseio.com/users.json?auth=AIzaSyCeiiz12sJ7tWxLukXwCy7C-hGhEadhGMs'

  getApi(): Observable<any> {
    return this.http.get(`${this.MRNZDapi}`);
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