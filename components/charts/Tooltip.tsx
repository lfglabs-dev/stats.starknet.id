import style from '../../styles/Chart.module.css';

interface TooltipData {
  [key: string]: { [date: string]: number };
}

export interface CustomTooltipProps {
  dataPointIndex: number;
  w: any;
  domainData: TooltipData;
}

export const generateCustomTooltip = (props: CustomTooltipProps): string => {
  const { dataPointIndex, w, domainData } = props;
  const date = w.globals.categoryLabels[dataPointIndex];
  
  // Get domain data for the specific date
  const dateData: Record<string, number> = {};
  Object.keys(domainData).forEach(key => {
    dateData[key] = domainData[key][date] || 0;
  });
  
  return `
    <div class="${style.tooltip}">
      <div class="${style.tooltipHeader}">${date}</div>
      <div class="${style.tooltipContent}">
        ${Object.entries(dateData).map(([key, val]) => `
          <div class="${style.tooltipRow}">
            <span class="${style.tooltipDot}">●</span>
            <span class="${style.tooltipLabel}">${key}: ${val.toLocaleString()}</span>
            // <span class="${style.tooltipValue}"></span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

export const getTooltipConfig = (domainData: TooltipData) => ({
  tooltip: {
    enabled: true,
    shared: true,
    custom: function({ dataPointIndex, w }: { dataPointIndex: number; w: any }) {
      return generateCustomTooltip({ dataPointIndex, w, domainData });
    },
    intersect: false,
    followCursor: false,
    fixed: {
      enabled: false,
      position: 'topLeft',
      offsetX: 0,
      offsetY: -10,
    },
    x: {
      show: false
    },
    y: {
      formatter: undefined,
      title: {
        formatter: () => '',
      },
    },
    marker: {
      show: false,
    },
    onDatasetHover: {
      highlightDataSeries: true,
    },
    // Add these properties for styling
    style: {
      fontSize: '0px', // Make the text invisible
      fontFamily: 'inherit',
      cssClass: 'hidden-tooltip'
    },
    // Add custom CSS to your stylesheet
    cssClass: 'hidden-tooltip',
    // Add z-index
    z: -1
  }
});



