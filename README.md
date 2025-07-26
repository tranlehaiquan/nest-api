# NestJS API with Drizzle ORM

A NestJS-based API server using Drizzle ORM for database operations, GraphQL for API layer, and PostgreSQL as the database.

## Features

- **NestJS Framework**: Modern Node.js framework for building efficient server-side applications
- **Drizzle ORM**: Type-safe and performant SQL ORM for TypeScript
- **GraphQL**: Query language and runtime for APIs
- **PostgreSQL**: Robust relational database
- **JWT Authentication**: Secure token-based authentication
- **Docker Support**: Containerized deployment ready

## Database Schema

The application includes the following entities:
- **Users**: User management with authentication
- **Posts**: Blog posts/articles with slug-based routing
- **Comments**: Comments on posts with user relationships
- **Tags**: Tagging system for posts
- **Follows**: User following relationships
- **UserFavoriteComments**: User comment favoriting system

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd nest-api
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Update .env with your database URL and JWT secret
```

### Database Setup

The application uses Drizzle ORM for database operations. Use the following commands:

```bash
# Generate migration files from schema changes
pnpm run db:generate

# Apply migrations to database
pnpm run db:migrate

# Push schema changes directly to database (for development)
pnpm run db:push

# Open Drizzle Studio for database management
pnpm run db:studio
```

### Development

```bash
# Start development server with hot reload
pnpm run dev

# Start production server
pnpm run start:prod

# Run tests
pnpm run test

# Run e2e tests
pnpm run test:e2e
```

## API Endpoints

The application provides a GraphQL endpoint at `/graphql` with the following main operations:

### Users
- User registration and login
- User profile management
- User following/unfollowing

### Articles
- Create, read, update, delete articles
- Article filtering by author and tags
- Slug-based article access

### Comments
- Add comments to articles
- List comments for articles
- Delete user's own comments

### Tags
- Create and manage tags
- Associate tags with articles

## Database Migration from Prisma

This project was recently migrated from Prisma to Drizzle ORM for improved performance and type safety. The migration included:

- Complete replacement of Prisma schema with Drizzle schema definitions
- Migration of all service methods from Prisma syntax to Drizzle syntax
- Updated module configurations and dependency injection
- Removal of Prisma-specific build steps and scripts

## Docker Support

The application includes Docker configuration for easy deployment:

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## Project Structure

```
src/
├── articles/          # Article management
├── auth.guard.ts      # JWT authentication guard
├── comments/          # Comment system
├── database/          # Drizzle ORM configuration and schema
├── decorator/         # Custom decorators
├── middlewares/       # Application middlewares
├── tags/              # Tag management
├── users/             # User management
└── utils/             # Utility functions
```

## Environment Variables

Required environment variables:

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
DIRECT_URL=postgresql://username:password@localhost:5432/database_name
JWT_SECRET=your-secret-key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
