import { ObjectId } from 'mongodb';
import { bookModel, bookModelType } from '../models';
import { BookInterface } from '../models/schemas/book';

class BookService {
  private Book: bookModelType;

  constructor(book: bookModelType) {
    this.Book = book;
  }

  async getBooks() {
    return await this.Book.find();
  }

  async getBookInfo(id: string) {
    return await this.Book.findOne({ id: new ObjectId(id) });
  }

  async addBook(book: BookInterface) {
    return await this.Book.create(book);
  }
  async dropBook(id: string) {
    return await this.Book.deleteOne({ id: new ObjectId(id) });
  }
  async editBook(id: string, book: BookInterface) {
    return await this.Book.findOneAndUpdate(
      { id: new ObjectId(id) },
      { $set: book }
    );
  }
}

const bookService = new BookService(bookModel);

export { bookService };
