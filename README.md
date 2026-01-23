# Task Management Backend

Scalable backend service for a real-time team and task management platform,
built with Node.js and Express to support collaboration, messaging,
notifications, and presence tracking.

## Key Features
- REST APIs for users, teams, projects, and tasks
- Real-time collaboration using WebSockets
- Messaging and notifications via Redis Pub/Sub
- User presence tracking (online/offline)
- Event-driven architecture with asynchronous processing
- JWT-based authentication and authorization
- Caching layer to reduce database load

## Tech Stack
- Node.js
- Express.js
- WebSockets (Socket.IO / ws)
- PostgreSQL
- Redis
- Docker & Docker Compose
- Nginx

## Architecture Overview
- Express REST APIs handle core CRUD operations
- WebSockets enable real-time updates and collaboration
- Redis Pub/Sub broadcasts events across services
- PostgreSQL stores persistent application data
- Containerized services for scalable deployment

## Getting Started

### Prerequisites
- Node.js (v16+)
- Docker & Docker Compose

### Setup
```bash
git https://github.com/Sagar2inf/Teamsync-backend
cd Teamsync-backend
docker-compose up --build
