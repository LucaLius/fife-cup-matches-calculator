export enum Team {
  SMOKING_BIANCO = 'SMOKING BIANCO.',
  REAL_DUREZZA = 'REAL DUREZZA',
  BORGO_GRAZZANO = 'BORGO GRAZZANO',
  ASTON_BIRRA = 'ASTON BIRRA',
  NEROAZZURRI = 'NEROAZZURRI',
  RIVER_BOLUDOS = 'RIVER BOLUDOS',
  REDBLACK = 'REDBLACK',
  FC_PUSSY_MIX = 'FC PUSSY MIX',
  IRON_GAS = 'IRON GAS',
  AHI_3_CROCIATI = 'AHI 3 CROCIATI',
  STARK_INDUSTRIES = 'STARK INDUSTRIES',
  NOT_ATHLETIC_CRODANZO = 'NOT ATHLETIC CRODANZO',
  MANCHESTER_SINTY = 'MANCHESTER SINTY',
  COCABRODA = 'COCABRODA',
  TEAM_DADA = 'TEAM DADA',
  REAL_MAKADAM = 'REAL MAKADAM',
  NAPOLETHANOS = 'NAPOLETHANOS',
  BEN_FICA = 'BEN FICA',
  LOS_ANGELO_UN_ESPERTO = 'LOS ANGELO - UN ESPERTO',
  KANTÉ_CABRIOLET = 'KANTÉ CABRIOLET',
  BAYERN_LEVERDUREN = 'BAYERN LEVERDUREN.',
  CHIAVOVERONICA = 'CHIAVOVERONICA',
  FC_DIREZIONE = 'FC DIREZIONE',
  DALLAS = 'DALLAS',
  REAL_GRIFONE = 'REAL GRIFONE',
  DINAMO_KEYV = 'DINAMO KEYV',
  MICCOLILLE = 'MICCOLILLE',
  CSKA_PIAVON = 'CSKA PIAVON',
  I_RAGAZZI = 'I RAGAZZI',
  CCORYO_JUNIORS = 'CCORYO JUNIORS',
  VILLA_FRIGNAVERA = 'VILLA FRIGNAVERA',
  ACK_BOMBA = 'ACK BOMBA',
  TBD = 'TBD', // Use it in cup competitions
}

export function getTeamList(): string[] {
  return getEnumValues(Team);
}

// Function to get a list of enum values
function getEnumValues<T extends object>(enumObj: T): string[] {
  return Object.values(enumObj) as string[];
}