# AI Coding Guidelines for My CRM Frontend

## Project Overview
This is a React-based CRM frontend application built with Vite, using Tailwind CSS v4 for styling. The app follows modern React patterns with functional components and hooks.

## Architecture
- **Framework**: React 19 with Vite as the build tool
- **Styling**: Tailwind CSS v4 imported via `@import "tailwindcss";` in CSS files
- **Component Structure**: Components live in `src/components/` directory
- **Entry Point**: `src/main.jsx` renders `App.jsx` to `#root` div

## Key Patterns
- **Component Naming**: PascalCase filenames (e.g., `ListClientsComponent.jsx`)
- **Styling**: Apply Tailwind classes directly in JSX className attributes
- **Imports**: Use ES6 modules with `.jsx` extensions for React components

## Development Workflow
- **Start Dev Server**: `npm run dev` (Vite dev server with hot reload)
- **Build for Production**: `npm run build` (outputs to `dist/` directory)
- **Linting**: `npm run lint` (ESLint with React hooks and refresh plugins)
- **Preview Build**: `npm run preview` (serve built files locally)

## ESLint Rules
- Unused variables ignored if they start with uppercase (e.g., component names)
- Enforces React hooks rules and Vite-specific refresh patterns

## Example Component Structure
```jsx
import "./Component.css"; // If needed, ensure @import "tailwindcss";

function ComponentName() {
  return (
    <div className="tailwind-classes-here">
      {/* Component JSX */}
    </div>
  );
}

export default ComponentName;
```

## File Organization
- `src/App.jsx`: Main app component
- `src/components/`: Feature-specific components
- `src/index.css`: Global styles with Tailwind import
- Configuration files: `vite.config.js`, `eslint.config.js`, `postcss.config.js` in root

## Dependencies
- React 19 for UI
- Tailwind CSS v4 for utility-first styling
- Vite for fast development and building
- ESLint for code quality