import { createContext, useCallback, useMemo, useState } from "react";
import {
  useGetClubMetric,
  useGetDomainRegistrations,
  useGetDomainRenewals,
  useGetDomains,
  useGetExpiredClubDomains,
  useGetIdentities,
  useGetUniqueAddresses,
} from "../hooks/metrics";
import {
  Club,
  DomainExpired,
  DomainCount,
  Period,
  PeriodRange,
  Range,
} from "../types/metrics";
import { dataToCountPerClub } from "../utils/dataToCountPerClub";
import {
  getPeriodInformation,
  getPeriodInformationForStats,
} from "../utils/period";

interface MetricsConfig {
  period: Period;
  range: Range;
  domainsCreated: number;
  identitiesCreated: number;
  uniqueAddresses: number;
  oneLetter: number;
  twoLetters: number;
  threeLetters: number;
  fourLetters: number;
  nineNineClub: number;
  tripleNineClub: number;
  tenKClub: number;
  braavosClub: number;
  ogClub: number;
  everaiClub: number;
  domainRegistrations: DomainCount[];
  domainRenewals: DomainCount[];
  expiredDomains: DomainExpired[];
  changePeriod: (period: Period) => void;
  changeRange: (range: Range) => void;
  periodRangeForCharts: PeriodRange;
  currentPeriodRange: PeriodRange;
}

export const MetricsContext = createContext<MetricsConfig>({
  period: Period.MONTHLY,
  range: Range.ALL,
  domainsCreated: 0,
  identitiesCreated: 0,
  uniqueAddresses: 0,
  oneLetter: 0,
  twoLetters: 0,
  threeLetters: 0,
  fourLetters: 0,
  nineNineClub: 0,
  tripleNineClub: 0,
  tenKClub: 0,
  braavosClub: 0,
  ogClub: 0,
  everaiClub: 0,
  domainRegistrations: [],
  domainRenewals: [],
  expiredDomains: [],
  changePeriod: () => {},
  changeRange: () => {},
  periodRangeForCharts: { since: 0, end: 0, segments: 1 },
  currentPeriodRange: { since: 0, end: 0, segments: 1 },
});

export const MetricsProvider = ({ children }: { children: any }) => {
  const [period, setPeriod] = useState<Period>(Period.MONTHLY);
  const [range, setRange] = useState<Range>(Range.ALL);

  const periodRangeForCharts = getPeriodInformation(range);
  const periodRangeForStats = getPeriodInformationForStats();

  const currentPeriodRange = useMemo(() => {
    return periodRangeForStats[period];
  }, [period, periodRangeForStats]);

  const { domainsCreated } = useGetDomains({
    periodRange: currentPeriodRange,
    period,
  });
  const { identitiesCreated } = useGetIdentities({
    periodRange: currentPeriodRange,
    period,
  });
  const { uniqueAddresses } = useGetUniqueAddresses({
    periodRange: currentPeriodRange,
    period,
  });
  const { countPerClub } = useGetClubMetric({
    periodRange: periodRangeForCharts,
    period,
  });
  const { domainRegistrations } = useGetDomainRegistrations({
    periodRange: periodRangeForCharts,
    period,
  });
  const { expiredDomains } = useGetExpiredClubDomains();
  const { domainRenewed } = useGetDomainRenewals({
    periodRange: periodRangeForCharts,
    period,
  });

  const countPerClubMap = useMemo(() => {
    let initialData = {
      oneLetter: 0,
      twoLetters: 0,
      threeLetters: 0,
      fourLetters: 0,
      nineNineClub: 0,
      tripleNineClub: 0,
      tenKClub: 0,
      braavosClub: 0,
      ogClub: 0,
      everaiClub: 0,
    };
    if (!countPerClub) return initialData;
    return dataToCountPerClub(countPerClub);
  }, [countPerClub]);

  const handlePeriodChange = useCallback(
    (newPeriod: Period) => {
      if (!newPeriod) {
        return;
      }
      setPeriod(newPeriod);
    },
    [setPeriod]
  );

  const handleRangeChange = useCallback(
    (newRange: Range) => {
      if (!newRange) {
        return;
      }
      setRange(newRange);
    },
    [setRange]
  );

  const contextValues = useMemo(() => {
    return {
      period,
      range,
      domainsCreated: domainsCreated || 0,
      identitiesCreated: identitiesCreated || 0,
      uniqueAddresses: uniqueAddresses || 0,
      oneLetter: countPerClubMap.oneLetter,
      twoLetters: countPerClubMap.twoLetters,
      threeLetters: countPerClubMap.threeLetters,
      fourLetters: countPerClubMap.fourLetters,
      nineNineClub: countPerClubMap.nineNineClub,
      tripleNineClub: countPerClubMap.tripleNineClub,
      tenKClub: countPerClubMap.tenKClub,
      braavosClub: countPerClubMap.braavosClub,
      ogClub: countPerClubMap.ogClub,
      everaiClub: countPerClubMap.everaiClub,
      domainRegistrations: (domainRegistrations as []) || [],
      domainRenewals: (domainRenewed as []) || [],
      expiredDomains: (expiredDomains as []) || [],
      changePeriod: handlePeriodChange,
      changeRange: handleRangeChange,
      periodRangeForCharts,
      currentPeriodRange,
    };
  }, [
    period,
    range,
    countPerClubMap,
    domainRegistrations,
    domainRenewed,
    expiredDomains,
    periodRangeForCharts,
    currentPeriodRange,
    domainsCreated,
    identitiesCreated,
    uniqueAddresses,
    handlePeriodChange,
    handleRangeChange,
  ]);

  return (
    <MetricsContext.Provider value={contextValues}>
      {children}
    </MetricsContext.Provider>
  );
};
