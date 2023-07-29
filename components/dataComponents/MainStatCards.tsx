import { FC } from "react";
import { Period, PeriodRange } from "../../types/metrics";
import styles from "../../styles/Home.module.css";
import { StatCard } from "../cards/StatCard";
import { useGetDomains, useGetIdentities, useGetUniqueAddresses } from "../../hooks/metrics";


interface MainStatCardsProps {
  period: Period;
  periodRange: PeriodRange;
}

export const MainStatCards: FC<MainStatCardsProps> = ({ period, periodRange }) => {
  const { domainsCreated, isLoading: domainIsLoading } = useGetDomains({
    periodRange,
    period,
  });

  const { identitiesCreated, isLoading: identitiesIsLoading } = useGetIdentities({
    periodRange,
    period,
  });

  const { uniqueAddresses, isLoading: uniqueAddressIsLoading } = useGetUniqueAddresses({
    periodRange,
    period,
  });

  return (
    <div className={styles.row}>
      <StatCard title="Domains created" statValue={domainsCreated}  isLoading={domainIsLoading} />
      <StatCard
        title="Identities created"
        statValue={identitiesCreated}
        isLoading={identitiesIsLoading}
      />
      <StatCard title="Unique addresses" statValue={uniqueAddresses} isLoading={uniqueAddressIsLoading} />
    </div>
  )
}