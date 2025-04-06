const httpFunction = require('../src/index');
const context = require('./testContext');

test('HTTP trigger should return "Hello, World!" when no name is provided', async () => {
    const request = {
        query: {},
        body: {}
    };

    await httpFunction(context, request);

    expect(context.res.status).toBe(200);
    expect(context.res.body).toBe('Hello, World!');
});

test('HTTP trigger should return "Hello, Name!" when name is provided in query', async () => {
    const request = {
        query: { name: 'John' },
        body: {}
    };

    await httpFunction(context, request);

    expect(context.res.status).toBe(200);
    expect(context.res.body).toBe('Hello, John!');
});

test('HTTP trigger should return "Hello, Name!" when name is provided in body', async () => {
    const request = {
        query: {},
        body: { name: 'Jane' }
    };

    await httpFunction(context, request);

    expect(context.res.status).toBe(200);
    expect(context.res.body).toBe('Hello, Jane!');
}); 