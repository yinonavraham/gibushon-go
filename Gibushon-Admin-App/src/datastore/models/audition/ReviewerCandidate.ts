import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import type {ParameterDefinitionID} from "@/datastore/models/defenition/ParameterDefinition";
import type {ParameterInfo} from "@/datastore/models/audition/ParameterInfo";
import type {ReviewerID} from "@/datastore/models/audition/Reviewer";
import {Entity} from "@/datastore/models/common/Entity";
import {dateFromObjectValue, dateToObjectValue, mapToObjectValue} from "@/datastore/models/common/Objectable";

export class ReviewerCandidate extends Entity {
    candidateID : CandidateID = "";
    reviewerID : ReviewerID = "";
    active : boolean = false;
    quitTime : Date | undefined;
    quitReason : string = "";
    parameters: Map<ParameterDefinitionID, ParameterInfo> = new Map();
    comments: Set<string> = new Set();

    toObject(obj: any) {
        super.toObject(obj);
        obj.candidateID = this.candidateID;
        obj.reviewerID = this.reviewerID;
        obj.active = this.active;
        if (this.quitTime) obj.quitTime = dateToObjectValue(this.quitTime);
        obj.quitReason = this.quitReason;
        obj.parameters = mapToObjectValue(this.parameters);
        obj.comments = this.comments;
    }

    fromObject(obj: any) {
        super.fromObject(obj);
        this.candidateID = obj.candidateID;
        this.reviewerID = obj.reviewerID;
        this.active = obj.active;
        this.quitTime = obj.quitTime ? dateFromObjectValue(obj.quitTime) : undefined;
        this.quitReason = obj.quitReason;
        this.parameters = mapToObjectValue(obj.parameters);
        this.comments = obj.comments;
    }
}