import { FC } from "react";
import {
  useGetDomains,
  useGetIdentities,
  useGetUniqueAddresses,
} from "../../hooks/metrics";
import styles from "../../styles/Home.module.css";
import { Period, PeriodRange } from "../../types/metrics";
import DomainsStatCard from "../cards/DomainsStatCard";
import { AdvancedStatCard } from "../cards/AdvancedStatCard";

interface MainStatCardsProps {
  period: Period;
  periodRange: PeriodRange;
}

export const MainStatCards: FC<MainStatCardsProps> = ({
  period,
  periodRange,
}) => {
  const { domainsCreated, isLoading: domainIsLoading } = useGetDomains({
    periodRange,
    period,
  });

  const { identitiesCreated, isLoading: identitiesIsLoading } =
    useGetIdentities({
      periodRange,
      period,
    });

  const { uniqueAddresses, isLoading: uniqueAddressIsLoading } =
    useGetUniqueAddresses({
      periodRange,
      period,
    });

  const periodName = period.startsWith("dai")
    ? "yesterday"
    : period.startsWith("wee")
    ? "last week"
    : period.startsWith("mon")
    ? "last month"
    : "last year";

  return (
    <div className={styles.row}>
      <AdvancedStatCard
        title="Total Domains"
        statValue={domainsCreated}
        isLoading={domainIsLoading}
        tooltipText="Total number of domain names registered on Starknet ID since launch"
      />
      <DomainsStatCard
        title="Subdomains"
        statValue={28145}
        isLoading={domainIsLoading}
        tooltip="Total number of subdomains created from main domains (including Argent, Braavos, OG, Everai, and others)"
      />
    </div>
  );
};
