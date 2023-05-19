import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public sampleString(): String {
    return 'a string';
  }

  public async getStatus(): Promise<string> {
    try {
      const response = await this.http
        .get('/api/chronicledb', { observe: 'response' })
        .toPromise();
      return response?.status.toString() || 'Failed to get status';
    } catch (error) {
      console.error(error);
      return 'Failed to get status';
    }
  }

  public async getStreamNames(): Promise<string> {
    try {
      const response = await this.http
        .get('/api/chronicledb/streams', { observe: 'response' })
        .toPromise();
      console.log(response?.headers);

      // See if there's a body?
      if (response?.body === '') {
        // Response has an empty body
        console.log('Response has an empty body');
      } else if (!response?.body) {
        // Response has no body
        console.log('Response has no body');
      } else {
        // Response has a non-empty body
        console.log('Response has a non-empty body');
      }
      console.log(response?.body);

      return (
        response?.body?.toString() ||
        'Failed to get streams (or no streams present?)'
      ); // Does the reponse return an empty body, or is it a response without a body?
    } catch (error) {
      console.error(error);
      return 'Failed to get streams';
    }
  }
}
