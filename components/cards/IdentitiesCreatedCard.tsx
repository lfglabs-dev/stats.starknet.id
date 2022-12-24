import { FC } from "react";
import { useGetIdentities } from "../../hooks/metrics";
import { useMetrics } from "../../hooks/useMetrics";
import { StatCard } from "./StatCard";

export const IdentitiesCreatedCard: FC = () => {
  const { currentPeriodRange, period } = useMetrics();
  const { identitiesCreated, isLoading } = useGetIdentities({ periodRange: currentPeriodRange, period });

  return (
    <StatCard title="Identities created" statValue={identitiesCreated || 0} isLoading={isLoading} />
  );
};