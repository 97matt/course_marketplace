const app = require('../app');
const request = require('supertest');

describe('API tests for /api/courses', () => {
    let token;
    beforeAll(async () => {
        const loginRes = await request(app)
            .post('/api/users/login')
            .send({
                user_name: 'profesor',
                user_password: 'profesor'
            });
        token = loginRes.body.token;

        if (!token) {
            throw new Error('No se pudo obtener el token. Verifica las credenciales.');
        }
    });
    it('GET /api/courses should respond with an array', async () => {
        const res = await request(app).get('/api/courses');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });


    it('GET /api/courses/professor/${id} should respond with an array', async () => {
        const id = 8;
        const res = await request(app).get(`/api/courses/professor/${id}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /api/courses should respond with an object', async () => {
        const course = {
            course_title: 'this is the title',
            course_categor: 'category',
            course_description: 'this is a description',
            course_price: 1000,
            course_start_date: "2025-08-01T12:34:56.789Z",
            course_img: 'image link',
            course_professor_id: 8,
            course_professor_rol: 'professor'
        };
        const res = await request(app).post('/api/courses/').send(course);
        expect(res.statusCode).toBe(201);
        expect(typeof res.body).toBe('object');
        expect(res.body).toHaveProperty('course_id');
    });
});
