import { ObjectId } from 'mongodb';
import { bookModel, bookModelType } from '../models';
import { BookInterface } from '../models/schemas/book';

class BookService {
  protected Book: bookModelType;

  constructor(book: bookModelType) {
    this.Book = book;
  }

  public async getBooks() {
    return await this.Book.find();
  }

  public async getBookInfo(id: string) {
    return await this.Book.findOne({ id: new ObjectId(id) });
  }

  public async addBook(book: BookInterface) {
    return await this.Book.create(book);
  }
  public async dropBook(id: string) {
    return await this.Book.deleteOne({ id: new ObjectId(id) });
  }

  public async editBook(id: string, book: BookInterface) {
    return await this.Book.findOneAndUpdate(
      { id: new ObjectId(id) },
      { $set: book }
    );
  }
}

class RentService extends BookService {
  constructor(book: bookModelType) {
    super(book);
  }
  async rent(id: string) {
    const isRent = JSON.parse(
      JSON.stringify(await this.getBookInfo(id))
    ).isRent;
    if (isRent) {
      throw new Error('대여중입니다.');
    }

    return await this.Book.findOneAndUpdate(
      { id: new ObjectId(id) },
      { isRent: true }
    );
  }
}

const bookService = new BookService(bookModel);
const rentService = new RentService(bookModel);

export { bookService, rentService };
