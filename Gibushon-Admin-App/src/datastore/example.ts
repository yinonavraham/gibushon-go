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
import {CandidateStatus} from "@/datastore/models/audition/CandidateStatus";
import {Candidate} from "@/datastore/models/audition/Candidate";
import type {DurationValue, TextValue} from "@/datastore/models/audition/Value";
import {Reviewer} from "@/datastore/models/audition/Reviewer";
import type {UserID} from "@/datastore/models/users/UserProfile";
import {LeaderRole, ReviewerRole} from "@/datastore/models/auth/RoleType";
import type {RoleType} from "@/datastore/models/auth/RoleType";
import {saveAudition} from "@/datastore/services/AuditionsDao";
import {saveCandidate} from "@/datastore/services/CandidatesDao";
import {saveCandidateStatus} from "@/datastore/services/CandidateStatusesDao";
import {saveReviewer} from "@/datastore/services/ReviewersDao";
import type {Team} from "@/datastore/models/audition/Team";

let qualityGroupAttrID: AttributeDefinitionID;
let runAttrID: AttributeDefinitionID;
let motivationParamID: ParameterDefinitionID;
let leadershipParamID: ParameterDefinitionID;
let tutoringParamID: ParameterDefinitionID;
let strengthParamID: ParameterDefinitionID;
let welfareParamID: ParameterDefinitionID;
let medicalParamID: ParameterDefinitionID;

