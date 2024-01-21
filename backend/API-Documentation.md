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

#### PUT ```/problems/${problemId}```

Update an existing problem.

#### DELETE ```/problems/${problemId}```

Delete a problem by ID.

#### GET ```/problems/${problemId}```

Retrieve details of a specific problem by ID.

#### PUT ```/problems/${problemId}/tags/${tagId}```
Add Tag to a Problem.

#### PUT ```/problems/${problemId}/tags```
Add multiple Tags to a Problem.

## Tag

#### POST ```/tags```

Create a new tag.

#### GET ```/tags```

Retrieve a list of tags.

#### PUT ```/tags/${tagId}```

Update an existing tag.

#### DELETE ```/tags/${tagId}```

Delete a tag by ID.

#### GET ```/tags/${tagId}```

Retrieve details of a specific tag by ID.

## Submission

#### POST ```/submissions```

Create a new submission.

#### GET ```/submissions```

Retrieve a list of submissions.

#### PUT ```/submissions/${submissionId}```

Update an existing submission.

#### DELETE ```/submissions/${submissionId}```

Delete a submission by ID.

#### GET ```/submissions/${submissionId}```

Retrieve details of a specific submission by ID.


## Testcase

#### POST ```/testcases```

Create a new testcase.

#### GET ```/testcases```

Retrieve a list of testcase.

#### PUT ```/testcases/${testcaseId}```

Update an existing testcase.

#### DELETE ```/testcases/${testcaseId}```

Delete a testcase by ID.

#### GET ```/testcases/${testcaseId}```

Retrieve details of a specific testcase by ID.


## Contest

#### POST ```/contests```

Create a new contest.

#### GET ```/contests```

Retrieve a list of contests.

#### PUT ```/contests/${contestId}```

Update an existing contest.

#### DELETE ```/contests/${contestId}```

Delete a contest by ID.

#### GET ```/contests/${contestId}```

Retrieve details of a specific contest by ID.

#### PUT ```/contests/${contestId}/problems/${problemId}```
Add problem to a contest.

#### PUT ```/contests/${contestId}/problems```
Add multiple problems to a Contest.

#### PUT ```/contests/${contestId}/users/${userId}```
Add user to a contest.

#### PUT ```/contests/${contestId}/users```
Add multiple Users to a Contest.
