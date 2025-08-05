const app = require('../app');
const request = require('supertest');

describe('API tests for /api/enroll', () => {
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

    it('GET /api/enroll/my-courses/:id con id inválido', async () => {
        const id = 'novalido';
        const res = await request(app)
            .get(`/api/enroll/my-courses/${id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(500);
    });

    it('GET /api/enroll/my-courses/:id con id válido', async () => {
        const id = 6;
        const res = await request(app)
            .get(`/api/enroll/my-courses/${id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    it('DELETE /api/enroll/:id', async () => {
        const id = 70;
        const res = await request(app)
            .delete(`/api/enroll/${id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });
});
