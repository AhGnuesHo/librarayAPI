import { ObjectId } from 'mongodb';
import { bookModelType, bookModel } from '../models';
import { BookService } from './bookService';

export class RentService extends BookService {
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

const rentService = new RentService(bookModel);
export { rentService };
