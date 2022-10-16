import type {TeamID} from "@/datastore/models/audition/Team";
import type {EntityID} from "@/datastore/models/common/Entity";
import {toUTC} from "@/utils/DateTime";
import {newIllegalNumberOfArgsError} from "@/datastore/models/common/Errors";
import {Entity} from "@/datastore/models/common/Entity";
import {dateFromObjectValue, dateToObjectValue} from "@/datastore/models/common/Objectable";
import type {AuditionID} from "@/datastore/models/audition/Audition";

export type CandidateID = EntityID;

export class CandidateStatus extends Entity {
    candidateID: CandidateID = "";
    auditionID: AuditionID = "";
    number: number = 0;
    teamID: TeamID = "";
    active: boolean = false;
    quitTime?: Date;
    quitReason: string = "";

    constructor();
    constructor(candidateID: CandidateID, number: number);
    constructor(candidateID: CandidateID, number: number, teamID: TeamID, active: boolean);
    constructor(...args: any[]) {
        super();
        if (args.length == 0) return;
        if (args. length >= 2) {
            this.candidateID = args[0] as CandidateID;
            this.number = args[1] as number;
        }
        if (args.length == 2) return;
        if (args.length == 4) {
            this.teamID = args[2] as TeamID;
            this.active = args[3] as boolean;
            return;
        }
        throw newIllegalNumberOfArgsError(args);
    }

    quit(reason: string) : void {
        this.quitReason = reason;
        this.quitTime = toUTC(new Date());
        this.active = false;
    }

    unQuit() : void {
        this.quitReason = "";
        this.quitTime = undefined;
        this.active = true;
    }

    toObject(obj: any) {
        super.toObject(obj);
        obj.candidateID = this.candidateID;
        obj.auditionID = this.auditionID;
        obj.number = this.number;
        obj.teamID = this.teamID;
        obj.active = this.active;
        if (this.quitTime) obj.quitTime = dateToObjectValue(this.quitTime as Date);
        obj.quitReason = this.quitReason;
    }

    fromObject(obj: any) {
        super.fromObject(obj);
        this.candidateID = obj.candidateID;
        this.auditionID = obj.auditionID;
        this.number = obj.number;
        this.teamID = obj.teamID;
        this.active = obj.active;
        this.quitTime = obj.quitTime ? dateFromObjectValue(obj.quitTime) : undefined;
        this.quitReason = obj.quitReason;
    }
}