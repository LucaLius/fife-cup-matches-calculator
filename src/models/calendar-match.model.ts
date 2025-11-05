import { OriginalGroupId } from "../enums/original-group-id.type";

export class CalendarMatch {
  id!: number; // progressive integer
  idGroup!: string; // "A", "B", ... for "Girone A", "Girone B", ...
  matchNumber!: number; // integer for "Serie A, giornata N"
  homeId!: string; // home team name
  awayId!: string; // away team name
  homeOriginalGroup!: OriginalGroupId; // home origianl group (A, B, C, D)
  awayOriginalGroup!: OriginalGroupId; // away origianl group (A, B, C, D)
}