# poke-party-tracker

A simple SPA web app to track your Pokemon party. Built with React, Vite, TypeScript, Redux, `pokenode-ts`, React Query (aka TanStack Query), among others.

Developed using Node.js LTS 20.11.1.

## To run the app

```bash
npm install
npm run dev
```

The server will listen at `http://localhost:5173` by default.

## To run the tests

```bash
npm run test
```

## Features

- Navigate through the entire list of Pokemon, using parallel and cached requests to the PokeAPI.
- Filter the list of Pokemon by their type. Only requests the data it needs from the PokeAPI when necessary.
- Add and remove Pokemon from your party.

