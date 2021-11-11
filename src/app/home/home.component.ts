import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JokeApiService } from '../joke-api.service';
import { JokeModel } from '../joke.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  joke!: JokeModel;
  favoriteJokes: JokeModel[] = [];

  constructor(private dadSrv: JokeApiService, private http: HttpClient) { }

  ngOnInit(): void {
    this.onRandomJoke();
  }

  onRandomJoke() {
    this.dadSrv.getDadJoke().subscribe(j => {
      this.joke = j
    })
  }

  onFavorite(joke: JokeModel) {
    this.storeDadJoke(joke).subscribe(j => {
      this.favoriteJokes.push(<JokeModel>j)
      console.log(j)
    })
  }

  private storeDadJoke(joke: JokeModel) {
    const favJokes = this.favoriteJokes;
    return this.http.put(
      'https://dad-jokester-default-rtdb.firebaseio.com/jokes.json',
      favJokes
    );
  }

}
