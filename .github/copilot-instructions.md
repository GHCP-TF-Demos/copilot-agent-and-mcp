You are an AI programming assistant.
When asked for your name, you must respond with "GitHub Copilot".

## Project Context
This is a full-stack Book Favorites application with:
- **Frontend**: React 19, Redux Toolkit, React Router, Vite, CSS Modules
- **Backend**: Node.js, Express.js, JWT authentication, JSON file storage
- **Testing**: Jest (backend), Cypress (E2E frontend)

## Code Style and Best Practices

### General Guidelines
1. Always start comments in the code with "generated-by-copilot: "
2. Follow Microsoft and GitHub security best practices
3. Use modern ES6+ JavaScript syntax and features
4. Write clean, maintainable, and self-documenting code
5. Prefer async/await over callbacks for asynchronous operations
6. Use meaningful variable and function names that clearly describe their purpose

### Security Requirements
- Never commit secrets, API keys, or credentials to the repository
- Always validate and sanitize user input to prevent injection attacks
- Use parameterized queries and avoid string concatenation for data operations
- Implement proper error handling without exposing sensitive information
- Follow the principle of least privilege for file and data access
- Use HTTPS for all external API calls
- Implement rate limiting for API endpoints (express-rate-limit is already installed)
- Keep dependencies up to date and review security advisories

### React/Frontend Best Practices
- Use functional components with hooks (no class components)
- Implement proper error boundaries for component error handling
- Use CSS Modules for component styling to avoid naming conflicts
- Follow Redux Toolkit patterns for state management
- Keep components small and focused on a single responsibility
- Use React.memo() for expensive component renders where appropriate
- Implement proper loading and error states for async operations
- Ensure accessibility (ARIA labels, semantic HTML, keyboard navigation)

### Node.js/Backend Best Practices
- Use environment variables for configuration (via .env files, never committed)
- Implement proper middleware ordering (error handlers last)
- Use try-catch blocks for async route handlers
- Return appropriate HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- Validate request bodies using middleware or validation libraries
- Log errors appropriately but don't expose internal details to clients
- Use modular route structure for maintainability

### Testing Guidelines
- Write tests for new features and bug fixes
- Backend tests: `npm run test:backend`
- E2E tests: `npm run build:frontend && npm run test:frontend`
- All tests: `npm run test`
- Use descriptive test names that explain what is being tested
- Test edge cases and error conditions, not just happy paths
- Mock external dependencies and API calls in unit tests

## Development Workflow

### Before Suggesting Changes
1. Check existing code context and conventions
2. Explain what changes will be made and why
3. Consider both frontend and backend implications
4. Identify potential breaking changes or side effects
5. Consider performance and security implications

### After Making Changes
1. Verify the changes work as expected
2. Run relevant tests (backend, frontend, or both)
3. Check for any console errors or warnings
4. Ensure code follows project conventions
5. Suggest any additional improvements or optimizations
6. Update documentation if needed

## File Structure
- `/backend` - Express.js server, routes, data files
- `/frontend` - React application source code
  - `/src/components` - React components
  - `/src/store` - Redux store and slices
  - `/src/styles` - CSS modules
- `/backend/tests` - Backend Jest tests
- `/frontend/cypress` - E2E Cypress tests

## Common Commands
- Start backend: `npm run start:backend` (port 4000)
- Start frontend: `npm run start:frontend` (port 5173)
- Build frontend: `npm run build:frontend`
- Run backend tests: `npm run test:backend`
- Run E2E tests: `npm run build:frontend && npm run test:frontend`
- Run all tests: `npm run test`

## API Endpoints
- POST /auth/register - User registration
- POST /auth/login - User login
- GET /books - Get all books
- GET /users/:username/favorites - Get user favorites
- POST /users/:username/favorites - Add book to favorites
- DELETE /users/:username/favorites/:bookId - Remove from favorites