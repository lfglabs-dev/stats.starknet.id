export type DomainCreatedResponse = {
  count: number;
};

export type DomainExpired = {
  domain: string;
  club: string;
};

export type DomainCount = {
  from: number;
  count: number;
};

export type DomainPerClub = {
  club: string;
  count: number | null;
};

export type PeriodRange = {
  since: number; // In seconds
  end: number; // In seconds
  segments: number;
};

export enum Club {
  ONE_LETTER = "single_letter",
  TWO_LETTER = "two_letters",
  THREE_LETTER = "three_letters",
  FOUR_LETTER = "four_letters",
  NINE_NINE = "99",
  TRIPLE_NINE = "999",
  TEN_K_CLUB = "10k",
  BRAAVOS_CLUB = "braavos",
  OG_CLUB = "og",
  EVERAI_CLUB = "everai",
  ONSHEET_CLUB = "onsheet",
  XPLORER_CLUB = "xplorer",
}

export enum Period {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export enum Range {
  "7D" = "7D",
  "1m" = "1m",
  "Ytd" = "Ytd",
  ALL = "All",
}
