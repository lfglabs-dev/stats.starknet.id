import { Club } from "../types/metrics";

export const clubToString = (club: Club) => {
  switch (club) {
    case Club.ONE_LETTER:
      return "1 Letter";
    case Club.TWO_LETTER:
      return "2 Letters";
    case Club.THREE_LETTER:
      return "3 Letters";
    case Club.NINE_NINE:
      return "99";
    case Club.TRIPLE_NINE:
      return "999";
    case Club.TEN_K_CLUB:
      return "10k";
    default:
      return "Unknown";
  }
}