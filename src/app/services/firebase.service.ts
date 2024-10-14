import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Database, ref, get, child, getDatabase, push } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: Database, private auth: Auth) {}

  // Method to get data from a specific path in the Realtime Database
  getData(path: string) {
    const dbRef = ref(this.db);
    return get(child(dbRef, path))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val(); // Return the data
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
        return userCredential.user; // Return the authenticated user
      })
      .catch((error) => {
        console.error('Login failed:', error);
        return null;
      });
  }

  

  postData(username: string, email: string, password: string) {
    const db = getDatabase();
    const userRef = ref(db, 'users'); // Change 'users' to your desired path
  
    // Use push to add a new user entry with a unique key
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