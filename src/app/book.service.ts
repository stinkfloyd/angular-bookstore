import { Injectable } from '@angular/core'
import { Book } from './book'
import { BOOKS } from './mock-books'
import { Observable, of } from 'rxjs'
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})

export class BookService {

  private booksURL = 'http://localhost:8082/api/books';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksURL)
  }

  getBook(id: number): Observable<Book> {
    // TODO: send the message _after_ fetching the book
    this.messageService.add(`BookService: fetched book id=${id}`);
    return of(BOOKS.find(book => book.id === id));
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
