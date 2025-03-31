import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LinkedIn OAuth API Documentation',
            version: '1.0.0',
            description: 'API documentation for LinkedIn OAuth integration',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Error message',
                        },
                        success: {
                            type: 'boolean',
                            description: 'Success status',
                        },
                    },
                },
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            description: 'Success status',
                        },
                        message: {
                            type: 'string',
                            description: 'Success message',
                        },
                        user: {
                            type: 'object',
                            description: 'User profile data',
                        },
                    },
                },
            },
        },
    },
    apis: ['./swagger/*.yaml'], // Path to API docs
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
    // Swagger Page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}; 