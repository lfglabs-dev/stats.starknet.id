import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { baseChartOptions } from "../../utils/baseChartOptions";
import { FC } from 'react';
import style from '../../styles/Chart.module.css';

interface ChartProps {
  title: string;
  series: ApexAxisChartSeries,
  customOptions?: ApexOptions,
  formatter: (value: number) => string,
}

export const Chart: FC<ChartProps> = ({ series, formatter, customOptions, title }) => {
  const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

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
          <ApexCharts
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