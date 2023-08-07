import { FC } from "react";
import { Period, PeriodRange } from "../../types/metrics";
import styles from "../../styles/Home.module.css";
import {
  useGetDomains,
  useGetIdentities,
  useGetUniqueAddresses,
} from "../../hooks/metrics";
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
        title="Domains created"
        statValue={domainsCreated}
        isLoading={domainIsLoading}
        progress={"0%"}
        progressDescription={`Since ${periodName}`}
        icon="/icons/connexionIcon.svg"
      />
      <AdvancedStatCard
        title="Identities created"
        statValue={identitiesCreated}
        isLoading={identitiesIsLoading}
        progress={"0%"}
        progressDescription={`Since ${periodName}`}
        icon="/icons/webIdentitiesIcon.svg"
      />
      <AdvancedStatCard
        title="Unique addresses"
        statValue={uniqueAddresses}
        isLoading={uniqueAddressIsLoading}
        progress={"0%"}
        progressDescription={`Since ${periodName}`}
        icon="/icons/crownIcon.svg"
      />
    </div>
  );
};
