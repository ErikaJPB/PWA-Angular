import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private _http: HttpClient) {}

  /**
   * Method to get a random phrase from an API
   * @returns {Observable<any>} An observable with the random phrase in Json format
   *
   */
  getRandomPhrase() {
    return this._http.get('https://api.quotable.io/random');
  }
}
