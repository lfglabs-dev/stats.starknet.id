import { orderBy } from "lodash";
import { DomainCount, Period } from "../types/metrics";
import { getDateFromPeriod, sumByPeriod } from "./date";

export const domainCountToDataChart = (data: DomainCount[], period: Period) => {
  const domainSumByPeriod =
    period === Period.DAILY
      ? data.map((domain) => {
          return {
            period: 1,
            firstDayOfPeriod: new Date(domain.from * 1000),
            total: domain.count,
          };
        })
      : sumByPeriod(data, period);

  const formatted = domainSumByPeriod.map((domainRegistration) => {
    return {
      x: getDateFromPeriod(
        period,
        domainRegistration.firstDayOfPeriod.getTime()
      ),
      y: domainRegistration.total,
      originalTimeStamp: domainRegistration.firstDayOfPeriod,
    };
  });
  const ordered = orderBy(formatted, ["originalTimeStamp"], ["asc"]);
  return ordered;
};

export const domainCountToDailyChart = (
  data: DomainCount[],
  range: { since: number; end: number }
): { x: string; y: number }[] => {
  const countsMap = new Map<string, number>();

  // Fill map with domain count per day
  for (const { from, count } of data) {
    const date = new Date(from * 1000);
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    countsMap.set(key, (countsMap.get(key) || 0) + count);
  }

  const result: { x: string; y: number }[] = [];

  const start = new Date(range.since * 1000);
  const end = new Date(range.end * 1000);

  for (
    let d = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    d <= end;
    d.setDate(d.getDate() + 1)
  ) {
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const count = countsMap.get(key) || 0;

    const monthShort = d.toLocaleString("en-US", { month: "short" });
    const day = d.getDate();

    result.push({
      x: `${monthShort} ${day}`,
      y: count,
    });
  }

  return result;
};
