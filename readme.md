## Massive Ticketing

A fullstack app (mobile, frontend, backend) to keep track of tickets raised by users

## Backend Setup

- Create `.env` with your values. A sample env is provided
- `npm install ` to install dependencies
- You can run the db as a container using `docker-compose up`
- Migrate db using `npm run migrate`

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
* [*] Dep

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
- npx knex migrate:latest // migrate the most recent migration file\
- npx knex migrate:latest -- --debug // show the sql
- npx knex migrate:rollback
- npx knex seed:make initial
- npx knex seed:run

## eslint

- npx eslint --init
