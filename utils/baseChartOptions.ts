export const baseChartOptions = {
  chart: {
    height: 225,
    toolbar: {
      show: false
    },
    selection: {
      enabled: false
    },
    zoom: {
      enabled: false
    },
  },
  tooltip: {
    enabled: true,
    x: {
      format: 'dd MMMM yyyy'
    },
    style: {
      fontSize: '12px'
    },
    fixed: {
      enabled: true,
      position: 'topRight',
    }
  },
  colors: ['#4CBD8E'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 3,
  },
  xaxis: {
    type: 'category',
    tickAmount: 10,
    labels: {
      style: {
        colors: '#8C8989',
        fontWeight: 400,
        fontSize: '12px'
      },
      datetimeFormatter: {
        year: 'yyyy',
        month: 'd MMM',
        day: 'd MMM',
        hour: 'HH:mm'
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#8C8989',
        fontWeight: 400,
        fontSize: '12px'
      }
    }
  },
  legend: {
    fontSize: '12px',
    fontWeight: 400,
    labels: {
      colors: '#19aa6e'
    }
  },
  markers: {
    size: 4,
    colors: ['#284028'],
  },
}