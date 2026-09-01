# DESIGN_DOC.md

# 1. Problem Statement

The organization needs a backend web application to manage employee records through a REST API. The system must allow users to create, retrieve, update, and delete employee records stored in MongoDB Atlas using a Node.js and Express backend.

---

# 2. Goals

1. Start an Express server on port 5050.
2. Connect the backend application to MongoDB Atlas using an environment variable named `ATLAS_URI`.
3. Provide REST API endpoints for creating, retrieving, updating, and deleting employee records.
4. Store employee records in a MongoDB collection named `records`.
5. Allow API testing through Postman using the specified requests.
6. Support cross-origin requests through CORS middleware.

---

# 3. Non-Goals

1. User authentication and authorization.
2. Frontend user interface development.
3. Record search, filtering, or pagination features.
4. Advanced validation and business rules beyond basic CRUD operations.

---

# 4. Actors

| Actor                     | Type                  | Primary Goal                                                          |
| ------------------------- | --------------------- | --------------------------------------------------------------------- |
| User                      | Human User            | Manage employee records through API requests                          |
| Express Server            | System                | Process incoming HTTP requests and return responses                   |
| MongoDB Atlas             | External Service      | Store and retrieve employee record data                               |
| Postman                   | Testing Tool          | Test and validate API functionality                                   |
| Environment Configuration | Configuration Service | Provide database connection information through environment variables |

---

# 5. Functional Requirements

## Server Component

* The system shall start an Express server on port 5050.
* The system shall load environment variables from `config.env`.
* The system shall use ES Module syntax with `.mjs` files.
* The system shall configure CORS middleware to allow cross-origin requests.
* The system shall parse JSON request bodies.

## Environment Configuration

* The system shall store the MongoDB Atlas connection string in `config.env`.
* The system shall load the `ATLAS_URI` environment variable using `loadEnvironment.mjs`.

## Database Component

* The system shall connect to MongoDB Atlas using the MongoDB Node.js driver.
* The system shall access a collection named `records`.
* The system shall perform CRUD operations on the `records` collection.

## API Endpoints

### GET /record

* The system shall return all documents from the `records` collection.

### GET /record/:id

* The system shall return a single record matching the supplied MongoDB ObjectId.

### POST /record

* The system shall create a new record.
* The system shall accept the following fields:

  * name
  * position
  * level

### PATCH /record/:id

* The system shall update one or more fields of an existing record.
* The system shall support partial updates.

### DELETE /record/:id

* The system shall delete the record matching the supplied MongoDB ObjectId.

---

# 6. Non-Functional Requirements

## Performance

* The system should return CRUD operation responses within a reasonable time under normal usage.
* The system should efficiently communicate with MongoDB Atlas.

## Security

* The system shall store sensitive connection information in environment variables rather than hardcoding credentials.
* The system should prevent direct exposure of database credentials.

## Privacy

* The system shall only store the employee information required by the assignment.
* The system should minimize exposure of sensitive configuration information.

## Maintainability

* The system shall separate responsibilities into modules.
* The system shall organize database connection logic separately from route logic.
* The system shall use Express Router for modular route management.
* The system shall use ES Modules consistently throughout the project.

## Reliability

* The system should maintain a stable connection to MongoDB Atlas.
* The system should provide appropriate responses for successful CRUD operations.

---

# 7. Architecture Overview

```text
+-------------+
|   Postman   |
+------+------+ 
       |
       | HTTP Requests
       v
+-------------+
| Express API |
| server.mjs  |
+------+------+ 
       |
       | Routes
       v
+-------------------+
| routes/record.mjs |
+---------+---------+
          |
          | Database Operations
          v
+----------------+
| db/conn.mjs    |
+--------+-------+
         |
         | ATLAS_URI
         v
+----------------+
| MongoDB Atlas  |
| records        |
| collection     |
+----------------+
```

---

# 8. API Design

## GET /record

### Description

Returns all employee records.

### Request Body

None

### Success Response

```json
[
  {
    "_id": "ObjectId",
    "name": "John",
    "position": "Software Engineer",
    "level": "Junior"
  }
]
```

### Status Codes

* 200 OK

---

## GET /record/:id

### Description

Returns a single employee record.

### Request Parameters

```text
id = MongoDB ObjectId
```

### Status Codes

* 200 OK
* 404 Not Found

---

## POST /record

### Description

Creates a new employee record.

### Request Body

```json
{
  "name": "John",
  "position": "Software Engineer",
  "level": "Junior"
}
```

### Status Codes

* 201 Created
* 400 Bad Request

---

## PATCH /record/:id

### Description

Updates an existing employee record.

### Request Body Example

```json
{
  "position": "Senior Software Engineer 2"
}
```

### Status Codes

* 200 OK
* 404 Not Found

---

## DELETE /record/:id

### Description

Deletes an employee record.

### Status Codes

* 200 OK
* 404 Not Found

---

# 9. Data Model

## Record

```json
{
  "_id": "ObjectId",
  "name": "string",
  "position": "string",
  "level": "string"
}
```

### Field Definitions

| Field    | Type     | Description               |
| -------- | -------- | ------------------------- |
| _id      | ObjectId | Unique MongoDB identifier |
| name     | String   | Employee name             |
| position | String   | Employee position         |
| level    | String   | Employee level            |

### Example Records

```json
{
  "name": "John",
  "position": "Software Engineer",
  "level": "Junior"
}
```

```json
{
  "name": "Sean",
  "position": "Software Engineer",
  "level": "Mid"
}
```

```json
{
  "name": "Matthew",
  "position": "Senior Software Engineer 2",
  "level": "Senior"
}
```

---

# 10. Tech Stack Justification

## Node.js

Node.js provides a server-side JavaScript runtime environment suitable for building REST APIs and handling asynchronous operations.

## Express

Express simplifies API development through routing, middleware support, and lightweight server configuration.

## MongoDB Atlas

MongoDB Atlas provides a cloud-hosted NoSQL database service that can store employee records and is accessible from the backend application.

## MongoDB Node.js Driver

The MongoDB driver enables communication between the Node.js application and MongoDB Atlas.

## dotenv

dotenv allows database connection information to be stored securely in environment variables rather than hardcoded into source files.

## CORS

CORS middleware enables cross-origin HTTP requests needed for API access and testing.

## Postman

Postman provides an interface for testing and validating REST API endpoints.

## GitHub Codespaces

GitHub Codespaces provides the cloud-based development environment used to build and run the application.

---

# 11. Open Questions

## AI-Generated Questions

1. Should authentication and authorization be required before allowing CRUD operations?
2. What validation rules should be applied to employee data fields?
3. Should deleted employee records be permanently removed or soft deleted?
4. What error response format should be returned when requests fail?
5. Should API rate limiting be implemented?

## Original Questions

6. Should employee names be required to be unique within the system?
7. Should position values be restricted to a predefined list of job titles?
8. Should the application record timestamps for when employee records are created and updated?

---

# Verification Checklist

* Express server runs on port 5050.
* Environment variables load from config.env.
* MongoDB Atlas connection uses ATLAS_URI.
* CRUD routes exist under /record.
* Collection name is records.
* CORS middleware is enabled.
* Postman tests include CreateRecord, GetRecords, DeleteRecord, and UpdateRecord.
* Required screenshots are captured and uploaded.
