# Inventory Catalog Manager - CypressPOC

A full-stack web application for managing inventory items with user authentication. Built with **React** frontend and **Express.js** backend, featuring comprehensive automated testing using **Cypress**.

## Features

- **User Authentication:** Secure registration and login with bcrypt password hashing and JWT tokens
- **Inventory Management:** Create, read, update, and delete inventory items
- **Protected Routes:** Token-based access control for authenticated users
- **Automated Testing:** 
  - E2E tests using Cypress for complete user workflows
  - API tests using Cypress for endpoint validation
  - CI/CD integration with GitHub Actions

## Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Cypress** - E2E testing framework with Mochawesome reporting
- **Axios** - HTTP client
- **ESLint** - Code quality

### Backend
- **Express.js** - Web framework
- **SQLite3** - Database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Cypress** - API test automation

## Overview

The application consists of three main components:
- **Frontend:** React-based user interface with routing and state management
- **Backend:** RESTful API with authentication and database operations
- **Tests:** Comprehensive E2E and API test suites

## API Endpoints

### Authentication
- `POST /register` - Register a new user
  ```json
  Request: { "firstName": "John", "lastName": "Doe", "email": "john@example.com", "password": "pass123" }
  Response: { "message": "User registered successfully" }
  ```
- `POST /login` - Login and get JWT token
  ```json
  Request: { "email": "john@example.com", "password": "pass123" }
  Response: { "token": "eyJhbGc..." }
  ```

### Items (Requires Authentication)
- `GET /items` - Fetch all items
- `POST /items` - Add new item
  ```json
  Request: { "name": "Widget", "quantity": 10 }
  Response: { "id": 1, "name": "Widget", "quantity": 10 }
  ```
- `PUT /items/:id` - Update item
  ```json
  Request: { "name": "Updated Widget", "quantity": 15 }
  ```
- `DELETE /items/:id` - Delete item

### Health Check
- `GET /health` - Server health check

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

### Setup Instructions

Clone the repository and navigate to the project directory:

```sh
git clone https://github.com/karicharlamounika/CypressPOC.git
cd CypressPOC
```

## Running the Application

**Important:** Both backend and frontend must be running before executing tests.

### Quick Start

1. **Setup Backend**
   - Windows: `setup_backend.bat`
   - Linux/macOS: `./setup_backend.sh`
   - This will install dependencies and start the server on `http://localhost:3000`

2. **Setup Frontend** (in a new terminal)
   - Windows: `setup_frontend.bat`
   - Linux/macOS: `./setup_frontend.sh`
   - This will install dependencies and start the dev server on `http://localhost:5173`

3. **Access the Application**
   - Open browser to `http://localhost:5173`
   - Register a new account or login
   - Manage inventory items

### Manual Setup

**Backend:**
```bash
cd backend
npm install
npm run start-backend
```

**Frontend:**
```bash
cd frontend
npm install
npm run start-frontend
```

## Testing

### Prerequisites for Tests
- Backend running on `http://localhost:3000`
- Frontend running on `http://localhost:5173`
- Update test data before re-running tests locally

### Running All Tests

Run both API and E2E tests:
- **Windows:** `run_tests.bat`
- **Linux/macOS:** `./run_tests.sh`

### Individual Test Suites

**API Tests** (Cypress):
```bash
cd backend
npm run test
```
Results: `backend/cypress/reports/`

**E2E Tests** (Cypress):
```bash
cd frontend
npm run test
```
Results: `frontend/cypress/reports/`, `frontend/cypress/screenshots/`, and `frontend/cypress/videos/`

### Test Coverage

**E2E Test Cases (Cypress):**
- `TC01_RegisterandLogin.cy.js` - User registration and login workflows
- `TC02_AddUpdateAndDeleteItem.cy.js` - Full inventory CRUD operations

**API Test Cases (Cypress):**
- User registration with validation
- Login with valid/invalid credentials
- CRUD operations on inventory items
- Error handling scenarios
- Unauthorized access attempts

### CI/CD with GitHub Actions

Tests automatically run on workflow dispatch. The workflow:
1. Checks out code
2. Sets up Node.js
3. Installs dependencies and starts backend
4. Runs API tests and uploads results
5. Runs E2E tests in parallel
6. Archives test artifacts

Access results in GitHub Actions tab on repository

---

## Project Structure

