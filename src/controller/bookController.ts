import { BookInterface } from './../models/schemas/book';

import { bookService } from '../services';
import { AsyncRequestHandler } from '../types';

interface bookControllerInterface {
  getBooks: AsyncRequestHandler;
  getBookInfo: AsyncRequestHandler;
  addBook: AsyncRequestHandler;
  dropBook: AsyncRequestHandler;
  editBook: AsyncRequestHandler;
}

export const bookController: bookControllerInterface = {
  async getBooks(req, res) {
    const bookList = await bookService.getBooks();
    res.json(bookList);
  },
  async getBookInfo(req, res) {
    const book = await bookService.getBookInfo(req.params.id);
    res.json(book);
  },

  async addBook(req, res) {
    const newBook = await bookService.addBook(req.body);
    res.json(newBook);
  },
  async dropBook(req, res) {
    const book = await bookService.dropBook(req.params.id);
    res.json(book);
  },
  async editBook(req, res) {
    const id = req.params.id;
    const newInfo: BookInterface = req.body;
    const editedBook = await bookService.editBook(id, newInfo);
    res.json(editedBook);
  },
};
