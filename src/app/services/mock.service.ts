import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor( private http: HttpClient) { }

  btnclickCheck() {
    return this.http.get('https://v2.jokeapi.dev/joke/Any')
    .pipe(
      map(response => response)
    );
  }
}
