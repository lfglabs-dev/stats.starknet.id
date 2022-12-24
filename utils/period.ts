import { LocalDate } from "@js-joda/core";
import { PeriodRange } from "../types/metrics";
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