import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import React, { FC, useCallback, useMemo, useState } from 'react';
import style from '../../styles/Chart.module.css';
import { Range } from '../../types/metrics';
import TimeFilter from '../buttons/TimeFilterButton';
import { getTooltipConfig } from './Tooltip';
import { baseChartOptions } from '../../utils/baseChartOptions';

interface ChartProps {
  title: string;
  series: ApexAxisChartSeries;
  customOptions?: ApexOptions;
  formatter: (value: number) => string;
  domainData?: {
    [key: string]: { [date: string]: number };
  };
}

export const Chart: FC<ChartProps> = ({ 
  series, 
  formatter, 
  customOptions, 
  title,
  domainData = {
    "New domains": { "Nov 21": 1700, "Nov 22": 1800, "Nov 23": 1928, "Nov 24": 2000, "Nov 25": 1950, "Nov 26": 2100, "Nov 27": 2150, "Nov 28": 2050, "Nov 29": 2200, "Nov 30": 2250 },
    "Transfers": { "Nov 21": 850, "Nov 22": 900, "Nov 23": 927, "Nov 24": 950, "Nov 25": 930, "Nov 26": 960, "Nov 27": 980, "Nov 28": 950, "Nov 29": 1000, "Nov 30": 1020 },
    "Set as main": { "Nov 21": 70, "Nov 22": 75, "Nov 23": 84, "Nov 24": 90, "Nov 25": 85, "Nov 26": 95, "Nov 27": 98, "Nov 28": 92, "Nov 29": 100, "Nov 30": 105 },
    "New subdomains": { "Nov 21": 3600, "Nov 22": 3700, "Nov 23": 3829, "Nov 24": 3900, "Nov 25": 3850, "Nov 26": 4000, "Nov 27": 4100, "Nov 28": 4050, "Nov 29": 4200, "Nov 30": 4300 },
    "Renewed domain": { "Nov 21": 780, "Nov 22": 800, "Nov 23": 827, "Nov 24": 850, "Nov 25": 830, "Nov 26": 860, "Nov 27": 880, "Nov 28": 865, "Nov 29": 890, "Nov 30": 910 }
  }
}) => {
  const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
  const MemoizedApexCharts = React.memo(ApexCharts);

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

  const tooltipConfig = useMemo(() => getTooltipConfig(domainData), [domainData]);

  // Enhanced marker settings to improve the hover experience
  const enhancedMarkers = {
    markers: {
      ...baseChartOptions.markers,
      hover: {
        size: 8,
        sizeOffset: 0,
      },

      onClick: () => {}, 
      strokeWidth: 0, 
      discrete: [ ],
   
    }
  };
  

  const options = useMemo(() => ({
    series,
    options: {
      ...baseChartOptions,
      ...enhancedMarkers,
      yaxis: {
        ...baseChartOptions.yaxis,
        labels: {
          ...baseChartOptions.yaxis?.labels,
          formatter
        }
      },
      // Completely replace any tooltip config from baseChartOptions
      tooltip: tooltipConfig.tooltip,
      ...customOptions
    }
  }), [series, formatter, customOptions, tooltipConfig]);
  
  return (
    <div className={style.container}>
      <div className={style.header}>
        <p className={style.title}>{title}</p>
        <TimeFilter onFilterChange={handleRangeChange} />
      </div>
      <div className={style.widget}>
        <div className={style.chartWrapper}>
          <MemoizedApexCharts
            options={options.options as ApexOptions}
            series={options.series as any}
            type="line"
            width="100%"
            height={baseChartOptions.chart?.height}
          />
        </div>
      </div>
    </div>
  );
};




