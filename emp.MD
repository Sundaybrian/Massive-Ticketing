# Fullstack Ticketing System

Create a fullstack crm ticketing system

### Devops

- [] Circleci
- [*] docker

### Backend

- [] nodejs
- [] postgresql
- [] apis
- [] objection.js / knex.js
- [] firebase authentication and cloud storage / Custom auth system
- [] Redis / Memcached

### Frontend

- [] React
- [] material ui
- [] Redux / Context Api
- [] firebase

### Mobile

- [] Ionic
- [] Angular
- [] Rxjs
- [] firebase

### Entities

- All entities will have, created_at, updated_at and possibly deleted at
- Possibility for only soft deletions

* [*] User base class
* [*] Auth
* [*] Roles
* [*] Roles_User
* [*] Ticket
* [*] Ticket Type
* [*] Ticket Subs
* [*] Status
* [] Locations
* [*] Departments
* [*] SLA

### Entities For Chat

- This will be done with firebase firestore, cloud functions and storage. kwaniii

### 

- [] firebase for the chat messages
* [] Chat Messages

## commands

- sudo docker-compose up
- sudo docker volume rm \$(sudo docker volume ls -q)
- sudo docker system prune -a
- sudo docker-compose down -v

## knex

- npm i knex
- npx knex init ## initialize knex

## knex migrations

- npx knex migrate:make migration_name // create a migration file
- npx knex migrate:latest // migrate the most recent migration file
- npx knex migrate:rollback
- npx knex seed:make initial

## eslint

- npx eslint --init

### Hosting

- [] Heroku
- [] firebase cloud functions
