import { Club, DomainPerClub } from "../types/metrics";

export type CountPerClub = {
  oneLetter: number;
  twoLetters: number;
  threeLetters: number;
  fourLetters: number;
  nineNineClub: number;
  tripleNineClub: number;
  tenKClub: number;
}


export const dataToCountPerClub = (data: DomainPerClub[]): CountPerClub => {
  let initialData = {
    oneLetter: 0,
    twoLetters: 0,
    threeLetters: 0,
    fourLetters: 0,
    nineNineClub: 0,
    tripleNineClub: 0,
    tenKClub: 0,
  }

  data.forEach(d => {
    switch(d.club) {
      case Club.ONE_LETTER:
        initialData.oneLetter = d.count || 0;
        break;
      case Club.TWO_LETTER:
        initialData.twoLetters = d.count || 0;
        break;
      case Club.THREE_LETTER:
        initialData.threeLetters = d.count || 0;
        break;
      case Club.FOUR_LETTER:
        initialData.fourLetters = d.count || 0;
        break;
      case Club.NINE_NINE:
        initialData.nineNineClub = d.count || 0;
        break;
      case Club.TRIPLE_NINE:
        initialData.tripleNineClub = d.count || 0;
        break;
      case Club.TEN_K_CLUB:
        initialData.tenKClub = d.count || 0;
        break;
      default:
        return initialData;
    }
  })
  return initialData;
}