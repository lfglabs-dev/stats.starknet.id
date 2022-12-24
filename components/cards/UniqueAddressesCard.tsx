import { FC } from "react";
import { useGetUniqueAddresses } from "../../hooks/metrics";
import { useMetrics } from "../../hooks/useMetrics";
import { StatCard } from "./StatCard";

export const UniqueAddressesCard: FC = () => {
  const { currentPeriodRange, period } = useMetrics();
  const { uniqueAddresses, isLoading } = useGetUniqueAddresses({ periodRange: currentPeriodRange, period });

  return (
    <StatCard title="Unique addresses" statValue={uniqueAddresses || 0} isLoading={isLoading} />
  );
};