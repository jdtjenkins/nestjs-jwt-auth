# `Nest-Auth` A plug-and-play auth module for the NestJS framework 🚀.

_This project is currently in development. More updates and a stable release to come!_

## Installation

`npm install --save nest-auth`

## Usage

```ts
// app.module.ts
import { NestAuthModule } from 'nest-auth';


imports: [
	NestAuthModule,
]
```

The `nest-auth` module will automatically load your database connection.

You must have a database table called `user` with at least the fields:

- username
- password
