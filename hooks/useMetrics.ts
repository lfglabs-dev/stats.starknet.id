import { useContext } from "react"
import { MetricsContext } from "../contexts/MetricsProvider"

export const useMetrics = () => {
  const { 
    temporality,
    oneLetter,
    twoLetters,
    threeLetters,
    nineNineClub,
    tripleNineClub,
    tenKClub,
    domainRegistrations,
    domainRenewals,
    temporalityRange,
    expiredDomains,
    changeTemporality,
  } = useContext(MetricsContext);
  return {
    temporality, 
    oneLetter,
    twoLetters,
    threeLetters,
    nineNineClub,
    tripleNineClub,
    tenKClub,
    domainRegistrations,
    domainRenewals,
    temporalityRange,
    expiredDomains,
    changeTemporality,
  }
}