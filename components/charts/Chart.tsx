import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { baseChartOptions } from "../../utils/baseChartOptions";
import React, { FC } from 'react';
import style from '../../styles/Chart.module.css';

interface ChartProps {
  title: string;
  series: ApexAxisChartSeries,
  customOptions?: ApexOptions,
  formatter: (value: number) => string,
}

export const Chart: FC<ChartProps> = ({ series, formatter, customOptions, title }) => {

  const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

  const MemoizedApexCharts = React.memo(ApexCharts);

  const options = {
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
  }

  return (
    <div className={style.container}>
      <p className={style.title}>{title}</p>
      <div className={style.widget}>
        <div className={style.chartWrapper}>
          <MemoizedApexCharts
            options={options.options as ApexOptions}
            series={options.series as any}
            type="bar"
            width="100%"
          />
        </div>
      </div>
    </div>
  )
}