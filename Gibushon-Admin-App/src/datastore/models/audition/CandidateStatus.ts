import type {TeamID} from "@/datastore/models/audition/Team";
import type {EntityID} from "@/datastore/models/common/Entity";
import {toUTC} from "@/utils/DateTime";
import {newIllegalNumberOfArgsError} from "@/datastore/models/common/Errors";

export type CandidateID = EntityID;

export class CandidateStatus {
    candidateID: CandidateID = "";
    number: number = 0;
    teamID: TeamID = "";
    active: boolean = false;
    quitTime?: Date;
    quitReason: string = "";

    constructor();
    constructor(candidateID: CandidateID, number: number);
    constructor(candidateID: CandidateID, number: number, teamID: TeamID, active: boolean);
    constructor(...args: any[]) {
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
}