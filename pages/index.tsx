/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useCallback, useMemo, useState } from "react";
import { FilterButton } from "../components/buttons/FilterButton";
import { Period, Range } from "../types/metrics";
import { MainStatCards } from "../components/dataComponents/MainStatCards";
import { ClubStatCards } from "../components/dataComponents/ClubStatCards";
import { ExpiredDomainsTable } from "../components/dataComponents/ExpiredDomainsTable";
import { ChartsSection } from "../components/dataComponents/ChartsSection";
import {
  getPeriodInformation,
  getPeriodInformationForStats,
} from "../utils/period";

const PERIOD_INFORMATION_FOR_STATS = getPeriodInformationForStats();

const Home: NextPage = () => {
  const [period, setPeriod] = useState<Period>(Period.MONTHLY);
  const [range, setRange] = useState<Range>(Range.ALL);

  const periodRangeForCharts = useMemo(() => {
    return getPeriodInformation(range);
  }, [range]);

  const currentPeriodRange = useMemo(() => {
    return PERIOD_INFORMATION_FOR_STATS[period];
  }, [period]);

  const handlePeriodChange = useCallback(
    (newPeriod: Period) => {
      if (!newPeriod) {
        return;
      }
      setPeriod(newPeriod);
    },
    [setPeriod]
  );

  const handleRangeChange = useCallback(
    (newRange: Range) => {
      if (!newRange) {
        return;
      }
      setRange(newRange);
    },
    [setRange]
  );

  const filterValues = [
    Period.DAILY,
    Period.WEEKLY,
    Period.MONTHLY,
    Period.YEARLY,
  ];

  const rangeValues = [Range["7D"], Range["1m"], Range["Ytd"], Range.ALL];

  return (
    <div className={styles.column}>
      <div className={styles.section1}>
        <div className={styles.column}>
          <div className={styles.row}>
            <div className="flex justify-center w-full flex-col sm:flex-row items-center mb-4">
              <div className="m-2">
                <FilterButton<Period>
                  value={period}
                  possibleValues={filterValues}
                  onChange={handlePeriodChange}
                />
              </div>
              <div className="m-2">
                <FilterButton<Range>
                  value={range}
                  possibleValues={rangeValues}
                  onChange={handleRangeChange}
                />
              </div>
            </div>
          </div>
          <MainStatCards period={period} periodRange={currentPeriodRange} />
          <ChartsSection period={period} periodRange={periodRangeForCharts} />
        </div>
      </div>

      <div className={styles.section2}>
        <ClubStatCards period={period} periodRange={currentPeriodRange} />
      </div>
      <div className={styles.section3}>
        <div className={styles.bottomLeftLeaf}>
          <img width="100%" alt="leaf" src="/assets/leavesGroup02.svg" />
        </div>
        <div className={styles.bottomRightLeaf}>
          <img width="100%" alt="leaf" src="/assets/leavesGroup01.svg" />
        </div>
        <ExpiredDomainsTable />
      </div>
    </div>
  );
};

export default Home;
