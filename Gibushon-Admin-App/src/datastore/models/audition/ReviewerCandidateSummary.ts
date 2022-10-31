import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import type {ParameterDefinitionID} from "@/datastore/models/defenition/ParameterDefinition";
import type {ParameterInfo} from "@/datastore/models/audition/ParameterInfo";
import {ScoreValue} from "@/datastore/models/audition/Value";
import type {UnitID} from "@/datastore/models/audition/Unit";
import type {ReviewerID} from "@/datastore/models/audition/Reviewer";
import {Entity} from "@/datastore/models/common/Entity";
import {mapFromObjectValue, mapToObjectValue} from "@/datastore/models/common/Objectable";
import type {AuditionID} from "@/datastore/models/audition/Audition";

export class ReviewerCandidateSummary extends Entity {
    reviewerID: ReviewerID = "";
    candidateID: CandidateID = "";
    auditionID: AuditionID = "";
    parameters: Map<ParameterDefinitionID, ParameterInfo> = new Map();
    comments: Set<string> = new Set();
    score: ScoreValue = new ScoreValue();
    scorePerUnit: Map<UnitID, ScoreValue> = new Map();

    toObject(obj: any) {
        super.toObject(obj);
        obj.candidateID = this.candidateID;
        obj.reviewerID = this.reviewerID;
        obj.auditionID = this.auditionID;
        obj.parameters = mapToObjectValue(this.parameters);
        obj.comments = this.comments;
        obj.score = this.score;
        obj.scorePerUnit = mapToObjectValue(this.scorePerUnit);
    }

    fromObject(obj: any) {
        super.fromObject(obj);
        this.candidateID = obj.candidateID;
        this.reviewerID = obj.reviewerID;
        this.auditionID = obj.auditionID;
        this.parameters = mapFromObjectValue(obj.parameters);
        this.comments = obj.comments;
        this.score = obj.score;
        this.scorePerUnit = mapFromObjectValue(obj.scorePerUnit);
    }
}