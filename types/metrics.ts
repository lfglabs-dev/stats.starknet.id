export type DomainCreatedResponse = {
  count: number;
}

export type DomainExpired = {
  domain: string;
  club: string;
}

export type DomainCount = {
  from: number;
  count: number;
}

export type DomainPerClub = {
  club: string;
  count: number | null;
}

export type PeriodRange = {
  since: number; // In seconds
  end: number; // In seconds
  segments: number;
}

export enum Club {
  ONE_LETTER = 'single_letter',
  TWO_LETTER = 'two_letters',
  THREE_LETTER = 'three_letters',
  FOUR_LETTER = 'four_letters',
  NINE_NINE = '99',
  TRIPLE_NINE = '999',
  TEN_K_CLUB = '10k',
}

export enum Period {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum Range {
  '30D' = '30D',
  '90D' = '90D',
  '180D' = '180D',
  ALL = 'All',
}