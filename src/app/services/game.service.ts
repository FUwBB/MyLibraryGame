import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiKey = '6fc1088fc8ec4f82b83af23244d82f8c';  // Chave da API RAWG
  private apiUrl = `https://api.rawg.io/api/games?key=${this.apiKey}`;  // URL da API com chave

  constructor(private http: HttpClient) {}

  getGames(): Observable<any> {
    return this.http.get(this.apiUrl);  // Faz a requisição HTTP para buscar jogos
  }

  getGameDetails(gameId: number): Observable<any> {
    return this.http.get(`https://api.rawg.io/api/games/${gameId}?key=${this.apiKey}`);  // Detalhes de um jogo específico
  }
}
