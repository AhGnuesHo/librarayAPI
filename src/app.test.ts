const request = require('supertest');
import { app } from './app';
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
