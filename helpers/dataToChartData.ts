export interface ChartData {
  options: {
    chart: {
      id: string;
    }
    xasis: {
      categories: string[] | number[];
    }
  },
  series: ApexAxisChartSeries
}

interface dataToChartDataProps {
  id: string;
  data: MockedChartData
}

export interface MockedData {
  day: Date;
  value: number;
}

export interface MockedChartData {
  values: MockedData[];
}

export const dataToChartData = ({ id, data }: dataToChartDataProps): ChartData => {
  return {
    options: {
      chart: {
        id,
      },
      xasis: {
        categories: data.values.map(mock => mock.day.getTime())
        // ['Sun, 18 Dec 2022 00:00:00 GMT', 'Mon, 19 Dec 2022 00:00:00 GMT', 'Tue, 20 Dec 2022 00:00:00 GMT', 'Wed, 21 Dec 2022 00:00:00 GMT', 'Thu, 22 Dec 2022 00:00:00 GMT', 'Fri, 23 Dec 2022 00:00:00 GMT', 'Sat, 24 Dec 2022 00:00:00 GMT', 'Sun, 25 Dec 2022 00:00:00 GMT', 'Mon, 26 Dec 2022 00:00:00 GMT', 'Tue, 27 Dec 2022 00:00:00 GMT', 'Wed, 28 Dec 2022 00:00:00 GMT', 'Thu, 29 Dec 2022 00:00:00 GMT'],
      }
    },
    series: [
      {
        name: 'series-1',
        data: data.values,
      }
    ]
  }
}