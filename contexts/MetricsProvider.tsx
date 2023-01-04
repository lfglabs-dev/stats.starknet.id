import { createContext, useMemo, useState } from "react";
import { useGetClubMetric, useGetDomainRegistrations, useGetExpiredClubDomains } from "../hooks/metrics";
import { Club, DomainExpired, DomainRegistration, Period, PeriodRange } from "../types/metrics";
import { dataToCountPerClub } from "../utils/dataToCountPerClub";
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
  period: Period.MONTHLY,
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
  const [period, setPeriod] = useState<Period>(Period.MONTHLY);
  const [domainRenewals, setDomainRenewals] = useState<number[]>([]);

  const periodRangeForCharts = getPeriodInformation();
  const periodRangeForStats = getPeriodInformationForStats();

  const currentPeriodRange = useMemo(() => {
    return periodRangeForStats[period];
  }, [period, periodRangeForStats])

  const { countPerClub } = useGetClubMetric({ periodRange: currentPeriodRange, period });
  const { domainRegistrations } = useGetDomainRegistrations({ periodRange: periodRangeForCharts, period });
  const { expiredDomains } = useGetExpiredClubDomains(Club.TEN_K_CLUB);

  const countPerClubMap = useMemo(() => {
    let initialData = {
      oneLetter: 0,
      twoLetters: 0,
      threeLetters: 0,
      nineNineClub: 0,
      tripleNineClub: 0,
      tenKClub: 0,
    }
    if(!countPerClub) return initialData;
    return dataToCountPerClub(countPerClub);
  }, [countPerClub])
  
  const contextValues = useMemo(() => {
    return {
      period,
      oneLetter: countPerClubMap.oneLetter,
      twoLetters: countPerClubMap.twoLetters,
      threeLetters: countPerClubMap.threeLetters,
      nineNineClub: countPerClubMap.nineNineClub,
      tripleNineClub: countPerClubMap.tripleNineClub,
      tenKClub: countPerClubMap.tenKClub,
      domainRegistrations: domainRegistrations as [] || [],
      domainRenewals,
      expiredDomains: expiredDomains as [] || [],
      changePeriod: setPeriod,
      periodRangeForCharts,
      currentPeriodRange,
    }
  }, 
  [period, countPerClubMap.oneLetter, countPerClubMap.twoLetters, countPerClubMap.threeLetters, countPerClubMap.nineNineClub, countPerClubMap.tripleNineClub, countPerClubMap.tenKClub, domainRegistrations, domainRenewals, expiredDomains, periodRangeForCharts, currentPeriodRange]);

  return (
    <MetricsContext.Provider value={contextValues}>
      {children}
    </MetricsContext.Provider>
  )
}