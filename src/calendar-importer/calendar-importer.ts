import { CalendarMatch } from "../models/calendar-match.model";
import { CalendarImporterI } from "./calendar-importer.interface";

export class CalendarImporter implements CalendarImporterI {

  getCalendarMatches(): CalendarMatch[] {

    return [
      {
        id: 1,
        idGroup: 1, // Girone A
        homeId: 'SMOKING BIANCO.',
        awayId: 'REAL DUREZZA'
      },
      {
        id: 2,
        idGroup: 1, // Girone A
        homeId: 'BORGO GRAZZANO',
        awayId: 'ASTON BIRRA'
      },
      {
        id: 3,
        idGroup: 2, // Girone B
        homeId: 'NEROAZZURRI',
        awayId: 'RIVER BOLUDOS'
      },
      {
        id: 4,
        idGroup: 2, // Girone B
        homeId: 'REDBLACK',
        awayId: 'FC PUSSY MIX'
      },
      {
        id: 5,
        idGroup: 3, // Girone C
        homeId: 'IRON GAS',
        awayId: 'AHI 3 CROCIATI'
      },
      {
        id: 6,
        idGroup: 3, // Girone C
        homeId: 'STARK INDUSTRIES',
        awayId: 'NOT ATHLETIC CRODANZO'
      },
      {
        id: 7,
        idGroup: 4, // Girone D
        homeId: 'MANCHESTER SINTY',
        awayId: 'COCABRODA'
      },
      {
        id: 8,
        idGroup: 4, // Girone D
        homeId: 'TEAM DADA',
        awayId: 'REAL MAKADAM'
      },
      {
        id: 9,
        idGroup: 5, // Girone E
        homeId: 'NAPOLETHANOS',
        awayId: 'BEN FICA'
      },
      {
        id: 10,
        idGroup: 5, // Girone E
        homeId: 'LOS ANGELO - UN ESPERTO',
        awayId: 'KANTÉ CABRIOLET'
      },
      {
        id: 11,
        idGroup: 6, // Girone F
        homeId: 'BAYERN LEVERDUREN.',
        awayId: 'CHIAVOVERONICA'
      },
      {
        id: 12,
        idGroup: 6, // Girone F
        homeId: 'FC DIREZIONE',
        awayId: 'DALLAS'
      },
      {
        id: 13,
        idGroup: 7, // Girone G
        homeId: 'REAL GRIFONE',
        awayId: 'DINAMO KEYV'
      },
      {
        id: 14,
        idGroup: 7, // Girone G
        homeId: 'MICCOLILLE',
        awayId: 'CSKA PIAVON'
      },
      {
        id: 15,
        idGroup: 8, // Girone H
        homeId: 'I RAGAZZI',
        awayId: 'CCORYO JUNIORS'
      },
      {
        id: 16,
        idGroup: 8, // Girone H
        homeId: 'VILLA FRIGNAVERA',
        awayId: 'ACK BOMBA'
      },
    ];
  }

}