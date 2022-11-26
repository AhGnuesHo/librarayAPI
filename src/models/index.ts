import { Model, model } from 'mongoose';
import { BookSchema, BookInterface } from './schemas/book';

interface ModelIdentifierInterface {
  book: string;
}

export const modelIdentifier: ModelIdentifierInterface = {
  book: 'book',
};

const bookModel = model<BookInterface>(modelIdentifier.book, BookSchema);

type bookModelType = Model<BookInterface>;

export { bookModel, bookModelType };
