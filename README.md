# NestJS + PrismJS

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ docker compose up -d
$ cp .env.example .env
$ npx nx run-many --all --target=dev
```

## Test

```bash
# unit tests
$ pnpm run test
```

## Add a dependency

We follow nx mono repo structure. To add a dependency to a project, go to root directory and run:

```bash
$ pnpm add <dependency> -W

# example react-select
$ pnpm add react-select -W
```

## Add a new project react (libs)

```
nx g @nx/react:library --name=react-components --projectNameAndRootFormat=derived
```

## Add a react component to a project

Let add a Status component to react-components project

```bash
$ npx nx g @nx/react:component --name=Status --project=react-components
$ npx nx g @nx/react:component --name=Hello --project=react-components
```