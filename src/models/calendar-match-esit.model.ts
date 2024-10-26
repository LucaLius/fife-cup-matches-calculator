import { CalendarMatch } from "./calendar-match.model";

export class CalendarMatchEsit extends CalendarMatch {

  esit!: '1' | 'X' | '2';
  score!: string;
  homePoints!: number;
  homeScore!: number;
  awayPoints!: number;
  awayScore!: number;
}