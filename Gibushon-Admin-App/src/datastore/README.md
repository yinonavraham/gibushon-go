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
   1. Check based on the user ID and the requested document ID
   2. Check for admin role - can read / write everything
   3. Check based on other roles

## Collections: Audition Definitions

### `definition_auditions`

The definitions of auditions. 
A single document for all the definition data.

**Document ID:** `defaud{generated}`

**Main Fields:**
* id
* candidate attributes definitions
* parameter definitions
* interview definition
* summary definition
* tests definitions

**Permissions:**

* Admin - can read / write

## Collections: Auditions

### `auditions`

The main details of an audition.

**Document ID:** `aud{generated}`

**Main Fields:**
* id
* name
* units (id, name)
* teams (id, number, leader)

**Permissions:**

* Manager - can read / write, based on audition ID
* HR / Reviewer / Leader - can read, based on audition ID

### `audition_definitions`:

The definition of an audition, copied from `definition_auditions`, includes the same information.
Used mainly to limit access on the source collection. 

**Document ID:** `{auditionID}`

**Permissions:**

* Any role - can read, based on having any role on audition ID

### `audition_reviewers`:

The reviewers (including leaders) assigned to a given audition. Mainly includes: 

**Document ID:** `{auditionID}_{userID}`

**Main Fields:**
* user ID
* audition ID
* name
* unit ID
* team ID
* role

**Permissions:**

* Manager - can read and write, based on audition ID
* Any user - can read, based on user ID
* Any user - can read, based on having any role on audition ID

**Notes:**
1. The format of the ID ensures a given user can be a reviewer in a given audition at most once
2. It makes it easy to fetch a reviewer information based on the user ID and audition ID.
3. The user should not be able to update even his own reviewer information because it includes the team assignment and the role

### `reviewer_candidates`

The candidates basic review data by a given reviewer

**Document ID:** `{candidateID}_{reviewerID}` (i.e. `{auditionID}_{generated}_{auditionID}_{userID}`)

**Main Fields:**
* reviewer ID
* candidate ID
* active
* quit time & reason
* parameters (comments, scores)
* comments

**Permissions:**

* Manager - can read, based on the audition ID
* Any user - can read, based on the user ID
* Reviewer / Leader - can write, based on the user ID and the audition ID

**Notes:**
1. The ID ensures there is at most one entry for a candidate per reviewer

### `reviewer_team_tests`

A reviewer creates tests for the team he/she reviews. 
This includes basic information on the test and used to list the tests.
See `reviewer_candidate_tests` for the actual review data.

**Document ID:** `{generated}_{reviewerID}` (i.e. `{generated}_{auditionID}_{userID}`)

**Main Fields:**
* id
* reviewer ID - used to get all tests for a given reviewer
* team ID
* test name
* test definition ID
* start time

**Permissions:**

* Manager - can read, based on audition ID
* Any user - can read, based on user ID
* Reviewer - can read, based on user ID and audition ID

### `reviewer_candidate_tests`

This collection includes the review details on candidates in each test.
It adds to the data in the `reviewer_team_tests` collection. 

**Document ID:** `{candidateID}_{teamTestID}` (i.e. `{auditionID}_{generated}_{generated}_{auditionID}_{userID}`)

**Main Fields:**
* candidate ID
* team test ID
* reviewer ID
* parameters (comments, scores)
* comments
* score

**Permissions:**

* Manager - can read, based on audition ID
* Any user - can read, based on user ID
* Reviewer - can write, based on user ID and audition ID

**Notes:**
1. The ID ensures there is at most one entry for candidate per given test

### `reviewer_candidate_summaries`

Summary that each reviewer fills on the candidates he/she reviewed. 

**Document ID:** `{candidateID}_{reviewerID}` (i.e. `{auditionID}_{generated}_{auditionID}_{userID}`)

**Main Fields:**
* candidate ID
* reviewer ID - used e.g. to get all candidate summaries of a given reviewer
* audition ID - used e.g. to get all candidate summaries of a given audition when generating the overall summaries
* comments
* parameters
* score (value + per unit)

