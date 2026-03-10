# Inventory Catalog Manager

Welcome to the Inventory Catalog Manager project! This application allows users to register, log in, and manage inventory items (add, update, delete) through a modern web interface and robust backend API.


## Overview

The Inventory Catalog Manager consists of:
- **Frontend:** A user-friendly interface for managing inventory.
- **Backend:** A RESTful API for authentication and inventory operations.
- **Automated Tests:** End-to-end (E2E) and API tests to ensure application quality.

---

## Project Structure

```
CypressPOC/
├── .github/
│   └── workflows/
│       └── main.yml
├── README.md
├── run_tests.bat
├── run_tests.sh
├── setup_backend.bat
├── setup_backend.sh
├── setup_frontend.bat
├── setup_frontend.sh
├── Test_plan.md
├── backend/
│   ├── db.js
│   ├── package.json
│   ├── server.js
│   ├── api_test_results/
│   │   └── api_test_results.json
│   └── tests/
│       └── catalogmanger.postman_collection.json
└── frontend/
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── playwright.config.ts
    ├── README.md
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── tsconfig.spec.json
    ├── vite.config.ts
    ├── E2ETests/
    │   ├── environment.ts
    │   ├── test.js
    │   ├── testData.json
    │   ├── pages/
    │   │   ├── base.page.ts
    │   │   ├── catalog.page.ts
    │   │   ├── login.page.ts
    │   │   └── registeruser.page.ts
    │   ├── tests/
    │   │   ├── TC01_Register and Login.spec.ts
    │   │   └── TC02_AddUpdateAndDelete_Item.spec.ts
    │   └── utils/
    │       ├── commonReusableFunctions.ts
    │       └── commonWait.ts
    ├── playwright-report/
    │   ├── index.html
    │   └── data/
    ├── public/
    ├── src/
    │   ├── App.css
    │   ├── App.tsx
    │   ├── index.css
    │   ├── ItemsPage.tsx
    │   ├── LoginPage.tsx
    │   ├── main.tsx
    │   ├── RegisterPage.tsx
    │   ├── Styles.css
    │   ├── vite-env.d.ts
    │   └── assets/
    └── test-results/
        ├── TC01_Register and Login-As-e9531--able-to-register-and-login/
        └── TC02_AddUpdateAndDelete_It-28885-nd-delete-a-item-in-catalog/
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

---

### Setup Instructions

Clone the repository and navigate to the project directory:

```sh
git clone https://github.com/karicharlamounika/Inventory_Catalog_Manager.git
cd Inventory_Catalog_Manager
```

---

## Running the Application

**The backend and frontend must be running before executing any tests.**

### Backend Setup

- **Linux/macOS (bash):**
  ```sh
  ./setup_backend.sh
  ```
- **Windows (CMD/PowerShell):**
  ```bat
  setup_backend.bat
  ```
  
### Frontend Setup

- **Linux/macOS (bash):**
  ```sh
  ./setup_frontend.sh
  ```
- **Windows (CMD/PowerShell):**
  ```bat
  setup_frontend.bat
  ```

---

## Running Tests

After both frontend and backend are running, you can execute the automated tests.

- **Linux/macOS (bash):**
  ```sh
  ./run_tests.sh
  ```
- **Windows (CMD/PowerShell):**
  ```bat
  run_tests.bat
  ```

This will run both API and E2E tests in sequence on local setup.

### Running Tests via GitHub Actions (CI)

Automated tests are also executed as part of the project's Continuous Integration (CI) pipeline using GitHub Actions.  
Worflow is configure to be trigerred manaully, once triggered all tests would run after building the backend and frontend automatically.  
You can view the workflow configuration in the .github/workflows directory and check test results directly on the GitHub repository's Actions tab.

Note: This workflow can be configured to trigger on both pull and pust of code to repository.

---


## Test Plan

For a detailed description of the testing strategy, scenarios, and tools used, please refer to the [Test Plan](Test_plan.md).

---