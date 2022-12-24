export const baseChartOptions = {
  chart: {
    height: 400,
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
    }
  },
  colors: ['#19aa6e'],
  dataLabels: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
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
  grid: {
    show: false
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.4,
      gradientToColors: ['#98f5ce','#40f7ab','#19aa6e'],
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 100],
      colorStops: []
    }
  }
}