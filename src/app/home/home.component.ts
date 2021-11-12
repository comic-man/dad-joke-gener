import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JokeApiService } from '../joke-api.service';
import { JokeModel } from '../joke.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  id!: any;
  joke!: JokeModel;
  favoriteJokes: JokeModel[] = [];
  showFavorites = false;

  private dataURL =
    'https://dad-jokester-default-rtdb.firebaseio.com/jokes.json';

  constructor(private dadSrv: JokeApiService, private http: HttpClient) {}

  ngOnInit(): void {
    this.onRandomJoke();
  }

  onRandomJoke() {
    this.dadSrv.getDadJoke().subscribe((j) => {
      this.joke = j;
    });
  }

  onFavorite(joke: JokeModel) {
    return this.http.post(this.dataURL, joke).subscribe(() => {
      this.favoriteJokes.push(joke);
    });
  }

  fetchFavorites() {
    this.showFavorites = !this.showFavorites;
    return this.http
      .get<{ [key: string]: JokeModel }>(this.dataURL)
      .pipe(
        map((response) => {
          const jokeList = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              jokeList.push({ ...response[key], id: key });
            }
          }
          return jokeList;
        })
      )
      .subscribe((favJokes) => {
        this.favoriteJokes = favJokes;
      });
  }

  onDelete(id: string) {
    this.dadSrv.onClearJoke(id).subscribe(() => {
      this.fetchFavorites()
    })
  }

  hideFavorites() {
    this.showFavorites = !this.showFavorites
  }
}
