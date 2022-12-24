/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { StatCard } from "../components/cards/StatCard";
import styles from "../styles/Home.module.css";
import { Chart } from "../components/charts/Chart";
import { useMemo } from "react";
import { formatValue } from "../utils/format";
import { DataInfo, DataTable } from "../components/tables/DataTable";
import { TablePagination } from "../components/tables/TablePagination";
import { FilterButton } from "../components/buttons/FIlterButton";
import { useMetrics } from "../hooks/useMetrics";
import { DomainCreatedCard } from "../components/cards/DomainCreatedCard";
import { IdentitiesCreatedCard } from "../components/cards/IdentitiesCreatedCard";
import { UniqueAddressesCard } from "../components/cards/UniqueAddressesCard";
import { orderBy } from "lodash";
import { Club, Period } from "../types/metrics";
import { useTable } from "../hooks/useTable";
import { sumByPeriod } from "../utils/date";

const Home: NextPage = () => {
  const { 
    period,
    oneLetter,
    twoLetters,
    threeLetters,
    nineNineClub,
    tripleNineClub,
    tenKClub,
    domainRegistrations,
    expiredDomains,
    changePeriod
   } = useMetrics();

  const tableDataOrdered = useMemo(() => {
    const parsed = expiredDomains.map(d => {
      return { domain: d.domain, expiration: new Date(d.expiry * 1000), club: Club.TEN_K_CLUB}
    })
    const ordered = orderBy(parsed, ['expiration'], ['desc'])
    return ordered;
  }, [expiredDomains])

  const {
    data: tableData,
    numberOfPages,
    handleChangePage,
  } = useTable<DataInfo>({ data: tableDataOrdered, limit: 10 })

  const domainRegistrationSumByPeriod = useMemo(() => {
    return period === Period.DAILY ? domainRegistrations.map(domain => {
      return { period: 1, firstDayOfPeriod: new Date(domain.from * 1000), total: domain.count };
    }) : sumByPeriod(domainRegistrations, period);
  }, [domainRegistrations, period])

  const domainDataChart = useMemo(() => {
    const ordered = orderBy(domainRegistrationSumByPeriod, ['from'], ['asc'])
    const formatted = ordered.map(domainRegistration => [domainRegistration.firstDayOfPeriod.getTime() , domainRegistration.total]);
    return formatted;
  }, [domainRegistrationSumByPeriod])

  const filterValues = [Period.DAILY, Period.WEEK, Period.MONTH, Period.YEAR];

  return (
    <div className={styles.column}>
      <div className={styles.topLeftLeaf}>
        <img width="100%" alt="leaf" src="/assets/leaf_2.png" />
      </div>
      <div className={styles.topRightLeaf}>
        <img width="100%" alt="leaf" src="/assets/leaf_1.png" />
      </div>
      <div className={styles.section1}>
        <div className={styles.column}>
          <div className={styles.row}>
            <div className="flex justify-center w-full">
              <FilterButton value={period} possibleValues={filterValues} onChange={changePeriod}/>
            </div>
          </div>  
          <div className={styles.row}>
            <DomainCreatedCard />
            <IdentitiesCreatedCard />
            <UniqueAddressesCard />
          </div>
          <div className={styles.row}>
            <Chart
              title="Amount of domain registrations"
              series={[{
                name:'Domain created',
                data: domainDataChart
              }]}
              formatter={(value) => formatValue(value)}
            />
            <Chart
              title="Amount of domain renewals"
              series={[{
                name:'Domain renewed',
                data: domainDataChart
              }]}
              formatter={(value) => formatValue(value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.section1}>
        <div className={styles.column}>
          <h1 className={styles.title}>Clubs</h1>
          <div className={styles.row}>
            <StatCard title="1 letter" statValue={oneLetter} />
            <StatCard title="2 letters" statValue={twoLetters} />
            <StatCard title="3 letters" statValue={threeLetters} />
          </div>
          <div className={styles.row}>
            <StatCard title="99 Club" statValue={nineNineClub} />
            <StatCard title="999 Club" statValue={tripleNineClub} />
            <StatCard title="10k Club" statValue={tenKClub} />
          </div>
        </div>
      </div>
      <div className={styles.section3}>
        <div className={styles.bottomLeftLeaf}>
          <img width="100%" alt="leaf" src="/assets/leaf_3.png" />
        </div>
        <div className={styles.bottomRightLeaf}>
          <img width="100%" alt="leaf" src="/assets/leaf_1.png" />
        </div>

        <div className={styles.column}>
          <h1 className={styles.title}>Recently expired</h1>
          <DataTable data={tableData} />
          <TablePagination numberOfPages={numberOfPages} onClick={handleChangePage} />
        </div>
      </div>
    </div>
  );
};

export default Home;
