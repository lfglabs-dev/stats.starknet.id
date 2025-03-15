import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { baseChartOptions } from "../../utils/baseChartOptions";
import React, { FC, useCallback, useMemo, useState } from 'react';
import style from '../../styles/Chart.module.css';
import { Range } from '../../types/metrics';
import { FilterButton } from '../buttons/FilterButton';

interface ChartProps {
  title: string;
  series: ApexAxisChartSeries,
  customOptions?: ApexOptions,
  formatter: (value: number) => string,
}

export const Chart: FC<ChartProps> = ({ series, formatter, customOptions, title }) => {
  const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

  const MemoizedApexCharts = React.memo(ApexCharts);

  const options = useMemo(() => ({
    series,
    options: {
      ...baseChartOptions,
      yaxis: {
        ...baseChartOptions.yaxis,
        labels: {
          ...baseChartOptions.yaxis.labels,
          formatter
        }
      },
      ...customOptions
    }
  }), [series, formatter, customOptions]);

  const [range, setRange] = useState<Range>(Range.ALL);

  const handleRangeChange = useCallback(
    (newRange: Range) => {
      if (!newRange) {
        return;
      }
      setRange(newRange);
    },
    [setRange]
  );

  const rangeValues = [Range["7D"], Range["1m"], Range["Ytd"], Range.ALL];

  return (
    <div className={style.container}>
      <div className={style.header}>
        <p className={style.title}>{title}</p>
        <FilterButton<Range>
          value={range}
          possibleValues={rangeValues}
          onChange={handleRangeChange}
        />
      </div>
      <div className={style.widget}>
        <div className={style.chartWrapper}>
          <MemoizedApexCharts
            options={options.options as ApexOptions}
            series={options.series as any}
            type="line"
            width="100%"
            height={baseChartOptions.chart.height}
          />
        </div>
      </div>
    </div>
  )
}