export async function createExampleAuditionDefinition(): Promise<AuditionDefinition> {
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

export async function createExampleAudition(auditionDef: AuditionDefinition): Promise<Audition> {
    let audition = new Audition();
    audition.auditionDefinitionID = auditionDef.id;
    audition.name = "Lotar 2022-11";
    let team1 = audition.addTeam(1);
    let team2 = audition.addTeam(2);
    let team3 = audition.addTeam(3);
    const lotarUnit = audition.addUnit("Lotar");
    audition = await saveAudition(audition);

    const candidateSpecs: any[] = [
        { pNum: "111111", fName: "fname1", lName: "lname1", attrs: [{ id: qualityGroupAttrID, v: "Liba" as TextValue}, {id: runAttrID, v: "00:12:32" as DurationValue }], num: 1, team: team1.id},
        { pNum: "222222", fName: "fname2", lName: "lname2", attrs: [{ id: qualityGroupAttrID, v: "Liba" as TextValue}, {id: runAttrID, v: "00:12:54" as DurationValue }], num: 2, team: team1.id},
        { pNum: "333333", fName: "fname3", lName: "lname3", attrs: [{ id: qualityGroupAttrID, v: "Liba" as TextValue}, {id: runAttrID, v: "00:12:55" as DurationValue }], num: 3, team: team1.id},
        { pNum: "444444", fName: "fname4", lName: "lname4", attrs: [{ id: qualityGroupAttrID, v: "Yeter" as TextValue}, {id: runAttrID, v: "00:13:01" as DurationValue }], num: 4, team: team2.id},
        { pNum: "555555", fName: "fname5", lName: "lname5", attrs: [{ id: qualityGroupAttrID, v: "Yeter" as TextValue}, {id: runAttrID, v: "00:13:32" as DurationValue }], num: 5, team: team2.id},
        { pNum: "666666", fName: "fname6", lName: "lname6", attrs: [{ id: qualityGroupAttrID, v: "Yeter" as TextValue}, {id: runAttrID, v: "00:14:23" as DurationValue }], num: 6, team: team2.id},
        { pNum: "777777", fName: "fname7", lName: "lname7", attrs: [{ id: qualityGroupAttrID, v: "Benoni" as TextValue}, {id: runAttrID, v: "00:13:31" as DurationValue }], num: 7, team: team3.id},
        { pNum: "888888", fName: "fname8", lName: "lname8", attrs: [{ id: qualityGroupAttrID, v: "Benoni" as TextValue}, {id: runAttrID, v: "00:13:59" as DurationValue }], num: 8, team: team3.id},
        { pNum: "999999", fName: "fname9", lName: "lname9", attrs: [{ id: qualityGroupAttrID, v: "Namuch" as TextValue}, {id: runAttrID, v: "00:15:15" as DurationValue }], num: 9, team: team3.id},
        { pNum: "101010", fName: "fname10", lName: "lname10", attrs: [{ id: qualityGroupAttrID, v: "Namuch" as TextValue}, {id: runAttrID, v: "00:15:54" as DurationValue }], num: 10, team: team3.id},
    ]
    for (let canSpec of candidateSpecs) {
        let candidate = new Candidate(canSpec.pNum, canSpec.fName, canSpec.lName);
        candidate.auditionID = audition.id;
        for (let attr of canSpec.attrs) {
            candidate.attributes.set(attr.id, attr.v);
        }
        candidate = await saveCandidate(candidate);
        let candidateStatus = new CandidateStatus(candidate.id, canSpec.num, canSpec.team, true);
        candidateStatus.auditionID = audition.id;
        await saveCandidateStatus(candidateStatus);
    }
    let reviewer1 = new Reviewer("vGrStr3Pd2N0T1lSL30K7EnrGtH3", "Reviewer One");
    let reviewer2 = new Reviewer("FQnAGyzTUURsjgGViJsw9UUSNzx1", "Reviewer Two");
    let reviewer3 = new Reviewer("q9rflct0TCh9CzvposNGGhoCWNc2", "Kermit Frog");
    let reviewer4 = new Reviewer("4ZSZLZEfxpQYH9rUSyHdCaxgrJN2", "Miss Piggy");
    let reviewer5 = new Reviewer("wkXhGs4W3jRS1xZWaevRZRgYJSB3", "Yinon Avraham");
    let reviewer6 = new Reviewer("LBcUaMvEDxemVoC1eJihjjfpmc52", "John Lennon");
    let reviewer7 = new Reviewer("eNNeUqqtTVU7v7AYfK2Va0eNlKH3", "Ringo Star");
    const reviewers = new Map<UserID, Reviewer>([
        [reviewer1.userID, reviewer1],
        [reviewer2.userID, reviewer2],
        [reviewer3.userID, reviewer3],
        [reviewer4.userID, reviewer4],
        [reviewer5.userID, reviewer5],
        [reviewer6.userID, reviewer6],
        [reviewer7.userID, reviewer7],
    ]);
    for (let reviewer of reviewers.values()) {
        reviewer.auditionID = audition.id;
        reviewer = await saveReviewer(reviewer);
        reviewers.set(reviewer.userID, reviewer);
    }
    [reviewer1, team1] = assignReviewerInTeam(reviewers.get(reviewer1.userID) as Reviewer, team1, LeaderRole);
    await saveReviewer(reviewer1);
    [reviewer2, team1] = assignReviewerInTeam(reviewers.get(reviewer2.userID) as Reviewer, team1, ReviewerRole);
    await saveReviewer(reviewer2);
    [reviewer3, team2] = assignReviewerInTeam(reviewers.get(reviewer3.userID) as Reviewer, team2, LeaderRole);
    await saveReviewer(reviewer3);
    [reviewer4, team2] = assignReviewerInTeam(reviewers.get(reviewer4.userID) as Reviewer, team2, ReviewerRole);
    await saveReviewer(reviewer4);
    [reviewer5, team3] = assignReviewerInTeam(reviewers.get(reviewer5.userID) as Reviewer, team3, LeaderRole);
    await saveReviewer(reviewer5);
    [reviewer6, team3] = assignReviewerInTeam(reviewers.get(reviewer6.userID) as Reviewer, team3, ReviewerRole);
    await saveReviewer(reviewer6);
    [reviewer7, team3] = assignReviewerInTeam(reviewers.get(reviewer7.userID) as Reviewer, team3, ReviewerRole, true);
    await saveReviewer(reviewer7);

    audition.updateTeam(team1);
    audition.updateTeam(team2);
    audition.updateTeam(team3);
    audition = await saveAudition(audition);

    return audition;
}

function assignReviewerInTeam(reviewer: Reviewer, team: Team, role: RoleType, watcher: boolean = false): [Reviewer, Team] {
    reviewer.teamID = team.id;
    reviewer.role = role;
    reviewer.watcher = watcher;
    if (role === LeaderRole && !watcher) {
        team.leaderID = reviewer.id;
    }
    return [ reviewer, team ];
}