import { ChronoUnit, DayOfWeek, LocalDate } from "@js-joda/core";
import { Temporality } from "../components/buttons/FIlterButton";
import { TemporalityRange } from "../types/metrics";

export const temporalityRangeRecord = (): Record<Temporality, TemporalityRange> => {
  const today = LocalDate.now();
  const todayTimestamp = new Date(today.toString()).getTime() / 1000;

  const firstDayOfYear = today.withDayOfYear(1);

  const monthSegments = today.dayOfMonth(); // The current day of the month gives us the number of segments we need
  const yearSegments = firstDayOfYear.until(today, ChronoUnit.DAYS) // The number of days between the first day of the year and today gives us the number of segments we need

  const firstDayOfWeekTimestamp = todayTimestamp - (7 * 24 * 3600);
  const firstDayOfMonthTimestamp = todayTimestamp - (monthSegments * 24 * 3600);
  const firstDayOfYearTimestamp = todayTimestamp - (yearSegments * 24 * 3600);

  return {
    [Temporality.WEEK]: {
      since: firstDayOfWeekTimestamp,
      end: todayTimestamp,
      segments: 7,
    },
    [Temporality.MONTH]: {
      since: firstDayOfMonthTimestamp,
      end: todayTimestamp,
      segments: monthSegments,
    },
    [Temporality.YEAR]: {
      since: firstDayOfYearTimestamp,
      end: todayTimestamp,
      segments: yearSegments,
    }
  } as const
}