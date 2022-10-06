import type {EntityID} from "@/datastore/models/common/Entity";
import type {TeamID} from "@/datastore/models/audition/Team";
import type {TestDefinitionID} from "@/datastore/models/defenition/TestDefinition";

export type TeamTestID = EntityID;

export class ReviewerTeamTest {
    id : TeamTestID | undefined;
    teamID: TeamID | undefined;
    testDefinitionID : TestDefinitionID | undefined;
    startTime? : Date;
}