import { LocalDate } from "@js-joda/core";
import { Period, PeriodRange, Range } from "../types/metrics";
import { daysBetween } from "./date";

export const getPeriodInformation = (range: Range): PeriodRange => {
  const today = LocalDate.now();
  const origin = LocalDate.of(2022, 12, 7);
  const originTimestamp = new Date('2022-12-07').getTime() / 1000;

  const { timestamp: newOriginTimestamp, date: newDate } = computeTimestampWithRange(originTimestamp, range);

  const isNewOriginBeforeOrigin = newOriginTimestamp < originTimestamp;

  const newOrigin = isNewOriginBeforeOrigin ? new Date(origin.toString()) : newDate;

  const segments = daysBetween(new Date(today.toString()), newOrigin);

  const todayTimestamp = new Date(today.toString()).getTime() / 1000;

  return {
    since: newOriginTimestamp,
    end: todayTimestamp,
    segments,
  }
}

export const getPeriodInformationForStats = (): Record<Period, PeriodRange> => {
  const today = LocalDate.now();
  const origin = LocalDate.of(2022, 12, 7);
  const originTimestamp = new Date('2022-12-07').getTime() / 1000;

  const todayMinusOneDay = today.minusDays(1);
  const todayMinusOneWeek = today.minusWeeks(1);
  const todayMinusOneMonth = today.minusMonths(1);
  const todayMinusOneYear = today.minusYears(1);

  const todayMinusOneDayTimestamp = new Date(todayMinusOneDay.toString()).getTime() / 1000;
  const todayMinusOneWeekTimestamp = new Date(todayMinusOneWeek.toString()).getTime() / 1000;
  const todayMinusOneMonthTimestamp = new Date(todayMinusOneMonth.toString()).getTime() / 1000;
  const todayMinusOneYearTimestamp = new Date(todayMinusOneYear.toString()).getTime() / 1000;

  const segments = daysBetween(new Date(today.toString()), new Date(origin.toString()));

  const todayTimestamp = new Date(today.toString()).getTime() / 1000;

  return {
    [Period.DAILY]: {
      since: todayMinusOneDayTimestamp,
      end: todayTimestamp,
      segments,
    },
    [Period.WEEKLY]: {
      since: originTimestamp > todayMinusOneWeekTimestamp ? originTimestamp : todayMinusOneWeekTimestamp,
      end: todayTimestamp,
      segments,
    },
    [Period.MONTHLY]: {
      since: originTimestamp > todayMinusOneMonthTimestamp ? originTimestamp : todayMinusOneMonthTimestamp,
      end: todayTimestamp,
      segments,
    },
    [Period.YEARLY]: {
      since: originTimestamp > todayMinusOneYearTimestamp ? originTimestamp : todayMinusOneYearTimestamp,
      end: todayTimestamp,
      segments,
    }
  }
}


export const computeTimestampWithRange = (currentTimestamp: number, range: Range): { timestamp: number, date: Date } => {
  console.log(currentTimestamp - (180 * 24 * 60 * 60))
  console.log(new Date(currentTimestamp * 1000));
  switch (range) {
    case Range['30D']:
      return {
        timestamp: currentTimestamp - (30 * 24 * 60 * 60),
        date: new Date((currentTimestamp - (30 * 24 * 60 * 60)) * 1000),
      }
    case Range['90D']:
      return {
        timestamp: currentTimestamp - (90 * 24 * 60 * 60),
        date: new Date((currentTimestamp - (90 * 24 * 60 * 60)) * 1000),
      }
    case Range['180D']:
      return {
        timestamp: currentTimestamp - (180 * 24 * 60 * 60),
        date: new Date((currentTimestamp - (180 * 24 * 60 * 60)) * 1000),
      }
    case Range.ALL:
      return {
        timestamp: currentTimestamp,
        date: new Date(currentTimestamp * 1000),
      }
  }
}