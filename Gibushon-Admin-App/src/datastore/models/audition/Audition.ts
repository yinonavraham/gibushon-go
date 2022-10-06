import type {EntityID} from "@/datastore/models/common/Entity";
import type {AuditionDefinitionID} from "@/datastore/models/defenition/AuditionDefinition";
import type {UnitID} from "@/datastore/models/audition/Unit";
import {Unit} from "@/datastore/models/audition/Unit";
import type {TeamID} from "@/datastore/models/audition/Team";
import {Team} from "@/datastore/models/audition/Team";
import {generateUniqueID} from "@/utils/UniqueID";
import type {Validatable} from "@/datastore/models/common/Validatable";
import {Entity} from "@/datastore/models/common/Entity";

export type AuditionID = EntityID

export class Audition extends Entity implements Validatable {
    id: AuditionID = "";
    name: string = "";
    description: string = "";
    startTime?: Date;
    auditionDefinitionID: AuditionDefinitionID = "";
    units: Map<UnitID, Unit> = new Map();
    teams: Map<TeamID, Team> = new Map();

    addTeam(number : number) : Team {
        let team = new Team();
        team.id = generateUniqueID("team");
        team.number = number;
        this.teams.set(team.id, team);
        return team;
    }

    addUnit(name : string) : Unit {
        let unit = new Unit();
        unit.id = generateUniqueID("unit");
        unit.name = name;
        this.units.set(unit.id, unit);
        return unit;
    }

    validate(): Error | null {
        if (!this.id) return new Error("BUG: Audition ID is not defined");
        if (!this.auditionDefinitionID) return new Error("BUG: Audition's definition ID is not defined");
        if (!this.name) return new Error("BUG: Audition name is not defined");
        return null;
    }
}