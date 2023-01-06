import { createContext, useMemo, useState } from "react";
import { useGetClubMetric, useGetDomainRegistrations, useGetDomainRenewals, useGetDomains, useGetExpiredClubDomains, useGetIdentities, useGetUniqueAddresses } from "../hooks/metrics";
import { Club, DomainExpired, DomainCount, Period, PeriodRange } from "../types/metrics";
import { dataToCountPerClub } from "../utils/dataToCountPerClub";
import { getPeriodInformation, getPeriodInformationForStats } from "../utils/period";

interface MetricsConfig {
  period: Period;
  domainsCreated: number;
  identitiesCreated: number;
  uniqueAddresses: number;
  oneLetter: number;
  twoLetters: number;
  threeLetters: number;
  nineNineClub: number;
  tripleNineClub: number;
  tenKClub: number;
  domainRegistrations: DomainCount[];
  domainRenewals: DomainCount[];
  expiredDomains: DomainExpired[];
  changePeriod: (period: Period) => void;
  periodRangeForCharts: PeriodRange;
  currentPeriodRange: PeriodRange;
}

export const MetricsContext = createContext<MetricsConfig>({
  period: Period.MONTHLY,
  domainsCreated: 0,
  identitiesCreated: 0,
  uniqueAddresses: 0,
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

  const periodRangeForCharts = getPeriodInformation();
  const periodRangeForStats = getPeriodInformationForStats();

  const currentPeriodRange = useMemo(() => {
    return periodRangeForStats[period];
  }, [period, periodRangeForStats])

  const { domainsCreated } = useGetDomains({ periodRange: currentPeriodRange, period });
  const { identitiesCreated } = useGetIdentities({ periodRange: currentPeriodRange, period });
  const { uniqueAddresses } = useGetUniqueAddresses({ periodRange: currentPeriodRange, period });
  const { countPerClub } = useGetClubMetric({ periodRange: currentPeriodRange, period });
  const { domainRegistrations } = useGetDomainRegistrations({ periodRange: periodRangeForCharts, period });
  const { expiredDomains } = useGetExpiredClubDomains();
  const { domainRenewed } = useGetDomainRenewals({ periodRange: periodRangeForCharts, period });

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
      domainsCreated: domainsCreated || 0,
      identitiesCreated: identitiesCreated || 0,
      uniqueAddresses: uniqueAddresses || 0,
      oneLetter: countPerClubMap.oneLetter,
      twoLetters: countPerClubMap.twoLetters,
      threeLetters: countPerClubMap.threeLetters,
      nineNineClub: countPerClubMap.nineNineClub,
      tripleNineClub: countPerClubMap.tripleNineClub,
      tenKClub: countPerClubMap.tenKClub,
      domainRegistrations: domainRegistrations as [] || [],
      domainRenewals: domainRenewed as [] || [],
      expiredDomains: expiredDomains as [] || [],
      changePeriod: setPeriod,
      periodRangeForCharts,
      currentPeriodRange,
    }
  }, 
  [period, countPerClubMap, domainRegistrations, domainRenewed, expiredDomains, periodRangeForCharts, currentPeriodRange, domainsCreated, identitiesCreated, uniqueAddresses]);

  return (
    <MetricsContext.Provider value={contextValues}>
      {children}
    </MetricsContext.Provider>
  )
}