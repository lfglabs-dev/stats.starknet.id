import { FC } from "react";
import { useGetIdentities } from "../../hooks/metrics";
import { useMetrics } from "../../hooks/useMetrics";
import { StatCard } from "./StatCard";

export const IdentitiesCreatedCard: FC = () => {
  const { temporality, temporalityRange } = useMetrics();
  const { identitiesCreated, isLoading } = useGetIdentities({ temporality, temporalityRange });

  return (
    <StatCard title="Identities created" statValue={identitiesCreated || 0} isLoading={isLoading} />
  );
};