import { createContext, useMemo, useState } from "react";
import { useGetClubMetric, useGetDomainRegistrations, useGetExpiredClubDomains } from "../hooks/metrics";
import { Club, DomainExpired, DomainRegistration, Period, PeriodRange } from "../types/metrics";
import { getPeriodInformation } from "../utils/period";

interface MetricsConfig {
  period: Period;
  oneLetter: number;
  twoLetters: number;
  threeLetters: number;
  nineNineClub: number;
  tripleNineClub: number;
  tenKClub: number;
  domainRegistrations: DomainRegistration[];
  domainRenewals: number[];
  expiredDomains: DomainExpired[];
  changePeriod: (period: Period) => void;
  periodRange: PeriodRange;
}

export const MetricsContext = createContext<MetricsConfig>({
  period: Period.MONTH,
  oneLetter: 0,
  twoLetters: 0,
  threeLetters: 0,
  nineNineClub: 0,
  tripleNineClub: 0,
  tenKClub: 0,
  domainRegistrations: [],
  domainRenewals: [],
  expiredDomains: [],
  changePeriod: () => {},
  periodRange: { since: 0, end: 0, segments: 1 }
})

export const MetricsProvider = ({ children }: { children: any }) => {
  const [period, setPeriod] = useState<Period>(Period.MONTH);
  const [domainRenewals, setDomainRenewals] = useState<number[]>([]);

  const periodRange = getPeriodInformation();

  const { clubNumber: oneLetter } = useGetClubMetric({ periodRange, club: Club.ONE_LETTER });
  const { clubNumber: twoLetters } = useGetClubMetric({ periodRange, club: Club.TWO_LETTER });
  const { clubNumber: threeLetters } = useGetClubMetric({ periodRange, club: Club.THREE_LETTER });
  const { clubNumber: nineNineClub } = useGetClubMetric({ periodRange, club: Club.NINE_NINE });
  const { clubNumber: tripleNineClub } = useGetClubMetric({ periodRange, club: Club.TRIPLE_NINE });
  const { clubNumber: tenKClub } = useGetClubMetric({ periodRange, club: Club.TEN_K_CLUB });
  const { domainRegistrations } = useGetDomainRegistrations({ periodRange });
  const { expiredDomains } = useGetExpiredClubDomains(Club.TEN_K_CLUB);
  
  const contextValues = useMemo(() => {
    return {
      period,
      oneLetter: oneLetter || 0,
      twoLetters: twoLetters || 0,
      threeLetters: threeLetters || 0,
      nineNineClub: nineNineClub || 0,
      tripleNineClub: tripleNineClub || 0,
      tenKClub: tenKClub || 0,
      domainRegistrations: domainRegistrations as [] || [],
      domainRenewals,
      expiredDomains: expiredDomains as [] || [],
      changePeriod: setPeriod,
      periodRange,
    }
  }, 
  [
    domainRegistrations,
    domainRenewals,
    nineNineClub, 
    tripleNineClub, 
    oneLetter, 
    period, 
    tenKClub, 
    threeLetters, 
    twoLetters,
    expiredDomains,
    setPeriod,
    periodRange,
  ]);

  return (
    <MetricsContext.Provider value={contextValues}>
      {children}
    </MetricsContext.Provider>
  )
}