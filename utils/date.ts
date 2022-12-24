import { LocalDate } from "@js-joda/core";
import { DomainRegistration, Period } from "../types/metrics";

export const daysBetween = (date1: Date, date2: Date) => {
  const diffTime = Math.abs(date1.getTime() - date2.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export const sumByPeriod = (data: DomainRegistration[], period: Period) => {
  const parsedToDate = data.map((item) => {
    return {
      ...item,
      date: new Date(item.from * 1000)
    }
  })
  const sortedData = parsedToDate.sort((a, b)  => a.date.getTime() - b.date.getTime());

  // Create a new array to hold the summed elements
  let summedData: { period: number, total: number, firstDayOfPeriod: Date }[] = [];

  // Iterate over the sorted array, and group the elements by period
  let currentPeriod: number;
  let firstDayOfPeriod: Date;
  sortedData.forEach((element) => {
    // Get the period number for the element's date
    let periodNumber;
    switch (period) {
      case Period.WEEKLY:
        periodNumber = getWeekNumber(element.date);
        firstDayOfPeriod = getFirstDayOfWeek({ week: periodNumber, year: element.date.getFullYear()})
        break;
      case Period.MONTHLY:
        periodNumber = element.date.getMonth();
        firstDayOfPeriod = new Date(LocalDate.of(element.date.getFullYear(),periodNumber + 1,1).toString());
        break;
      case Period.YEARLY:
        periodNumber = element.date.getFullYear();
        firstDayOfPeriod = periodNumber === 2022 ? new Date(LocalDate.of(2022, 12 ,7).toString()) : new Date(LocalDate.of(periodNumber, 1 ,1).toString());
        break;
      default:
        throw new Error('Invalid period: ' + period);
    }

    // If the period number is different from the current period, start a new group
    if (periodNumber !== currentPeriod) {
      currentPeriod = periodNumber;
      summedData.push({ period: periodNumber, total: 0, firstDayOfPeriod });
    }

    // Add the element's number to the current group's total
    summedData[summedData.length - 1].total += element.count;
  });

  return summedData;
}

const getWeekNumber = (date: Date) => {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date as any - (startDate as any)) /
        (24 * 60 * 60 * 1000));
            
  const weekNumber = Math.ceil(days / 7);
  return weekNumber;
}


export const generateDate = (period: Period, value: number) => {
  // Get the current date
  let date = new Date();

  // Set the year, month, or week based on the period and value
  switch (period) {
    case Period.WEEKLY:
      // Set the date to the first day of the week
      date.setDate(date.getDate() - date.getDay());
      // Add the number of weeks to the date
      date.setDate(date.getDate() + (value - 1) * 7);
      break;
    case Period.MONTHLY:
      // Set the month to the specified value
      date.setMonth(value);
      // Set the date to the first day of the month
      date.setDate(1);
      break;
    case Period.YEARLY:
      // Set the year to the specified value
      date.setFullYear(value);
      // Set the month to January
      date.setMonth(0);
      // Set the date to the first day of the year
      date.setDate(1);
      break;
    default:
      throw new Error('Invalid period: ' + period);
  }
  return date;
}

export const getFirstDayOfWeek = ({ week, year}: { week: number, year: number }) => {
  // Create a new date object set to the first day of the year
  const date = new Date(year, 0, 1);

  // Calculate the number of days to add to the date to get to the first day of the week
  const offset = (date.getDay() - 1 + 7) % 7;
  date.setDate(date.getDate() + offset);

  // Add the number of weeks to the date to get to the desired week
  date.setDate(date.getDate() + (week - 1) * 7);

  return date;
}


