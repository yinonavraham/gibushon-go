import type {EntityID} from "@/datastore/models/common/Entity";
import type {TeamID} from "@/datastore/models/audition/Team";
import type {TestDefinitionID} from "@/datastore/models/defenition/TestDefinition";
import type {ReviewerID} from "@/datastore/models/audition/Reviewer";
import {Entity} from "@/datastore/models/common/Entity";
import {dateFromObjectValue, dateToObjectValue} from "@/datastore/models/common/Objectable";

export type TeamTestID = EntityID;

export class ReviewerTeamTest extends Entity {
    id : TeamTestID = "";
    reviewerID: ReviewerID = "";
    teamID: TeamID = "";
    testDefinitionID : TestDefinitionID = "";
    testName: string = "";
    startTime? : Date;

    toObject(obj: any) {
        super.toObject(obj);
        obj.id = this.id;
        obj.reviewerID = this.reviewerID;
        obj.teamID = this.teamID;
        obj.testDefinitionID = this.testDefinitionID;
        obj.testName = this.testName;
        obj.startTime = this.startTime ? dateToObjectValue(this.startTime) : undefined;
    }

    fromObject(obj: any) {
        super.fromObject(obj);
        this.id = obj.id;
        this.reviewerID = obj.reviewerID;
        this.teamID = obj.teamID;
        this.testDefinitionID = obj.testDefinitionID;
        this.testName = obj.testName;
        this.startTime = obj.startTime ? dateFromObjectValue(obj.startTime) : undefined;
    }
}