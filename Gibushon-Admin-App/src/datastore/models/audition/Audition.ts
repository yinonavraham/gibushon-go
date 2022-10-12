import type {EntityID} from "@/datastore/models/common/Entity";
import type {AuditionDefinitionID} from "@/datastore/models/defenition/AuditionDefinition";
import type {UnitID} from "@/datastore/models/audition/Unit";
import {Unit} from "@/datastore/models/audition/Unit";
import type {TeamID} from "@/datastore/models/audition/Team";
import {Team} from "@/datastore/models/audition/Team";
import {generateUniqueID} from "@/utils/UniqueID";
import type {Validatable} from "@/datastore/models/common/Validatable";
import {Entity} from "@/datastore/models/common/Entity";
import {mapFromObjectValue, mapToObjectValue} from "@/datastore/models/common/Objectable";

export type AuditionID = EntityID

export class Audition extends Entity implements Validatable {
    id: AuditionID = "";
    name: string = "";
    description: string = "";
    startTime?: Date;
    auditionDefinitionID: AuditionDefinitionID = "";
    private units: Map<UnitID, Unit> = new Map();
    private teams: Map<TeamID, Team> = new Map();

    addTeam(number : number) : Team {
        let team = new Team();
        team.id = generateUniqueID("team");
        team.number = number;
        this.teams.set(team.id, team);
        return team;
    }

    getTeam(id: TeamID) : Team | undefined {
        return this.teams.get(id);
    }

    getTeams() : Array<Team> {
        const result: Array<Team> = [];
        for (let team of this.teams.values()) {
            result.push(team);
        }
        result.sort((t1, t2) => t2.number - t1.number);
        return result;
    }

    addUnit(name : string) : Unit {
        let unit = new Unit();
        unit.id = generateUniqueID("unit");
        unit.name = name;
        this.units.set(unit.id, unit);
        return unit;
    }

    getUnit(id: UnitID) : Unit | undefined {
        return this.units.get(id);
    }

    getUnits() : Array<Unit> {
        const result: Array<Unit> = [];
        for (let unit of this.units.values()) {
            result.push(unit);
        }
        result.sort((u1, u2) => u2.name > u1.name ? 1 : -1);
        return result;
    }

    validate(): Error | null {
        if (!this.id) return new Error("BUG: Audition ID is not defined");
        if (!this.auditionDefinitionID) return new Error("BUG: Audition's definition ID is not defined");
        if (!this.name) return new Error("BUG: Audition name is not defined");
        return null;
    }

    toObject(obj: any) {
        super.toObject(obj);
        obj.id = this.id;
        obj.auditionDefinitionID = this.auditionDefinitionID;
        obj.name = this.name;
        obj.description = this.description;
        if (obj.startTime) obj.startTime = this.startTime;
        obj.units = mapToObjectValue(this.units);
        obj.teams = mapToObjectValue(this.teams);
    }

    fromObject(obj: any) {
        super.fromObject(obj);
        this.id = obj.id;
        this.auditionDefinitionID = obj.auditionDefinitionID;
        this.name = obj.name;
        this.description = obj.description;
        this.startTime = obj.startTime;
        this.units = mapFromObjectValue(obj.units, () => new Unit());
        this.teams = mapFromObjectValue(obj.teams, () => new Team());
    }
}