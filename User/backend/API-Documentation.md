# ByteBattles Backend

Description for Springboot APIs.

Backend is running on: http://localhost:8000/

## Table of Contents

- [Endpoints](#endpoints)
  - [Login](#login)
  - [Register](#register)
  - [Verify](#verify)
  - [Problem](#problem)
  - [Tag](#tag)
  - [Submission](#submission)

## Endpoints

### Login

#### POST /auth/login

Endpoint for user authentication.

#### GET /user

Retrieve user information.

#### GET /admin

Retrieve admin information.

### Register

#### POST /auth/register

Endpoint for user registration.

### Verify

#### GET /verify?code={randomCode}

Endpoint for verifying user registration using a random code.

### Problem

#### POST /problems

Create a new problem.

#### GET /problems

Retrieve a list of problems.

#### PUT /problems/{id}

Update an existing problem.

#### DELETE /problems/{id}

Delete a problem by ID.

#### GET /problems/{id}

Retrieve details of a specific problem by ID.

### Tag

#### POST /tags

Create a new tag.

#### GET /tags

Retrieve a list of tags.

#### PUT /tags/{id}

Update an existing tag.

#### DELETE /tags/{id}

Delete a tag by ID.

#### GET /tags/{id}

Retrieve details of a specific tag by ID.

### Submission

#### POST /submissions

Create a new submission.

#### GET /submissions

Retrieve a list of submissions.

#### PUT /submissions/{id}

Update an existing submission.

#### DELETE /submissions/{id}

Delete a submission by ID.

#### GET /submissions/{id}

Retrieve details of a specific submission by ID.
