const app = require('../../src/app');
const request = require('supertest');
const connection = require('../../src/Database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async() => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "ONGzinha",
                email: "contato@gmail.com",
                whatsapp: "31986572072",
                city: "Mariana",
                uf: "MG"
            })

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});