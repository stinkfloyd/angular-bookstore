import { Injectable } from '@angular/core'
import { Book } from './book'
import { BOOKS } from './mock-books'
import { Observable, of } from 'rxjs'
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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

  /** GET books from the server */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksURL)
      .pipe(
        tap(_ => this.log('fetched books')),
        catchError(this.handleError('getBooks', []))
      );
  }

  /** GET book by id. Will 404 if id not found */
  getBook(id: number): Observable<Book> {
    const url = `${this.booksURL}/${id}`;
    return this.http.get<Book>(url)
      .pipe(
        tap(_ => this.log(`fetched book id=${id}`)),
        catchError(this.handleError<Book>(`getBook id=${id}`))
      );
  }

  /** PUT: update the book on the server */
  updateBook(book: Book): Observable<any> {
    const url = `${this.booksURL}/${book.id}`;
    return this.http.put(url, book, httpOptions)
      .pipe(
        tap(_ => this.log(`updated book id=${book.id}`)),
        catchError(this.handleError<any>('updateBook'))
      );
  }

  /** DELETE: delete the book from the server */
  deleteBook(book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksURL}/${id}`;

    return this.http.delete<Book>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted book id=${id}`)),
        catchError(this.handleError<Book>('deleteBook'))
      );
  }

  /** Log a BookService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
