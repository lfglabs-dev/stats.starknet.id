import { FC, useMemo } from "react";
import { Period, PeriodRange } from "../../types/metrics";
import { useGetDomainRegistrations, useGetDomainRenewals } from "../../hooks/metrics";
import { domainCountToDataChart } from "../../utils/domainCountToDataChart";
import styles from "../../styles/Home.module.css";
import { Chart } from "../charts/Chart";
import { formatValue } from "../../utils/format";


interface ChartsSectionProps {
  period: Period;
  periodRange: PeriodRange;
}
export const ChartsSection: FC<ChartsSectionProps> = ({ period, periodRange }) => {
  const { domainRegistrations, isLoading: domainRegistrationsIsLoading } = useGetDomainRegistrations({
    periodRange: periodRange,
    period,
  });
  
  const { domainRenewed, isLoading: domainRenewedIsLoading } = useGetDomainRenewals({
    periodRange: periodRange,
    period,
  });
  
  const domainDataChart = useMemo(() => {
    return domainCountToDataChart(domainRegistrations ?? [], period);
  }, [domainRegistrations, period]);

  const domainRenewalDataChart = useMemo(() => {
    return domainCountToDataChart(domainRenewed ?? [], period);
  }, [domainRenewed, period]);

  return (
    <div className={styles.row}>
      <Chart
        title="Amount of domain registrations"
        series={[
          {
            name: "Domains created",
            data: domainDataChart,
          },
        ]}
        formatter={(value) => formatValue(value)}
      />
      <Chart
        title="Amount of domain renewals"
        series={[
          {
            name: "Domain renewed",
            data: domainRenewalDataChart,
          },
        ]}
        formatter={(value) => formatValue(value)}
      />
    </div>
  )
}