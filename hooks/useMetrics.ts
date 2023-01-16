import { useContext } from "react"
import { MetricsContext } from "../contexts/MetricsProvider"

export const useMetrics = () => {
  const { 
    period,
    domainsCreated,
    identitiesCreated,
    uniqueAddresses,
    oneLetter,
    twoLetters,
    threeLetters,
    fourLetters,
    nineNineClub,
    tripleNineClub,
    tenKClub,
    domainRegistrations,
    domainRenewals,
    periodRangeForCharts: periodRange,
    expiredDomains,
    currentPeriodRange,
    changePeriod
  } = useContext(MetricsContext);
  return {
    period,
    domainsCreated,
    identitiesCreated,
    uniqueAddresses,
    oneLetter,
    twoLetters,
    threeLetters,
    fourLetters,
    nineNineClub,
    tripleNineClub,
    tenKClub,
    domainRegistrations,
    domainRenewals,
    periodRange,
    expiredDomains,
    currentPeriodRange,
    changePeriod
  }
}