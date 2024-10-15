import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StuffService {

  constructor(
    private http: HttpClient
  ) { }


  getNews(): Observable<any> {
    return this.http.get(environment.newsAPI)
  }
}
