# :book: CCBC

Platform to view book reviews and book authors for the [Canadian Children's Book Centre](https://bookcentre.ca/). 



Made from [Starter Code](https://uwblueprint.github.io/starter-code-v2), brought to you by the UW Blueprint Internal Tools team! 🏗️


## Stack
**Frontend Language:** TypeScript (React)<br>
**Backend Language:** TypeScript (Express.js on Node.js)<br>
**Backend API:** REST<br>
**Database:** PostgreSQL<br>

## Table of Contents
* 👨‍💻 [Getting Started:](#getting-started)
  * ✔️ [Prerequisites](#prerequisites)
  * ⚙️ [Set up](#set-up)
  * ⬆️ [Updating Models](#updating-models)
* 🧰 [Useful Commands](#useful-commands)
  * ℹ️ [Get Names & Statuses of Running Containers](#get-names--statuses-of-running-containers)
  * 💽 [Accessing PostgreSQL Database](#accessing-postgresql-database)
  * ✨ [Linting & Formatting](#linting--formatting)
  * 🧪 [Running Tests](#running-tests)
  * :outbox_tray: [Running Migrations](#running-migrations)
* 🌳 [Version Control Guide](#version-control-guide)
  * 🌿 [Branching](#branching)
  * 🔒 [Commits](#commits)


## Getting Started:

### Prerequisites

* Install Docker Desktop ([MacOS](https://docs.docker.com/docker-for-mac/install/) | [Windows (Home)](https://docs.docker.com/docker-for-windows/install-windows-home/) | [Windows (Pro, Enterprise, Education)](https://docs.docker.com/docker-for-windows/install/) | [Linux](https://docs.docker.com/engine/install/#server)) and ensure that it is running
* Install [Node](https://nodejs.org/en/) latest LTS
* Set up Vault client for secret management, see instructions [here](https://www.notion.so/uwblueprintexecs/Secret-Management-2d5b59ef0987415e93ec951ce05bf03e). Only perform the steps up to the point where you login on terminal and the ui. No need to do anything from "Configure dev tools for your project repo" onwards


### Set up

1. Clone this repository and `cd` into the project folder
```bash
git clone https://github.com/uwblueprint/ccbc.git
cd ccbc
```
2. Pull secrets from Vault
```
vault kv get -format=json kv/ccbc | python update_secret_files.py
```

You should have four new files in your repo after this:

- `.env`
- `frontend/.env`
- `backend/typescript/firebaseServiceAccount.json`
- `backend/typescript/nodemailer.config.ts`

4. Run the application

```bash
docker-compose up --build
```

Note: if you have already built the project before, run this first:

```
docker-compose down --volumes
```

This will take down the database and all it's data too.
If you don't need to rebuild packages between switching branches, you probably don't _need_ `--volumes`.

## Updating Models
Interface validation is done using the [ts-interface-checker libaray](https://github.com/gristlabs/ts-interface-checker). For that, you need to generate an interface checker file every time a change is made to interface in [IReviewService.ts](https://github.com/uwblueprint/ccbc/blob/development/backend/typescript/services/interfaces/IReviewService.ts) by executing the command:
```
docker-compose exec ts-backend bash
```

and then executing the following command inside the container:
```
`npm bin`/ts-interface-builder services/interfaces/IReviewService.ts -o services/interfaces/checkers
```

## Useful Commands

### Get Names & Statuses of Running Containers
```bash
docker ps
```

### Starting Up Containers in a Background Process
Add the `-d` flag to start up a container in a daemon process
```bash
# For starting up containers
docker-compose up -d

# For building and starting up containers
docker-compose up --build -d
```

### Accessing PostgreSQL Database

```bash
# run a bash shell in the container
docker-compose exec db bash

# in container now
psql -U postgres -d ccbc

# in postgres shell, some common commands:
# display all table names
\dt
# quit
\q
# you can run any SQL query, don't forget the semicolon!
SELECT * FROM <table-name>;
```

### Linting & Formatting

TypeScript backend and frontend:
```bash
# linting & formatting warnings only
docker-compose exec ts-backend yarn lint  # backend
docker-compose exec frontend yarn lint    # frontend

# linting with fix & formatting
docker-compose exec <service-name> yarn fix
# service-name: ts-backend or frontend
```

### Running Tests

TypeScript backend and frontend:
```bash
docker-compose exec <service-name> yarn test
# service-name: ts-backend or frontend
```

### Running Migrations

1. Run both the TypeScript backend and database containers, you can use 
```bash
docker-compose up
```
2. `cd` into the backend/typescript folder
```bash
cd backend/typescript
```

3. Run a bash shell in the TypeScript backend container
```bash
# get container name
$ docker ps
# run a bash shell
$ docker-compose exec ts-backend bash  
```

4. Ensure you have migration files in the migrations folder

5. Run the following command
```bash
node migrate up
```


## Version Control Guide

### Branching
* Branch off of `development` for all feature work and bug fixes, creating a "feature branch". Prefix the feature branch name with your name. The branch name should be in kebab case and it should be short and descriptive. E.g. `tahmeed/new-feature`

### Commits
* Commits should be atomic (guideline: the commit is self-contained; a reviewer could make sense of it even if they viewed the commit diff in isolation)
* Trivial commits (e.g. fixing a typo in the previous commit, formatting changes) should be squashed or fixup'd into the last non-trivial commit

```bash
# last commit contained a typo, fixed now
git add .
git commit --amend -m "New commit message"

# Alternatively if you want to keep old message
git commit --amend --no-edit
```
**Note**: Amend rewrites the commit history in your repository: the old commit is replaced by a completely new one (a new and different commit object). This makes it very important that you **don't amend commits that you've already published** to a remote repository. Only do this for unpublished commits that you haven't yet pushed to github.

* Commit messages and PR names are descriptive and written in **imperative tense**<sup>1</sup>. The first word should be capitalized. E.g. "Create user REST endpoints", not "Created user REST endpoints"
* PRs can contain multiple commits, they do not need to be squashed together before merging as long as each commit is atomic.

---

1: From Git's own [guidelines](https://github.com/git/git/blob/311531c9de557d25ac087c1637818bd2aad6eb3a/Documentation/SubmittingPatches#L139-L145)
