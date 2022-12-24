import { LocalDate } from "@js-joda/core";
import { Period, PeriodRange } from "../types/metrics";
import { daysBetween } from "./date";

export const getPeriodInformation = (): PeriodRange => {
  const today = LocalDate.now();
  const origin = LocalDate.of(2022, 12, 7);
  const originTimestamp = new Date('2022-12-07').getTime() / 1000;

  const segments = daysBetween(new Date(today.toString()), new Date(origin.toString()));

  const todayTimestamp = new Date(today.toString()).getTime() / 1000;

  return {
    since: originTimestamp,
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