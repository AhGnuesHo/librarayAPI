import { Schema, ObjectId } from 'mongoose';

export interface BookInterface {
  id: ObjectId;
  name: string;
  author: string;
  country: string;
  gender: string;
  year: string;
  ISBN: string;
  price: string;
  isRent: boolean;
}

export const BookSchema = new Schema<BookInterface>(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    isRent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
