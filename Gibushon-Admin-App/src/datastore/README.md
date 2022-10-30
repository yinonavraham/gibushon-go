# Data Store

## User Flows

### Create and set up an audition

1. Admin manages definitions of auditions
2. Admin creates a new audition based on a selected definition
   (the definition is then copied for the specific audition)
3. Admin assigns manager role in the new audition to users
4. Manager assigns roles to other users in the audition
5. Manager defines units and teams in the audition
6. Manager assigns a leader and reviewers to each team
7. HR adds candidates to the audition
8. HR assigns each candidate a number (status) and a team

## Security 

**Guidelines:**
1. Try to ease the permissions check by including the user ID in the requested document ID when applicable.
   This way there is no need to query any other collection in order to verify permissions.
2. User roles are managed in the `user_audition_roles` collection
3. Order of permissions check:
   1. Check based on  the user ID and the requested document ID
   2. Check for admin role - can read / write everything
   3. Check based on other roles

## Collections: Audition Definitions

### `definition_auditions`

The definitions of auditions. 
A single document for all the definition data.
Mainly includes:
```
id
candidate attributes definitions
parameter definitions
interview definition
summary definition
tests definitions
```

**Document ID:** `defaud{generated}`

**Permissions:**

| Admin | Manager | HR  | Leader | Reviewer |
|-------|---------|-----|--------|----------|
| `r/w` | -       | -   | -      | -        |

## Collections: Auditions

### `auditions`

The main details of an audition, mainly includes:
```
id
name
units (id, name)
teams (id, number, leader)
```

**Document ID:** `aud{generated}`

**Permissions:**

| Admin | Manager | HR  | Leader | Reviewer |
|-------|---------|-----|--------|----------|
| `r/w` | `r/w`   | `r` | `r`    | `r`      |

### `audition_definitions`:

The definition of an audition, copied from `definition_auditions`, includes the same information. 

**Document ID:** `{auditionID}`

**Permissions:**

| Admin | Manager | HR  | Leader | Reviewer |
|-------|---------|-----|--------|----------|
| `r/w` | `r`     | `r` | `r`    | `r`      |


### `audition_reviewers`:

The reviewers (including leaders) assigned to a given audition. Mainly includes: 
```
user ID
name
unit ID
team ID
role
```

**Document ID:** `{auditionID}_{userID}`

**Permissions:**

| Admin | Manager | HR  | Leader | Reviewer |
|-------|---------|-----|--------|----------|
| `r/w` | `r/w`   | `r` | `r`    | `r`      |

**Notes:**
1. The format of the ID ensures a given user can be a reviewer in a given audition at most once
2. It makes it easy to fetch a reviewer information based on the user ID and audition ID.
3. Having the audition ID in the document ID enables permission check based on it
4. The user should not be able to update even his own reviewer information because it includes the team assignment and the role

### `reviewer_candidates`

The candidates basic review data by a given reviewer
```
reviewer ID
candidate ID
active
quit time & reason
parameters (comments, scores)
comments
```

**Document ID:** `{candidateID}_{reviewerID}`

**Permissions:**

| Admin | Manager | HR  | Leader | Reviewer |
|-------|---------|-----|--------|----------|
| `r/w` | `r`     |     | `r/w`  | `r/w`    |

**Notes:**
1. The ID includes the reviewer ID, which by itself includes the user ID
2. A reviewer / leader can write review data on candidates
3. The ID ensures there is at most one entry for a candidate per reviewer

### `reviewer_team_tests`

A reviewer creates tests for the team he/she reviews. 
This includes basic information on the test and used to list the tests.
See `reviewer_candidate_tests` for the actual review data.

```
id
team ID
test name
test definition ID
start time
```

**Document ID:** `{generated}_{reviewerID}`

**Permissions:**

| Admin | Manager | HR  | Leader | Reviewer |
|-------|---------|-----|--------|----------|
| `r/w` | `r`     |     | `r/w`  | `r/w`    |

**Notes:**
1. The ID includes the reviewer ID, which by itself includes the user ID

### `reviewer_candidate_tests`

This collection includes the review details on candidates in each test.
It adds to the data in the `reviewer_team_tests` collection. 

```
candidate ID
team test ID
parameters (comments, scores)
comments
score
```

**Document ID:** `{candidateID}_{teamTestID}`

**Permissions:**

| Admin | Manager | HR  | Leader | Reviewer |
|-------|---------|-----|--------|----------|
| `r/w` | `r`     |     |        | `r/w`    |

**Notes:**
1. The ID includes the reviewer ID, which by itself includes the user ID
2. The ID ensures there is at most one entry for candidate per given test

### `reviewer_candidate_summaries`

Summary that each reviewer fills on the candidates he/she reviewed. 

```
candidate ID
comments
parameters
score (value + per unit)
```

**Document ID:** `{candidateID}_{reviewerID}`

**Permissions:**

| Admin | Manager | HR  | Leader | Reviewer |
|-------|---------|-----|--------|----------|
| `r/w` | `r`     |     | `r/w`  | `r/w`    |

**Notes:**
1. The ID includes the reviewer ID, which by itself includes the user ID
2. The ID ensures there is at most one entry for candidate per reviewer

### `reviewer_candidate_interviews`

Interview summary that each reviewer fills on the candidates he/she interviewed.

```
candidate ID
comments
parameters
score (value + per unit)
```

**Document ID:** `{candidateID}_{reviewerID}`

**Permissions:**

| Admin | Manager | HR  | Leader | Reviewer |
|-------|---------|-----|--------|----------|
| `r/w` | `r`     |     | `r/w`  | `r/w`    |

### `audition_candidates`

Personal details on candidates in a given audition

```
id
personal number (protected)
first name (protected)
last name (protected)
attributes
```

**Document ID:** `{auditionID}_{generated}`

**Permissions:**

| Admin | Manager | HR    | Leader | Reviewer |
|-------|---------|-------|--------|----------|
| `r/w` | `r/w`   | `r/w` |        |          |


### `audition_candidate_photos`

Path to the photo of candidates in the storage

```
candidate ID
photo storage path
```

**Document ID:** `{candidateID}`

**Permissions:**

| Admin | Manager | HR    | Leader | Reviewer |
|-------|---------|-------|--------|----------|
| `r/w` | `r/w`   | `r/w` | `r/w`  | `r/w`    |

### `audition_candidate_statuses`

The status of candidates in the audition 

```
candidate ID
number
team ID
active
quit time & reason
```

**Document ID:** `{candidateID}`

**Permissions:**

| Admin | Manager | HR    | Leader | Reviewer |
|-------|---------|-------|--------|----------|
| `r/w` | `r/w`   | `r/w` | `r`    | `r`      |

### `audition_candidate_summaries`

The overall summary of candidates in an audition.
This is generated based on all reviewer summaries and interviews.

```
candidate ID
test score
test comments
interview score
interview comments
sociometric score
final score
parameter scores     
```

**Document ID:** `{candidateID}`

**Permissions:**

| Admin | Manager | HR  | Leader | Reviewer |
|-------|---------|-----|--------|----------|
| `r/w` | `r/w`   | `r` |        |          |

### Users and Roles

Collections:

```
user_profiles:
    user id
    name
    email
    photo url
user_audition_roles:
    user id
    audition id
    audition name
    audition created at
    roles
```