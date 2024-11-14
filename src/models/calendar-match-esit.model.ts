import { CalendarMatch } from "./calendar-match.model";

export class CalendarMatchEsit extends CalendarMatch {

  esit!: '1' | 'X' | '2';
  score!: string;
  awayPoints!: number;
  awayScore!: number;
  homeDetails!: TeamMatchResultDetails;
}

class TeamMatchResultDetails {
  homePoints!: number;
  homeScore!: number;
  // baseModifiers: {
  //   id: string;
  //   value: number;
  // }[];
  // crossTeamModifiers: {
  //   id: string;
  //   value: number;
  // }[];
}