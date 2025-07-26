FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Create app directory and set non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
WORKDIR /app

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml ./
RUN chown -R nestjs:nodejs /app
USER nestjs

FROM base AS deps
# Install all dependencies (including dev dependencies for build)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS build
# Copy dependencies from deps stage
COPY --from=deps --chown=nestjs:nodejs /app/node_modules ./node_modules
# Copy source code
COPY --chown=nestjs:nodejs . .
# Generate Drizzle schema and build
RUN pnpm db:generate
RUN pnpm run build

FROM base AS prod-deps
# Install only production dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM node:22-alpine AS runtime

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
WORKDIR /app

# Copy built application
COPY --from=prod-deps --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nestjs:nodejs /app/dist ./dist
COPY --from=build --chown=nestjs:nodejs /app/package.json ./package.json

USER nestjs
EXPOSE 4000

CMD [ "npm", "run", "start:prod" ]