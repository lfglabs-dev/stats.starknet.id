import { orderBy } from "lodash";
import { DomainCount, Period } from "../types/metrics";
import { getDateFromPeriod, sumByPeriod } from "./date";

export const domainCountToDataChart = (data: DomainCount[], period: Period) => {
  const domainSumByPeriod = period === Period.DAILY ? data.map(domain => {
      return { period: 1, firstDayOfPeriod: new Date(domain.from * 1000), total: domain.count };
    }) : sumByPeriod(data, period)
    
  const formatted = domainSumByPeriod.map(domainRegistration => {
    return { x: getDateFromPeriod(period ,domainRegistration.firstDayOfPeriod.getTime()), y: domainRegistration.total, originalTimeStamp: domainRegistration.firstDayOfPeriod }
  })
  const ordered = orderBy(formatted, ['originalTimeStamp'], ['asc'])
  return ordered;
}