import { FC } from "react";
import { Period, PeriodRange } from "../../types/metrics";
import { useGetDomainRegistrations } from "../../hooks/metrics";
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

  return (
    <div className={styles.row}>
      <Chart
        title="Domains activities"
        series={[
          {
            name: "Domains created",
            data: domainRegistrations,
          },
        ]}
        formatter={(value) => formatValue(value)}
      />
    </div>
  )
}