import { createContext, useMemo, useState } from "react";
import { useGetClubMetric, useGetDomainRegistrations, useGetExpiredClubDomains } from "../hooks/metrics";
import { Club, DomainExpired, DomainRegistration, Period, PeriodRange } from "../types/metrics";
import { getPeriodInformation, getPeriodInformationForStats } from "../utils/period";

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
  periodRangeForCharts: PeriodRange;
  currentPeriodRange: PeriodRange;
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
  periodRangeForCharts: { since: 0, end: 0, segments: 1 },
  currentPeriodRange: { since: 0, end: 0, segments: 1 },
})

export const MetricsProvider = ({ children }: { children: any }) => {
  const [period, setPeriod] = useState<Period>(Period.MONTH);
  const [domainRenewals, setDomainRenewals] = useState<number[]>([]);

  const periodRangeForCharts = getPeriodInformation();
  const periodRangeForStats = getPeriodInformationForStats();

  const currentPeriodRange = useMemo(() => {
    return periodRangeForStats[period];
  }, [period, periodRangeForStats])

  const { clubNumber: oneLetter } = useGetClubMetric({ periodRange: currentPeriodRange, club: Club.ONE_LETTER, period });
  const { clubNumber: twoLetters } = useGetClubMetric({ periodRange: currentPeriodRange, club: Club.TWO_LETTER, period });
  const { clubNumber: threeLetters } = useGetClubMetric({ periodRange: currentPeriodRange, club: Club.THREE_LETTER, period });
  const { clubNumber: nineNineClub } = useGetClubMetric({ periodRange: currentPeriodRange, club: Club.NINE_NINE, period });
  const { clubNumber: tripleNineClub } = useGetClubMetric({ periodRange: currentPeriodRange, club: Club.TRIPLE_NINE, period });
  const { clubNumber: tenKClub } = useGetClubMetric({ periodRange: currentPeriodRange, club: Club.TEN_K_CLUB, period });
  const { domainRegistrations } = useGetDomainRegistrations({ periodRange: periodRangeForCharts, period });
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
      periodRangeForCharts,
      currentPeriodRange,
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
    periodRangeForCharts,
    currentPeriodRange,
  ]);

  return (
    <MetricsContext.Provider value={contextValues}>
      {children}
    </MetricsContext.Provider>
  )
}