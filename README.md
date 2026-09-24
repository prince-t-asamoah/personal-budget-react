# Personal Budget

A modern personal budgeting frontend built with **React**, **TypeScript**, and **Vite**. It provides the user interface for managing budget envelopes through the Personal Budget API.

## Features

- Type-safe React application built with TypeScript
- Client-side routing with React Router
- Form handling with React Hook Form
- Toast notifications for user feedback
- Responsive styling with CSS
- API configuration through Vite environment variables
- Production builds and local development with Vite

## Technology stack

- React 19
- TypeScript
- Vite
- React Router
- React Hook Form
- React Hot Toast
- Lucide React

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm
- A running instance of the [Personal Budget API](https://github.com/prince-t-asamoah/personal-budget-nodejs)

### Installation

```bash
git clone https://github.com/prince-t-asamoah/personal-budget-react.git
cd personal-budget-react
npm install
```

Create a local environment file from the provided template:

```bash
cp .env.example .env
```

Set the API and website URLs in `.env`:

```dotenv
VITE_API_BASE_URL=http://localhost:3000
VITE_WEBSITE_URL=http://localhost:5173
```

Use the URLs appropriate for your local or deployed environment.

### Run the application

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview the production build
npm run preview
```

The development server URL is printed in the terminal when Vite starts.

### Check code quality

```bash
npm run lint
```

## Environment variables

| Variable | Description |
| --- | --- |
| `VITE_API_BASE_URL` | Base URL of the Personal Budget backend API |
| `VITE_WEBSITE_URL` | Public URL of this frontend application |

Only variables prefixed with `VITE_` are exposed to the browser. Never place secrets in this file.

## Project structure

```text
├── public/       # Static assets
├── src/          # React and TypeScript application source
├── .env.example  # Environment variable template
├── index.html    # Application entry point
└── vite.config.ts
```

## Related project

- [Personal Budget API](https://github.com/prince-t-asamoah/personal-budget-nodejs)

## License

This project is currently maintained as a portfolio project. See the repository for licensing details.
