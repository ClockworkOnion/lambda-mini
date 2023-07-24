import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { queryInterface } from './interfaces/query';
import { streamProperty } from './interfaces/streamProperty';

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

      let dbStatus: string =
        response?.status === 200
          ? 'ChronicleDB showed status OK (200).'
          : 'ChronicleDB had a problem: Status code ' + response?.status + '.';

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
        console.log(response?.status);
      }
      console.log(response?.body);

      return response?.body?.toString() || dbStatus + '\nNo streams present.';
    } catch (error) {
      console.error(error);
      return 'Unable to reach ChronicleDB';
    }
  }

  public async getStreamSchema(streamName: string): Promise<string> {
    try {
      const response = await this.http
        .get('/api/chronicledb/streams/' + streamName, { observe: 'response' })
        .toPromise();
      return (
        JSON.stringify(response?.body, null, 2) || 'Failed to get stream schema'
      );
    } catch (error) {
      console.error(error);
      return 'Failed to get stream schema';
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
      const errorResponse: HttpErrorResponse = error as HttpErrorResponse;
      return errorResponse.status.toString();
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
      const errorResponse: HttpErrorResponse = error as HttpErrorResponse;
      return errorResponse.status.toString();
    }
  }

  public async insertElements(body: string): Promise<string> {
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const response = await this.http
        .post('/api/chronicledb/insert', body, { headers, observe: 'response' })
        .toPromise();
      console.log(response?.status);
      return response?.status.toString() || 'Failed to insert elements';
    } catch (error) {
      const errorResponse: HttpErrorResponse = error as HttpErrorResponse;
      return errorResponse.status.toString();
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

      if (JSON.stringify(response?.body) === '{}') {
        console.log('Response has an empty body');
      }

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
      const errorResponse: HttpErrorResponse = error as HttpErrorResponse;
      return errorResponse.status.toString();
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
    // const urlPostfix: string = `${query}?startTime=${startTimestamp}&endTime=${endTimestamp}`;
    const body: string = `{"startTime":${startTimestamp},"endTime":${endTimestamp}}}`;
    console.log(body);
    const urlPostfix: string = `${query}`;
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

  static JSONtoStreamInterface(json: string): streamProperty[] {
    const jsonObject = JSON.parse(json);
    const streams: streamProperty[] = Object.keys(jsonObject).map((key) => ({
      name: key,
      type: jsonObject[key],
    }));
    return streams;
  }

  //#endregion
}
