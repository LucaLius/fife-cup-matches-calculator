import { CalendarMatch } from "./models/calendar-match.model";
import { TeamInfo } from "./models/team-info.model";
import { processRound } from "./process-round";

const calendarMatches: CalendarMatch[] = [];
const teamsInfo: TeamInfo[] = [];

processRound(calendarMatches, teamsInfo);