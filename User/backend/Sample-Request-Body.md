# Endpoints

## Problems

### POST /problems

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

### PUT /problems/{id}

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

**Note:** Deleting a problem will delete all the submissions related to it.

## Submissions

### POST /submissions

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

### PUT /submissions/{id}

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