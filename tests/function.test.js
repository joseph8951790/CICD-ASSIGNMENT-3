const { default: functionHandler } = require('../src/index');

describe('Azure Function Tests', () => {
    let context;
    let req;
    let res;

    beforeEach(() => {
        context = {
            log: jest.fn(),
            res: {}
        };
        req = {
            query: {},
            body: {}
        };
    });

    test('should return Hello World when no name is provided', async () => {
        await functionHandler(context, req);
        expect(context.res.status).toBe(200);
        expect(context.res.body).toBe('Hello, World!');
    });

    test('should return personalized greeting when name is provided in query', async () => {
        req.query.name = 'John';
        await functionHandler(context, req);
        expect(context.res.status).toBe(200);
        expect(context.res.body).toBe('Hello, John!');
    });

    test('should return personalized greeting when name is provided in body', async () => {
        req.body.name = 'Jane';
        await functionHandler(context, req);
        expect(context.res.status).toBe(200);
        expect(context.res.body).toBe('Hello, Jane!');
    });
}); 