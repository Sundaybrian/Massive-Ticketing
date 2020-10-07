## Massive Ticketing

A fullstack app (mobile, frontend, backend) to keep track of tickets raised by users

## Backend Setup

- Create `.env` with your values. A sample env is provided
- `npm install ` to install dependencies
- You can run the db as a container using `docker-compose up`
- Migrate db using `npm run migrate`

### Entities

- All entities will have, created_at, updated_at and deleted at

* [*] User base class
* [*] Auth
* [*] Roles

- [*] Roles_User

* [*] Ticket
* [*] Ticket Type
* [*] Ticket Subs
* [*] Status
* [*] Resolution
* [*] Ticket History
* [] Locations
* [*] Departments
* [*] SLA

## commands

sudo docker-compose up
sudo docker volume rm \$(sudo docker volume ls -q)
sudo docker system prune -a
sudo docker-compose down -v

## knex

npm i knex
npx knex init ## initialize knex

## knex migrations

npx knex migrate:make migration_name
npx knex migrate:latest
npx knex migrate:rollback

## eslint

npx eslint --init
