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

  protected async isRent(id: string): Promise<boolean> {
    return await JSON.parse(JSON.stringify(await this.getBookInfo(id))).isRent;
  }
}

class RentService extends BookService {
  constructor(book: bookModelType) {
    super(book);
  }
  async rent(id: string) {
    return await this.bookHandler(id, true);
  }
  async return(id: string) {
    return await this.bookHandler(id, false);
  }

  async bookHandler(id: string, status: boolean) {
    const isRent = await this.isRent(id);

    if (status === true && isRent == true) {
      throw new Error('대여중입니다.');
    } else if (status === false && isRent == false) {
      throw new Error('대출 기록이 없습니다.');
    }

    return await this.Book.findOneAndUpdate(
      { id: new ObjectId(id) },
      { isRent: status }
    );
  }
}

const bookService = new BookService(bookModel);
const rentService = new RentService(bookModel);

export { bookService, rentService };
