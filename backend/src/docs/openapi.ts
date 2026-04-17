import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const errorResponse = {
  description: 'Error response',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/ErrorResponse' }
    }
  }
};

const authSecurity = [{ bearerAuth: [] }];

const openApiSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Noesis Backend API',
      version: '0.1.0'
    },
    servers: [{ url: '/api/v1' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            error: {
              type: 'object',
              properties: {
                code: { type: 'string' },
                message: { type: 'string' },
                requestId: { type: 'string' },
                details: {}
              },
              required: ['code', 'message']
            }
          }
        },
        AuthTokens: {
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' }
          },
          required: ['accessToken', 'refreshToken']
        },
        Role: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string', enum: ['Student', 'Admin'] }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string', format: 'email' },
            displayName: { type: 'string' },
            avatarUrl: { type: 'string', nullable: true },
            bio: { type: 'string', nullable: true },
            isActive: { type: 'boolean' },
            roles: { type: 'array', items: { $ref: '#/components/schemas/Role' } }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            user: { $ref: '#/components/schemas/User' },
            tokens: { $ref: '#/components/schemas/AuthTokens' }
          }
        },
        Subject: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            slug: { type: 'string' },
            description: { type: 'string', nullable: true },
            order: { type: 'integer' }
          }
        },
        Topic: {
          allOf: [
            { $ref: '#/components/schemas/Subject' },
            {
              type: 'object',
              properties: {
                subjectId: { type: 'string' }
              }
            }
          ]
        },
        Concept: {
          allOf: [
            { $ref: '#/components/schemas/Subject' },
            {
              type: 'object',
              properties: {
                topicId: { type: 'string' }
              }
            }
          ]
        },
        Document: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            ownerId: { type: 'string' },
            title: { type: 'string' },
            sourceType: { type: 'string' },
            originalName: { type: 'string', nullable: true },
            mimeType: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        IngestionStatus: {
          type: 'object',
          properties: {
            documentId: { type: 'string' },
            ingestionJob: {
              type: 'object',
              nullable: true,
              properties: {
                id: { type: 'string' },
                status: { type: 'string', enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'] },
                progress: { type: 'integer' },
                error: { type: 'string', nullable: true }
              }
            }
          }
        }
      }
    },
    paths: {
      '/health/live': {
        get: {
          tags: ['Health'],
          summary: 'Liveness check',
          responses: { '200': { description: 'Service is alive' } }
        }
      },
      '/health/ready': {
        get: {
          tags: ['Health'],
          summary: 'Readiness check',
          responses: {
            '200': { description: 'Service is ready' },
            '503': { description: 'Dependency is unavailable' }
          }
        }
      },
      '/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register a student account',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password', 'displayName'],
                  properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 8 },
                    displayName: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            '201': {
              description: 'Registered',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } }
            },
            '400': errorResponse,
            '409': errorResponse
          }
        }
      },
      '/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Authenticated',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } }
            },
            '401': errorResponse
          }
        }
      },
      '/auth/refresh': {
        post: {
          tags: ['Auth'],
          summary: 'Refresh tokens',
          responses: { '200': { description: 'Rotated tokens' }, '401': errorResponse }
        }
      },
      '/auth/logout': {
        post: {
          tags: ['Auth'],
          summary: 'Logout',
          responses: { '204': { description: 'Logged out' } }
        }
      },
      '/auth/me': {
        get: {
          tags: ['Auth'],
          security: authSecurity,
          summary: 'Current user profile',
          responses: { '200': { description: 'Current user' }, '401': errorResponse }
        },
        patch: {
          tags: ['Auth'],
          security: authSecurity,
          summary: 'Update current user profile',
          responses: { '200': { description: 'Updated profile' }, '401': errorResponse }
        }
      },
      '/users': {
        get: {
          tags: ['Users'],
          security: authSecurity,
          summary: 'List users as Admin',
          responses: { '200': { description: 'Paginated users' }, '403': errorResponse }
        }
      },
      '/users/{id}': {
        get: {
          tags: ['Users'],
          security: authSecurity,
          summary: 'Get user as Admin',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { '200': { description: 'User' }, '404': errorResponse }
        },
        patch: {
          tags: ['Users'],
          security: authSecurity,
          summary: 'Update user as Admin',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { '200': { description: 'Updated user' }, '403': errorResponse }
        }
      },
      '/subjects': {
        get: {
          tags: ['Content'],
          security: authSecurity,
          summary: 'List subjects',
          responses: { '200': { description: 'Subjects' } }
        },
        post: {
          tags: ['Content'],
          security: authSecurity,
          summary: 'Create subject as Admin',
          responses: { '201': { description: 'Subject created' }, '403': errorResponse }
        }
      },
      '/topics': {
        get: {
          tags: ['Content'],
          security: authSecurity,
          summary: 'List topics',
          responses: { '200': { description: 'Topics' } }
        },
        post: {
          tags: ['Content'],
          security: authSecurity,
          summary: 'Create topic as Admin',
          responses: { '201': { description: 'Topic created' }, '403': errorResponse }
        }
      },
      '/concepts': {
        get: {
          tags: ['Content'],
          security: authSecurity,
          summary: 'List concepts',
          responses: { '200': { description: 'Concepts' } }
        },
        post: {
          tags: ['Content'],
          security: authSecurity,
          summary: 'Create concept as Admin',
          responses: { '201': { description: 'Concept created' }, '403': errorResponse }
        }
      },
      '/documents/upload': {
        post: {
          tags: ['Documents'],
          summary: 'Upload study material',
          security: authSecurity,
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  required: ['file'],
                  properties: {
                    file: { type: 'string', format: 'binary' },
                    title: { type: 'string' },
                    subjectId: { type: 'string' },
                    topicId: { type: 'string' },
                    conceptId: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: { '201': { description: 'Document created' }, '400': errorResponse, '401': errorResponse }
        }
      },
      '/documents/text': {
        post: {
          tags: ['Documents'],
          summary: 'Create study material from text',
          security: authSecurity,
          responses: { '201': { description: 'Document created' }, '400': errorResponse, '401': errorResponse }
        }
      },
      '/documents/{id}': {
        get: {
          tags: ['Documents'],
          summary: 'Get document',
          security: authSecurity,
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { '200': { description: 'Document' }, '403': errorResponse, '404': errorResponse }
        }
      },
      '/documents/{id}/ingestion-status': {
        get: {
          tags: ['Documents'],
          summary: 'Get ingestion status',
          security: authSecurity,
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            '200': {
              description: 'Ingestion status',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/IngestionStatus' } } }
            },
            '403': errorResponse,
            '404': errorResponse
          }
        }
      }
    }
  },
  apis: []
});

export const openApiRouter = Router();

openApiRouter.get('/docs.json', (_req, res) => res.json(openApiSpec));
openApiRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
