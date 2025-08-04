const app = require('../app');
const request = require('supertest');

describe('API tests for /api/enroll', () => {
    it('GET /api/courses should respond with an 500', async () => {
        const id = null
        const res = await request(app).get(`/api/enroll/my-courses/${id}`);
        expect(res.statusCode).toBe(500);
    });

    it('GET /api/courses should respond with an 200', async () => {
        const id = 6
        const res = await request(app).get(`/api/enroll/my-courses/${id}`);
        expect(res.statusCode).toBe(200);
    });

    it('DELETE /api/courses should respond with an 200', async () => {
        const id = 70
        const res = await request(app).delete(`/api/enroll/${id}`);
        expect(res.statusCode).toBe(200);
    });



});
