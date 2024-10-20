import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database, getDatabase, push, ref } from '@angular/fire/database';
import { map, Observable, switchMap } from 'rxjs';
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
  constructor(private http: HttpClient) { }


  accounts: any;


  getUsers(): Observable<{ [key: string]: any }> {
    return this.http.get<{ [key: string]: any }>(`${environment.firebaseAPI}`);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(`https://mrnzd-d0f4d-default-rtdb.firebaseio.com/users/1/${id}.json?auth=AIzaSyCeiiz12sJ7tWxLukXwCy7C-hGhEadhGMs`)
  }

  uploadImage(id: any, image: any): Observable<any> {

    return this.http.patch(`https://mrnzd-d0f4d-default-rtdb.firebaseio.com/users/1/${id}.json?auth=AIzaSyCeiiz12sJ7tWxLukXwCy7C-hGhEadhGMs`, image)
  }

  deleteImage(id: any, image: any): Observable<any> {

    return this.http.patch(`https://mrnzd-d0f4d-default-rtdb.firebaseio.com/users/1/${id}.json?auth=AIzaSyCeiiz12sJ7tWxLukXwCy7C-hGhEadhGMs`, image)
  }

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

  getAllUsers(): Observable<{ id: string;[key: string]: any }[]> {
    return this.http.get<{ [key: string]: any }>(`${environment.firebaseAPI}`).pipe(
      map(data => {
        // Convert the object to an array including the IDs
        return Object.entries(data).map(([id, user]) => ({ id, ...user }));
      })
    );
  }

  sendFriendReq(id: any, userWithFriendReq: any): Observable<any> {
    return this.http.put(`https://mrnzd-d0f4d-default-rtdb.firebaseio.com/users/1/${id}.json?auth=AIzaSyCeiiz12sJ7tWxLukXwCy7C-hGhEadhGMs`, userWithFriendReq)
  }

  acceptFriendReq(userId: any, userWithAcceptedFriend: any): Observable<any> {

        return this.http.put<any>(`https://mrnzd-d0f4d-default-rtdb.firebaseio.com/users/1/${userId}.json?auth=AIzaSyCeiiz12sJ7tWxLukXwCy7C-hGhEadhGMs`, userWithAcceptedFriend);

  }


  // getData(path: string) {
  //   const dbRef = ref(this.db);
  //   return get(child(dbRef, path))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         return snapshot.val();
  //       } else {
  //         console.log('No data available');
  //         return null;
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error getting data:', error);
  //       return null;
  //     });
  // }

  /****FIREBASE LOGIN CONNECTION*****/
  // login(email: string, password: string) {
  //   return signInWithEmailAndPassword(this.auth, email, password)
  //     .then((userCredential) => {
  //       console.log('Login successful:', userCredential);
  //       return userCredential.user
  //     })
  //     .catch((error) => {
  //       console.error('Login failed:', error);
  //       return null;
  //     });
  // }
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

  signUp(user: any): Observable<any> {


    return this.http.post(environment.firebaseAPI, user);
  }
  // signUp(username: string, email: string, password: string) {
  //   const db = getDatabase();
  //   const userRef = ref(db, 'users');

  //   return push(userRef, {
  //     username: username,
  //     email: email,
  //     password: password
  //   })
  //     .then(() => {
  //       console.log('User data saved successfully.');
  //     })
  //     .catch((error) => {
  //       console.error('Error saving user data:', error);
  //     });
  // }
}