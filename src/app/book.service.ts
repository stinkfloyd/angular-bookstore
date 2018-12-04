import { Injectable } from '@angular/core'
import { Book } from './book'
import { BOOKS } from './mock-books'
import { Observable, of } from 'rxjs'
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Book[]> {
    // TODO: send the message _after_ fetching the books
    this.messageService.add('BookService: fetched books');
    return of(BOOKS);
  }
}
