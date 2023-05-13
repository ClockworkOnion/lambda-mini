import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public sampleString(): String {
    return 'a string';
  }

  public getJepcStatus(): Observable<any> {
    return this.http.get('/api/jepc');
  }
}
