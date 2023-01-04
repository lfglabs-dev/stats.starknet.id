import { orderBy } from "lodash";
import { DomainCount, Period } from "../types/metrics";
import { sumByPeriod } from "./date";

export const domainCountToDataChart = (data: DomainCount[], period: Period): number[][] => {
  const domainSumByPeriod = period === Period.DAILY ? data.map(domain => {
      return { period: 1, firstDayOfPeriod: new Date(domain.from * 1000), total: domain.count };
    }) : sumByPeriod(data, period)

  const ordered = orderBy(domainSumByPeriod, ['from'], ['asc'])
  const formatted = ordered.map(domainRegistration => [domainRegistration.firstDayOfPeriod.getTime() , domainRegistration.total]);
  return formatted;
}