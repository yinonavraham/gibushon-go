export type RoleType = "admin" | "manager" | "reviewer" | "leader" | "watcher" | "viewer" | "human-resources";

// Admin can administrate the entire system, manage definitions, etc.
export const AdminRole: RoleType = "admin";
// Manager can manage a given audition
export const ManagerRole: RoleType = "manager";
// Reviewer can author review data for candidates in a given audition
export const ReviewerRole: RoleType = "reviewer";
// Leader can lead a given team in a given audition
export const LeaderRole: RoleType = "leader";
// Viewer can view the overall information of a given audition, including summaries
export const ViewerRole: RoleType = "viewer";
// Human Resources role can manage candidates and their sociometric data
export const HumanResourcesRole: RoleType = "human-resources";
