import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private apiKey = '07e212b596f4d86660edc8ec7846c0ae';
  private apiUrl = 'https://api.imgbb.com/1/upload';

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(`${this.apiUrl}?key=${this.apiKey}`, formData);
  }


}