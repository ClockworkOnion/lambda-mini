import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { queryInterface } from './interfaces/query';

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

  //#region Streams

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
      );
    } catch (error) {
      console.error(error);
      return 'Failed to get streams';
    }
  }

  public async createStream(json: string): Promise<string> {
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      console.log(json);
      const response = await this.http
        .post('/api/chronicledb/streams', json, {
          headers,
          observe: 'response',
        })
        .toPromise();
      console.log(response?.headers);
      return response?.status.toString() || 'Failed to create stream';
    } catch (error) {
      return 'Failed to create stream';
    }
  }

  public async deleteStream(streamName: string): Promise<string> {
    try {
      const response = await this.http
        .delete('/api/chronicledb/streams/' + streamName, {
          observe: 'response',
        })
        .toPromise();
      console.log(response?.headers);
      return response?.status.toString() || 'Failed to delete stream';
    } catch (error) {
      return 'Failed to delete stream';
    }
  }

  //#endregion

  //#region Queries

  public async getQueries(): Promise<string> {
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const response = await this.http
        .get('/api/chronicledb/queries/registered', {
          headers,
          observe: 'response',
        })
        .toPromise();
      return JSON.stringify(response?.body) || 'Failed to get queries';
    } catch (error) {
      return 'Failed to get queries';
    }
  }

  public async registerQuery(body: string): Promise<string> {
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const response = await this.http
        .post('/api/chronicledb/queries/registered/', body, {
          headers,
          observe: 'response',
        })
        .toPromise();
      return response?.status.toString() || 'Failed to register query';
    } catch (error) {
      return 'Failed to register query';
    }
  }

  public async deleteQuery(queryId: string): Promise<string> {
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const response = await this.http
        .delete('/api/chronicledb/queries/registered/' + queryId, {
          observe: 'response',
        })
        .toPromise();
      return response?.status.toString() || 'Failed to delete query';
    } catch (error) {
      return 'Failed to delete query';
    }
  }

  public async getSchema(query: string): Promise<string> {
    const body: string = `{"query": "${query}"}`;
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const response = await this.http
        .post('/api/chronicledb/queries/schema', body, {
          headers,
          observe: 'response',
        })
        .toPromise();
      return JSON.stringify(response?.body, null, 2) || 'Failed to get schema';
    } catch (error) {}
    return 'Failed to get schema';
  }

  public async evaluateQuery(
    query: string,
    startTimestamp: number,
    endTimestamp: number
  ): Promise<string> {
    const body: string = '';
    const urlPostfix: string = `${query}?startTime=${startTimestamp}&endTime=${endTimestamp}`;
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const response = await this.http
        .post('/api/chronicledb/queries/registered/' + urlPostfix, body, {
          headers,
          observe: 'response',
        })
        .toPromise();
      return JSON.stringify(response?.body, null, 2) || 'Failed to evaluate';
    } catch (error) {}
    return 'Failed to evaluate';
  }

  static JSONtoQueryInterface(json: string): queryInterface[] {
    const jsonObject = JSON.parse(json);
    const queries: queryInterface[] = Object.keys(jsonObject).map((key) => ({
      queryId: key,
      query: jsonObject[key],
    }));
    return queries;
  }

  //#endregion
}
