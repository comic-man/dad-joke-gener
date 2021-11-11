import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JokeModel } from './joke.model';

@Injectable({
  providedIn: 'root',
})
export class JokeApiService {
  dataURL = 'https://icanhazdadjoke.com/jokes.json'

  constructor(private http: HttpClient) {}

  getDadJoke() {
    return this.http.get<JokeModel>('https://icanhazdadjoke.com/', {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    });
  }

  onClearJoke(id: string) {
    return this.http.delete<JokeModel>('https://icanhazdadjoke.com/jokes' + id + '.json')
  }

}
