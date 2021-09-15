# Starter Code V2

Starter Code for Blueprint projects, brought to you by the UW Blueprint Internal Tools team! 🏗️

Starter Code is an easy to set up, flexible, and customizable bootstrap that aims to encourage best development practices and provide baseline implementations of features common to UW Blueprint projects. 24 different stack combinations are supported, allowing "mix and match" between our most commonly used technologies. For more information on the motivation and design decisions behind Starter Code, please check out the home page of our [documentation site](https://uwblueprint.github.io/starter-code-v2)!

Teams should adopt Starter Code and use it as a foundation to get their projects off the ground faster, and as a guideline for how to structure their applications. We hope Starter Code will help project teams output higher quality and maintainable code, and allow them to focus on building cool, interesting features instead of setting up and doing boilerplate work. Put simply, Starter Code is here to help us deliver more value to our NPO partners.

## Stack Choices
**Backend Language:** TypeScript (Express.js on Node.js) or Python (with Flask)<br>
**Backend API:** REST or GraphQL<br>
**Database:** PostgreSQL or MongoDB<br>
**User Auth:** Opt-in or opt-out<br>
**File Storage:** Opt-in or opt-out<br>

The provided frontend is a React application written in TypeScript.

## Key Features & Benefits
* Many stack combinations, built with separation of concerns in mind to make it easy to swap out layers of the codebase as needed
* Prebuilt authentication and authorization services, including Google OAuth integration
* Basic CRUD services via PostgresSQL and MongoDB ORMs
* Email service
* File storage service
* CSV export utilities
* Out of the box support for frontend deployment to Firebase Hosting via CI/CD pipelines
* Lots of examples of programming best practices in both the frontend and backend


## Table of Contents
* 📝 [Documentation](#documentation)
* ❗❗ [Reporting Issues](#reporting-issues)
* 👨‍💻 [Getting Started: Users](#getting-started-users)
* 👷 [Getting Started: Internal Tools Developers](#getting-started-internal-tools-developers)
  * ✔️ [Prerequisites](#prerequisites)
  * ⚙️ [Set up](#set-up)
* 🚀 [Creating a Release](#creating-a-release)
* 🧰 [Useful Commands](#useful-commands)
  * ℹ️ [Get Names & Statuses of Running Containers](#get-names--statuses-of-running-containers)
  * 💽 [Accessing PostgreSQL Database](#accessing-postgresql-database)
  * ✨ [Linting & Formatting](#linting--formatting)
  * 🧪 [Running Tests](#running-tests)
* ✍️ [Updating Documentation](#updating-documentation)
* 🌳 [Version Control Guide](#version-control-guide)
  * 🌿 [Branching](#branching)
  * 🔒 [Commits](#commits)

## Documentation

https://uwblueprint.github.io/starter-code-v2


## Reporting Issues

You can open an issue in this GitHub repository, or message the #internal-tools-help channel in UW Blueprint’s Slack workspace.


## Getting Started: Users

Please follow the instructions in this [guide](https://uwblueprint.github.io/starter-code-v2/docs/getting-started) to generate and set up Starter Code. Starter Code must be preprocessed through the [`create-bp-app`](https://www.npmjs.com/package/@uwblueprint/create-bp-app) CLI tool before being used, so **please do not clone and run this repository directly**.

---

## Getting Started: Internal Tools Developers

### Prerequisites

* Install Docker Desktop ([MacOS](https://docs.docker.com/docker-for-mac/install/) | [Windows (Home)](https://docs.docker.com/docker-for-windows/install-windows-home/) | [Windows (Pro, Enterprise, Education)](https://docs.docker.com/docker-for-windows/install/) | [Linux](https://docs.docker.com/engine/install/#server)) and ensure that it is running
* Ask a member of the Internal Tools team to be added to our Firebase and MongoDB Atlas projects
* Set up Vault client for secret management, see instructions [here](https://www.notion.so/uwblueprintexecs/Secret-Management-2d5b59ef0987415e93ec951ce05bf03e)


### Set up

1. Clone this repository and `cd` into the project folder
```bash
git clone https://github.com/uwblueprint/starter-code-v2.git
cd starter-code-v2
```
2. Pull secrets from Vault
```
vault kv get -format=json kv/internal-tools | python update_secret_files.py
```
3. Generate a Firebase service account private key. Go to our project in the [Firebase console](https://console.firebase.google.com), click "Project settings" > "Service accounts" > "Generate private key", wait for a file to be downloaded. Copy the file into `/backend/typescript/` **and** `/backend/python`, and rename both to **`firebaseServiceAccount.json`**
4. Comment out one of the backend services in `docker-compose.yml`
5. In the root `.env` file, change the name of the MongoDB database according to the backend you're using: either `typescript-test` or `python-test`
6. If using the Python backend, update the email address and display name on lines 23-24 in `backend/python/app/rest/auth_routes.py` to be `internaltools@uwblueprint.org` and `Internal Tools` respectively
7. Run the application
```bash
docker-compose up --build
```

The backend runs at http://localhost:5000 and the frontend runs at http://localhost:3000. By default, we use GraphQL (with TypeScript backend), REST (with Python backend), MongoDB, with user auth.


## Creating a Release
To update the release branch with commits from main:
1. Create a new branch off the release branch
2. Merge main into the new branch
3. Open a PR from your new branch -> release branch
4. Reviewers should be able to see just the changes from the new main commits
5. Merge the PR, it should just show up as a single commit in the commit history of the release branch
6. Tag the most recent `main` commit included in the release
```bash
git tag <semver> <short-hash-of-main-commit>
git push origin --tags
```


## Useful Commands

### Get Names & Statuses of Running Containers
```bash
docker ps
```

### Accessing PostgreSQL Database

```bash
# run a bash shell in the container
docker exec -it <container-name> /bin/bash

# in container now
psql -U postgres -d starter-code-v2

# in postgres shell, some common commands:
# display all table names
\dt
# quit
\q
# you can run any SQL query, don't forget the semicolon!
SELECT * FROM <table-name>;
```

### Linting & Formatting
Python backend:
```bash
docker exec -it <container-name> /bin/bash -c "black ."
```

TypeScript backend and frontend:
```bash
# linting & formatting warnings only
docker exec -it <container-name> /bin/bash -c "yarn lint"

# linting with fix & formatting
docker exec -it <container-name> /bin/bash -c "yarn fix"
```

### Running Tests
Python backend:
```bash
docker exec -it <container-name> /bin/bash -c "pip install -e . && pytest"
```

TypeScript backend and frontend:
```bash
docker exec -it <container-name> /bin/bash -c "yarn test"
```


## Updating Documentation

To update documentation, checkout the `gh-pages` branch:
```bash
git checkout gh-pages
```

All documentation should be added to the `docs` folder. After making changes, commit and push to GitHub. The changes will be automatically deployed.

We use Jekyll to build the site, so you will need to install some additional dependencies to run the site locally. See this [article](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll) for more details.

To run locally:
```bash
bundle exec jekyll serve
```

## Version Control Guide

### Branching
* Branch off of `main` for all feature work and bug fixes, creating a "feature branch". Prefix the feature branch name with your name. The branch name should be in kebab case and it should be short and descriptive. E.g. `sherry/readme-update`
* To integrate changes on `main` into your feature branch, **use rebase instead of merge**

```bash
# currently working on feature branch, there are new commits on main
git pull origin main --rebase

# if there are conflicts, resolve them and then:
git add .
git rebase --continue

# force push to remote feature branch
git push -f
```

### Commits
* Commits should be atomic (guideline: the commit is self-contained; a reviewer could make sense of it even if they viewed the commit diff in isolation)
* Trivial commits (e.g. fixing a typo in the previous commit, formatting changes) should be squashed or fixup'd into the last non-trivial commit

```bash
# last commit contained a typo, fixed now
git add .
git commit -m "Fix typo"

# fixup into previous commit through interactive rebase
# x in HEAD~x refers to the last x commits you want to view
git rebase -i HEAD~2
# text editor opens, follow instructions in there to fixup

# force push to remote feature branch
git push -f
```

* Commit messages and PR names are descriptive and written in **imperative tense**<sup>1</sup>. The first word should be capitalized. E.g. "Create user REST endpoints", not "Created user REST endpoints"
* PRs can contain multiple commits, they do not need to be squashed together before merging as long as each commit is atomic. Our repo is configured to only allow squash commits to `main` so the entire PR will appear as 1 commit on `main`, but the individual commits are preserved when viewing the PR.

---

1: From Git's own [guidelines](https://github.com/git/git/blob/311531c9de557d25ac087c1637818bd2aad6eb3a/Documentation/SubmittingPatches#L139-L145)
