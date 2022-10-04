import {AuditionDefinition} from "@/datastore/models/defenition/AuditionDefinition";
import {generateUniqueID} from "@/utils/UniqueID";
import {
    DurationValueTypeDefinition,
    ScoreValueTypeDefinition,
    SelectValueTypeDefinition
} from "@/datastore/models/defenition/ValueDefinition";
import {Audition} from "@/datastore/models/audition/Audition";
import type {ParameterDefinitionID} from "@/datastore/models/defenition/ParameterDefinition";
import type {AttributeDefinitionID} from "@/datastore/models/defenition/AttributeDefinition";
import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import {CandidateStatus} from "@/datastore/models/audition/CandidateStatus";
import {Candidate} from "@/datastore/models/audition/Candidate";
import type {DurationValue, TextValue} from "@/datastore/models/audition/Value";
import {Reviewer} from "@/datastore/models/audition/Reviewer";
import type {UserID} from "@/datastore/models/users/UserProfile";
import {LeaderRole, ReviewerRole} from "@/datastore/models/auth/RoleType";

let qualityGroupAttrID: AttributeDefinitionID;
let runAttrID: AttributeDefinitionID;
let motivationParamID: ParameterDefinitionID;
let leadershipParamID: ParameterDefinitionID;
let tutoringParamID: ParameterDefinitionID;
let strengthParamID: ParameterDefinitionID;
let welfareParamID: ParameterDefinitionID;
let medicalParamID: ParameterDefinitionID;

export function createExampleAuditionDefinition(): AuditionDefinition {
    let auditionDef = new AuditionDefinition();
    auditionDef.id = generateUniqueID("aud_def");
    auditionDef.candidateDefinitions.quitReasons.allowCustom = false;
    auditionDef.candidateDefinitions.quitReasons.values = ["Medical", "Will"];
    qualityGroupAttrID = auditionDef.candidateDefinitions.addAttributeDefinition("Quality Group", "",
        new SelectValueTypeDefinition(["Premium", "Liba", "Yeter", "K.Namuch", "Benoni", "Namuch"])).id;
    runAttrID = auditionDef.candidateDefinitions.addAttributeDefinition("Run", "", new DurationValueTypeDefinition()).id;
    motivationParamID = auditionDef.addParameterDefinition("Motivation", "", new ScoreValueTypeDefinition(1, 6)).id;
    leadershipParamID = auditionDef.addParameterDefinition("Leadership", "", new ScoreValueTypeDefinition(1, 6)).id;
    tutoringParamID = auditionDef.addParameterDefinition("Tutoring", "", new ScoreValueTypeDefinition(1, 6)).id;
    strengthParamID = auditionDef.addParameterDefinition("Strength", "", new ScoreValueTypeDefinition(1, 6)).id;
    welfareParamID = auditionDef.addParameterDefinition("Welfare", "", new SelectValueTypeDefinition(["100%", "75%", "50%", "25%", "0%"])).id;
    medicalParamID = auditionDef.addParameterDefinition("Medical", "", new SelectValueTypeDefinition(["100%", "75%", "50%", "25%", "0%"])).id;
    auditionDef.summaryParameterIDs.add(motivationParamID);
    auditionDef.summaryParameterIDs.add(leadershipParamID);
    auditionDef.summaryParameterIDs.add(tutoringParamID);
    auditionDef.summaryParameterIDs.add(strengthParamID);
    auditionDef.interviewDefinition.score = new ScoreValueTypeDefinition(1, 6);
    auditionDef.interviewDefinition.parameterIDs.add(motivationParamID);
    auditionDef.interviewDefinition.parameterIDs.add(leadershipParamID);
    auditionDef.interviewDefinition.parameterIDs.add(welfareParamID);
    auditionDef.interviewDefinition.parameterIDs.add(medicalParamID);
    auditionDef.addTestDefinition("Sprints", "", 3, new Set(strengthParamID), new ScoreValueTypeDefinition(1, 6));
    auditionDef.addTestDefinition("Crawl", "", 3, new Set(strengthParamID), new ScoreValueTypeDefinition(1, 6));
    auditionDef.addTestDefinition("Lecture", "", 0, new Set(tutoringParamID), new ScoreValueTypeDefinition(1, 6));
    auditionDef.addTestDefinition("Spider Webs", "", 2, new Set([tutoringParamID, leadershipParamID]), new ScoreValueTypeDefinition(1, 6));
    return auditionDef;
}

