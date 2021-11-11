import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JokeModel } from './joke.model';

@Injectable({
  providedIn: 'root',
})
export class JokeApiService {

  constructor(private http: HttpClient) {}

  getDadJoke() {
    return this.http.get<JokeModel>('https://icanhazdadjoke.com/', {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    });
  }


}
