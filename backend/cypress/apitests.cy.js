const BASE_URL = 'http://localhost:5000';

// ─────────────────────────────────────────────────────────────────────────────
// TEST DATA
// ─────────────────────────────────────────────────────────────────────────────

const testUser = {
  firstName: 'API',
  lastName: 'Tester',
  email: `apitester_${Date.now()}@test.com`, // unique email per run
  password: 'Test345',
};

let authToken = null;
let createdItemId = null;

// ─────────────────────────────────────────────────────────────────────────────
// 1. USER REGISTRATION — POST /register
// ─────────────────────────────────────────────────────────────────────────────

describe('API - User Registration', () => {

  it('should register a new user successfully (201)', () => {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/register`,
      body: testUser,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('User registered successfully');
    });
  });

  it('ERROR - should return 409 when registering with an already existing email', () => {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/register`,
      body: testUser,           // same user registered above
      failOnStatusCode: false,  // prevent Cypress from failing on 4xx
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body.error).to.eq('User already exists');
    });
  });

  it('ERROR - should return 400 when required fields are missing', () => {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/register`,
      body: { email: 'incomplete@test.com' }, // missing firstName, lastName, password
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Missing required fields');
    });
  });

});

// ─────────────────────────────────────────────────────────────────────────────
// 2. USER LOGIN — POST /login
// ─────────────────────────────────────────────────────────────────────────────

describe('API - User Login', () => {

  it('should login successfully and return a JWT token (200)', () => {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/login`,
      body: {
        email: testUser.email,
        password: testUser.password,
      },
      log: false, // prevent logging sensitive info in Cypress Command Log
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string').and.not.be.empty;

      // Store token for use in subsequent item tests
      authToken = response.body.token;
    });
  });

  it('ERROR - should return 401 for invalid credentials', () => {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/login`,
      body: {
        email: testUser.email,
        password: 'WrongPassword',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Invalid credentials');
    });
  });

  it('ERROR - should return 401 for non-existent user', () => {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/login`,
      body: {
        email: 'ghost@nobody.com',
        password: 'Test345',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Invalid credentials');
    });
  });

  it('ERROR - should return 400 when email or password is missing', () => {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/login`,
      body: { email: testUser.email }, // missing password
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('Email and password are required');
    });
  });

});

// ─────────────────────────────────────────────────────────────────────────────
// 3. ITEMS — requires auth token
//    Login before all item tests to get a fresh token
// ─────────────────────────────────────────────────────────────────────────────

describe('API - Catalog Items (Protected Routes)', () => {

  // Login once before all item tests to get auth token
  before(() => {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/login`,
      body: {
        email: testUser.email,
        password: testUser.password,
      },
    }).then((response) => {
      authToken = response.body.token;
    });
  });

  // ── ADD ITEM ───────────────────────────────────────────────────────────────

  it('should add a new item successfully (201)', () => {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/items`,
      headers: { Authorization: `Bearer ${authToken}` },
      body: { name: 'Samsung S250', quantity: 10 },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eq('Samsung S250');
      expect(response.body.quantity).to.eq(10);

      // Store item ID for update and delete tests
      createdItemId = response.body.id;
    });
  });

  it('ERROR - should return 400 when adding item with missing fields', () => {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/items`,
      headers: { Authorization: `Bearer ${authToken}` },
      body: { name: 'Incomplete Item' }, // missing quantity
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Name and quantity are required');
    });
  });

  it('ERROR - should return 401 when adding item without token', () => {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/items`,
      body: { name: 'Unauthorized Item', quantity: 5 },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Access token missing');
    });
  });

  // ── UPDATE ITEM ────────────────────────────────────────────────────────────

  it('should update an existing item successfully (200)', () => {
    cy.request({
      method: 'PUT',
      url: `${BASE_URL}/items/${createdItemId}`,
      headers: { Authorization: `Bearer ${authToken}` },
      body: { name: 'Iphone 16', quantity: 16 },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('Iphone 16');
      expect(response.body.quantity).to.eq(16);
    });
  });

  it('ERROR - should return 404 when updating a non-existent item', () => {
    cy.request({
      method: 'PUT',
      url: `${BASE_URL}/items/999999`,
      headers: { Authorization: `Bearer ${authToken}` },
      body: { name: 'Ghost Item', quantity: 1 },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq('Item not found');
    });
  });

  it('ERROR - should return 401 when updating item without token', () => {
    cy.request({
      method: 'PUT',
      url: `${BASE_URL}/items/${createdItemId}`,
      body: { name: 'Unauthorized Update', quantity: 1 },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Access token missing');
    });
  });

    // ── GET ITEMS ──────────────────────────────────────────────────────────────

  it('should get all items for authenticated user (200)', () => {
    cy.request({
      method: 'GET',
      url: `${BASE_URL}/items`,
      headers: { Authorization: `Bearer ${authToken}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('ERROR - should return 401 when accessing items without token', () => {
    cy.request({
      method: 'GET',
      url: `${BASE_URL}/items`,
      failOnStatusCode: false,  // unauthorized user accessing catalogue
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Access token missing');
    });
  });

  // ── DELETE ITEM ────────────────────────────────────────────────────────────

  it('should delete an existing item successfully (204)', () => {
    cy.request({
      method: 'DELETE',
      url: `${BASE_URL}/items/${createdItemId}`,
      headers: { Authorization: `Bearer ${authToken}` },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('ERROR - should return 404 when deleting a non-existent item', () => {
    cy.request({
      method: 'DELETE',
      url: `${BASE_URL}/items/999999`,
      headers: { Authorization: `Bearer ${authToken}` },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq('Item not found');
    });
  });

  it('ERROR - should return 401 when deleting item without token', () => {
    cy.request({
      method: 'DELETE',
      url: `${BASE_URL}/items/1`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Access token missing');
    });
  });

});