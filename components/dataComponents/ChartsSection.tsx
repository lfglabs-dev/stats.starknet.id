import { FC } from "react";
import { Period, PeriodRange } from "../../types/metrics";
import { useGetDomainRegistrations, useGetDomainRenewals } from "../../hooks/metrics";
import styles from "../../styles/Home.module.css";
import { Chart } from "../charts/Chart";
import { formatValue } from "../../utils/format";


interface ChartsSectionProps {
  period: Period;
  periodRange: PeriodRange;
}
export const ChartsSection: FC<ChartsSectionProps> = ({ period, periodRange }) => {
  const { domainRegistrations } = useGetDomainRegistrations({
    periodRange: periodRange,
    period,
  });
  
  const { domainRenewed } = useGetDomainRenewals({
    periodRange: periodRange,
    period,
  });

  return (
    <div className={styles.row}>
      <Chart
        title="Amount of domain registrations"
        series={[
          {
            name: "Domains created",
            data: domainRegistrations,
          },
        ]}
        formatter={(value) => formatValue(value)}
      />
      <Chart
        title="Amount of domain renewals"
        series={[
          {
            name: "Domain renewed",
            data: domainRenewed,
          },
        ]}
        formatter={(value) => formatValue(value)}
      />
    </div>
  )
}