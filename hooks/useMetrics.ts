import { useContext } from "react"
import { MetricsContext } from "../contexts/MetricsProvider"

export const useMetrics = () => {
  const { 
    period,
    oneLetter,
    twoLetters,
    threeLetters,
    nineNineClub,
    tripleNineClub,
    tenKClub,
    domainRegistrations,
    domainRenewals,
    periodRange,
    expiredDomains,
    changePeriod
  } = useContext(MetricsContext);
  return {
    period, 
    oneLetter,
    twoLetters,
    threeLetters,
    nineNineClub,
    tripleNineClub,
    tenKClub,
    domainRegistrations,
    domainRenewals,
    periodRange,
    expiredDomains,
    changePeriod
  }
}