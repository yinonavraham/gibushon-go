# Data Model

## Definitions

Collections:

```
AuditionDefinitions:
    id
    candidate attriute definitions
    parameter definitions
    interview definition
    sub-collections:
        TesdDefinitions:
            id
            name
            parameters
```

## Auditions

collections:
 
```
Auditions:
    id
    name
    definition ID
    units (id, name)
    teams (id, number, reviewers, candidates)
    sub-collections:
        Reviewers:
            user ID
            name
            unit ID
            team ID
            role
            sub-collections:
                ReviewerCandidates:
                    candidate ID
                    active
                    quit time & reason
                    parameters (comments, scores)
                    comments
                ReviewerTeamTests:
                    id
                    team ID
                    test definition ID
                    start time
                ReviewerCandidateTests:
                    candidate ID
                    team test ID
                    parameters (comments, scores)
                    comments
                    score
                ReviewerCandidateSummaries:
                    candidate ID
                    comments
                    parameters
                    score (value + per unit)
                ReviewerCandidateInterviews:
                    candidate ID
                    comments
                    parameters
                    score (value + per unit)
        Candidates:
            id
            personal number (protected)
            first name (protected)
            last name (protected)
            attributes
        CandidatePhotos
            candidate ID
            photo storage path
        CandidateStatuses:
            candidate ID
            number
            team ID
            active
            quit time & reason
        CandidateSummaries:
            candidate ID
            test score
            test comments
            interview score
            interview comments
            sociometric score
            final score
            parameter scores
        
```

## Global

Collections:

```
UserProfiles:
    properties:
        user id
        name
        email
        photo url
```