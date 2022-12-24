export type DomainCreatedResponse = {
  count: number;
}

export type DomainExpired = {
  domain: string;
  expiry: number;
}

export type DomainRegistration = {
  from: number;
  count: number;
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
  NINE_NINE = '99',
  TRIPLE_NINE = '999',
  TEN_K_CLUB = '10k',
}

export enum Period {
  DAILY = 'daily',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}