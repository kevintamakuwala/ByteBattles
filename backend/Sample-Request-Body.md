# Endpoints

## Problems

### POST `/problems`

Create a new problem.

#### Request Body

```json
{
  "title": "Searching",
  "description": "Search in this array",
  "constraints": "1<=N<=1e5",
  "difficultyLevel": "easy"
}
```

### PUT `/problems/{problemId}`

Update an existing problem.

#### Request Body

```json
{
  "title": "Sorting",
  "description": "Sort this array using merge sort",
  "constraints": "1<=N<=1e5",
  "difficultyLevel": "HARD"
}
```
### PUT `/problems/{problemId}/tags`

Add multiple tags to a problem.

#### Request Body

```json
{
  "tags":[
    {
      "name":"math"
    },
    {
      "name":"greedy"
    },
    {
      "name":"array"
    }
  ]
}
```

**Note:** Deleting a problem will delete all the submissions related to it.

## Submissions

### POST `/submissions`

Create a new submission.

#### Request Body

```json
{
  "language": "java",
  "result": "WA",
  "problem": {
    "problemId": 5
  },
  "applicationUser": {
    "userId": 2
  }
}
```

### PUT `/submissions/{submissionId}`

**Note:** Cannot update problem and user details but required to pass in the body.

#### Request Body

```json
{
  "language": "C++",
  "result": "WA",
  "problem": {
    "problemId": 5
  },
  "applicationUser": {
    "userId": 2
  }
}
```

## TestCases

### POST `/testcases`

Create a new TestCase.

#### Request Body

```json
{
  "input": 5,
  "expectedOutput": 25,
  "problem": {
    "problemId": 5
  }
}
```

### PUT `/testcases/{testcaseId}`

#### Request Body

```json
{
  "input": 7,
  "expectedOutput": 49,
  "problem": {
    "problemId": 5
  }
}
```

## Tags

### POST `/tags`

Create a new Tag.

#### Request Body

```json
{
  "name": "math"
}
```

### PUT `/tags/{tagId}`

#### Request Body

```json
{
  "name": "basic"
}
```

## Contests

### POST `/contests`

Create a new Contest.

#### Request Body

```json
{
  "title": "Weekly Contest-1",
  "description": "3 hours long coding contest",
  "startTime": [
    2024,
    1,
    17,
    20,
    0,
    0,
    0
  ],
  "endTime": [
    2024,
    1,
    17,
    23,
    0,
    0,
    0
  ]
}
```

### PUT `/contests/{contestId}`

#### Request Body

```json
{
  "title": "Weekly Contest-1",
  "description": "3.5 hours long coding contest",
  "startTime": [
    2024,
    1,
    18,
    20,
    0,
    0,
    0
  ],
  "endTime": [
    2024,
    1,
    18,
    23,
    30,
    0,
    0
  ]
}
```
### PUT `/contests/${contestId}/users`
Add multiple users to a contest

#### Request Body
```json
{
  "users": [
    {
      "username": "admin"
    }
  ]
}
```

### PUT `/contests/${contestId}/problems`
Add multiple problems to a contest
#### Request Body
```json
{
  "problems": [
    {
      "title": "Addition"
    }
  ]
}
```