```
CypressPOC/
├── .github/
│   └── workflows/
│       └── main.yml                    # GitHub Actions CI/CD pipeline
├── backend/                            # Express.js backend server
│   ├── db.js                          # SQLite database setup
│   ├── server.js                      # Main server and API endpoints
│   ├── package.json
│   ├── cypress.config.js               # Cypress API test configuration
│   ├── cypress/                        # Cypress API tests
│   │   ├── apitests.cy.js             # API test suite
│   │   └── reports/                   # Mochawesome test reports
└── frontend/                           # React + TypeScript frontend
    ├── src/
    │   ├── App.tsx                    # Main app component with routing
    │   ├── LoginPage.tsx               # Login page
    │   ├── RegisterPage.tsx            # Registration page
    │   ├── ItemsPage.tsx               # Inventory management page
    │   ├── main.tsx                    # App entry point
    │   ├── vite-env.d.ts               # Vite environment types
    │   ├── App.css & Styles.css        # Global styles
    │   └── assets/
    ├── cypress/                        # Cypress E2E tests
    │   ├── e2etests/                   # Test suites
    │   │   ├── TC01_Register and Login.cy.js
    │   │   └── TC02_AddUpdateAndDeleteItem.cy.js
    │   ├── support/                    # Cypress support files
    │   │   ├── commands.js             # Custom Cypress commands
    │   │   └── e2e.js                  # E2E configuration
    │   ├── fixtures/                   # Test data
    │   │   └── testData.json           # Test data
    │   ├── reports/                    # Mochawesome test reports
    │   ├── screenshots/                # Failed test screenshots
    │   └── videos/                     # Test execution videos
    ├── public/
    ├── package.json
    ├── cypress.config.js               # Cypress configuration
    ├── vite.config.ts
    ├── tsconfig.json
    └── eslint.config.js
├── README.md                           # This file
├── Test_plan.md                        # Detailed testing strategy
├── setup_backend.sh & setup_backend.bat
├── setup_frontend.sh & setup_frontend.bat
└── run_tests.sh & run_tests.bat
```

---

## Troubleshooting

### Backend Issues

**Port 3000 already in use:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/macOS
lsof -i :3000
kill -9 <PID>
```

**Database connection errors:**
- Ensure `backend/db.js` has correct SQLite path
- Delete `catalog.db` to reset database: `rm backend/catalog.db`

### Frontend Issues

**Port 5173 already in use:**
```bash
# Linux/macOS
lsof -i :5173
kill -9 <PID>
```

**Token expiration in tests:**
- JWT tokens expire in 1 hour
- Update test data with fresh email addresses before re-running
- Check `frontend/cypress/fixtures/testData.json` for E2E tests
- Check `backend/cypress/apitests.cy.js` for API tests

**Module not found errors:**
```bash
cd frontend
npm install
npm run build
```

### Test Failures

**Cypress tests failing:**
- Ensure backend and frontend are both running
- Clear Cypress cache: `npx cypress cache clear`
- Review test results: `frontend/cypress/reports/index.html`
- Check screenshots: `frontend/cypress/screenshots/`
- Review videos: `frontend/cypress/videos/`

**API tests failing (Cypress):**
- Verify backend is responsive: `curl http://localhost:3000/health`
- Check backend Cypress configuration: `backend/cypress.config.js`
- Review API test file: `backend/cypress/apitests.cy.js`
- Check test reports: `backend/cypress/reports/index.html`

---

## Development Workflow

1. **Code Quality**
   ```bash
   cd frontend
   npm run lint        # Check code quality
   ```

2. **Building**
   ```bash
   # Frontend production build
   npm run build
   ```

3. **Type Checking**
   ```bash
   # TypeScript compilation
   tsc -b
   ```

---

## Environment Configuration

### Backend
- **Server Port:** `3000` (configurable in `server.js`)
- **Database:** SQLite (`catalog.db`)
- **JWT Secret:** `your-secret-key` (change in production)

### Frontend
- **Dev Server:** `http://localhost:5173`
- **API Base URL:** `http://localhost:3000` (via Axios in requests)

---

## Contributing

1. Create a feature branch
2. Commit changes with clear messages
3. Push to repository
4. Ensure all tests pass before submitting PR
5. Update test data if needed

---

## Important Notes

- Test data is hardcoded; update before re-running tests locally
- Update email in `frontend/cypress/fixtures/testData.json` for E2E tests consistency
- Update test data in `backend/cypress/apitests.cy.js` for API tests fresh runs
- Production deployment requires changing JWT secret and database configuration
- CORS is enabled for `localhost:5173` access from backend
- Cypress automatically records videos and takes screenshots on test failures (frontend: `cypress/videos/` and `cypress/screenshots/`, backend: `cypress/reports/`)

---

## Additional Documentation

- [Test Plan](Test_plan.md) - Comprehensive testing strategy and scope
- [Frontend README](frontend/README.md) - Frontend-specific documentation
- [GitHub Actions Workflow](.github/workflows/main.yml) - CI/CD configuration

---

## License

[Add your license information here]

## Support

For issues and questions, please refer to the Test Plan or check existing GitHub Issues.