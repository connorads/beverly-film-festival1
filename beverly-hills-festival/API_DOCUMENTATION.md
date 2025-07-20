# Beverly Hills Film Festival API Documentation

## Base URL
- Development: `http://localhost:3000/api`

## Authentication

All authenticated endpoints use HTTP-only cookies. The `auth-token` cookie is automatically set on login/register.

### Endpoints

#### POST `/api/auth/login`
Login to the system.

**Request Body:**
```json
{
  "email": "admin@beverlyhillsfilmfest.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "user": {
    "id": "admin-1",
    "email": "admin@beverlyhillsfilmfest.com",
    "name": "Festival Admin",
    "role": "admin"
  },
  "token": "session-token"
}
```

#### POST `/api/auth/register`
Register a new user (buyers and submitters only).

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "buyer" // or "submitter"
}
```

#### POST `/api/auth/logout`
Logout the current user.

#### GET `/api/auth/me`
Get the current authenticated user.

## Films

#### GET `/api/films`
Get all approved films (public endpoint).

**Query Parameters:**
- `status`: Filter by status (pending, approved, rejected)
- `submitterId`: Filter by submitter ID

#### POST `/api/films`
Submit a new film (submitters only).

**Request Body:**
```json
{
  "title": "My Amazing Film",
  "director": "John Director",
  "synopsis": "A compelling story...",
  "duration": 120,
  "genre": "Drama",
  "trailerUrl": "https://example.com/trailer",
  "posterUrl": "/images/poster.jpg"
}
```

#### GET `/api/films/[id]`
Get a specific film by ID.

#### PATCH `/api/films/[id]`
Update a film (admin or film owner).

## Tickets

#### GET `/api/tickets`
Get current user's tickets (buyers only).

#### POST `/api/checkout`
Purchase tickets (buyers only).

**Request Body:**
```json
{
  "filmId": "film-1",
  "quantity": 2,
  "sessionTime": "2024-03-15T19:00:00Z",
  "paymentMethod": "credit_card"
}
```

## Admin Endpoints

#### GET `/api/admin/films`
Get all films with enriched data (admin only).

#### GET `/api/admin/stats`
Get festival statistics (admin only).

**Response:**
```json
{
  "films": {
    "total": 10,
    "pending": 3,
    "approved": 6,
    "rejected": 1
  },
  "tickets": {
    "totalSold": 150,
    "totalRevenue": 3750,
    "averageTicketsPerFilm": 15
  },
  "genres": {
    "Drama": 4,
    "Comedy": 3,
    "Documentary": 3
  },
  "topFilms": [...]
}
```

## Submitter Endpoints

#### GET `/api/submitter/films`
Get submitter's own films with stats (submitter only).

## Buyer Endpoints

#### GET `/api/buyer/tickets`
Get buyer's tickets with QR codes (buyer only).

## Test Credentials

### Admin
- Email: `admin@beverlyhillsfilmfest.com`
- Password: `admin123`

### Submitter
- Email: `filmmaker@example.com`
- Password: `film123`

### Buyer
- Email: `buyer@example.com`
- Password: `buy123`

## Error Responses

All endpoints follow a consistent error format:

```json
{
  "error": "Error message here"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error