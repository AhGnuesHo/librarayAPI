import dotenv from 'dotenv';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

if (process.env.MONGODB_URI === undefined) {
  throw new Error('MONGODB_URI 환경변수가 필요합니다.');
}

const port = parseInt(process.env.PORT ?? '8080', 10);
const mongoDBUri = process.env.MONGODB_URI;

export { port, mongoDBUri };
