# ByteBattles Database Schema

### Table of Contents

- [ByteBattles Database Schema](#bytebattles-database-schema)
    - [Table of Contents](#table-of-contents)
  - [Entities](#entities)
    - [User](#user)
    - [Problem](#problem)
    - [Submission](#submission)
    - [TestCase](#testcase)
    - [Tag](#tag)
    - [ProblemTag (Associative Entity)](#problemtag-associative-entity)
    - [UserProblem (Associative Entity)](#userproblem-associative-entity)
    - [Admin](#admin)
    - [Contest (For Live Contest Functionality)](#contest-for-live-contest-functionality)
    - [ContestProblem (Associative Entity)](#contestproblem-associative-entity)
    - [ContestParticipant (Associative Entity)](#contestparticipant-associative-entity)
    - [ContestSubmission (Associative Entity)](#contestsubmission-associative-entity)

## Entities

### User
- UserID (Primary Key)
- Name
- Username
- Email
- Password (hashed)

### Problem
- Title
- Description
- Constraints
- Difficulty Level (Easy, Medium, Hard)
- ProblemID (Primary Key)

### Submission
- SubmissionID (Primary Key)
- UserID (Foreign Key referencing User)
- ProblemID (Foreign Key referencing Problem)
- Language
- Submission Date
- Result (Accepted, Wrong Answer, Runtime Error, etc.)

### TestCase
- TestCaseID (Primary Key)
- ProblemID (Foreign Key referencing Problem)
- Input
- Expected Output

### Tag
- TagID (Primary Key)
- Name

### ProblemTag (Associative Entity)
- ProblemID (Foreign Key referencing Problem)
- TagID (Foreign Key referencing Tag)

### UserProblem (Associative Entity)
- UserID (Foreign Key referencing User)
- ProblemID (Foreign Key referencing Problem)
- SubmissionID (Foreign Key referencing Submission)

### Admin
- AdminID
- Name
- Password

### Contest (For Live Contest Functionality)
- ContestID (Primary Key)
- Title
- Description
- Start Time
- End Time
- OrganizerID (Foreign Key referencing User)

### ContestProblem (Associative Entity)
- ContestID (Foreign Key referencing Contest)
- ProblemID (Foreign Key referencing Problem)

### ContestParticipant (Associative Entity)
- ContestID (Foreign Key referencing Contest)
- UserID (Foreign Key referencing User)
- Registration Time

### ContestSubmission (Associative Entity)
- SubmissionID (Foreign Key referencing Submission)
- ContestID (Foreign Key referencing Contest)
