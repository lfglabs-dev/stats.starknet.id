import { FC } from "react";
import { useGetDomains } from "../../hooks/metrics";
import { useMetrics } from "../../hooks/useMetrics";
import { StatCard } from "./StatCard";

export const DomainCreatedCard: FC = () => {
  const { currentPeriodRange, period } = useMetrics();
  const { domainsCreated, isLoading } = useGetDomains({ periodRange: currentPeriodRange, period });

  return (
    <StatCard title="Domains created" statValue={domainsCreated || 0} isLoading={isLoading} />
  );
};