**Permissions:**

* Manager - can read any document based on the audition ID
* Any user -
    * can read documents with his/her user ID
    * can write documents with his/her user ID and based on the audition ID

**Notes:**
1. The ID ensures there is at most one entry for candidate per reviewer

### `reviewer_candidate_interviews`

Interview summary that each reviewer fills on the candidates he/she interviewed.

**Document ID:** `{candidateID}_{reviewerID}` (i.e. `{auditionID}_{generated}_{auditionID}_{userID}`)

**Main Fields:**
* id
* candidate ID
* reviewer ID - used e.g. to get all candidate interviews of a given reviewer
* audition ID - used e.g. to get all candidate interviews of a given audition when generating the overall summaries
* comments
* parameters
* score (value + per unit)

**Permissions:**

* Manager - can read any document based on the audition ID
* Any user - 
  * can read documents with his/her user ID
  * can write documents with his/her user ID and based on the audition ID 

**Notes:**
1. The ID ensures there is at most one entry for candidate per reviewer

### `audition_candidates`

Personal details on candidates in a given audition

**Document ID:** `{auditionID}_{generated}`

**Main Fields:**
* id
* audition ID
* personal number (protected)
* first name (protected)
* last name (protected)
* attributes

**Permissions:**

* Manager / HR - can read and write, based on the audition ID

### `audition_candidate_photos`

Path to the photo of candidates in the storage

**Document ID:** `{candidateID}` (i.e. `{auditionID}_{generated}`)

**Main Fields:**
* id
* candidate ID
* audition ID
* photo storage path

**Permissions:**

* Anyone with a role - can read and write based on the audition ID.  
  This is needed so that anyone with a role in the audition will be able to upload a photo for a candidate.

### `audition_candidate_statuses`

The status of candidates in the audition

**Document ID:** `{candidateID}` (i.e. `{auditionID}_{generated}`)

**Main Fields:**
* id 
* candidate ID
* audition ID
* number
* team ID
* active
* quit time & reason

**Permissions:**

* Manager / HR - can read and write any document based on the audition ID
* Leader / Reviewer - can read any document based on the audition ID

### `audition_candidate_summaries`

The overall summary of candidates in an audition.
This is generated based on all reviewer summaries and interviews.

**Document ID:** `{candidateID}` (i.e. `{auditionID}_{generated}`)

**Main Fields:**
* id
* candidate ID
* audition ID
* test score - aggregated score from all the reviewers summaries for this candidate
* test comments - collection of comments from all reviewers summaries for this candidate  
* interview score - aggregated score from all the interviewers summaries for this candidate
* interview comments - collection of comments from all interviewers summaries for this candidate
* sociometric score - the calculated sociometric score 
* final score - final score, based on the aggregation of above scores 
* parameter scores - aggregated score per parameter

**Permissions:**

* Manager - can read and write any document of candidates in the audition in which he/she has a manager role
* HR - can read, based on the role in the audition

## Collections: Users and Roles

Users are managed by Firebase Authentication.
Every user has a user ID `uid` which identifies him/her. 

### `user_profiles`

User profile information, includes a copy of the user's information from Firebase Authentication.
Can potentially include additional information.
Used mainly to give the user permissions to read (and write?) his own information. 

**Document ID:** `{userID}`

**Main Fields:**
* id
* name
* email
* phone number
* photo url

**Permissions:**

* Manager - can read all documents (need to be able to assign roles for users)
* Any user - can read his/her own document (by user ID)

### `user_audition_roles`

Assigned roles for users in a given audition.
Also used as a quick list of auditions a user has a role in, to display the list of relevant auditions per user.

**Document ID:** `{auditionID}_{userID}`

**Main Fields:**
* id
* user ID
* audition ID
* audition name
* audition created at
* roles - list of roles assigned to this user in this audition

**Permissions:**

* Manager - can read any document where the audition ID is of an audition he/she has a manager role
* Any user - can read his/her own document (by user ID)

**Notes:**
1. The ID ensures there is at most one entry for user per audition