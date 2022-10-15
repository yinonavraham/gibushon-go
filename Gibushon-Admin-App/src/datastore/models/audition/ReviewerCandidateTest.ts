import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import type {ParameterDefinitionID} from "@/datastore/models/defenition/ParameterDefinition";
import type {ParameterInfo} from "@/datastore/models/audition/ParameterInfo";
import type {TeamTestID} from "@/datastore/models/audition/ReviewerTeamTest";
import {ScoreValue, scoreValueFromObjectValue, scoreValueToObjectValue} from "@/datastore/models/audition/Value";
import type {ReviewerID} from "@/datastore/models/audition/Reviewer";
import type {EntityID} from "@/datastore/models/common/Entity";
import {Entity} from "@/datastore/models/common/Entity";
import {mapFromObjectValue, mapToObjectValue} from "@/datastore/models/common/Objectable";

export type ReviewerCandidateTestID = EntityID;

export class ReviewerCandidateTest extends Entity {
    id: ReviewerCandidateTestID = "";
    reviewerID: ReviewerID = "";
    candidateID: CandidateID = "";
    teamTestID: TeamTestID = "";
    parameters: Map<ParameterDefinitionID, ParameterInfo> = new Map();
    comments: Set<string> = new Set();
    score: ScoreValue = new ScoreValue();

    toObject(obj: any) {
        super.toObject(obj);
        obj.id = this.id;
        obj.reviewerID = this.reviewerID;
        obj.candidateID = this.candidateID;
        obj.teamTestID = this.teamTestID;
        obj.parameters = mapToObjectValue(this.parameters);
        obj.comments = this.comments;
        obj.score = scoreValueToObjectValue(this.score);
    }

    fromObject(obj: any) {
        super.fromObject(obj);
        this.id = obj.id;
        this.reviewerID = obj.reviewerID;
        this.candidateID = obj.candidateID;
        this.teamTestID = obj.teamTestID;
        this.parameters = mapFromObjectValue(obj.parameters);
        this.comments = obj.comments;
        this.score = scoreValueFromObjectValue(obj.score);
    }
}