export function createExampleAudition(auditionDef: AuditionDefinition): any {
    let audition = new Audition();
    audition.auditionDefinitionID = auditionDef.id;
    audition.name = "Lotar 2022-11";
    const team1 = audition.addTeam(1);
    const team2 = audition.addTeam(2);
    const team3 = audition.addTeam(3);
    const lotarUnit = audition.addUnit("Lotar");

    const candidate1 = new Candidate(generateUniqueID("c"), "111111", "fname1", "lname1", new Map([[qualityGroupAttrID, "Liba" as TextValue],[runAttrID, "00:12:32" as DurationValue]]));
    const candidate2 = new Candidate(generateUniqueID("c"), "222222", "fname2", "lname2", new Map([[qualityGroupAttrID, "Liba" as TextValue],[runAttrID, "00:12:54" as DurationValue]]));
    const candidate3 = new Candidate(generateUniqueID("c"), "333333", "fname3", "lname3", new Map([[qualityGroupAttrID, "Liba" as TextValue],[runAttrID, "00:12:55" as DurationValue]]));
    const candidate4 = new Candidate(generateUniqueID("c"), "444444", "fname4", "lname4", new Map([[qualityGroupAttrID, "Yeter" as TextValue],[runAttrID, "00:13:01" as DurationValue]]));
    const candidate5 = new Candidate(generateUniqueID("c"), "555555", "fname5", "lname5", new Map([[qualityGroupAttrID, "Yeter" as TextValue],[runAttrID, "00:13:32" as DurationValue]]));
    const candidate6 = new Candidate(generateUniqueID("c"), "666666", "fname6", "lname6", new Map([[qualityGroupAttrID, "Yeter" as TextValue],[runAttrID, "00:14:23" as DurationValue]]));
    const candidate7 = new Candidate(generateUniqueID("c"), "777777", "fname7", "lname7", new Map([[qualityGroupAttrID, "Benoni" as TextValue],[runAttrID, "00:13:31" as DurationValue]]));
    const candidate8 = new Candidate(generateUniqueID("c"), "888888", "fname8", "lname8", new Map([[qualityGroupAttrID, "Benoni" as TextValue],[runAttrID, "00:13:59" as DurationValue]]));
    const candidate9 = new Candidate(generateUniqueID("c"), "999999", "fname9", "lname9", new Map([[qualityGroupAttrID, "Namuch" as TextValue],[runAttrID, "00:15:15" as DurationValue]]));
    const candidate10 = new Candidate(generateUniqueID("c"), "101010", "fname10", "lname10", new Map([[qualityGroupAttrID, "Namuch" as TextValue],[runAttrID, "00:15:54" as DurationValue]]));
    const candidates = new Map<CandidateID, Candidate>([
        [candidate1.id, candidate1],
        [candidate2.id, candidate2],
        [candidate3.id, candidate3],
        [candidate4.id, candidate4],
        [candidate5.id, candidate5],
        [candidate6.id, candidate6],
        [candidate7.id, candidate7],
        [candidate8.id, candidate8],
        [candidate9.id, candidate9],
        [candidate10.id, candidate10],
    ]);
    const candidateStatuses = new Map<CandidateID, CandidateStatus>([
        [candidate1.id, new CandidateStatus(candidate1.id, 1, team1.id, true)],
        [candidate2.id, new CandidateStatus(candidate2.id, 2, team1.id, true)],
        [candidate3.id, new CandidateStatus(candidate3.id, 3, team1.id, true)],
        [candidate4.id, new CandidateStatus(candidate4.id, 4, team2.id, true)],
        [candidate5.id, new CandidateStatus(candidate5.id, 5, team2.id, true)],
        [candidate6.id, new CandidateStatus(candidate6.id, 6, team2.id, true)],
        [candidate7.id, new CandidateStatus(candidate7.id, 7, team3.id, true)],
        [candidate8.id, new CandidateStatus(candidate8.id, 8, team3.id, true)],
        [candidate9.id, new CandidateStatus(candidate9.id, 9, team3.id, true)],
        [candidate10.id, new CandidateStatus(candidate10.id, 10, team3.id, true)],
    ]);
    team1.candidateIDs.add(candidate1.id);
    team1.candidateIDs.add(candidate2.id);
    team1.candidateIDs.add(candidate3.id);
    team2.candidateIDs.add(candidate4.id);
    team2.candidateIDs.add(candidate5.id);
    team2.candidateIDs.add(candidate6.id);
    team3.candidateIDs.add(candidate7.id);
    team3.candidateIDs.add(candidate8.id);
    team3.candidateIDs.add(candidate9.id);
    team3.candidateIDs.add(candidate10.id);
    const reviewer1 = new Reviewer("vGrStr3Pd2N0T1lSL30K7EnrGtH3", "Reviewer One");
    const reviewer2 = new Reviewer("FQnAGyzTUURsjgGViJsw9UUSNzx1", "Reviewer Two");
    const reviewer3 = new Reviewer("q9rflct0TCh9CzvposNGGhoCWNc2", "Kermit Frog");
    const reviewer4 = new Reviewer("4ZSZLZEfxpQYH9rUSyHdCaxgrJN2", "Miss Piggy");
    const reviewer5 = new Reviewer("wkXhGs4W3jRS1xZWaevRZRgYJSB3", "Yinon Avraham");
    const reviewer6 = new Reviewer("LBcUaMvEDxemVoC1eJihjjfpmc52", "John Lennon");
    const reviewer7 = new Reviewer("eNNeUqqtTVU7v7AYfK2Va0eNlKH3", "Ringo Star");
    const reviewers = new Map<UserID, Reviewer>([
        [reviewer1.userID, reviewer1],
        [reviewer2.userID, reviewer2],
        [reviewer3.userID, reviewer3],
        [reviewer4.userID, reviewer4],
        [reviewer5.userID, reviewer5],
        [reviewer6.userID, reviewer6],
        [reviewer7.userID, reviewer7],
    ]);
    team1.leaderID = reviewer1.userID;
    reviewer1.teamID = team1.id;
    reviewer1.role = LeaderRole;
    team1.reviewerIDs.add(reviewer2.userID);
    reviewer2.teamID = team1.id;
    reviewer2.role = ReviewerRole;
    team2.leaderID = reviewer3.userID;
    reviewer3.teamID = team2.id;
    reviewer3.role = LeaderRole;
    team2.reviewerIDs.add(reviewer4.userID);
    reviewer4.teamID = team2.id;
    reviewer4.role = ReviewerRole;
    team3.leaderID = reviewer5.userID;
    reviewer5.teamID = team3.id;
    reviewer5.role = LeaderRole;
    team3.reviewerIDs.add(reviewer6.userID);
    reviewer6.teamID = team3.id;
    reviewer6.role = ReviewerRole;
    team3.reviewerIDs.add(reviewer7.userID);
    reviewer7.teamID = team3.id;
    reviewer7.role = ReviewerRole;
    reviewer7.watcher = true;

    return {
        audition: audition,
        candidates: candidates,
        candidateStatuses: candidateStatuses,
        reviewers: reviewers,
    };
}