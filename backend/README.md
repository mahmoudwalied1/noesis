# Noesis Backend

Backend foundation for Noesis, an AI-powered learning assistant for computer science students.

## Stack

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- Redis
- BullMQ
- Zod
- JWT auth
- Swagger/OpenAPI
- Vitest
- Supertest

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with local PostgreSQL and Redis connection strings.

## Required Services

- PostgreSQL, configured through `DATABASE_URL`
- Redis, configured through `REDIS_URL`

## Commands

```bash
npm run dev
npm run build
npm run typecheck
npm run lint
npm run format:check
npm test
npm run test:integration
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

Start local infrastructure:

```bash
npm run infra:up
```

Stop local infrastructure:

```bash
npm run infra:down
```

## Database

Run migrations and seed data:

```bash
npm run prisma:migrate
npm run seed
```

Seed data includes:

- `Student` and `Admin` roles
- Optional default admin from `DEFAULT_ADMIN_EMAIL` and `DEFAULT_ADMIN_PASSWORD`
- Object-Oriented Programming subject content
- Data Structures subject content

## API

The API is mounted under:

```text
/api/v1
```

Swagger UI:

```text
/api/v1/docs
```

OpenAPI JSON:

```text
/api/v1/docs.json
```

Every response includes or propagates an `x-request-id` header. Error responses include the same request id in `error.requestId`.

## Auth

JWT access tokens are sent with:

```text
Authorization: Bearer <token>
```

Refresh tokens are rotated and stored as hashes in the database.

## Document Uploads

This phase uses local document storage through `UPLOAD_DIR`. Supported upload types are:

- PDF
- TXT
- DOC/DOCX
- PPT/PPTX
- PNG/JPG/JPEG/WEBP

Manual text ingestion is chunked by the worker. Uploaded file extraction supports TXT, PDF, DOCX, DOC, PPT, and PPTX where the parser can read the provided file.

## Integration Tests

Normal tests mock external services:

```bash
npm test
```

Integration tests require PostgreSQL and Redis:

```bash
npm run infra:up
RUN_INTEGRATION_TESTS=true npm run test:integration
```
