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
      fontSize: '14px'
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
  xaxis: {
    type: 'category',
    tickAmount: 3,
    show: false,
    labels: {
      style: {
        colors: 'black',
        fontWeight: 600,
        fontSize: '13px'
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
        colors: 'black',
        fontWeight: 700,
        fontSize: '14px'
      }
    }
  },
  legend: {
    fontSize: '14px',
    fontWeight: 700,
    labels: {
      colors: '#19aa6e'
    }
  },
  markers: {
    size: 6,
    colors: ['#284028'],
  },
}