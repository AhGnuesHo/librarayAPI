const request = require('supertest');
import { app } from '../app';

describe('전체 책 조회', () => {
  test('get All Books', (done) => {
    request(app)
      .get('/api/book')
      .then((res: Response) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});

describe('단일 책 조회', () => {
  test('get Book', (done) => {
    request(app)
      .get('/api/book/636087e1fc13ae19890000db')
      .then((res: Response) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});

describe('책 등록', () => {
  test('new Book', (done) => {
    request(app)
      .post('/api/book')
      .send({
        _id: '636087e1fc13ae19890000c8',
        name: '테스트 ',
        author: 'seungha',
        country: 'korea',
        gender: 'feMale',
        year: '2009',
        ISBN: '029303844-9',
        price: '$80.98',
      })
      .then((res: Response) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
