import { Component, OnInit } from '@angular/core'
import { Book } from '../book'
import { BOOKS } from '../mock-books';
import { BookService } from '../book.service'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {

  books: Book[]

  book: Book = {
    id: 1,
    title: "Javascript for Dummies",
    subtitle: "Subtitle for Dummies",
    description: "It's a book",
    price: "500",
    website: "http://placekitten.com/200/300",
  };

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.bookService.getHeroes()
      .subscribe(books => this.books = books);
  }

}
