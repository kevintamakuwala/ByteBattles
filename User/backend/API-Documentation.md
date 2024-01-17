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
  - [Testcase](#testcase)
  - [Contest](#contest)

## Endpoints

## Login

#### POST ```/auth/login```

Endpoint for user authentication.

#### GET ```/user```

Retrieve user information.

#### GET ```/admin```

Retrieve admin information.

## Register

#### POST ```/auth/register```

Endpoint for user registration.

## Verify

#### GET ```/verify?code={randomCode}```

Endpoint for verifying user registration using a random code.

## Problem

#### POST ```/problems```

Create a new problem.

#### GET ```/problems```

Retrieve a list of problems.

#### PUT ```/problems/{id}```

Update an existing problem.

#### DELETE ```/problems/{id}```

Delete a problem by ID.

#### GET ```/problems/{id}```

Retrieve details of a specific problem by ID.

#### PUT ```/problems/{id}/tags/{id}```
Add Tag to a Problem.

## Tag

#### POST ```/tags```

Create a new tag.

#### GET ```/tags```

Retrieve a list of tags.

#### PUT ```/tags/{id}```

Update an existing tag.

#### DELETE ```/tags/{id}```

Delete a tag by ID.

#### GET ```/tags/{id}```

Retrieve details of a specific tag by ID.

## Submission

#### POST ```/submissions```

Create a new submission.

#### GET ```/submissions```

Retrieve a list of submissions.

#### PUT ```/submissions/{id}```

Update an existing submission.

#### DELETE ```/submissions/{id}```

Delete a submission by ID.

#### GET ```/submissions/{id}```

Retrieve details of a specific submission by ID.


## Testcase

#### POST ```/testcases```

Create a new testcase.

#### GET ```/testcases```

Retrieve a list of testcase.

#### PUT ```/testcases/{id}```

Update an existing testcase.

#### DELETE ```/testcases/{id}```

Delete a testcase by ID.

#### GET ```/testcases/{id}```

Retrieve details of a specific testcase by ID.


## Contest

#### POST ```/contests```

Create a new contest.

#### GET ```/contests```

Retrieve a list of contests.

#### PUT ```/contests/{id}```

Update an existing contest.

#### DELETE ```/contests/{id}```

Delete a contest by ID.

#### GET ```/contests/{id}```

Retrieve details of a specific contest by ID.

#### PUT ```/contests/{id}/problems/{id}```
Add problem to a contest.

#### PUT ```/contests/{id}/users/{id}```
Add user to a contest.