import { CalendarMatch } from "./calendar-match.model";

export class CalendarMatchEsit extends CalendarMatch {

  esit!: '1' | 'X' | '2';
  score!: string;
  homeDetails!: TeamMatchResultDetails;
  awayDetails!: TeamMatchResultDetails;
}

class TeamMatchResultDetails {
  fantasyPoints!: number;
  matchScore!: number;
  // baseModifiers: {
  //   id: string;
  //   value: number;
  // }[];
  crossTeamModifiers!: {
    id: string;
    teamId: string;
    points: number;
  }[];
}