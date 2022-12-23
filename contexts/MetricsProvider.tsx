import { createContext, useMemo, useState } from "react";
import { Temporality } from "../components/buttons/FIlterButton";
import { useGetClubMetric, useGetDomainRegistrations, useGetExpiredClubDomains } from "../hooks/metrics";
import { Club, DomainExpired, DomainRegistration, TemporalityRange } from "../types/metrics";
import { temporalityRangeRecord } from "../utils/temporalityToTime";

interface MetricsConfig {
  temporality: Temporality;
  oneLetter: number;
  twoLetters: number;
  threeLetters: number;
  nineNineClub: number;
  tripleNineClub: number;
  tenKClub: number;
  domainRegistrations: DomainRegistration[];
  domainRenewals: number[];
  expiredDomains: DomainExpired[];
  changeTemporality: (temporality: Temporality) => void;
  temporalityRange: TemporalityRange;
}

export const MetricsContext = createContext<MetricsConfig>({
  temporality: Temporality.MONTH,
  oneLetter: 0,
  twoLetters: 0,
  threeLetters: 0,
  nineNineClub: 0,
  tripleNineClub: 0,
  tenKClub: 0,
  domainRegistrations: [],
  domainRenewals: [],
  expiredDomains: [],
  changeTemporality: () => {},
  temporalityRange: { since: 0, end: 0, segments: 1 },
})

export const MetricsProvider = ({ children }: { children: any }) => {
  const [temporality, setTemporality] = useState<Temporality>(Temporality.MONTH);
  const [domainRenewals, setDomainRenewals] = useState<number[]>([]);

  const temporalityRecord = temporalityRangeRecord();

  const temporalityRange = useMemo(() => {
    return temporalityRecord[temporality];
  }, [temporality, temporalityRecord])

  const { clubNumber: oneLetter } = useGetClubMetric({ temporality, temporalityRange, club: Club.ONE_LETTER });
  const { clubNumber: twoLetters } = useGetClubMetric({ temporality, temporalityRange, club: Club.TWO_LETTER });
  const { clubNumber: threeLetters } = useGetClubMetric({ temporality, temporalityRange, club: Club.THREE_LETTER });
  const { clubNumber: nineNineClub } = useGetClubMetric({ temporality, temporalityRange, club: Club.NINE_NINE });
  const { clubNumber: tripleNineClub } = useGetClubMetric({ temporality, temporalityRange, club: Club.TRIPLE_NINE });
  const { clubNumber: tenKClub } = useGetClubMetric({ temporality, temporalityRange, club: Club.TEN_K_CLUB });
  const { domainRegistrations } = useGetDomainRegistrations({ temporality, temporalityRange });
  const { expiredDomains } = useGetExpiredClubDomains(Club.TEN_K_CLUB);
  
  const contextValues = useMemo(() => {
    return {
      temporality,
      oneLetter: oneLetter || 0,
      twoLetters: twoLetters || 0,
      threeLetters: threeLetters || 0,
      nineNineClub: nineNineClub || 0,
      tripleNineClub: tripleNineClub || 0,
      tenKClub: tenKClub || 0,
      domainRegistrations: domainRegistrations as [] || [],
      domainRenewals,
      expiredDomains: expiredDomains as [] || [],
      changeTemporality: setTemporality,
      temporalityRange,
    }
  }, 
  [
    domainRegistrations,
    domainRenewals,
    nineNineClub, 
    tripleNineClub, 
    oneLetter, 
    temporality, 
    tenKClub, 
    threeLetters, 
    twoLetters,
    expiredDomains,
    setTemporality,
    temporalityRange
  ]);

  return (
    <MetricsContext.Provider value={contextValues}>
      {children}
    </MetricsContext.Provider>
  )
}