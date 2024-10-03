require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const fs = require('fs');
const path = require('path');
// GraphQL implementation
const { graphqlHTTP } = require('koa-graphql');
const { buildSchema } = require('graphql');
// OpenApi implementation
const { koaSwagger } = require('koa2-swagger-ui');
const { initialize } = require('koa-openapi');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Initialize App
const app = new Koa();
const router = new Router();

// DB File
const DATA_FILE = path.join(__dirname, `${process.env.DATA_FILE}`);
// OpenApi Yaml File
const openapiSpec = YAML.load(path.join(__dirname, `${process.env.OPENAPI_YAML}`));

// Read DB File
const readData = () => {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

// Write in DB file
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4));
};

// Request Body Middleware & CORS enabling
app.use(bodyParser());
app.use(cors());

// Enable Documentation in OpenApi
initialize({
    apiDoc: openapiSpec,
    paths: path.resolve(__dirname, './routes'),
    app,
    router,
});

app.use(
    router.get('/docs', async (ctx) => {
        ctx.status = 302;
        ctx.redirect('/swagger');
    }).routes()
);

// Get App Version from Configuration
router.get('/appversion', (ctx) => {
    ctx.body = { "version": `${process.env.APP_VERSION}` };
});

// Get User welcome
router.get('/user-welcome', (ctx) => {
    ctx.body = { "name": `${process.env.APP_VERSION}` };
});

// List all the providers
router.get('/providers', (ctx) => {
    const providers = readData();
    ctx.body = {
        items: providers,
        total: providers.length
    };
});

// Get provider information by id
router.get('/provider/:id', (ctx) => {
    const providers = readData();
    const id = ctx.params.id;
    const provider = providers.find(p => p.id === id);
    if (provider) {
        ctx.body = provider;
    } else {
        ctx.status = 404;
        ctx.body = { error: 'Provider not found' };
    }
});

// Update provider information by id
router.patch('/provider/:id', (ctx) => {
    const providers = readData();
    const id = ctx.params.id;
    const provider = providers.find(p => p.id === id);
    if (provider) {
        const { name, trade_name, address } = ctx.request.body;
        if (name) provider.name = name;
        if (trade_name) provider.trade_name = trade_name;
        if (address) provider.address = address;
        writeData(providers);
        ctx.body = provider;
    } else {
        ctx.status = 404;
        ctx.body = { error: 'Provider not found' };
    }
});

// Create new Provider
router.post('/provider', (ctx) => {
    const providers = readData();
    const saveMe = ctx.request.body;
    const provider = providers.find(p => p.trade_name === saveMe.trade_name);
    if (!provider) {
        let nextId = 0;
        if (providers.length > 0) {
            const sortedProviders = providers.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
            nextId = parseInt(sortedProviders[sortedProviders.length - 1].id) + 1;
        }
        saveMe.id = `${nextId}`;
        providers.push(saveMe);
        writeData(providers);
        ctx.body = saveMe;
    } else {
        ctx.status = 409;
        ctx.body = { error: `There is a Provider registered with the same Trade Name` };
    }
});

// Delete provider by id
router.delete('/provider/:id', (ctx) => {
    let providers = readData();
    const id = ctx.params.id;
    const providerIndex = providers.findIndex(p => p.id === id);
    if (providerIndex !== -1) {
        providers.splice(providerIndex, 1);
        writeData(providers);
        ctx.status = 204;
    } else {
        ctx.status = 404;
        ctx.body = { error: 'Provider not found' };
    }
});

app.use(router.routes()).use(router.allowedMethods());

// GraphQL setup 
const schema = buildSchema(`
    type Provider {
        id: String
        name: String
        trade_name: String
        address: String
    }

    type Query {
        providers: [Provider]
        provider(id: String!): Provider
    }

    input ProviderInput {
        name: String
        trade_name: String
        address: String
    }

    type Mutation {
        addProvider(input: ProviderInput): Provider
        updateProvider(id: String!, input: ProviderInput): Provider
        deleteProvider(id: String!): Provider
    }
`);

// GraphQL Methods
const root = {
    providers: () => {
        return readData();
    },
    provider: ({ id }) => {
        const providers = readData();
        return providers.find(p => p.id === id);
    },
    addProvider: ({ input }) => {
        const providers = readData();
        let nextId = 0;
        if (providers.length > 0) {
            const sortedProviders = providers.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
            nextId = parseInt(sortedProviders[sortedProviders.length - 1].id) + 1;
        }
        const newProvider = {
            id: `${nextId}`,
            ...input
        };
        providers.push(newProvider);
        writeData(providers);
        return newProvider;
    },
    updateProvider: ({ id, input }) => {
        const providers = readData();
        const providerIndex = providers.findIndex(p => p.id === id);
        if (providerIndex === -1) {
            throw new Error('Provider not found');
        }
        const provider = providers[providerIndex];
        providers[providerIndex] = {
            ...provider,
            ...input
        };
        writeData(providers);
        return providers[providerIndex];
    },
    deleteProvider: ({ id }) => {
        let providers = readData();
        const providerIndex = providers.findIndex(p => p.id === id);
        if (providerIndex === -1) {
            throw new Error('Provider not found');
        }
        const deletedProvider = providers.splice(providerIndex, 1)[0];
        writeData(providers);
        return deletedProvider;
    }
};

//  GraphQL endpoints 
router.all('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

// Load Swagger for OpenApi
app.use(
    koaSwagger({
        routePrefix: '/swagger',
        swaggerOptions: {
            spec: openapiSpec,
        },
    })
);

// Server Startup in Port defined in the configuration or 3000 by default
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});