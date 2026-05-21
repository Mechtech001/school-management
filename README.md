# School Management API

A simple REST API for managing school data, allowing users to add schools and retrieve a list of schools sorted by proximity to a given location.

## Live Demo & Resources

- **Live API URL:** https://school-management-guyk.onrender.com
- **Postman Collection:** [Download / View here](https://github.com/Mechtech001/school-management/blob/main/SchoolManagementAPI.postman_collection.json)

## Tech Stack

- **Node.js**
- **Express.js**
- **MySQL**
- **Deployed on:** Render

## Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database setup**
   - Create a MySQL database locally.
   - Run the SQL script found in `sql/schema.sql` against your database to create the required `schools` table.

4. **Environment variables**
   - Create a `.env` file in the root directory (you can use `.env.example` as a template).
   - Add your database credentials and preferred port:
     ```env
     PORT=3000
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=school_db
     ```

5. **Start the server**
   ```bash
   npm run dev
   ```

## API Documentation

### 1. Add a School

Adds a new school to the database.

- **Endpoint:** `POST /addSchool`
- **Content-Type:** `application/json`

**Request Body Example:**
```json
{
  "name": "Springfield Elementary",
  "address": "123 Main St, Springfield",
  "latitude": 39.7817,
  "longitude": -89.6501
}
```

**Success Response (201 Created):**
```json
{
  "message": "School added successfully",
  "id": 1
}
```

### 2. List Schools

Fetches all schools sorted by distance from the user's provided coordinates.

- **Endpoint:** `GET /listSchools`
- **Query Parameters:**
  - `latitude` (float) - User's current latitude
  - `longitude` (float) - User's current longitude

**Example Request:**
`GET /listSchools?latitude=39.7800&longitude=-89.6500`

**Success Response (200 OK):**
```json
{
  "schools": [
    {
      "id": 1,
      "name": "Springfield Elementary",
      "address": "123 Main St, Springfield",
      "latitude": 39.7817,
      "longitude": -89.6501,
      "distance_km": 0.19
    }
  ]
}
```
