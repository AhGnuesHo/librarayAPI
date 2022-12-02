import { ObjectId } from 'mongodb';
import { bookModel, bookModelType } from '../models';
import { BookInterface } from '../models/schemas/book';

export class BookService {
  protected Book: bookModelType;

  constructor(protected book: bookModelType) {
    this.Book = book;
  }

  public async getBooks() {
    return await this.Book.find();
  }

  public async getBookInfo(_id: string) {
    return await this.Book.findOne({ _id });
  }

  public async addBook(book: BookInterface) {
    return await this.Book.create(book);
  }
  public async dropBook(_id: string) {
    return await this.Book.deleteOne({ _id });
  }

  public async editBook(_id: string, book: BookInterface) {
    return await this.Book.findOneAndUpdate({ _id }, { $set: book });
  }

  protected async isRent(id: string): Promise<boolean> {
    return await JSON.parse(JSON.stringify(await this.getBookInfo(id))).isRent;
  }
}

const bookService = new BookService(bookModel);

export { bookService };
