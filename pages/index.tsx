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
import { Club, Period, Range } from "../types/metrics";
import { useTable } from "../hooks/useTable";
import { domainCountToDataChart } from "../utils/domainCountToDataChart";
import { clubToString } from "../utils/clubToString";

const Home: NextPage = () => {
  const {
    period,
    range,
    domainsCreated,
    identitiesCreated,
    uniqueAddresses,
    oneLetter,
    twoLetters,
    threeLetters,
    fourLetters,
    nineNineClub,
    tripleNineClub,
    tenKClub,
    braavosClub,
    ogClub,
    everaiClub,
    domainRegistrations,
    expiredDomains,
    domainRenewals,
    changePeriod,
    changeRange,
  } = useMetrics();

  const tableDataOrdered = useMemo(() => {
    return expiredDomains.map((domain) => ({
      ...domain,
      club: clubToString(domain.club as Club),
    }));
  }, [expiredDomains]);

  const {
    data: tableData,
    numberOfPages,
    handleChangePage,
  } = useTable<DataInfo>({ data: tableDataOrdered, limit: 10 });

  const domainDataChart = useMemo(() => {
    return domainCountToDataChart(domainRegistrations, period);
  }, [domainRegistrations, period]);

  const domainRenewalDataChart = useMemo(() => {
    return domainCountToDataChart(domainRenewals, period);
  }, [domainRenewals, period]);

  const filterValues = [
    Period.DAILY,
    Period.WEEKLY,
    Period.MONTHLY,
    Period.YEARLY,
  ];

  const rangeValues = [Range["30D"], Range["90D"], Range["180D"], Range.ALL];

  return (
    <div className={styles.column}>
      <div className={styles.section1}>
        <div className={styles.column}>
          <div className={styles.row}>
            <div className="flex justify-center w-full flex-col sm:flex-row items-center">
              <div className="m-2">
                <FilterButton<Period>
                  value={period}
                  possibleValues={filterValues}
                  onChange={changePeriod}
                />
              </div>
              <div className="m-2">
                <FilterButton<Range>
                  value={range}
                  possibleValues={rangeValues}
                  onChange={changeRange}
                />
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <StatCard title="Domains created" statValue={domainsCreated} />
            <StatCard
              title="Identities created"
              statValue={identitiesCreated}
            />
            <StatCard title="Unique addresses" statValue={uniqueAddresses} />
          </div>
          <div className={styles.row}>
            <Chart
              title="Amount of domain registrations"
              series={[
                {
                  name: "Domains created",
                  data: domainDataChart,
                },
              ]}
              formatter={(value) => formatValue(value)}
            />
            <Chart
              title="Amount of domain renewals"
              series={[
                {
                  name: "Domain renewed",
                  data: domainRenewalDataChart,
                },
              ]}
              formatter={(value) => formatValue(value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.section2}>
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
            <StatCard title="4 letters" statValue={fourLetters} />
          </div>
          <div className={styles.row}>
            <StatCard title="Braavos Subdomains" statValue={braavosClub} />
            <StatCard title="OG Subdomains" statValue={ogClub} />
            <StatCard title="Everai Subdomains" statValue={everaiClub} />
          </div>
        </div>
      </div>
      <div className={styles.section3}>
        <div className={styles.bottomLeftLeaf}>
          <img width="100%" alt="leaf" src="/assets/leavesGroup02.svg" />
        </div>
        <div className={styles.bottomRightLeaf}>
          <img width="100%" alt="leaf" src="/assets/leavesGroup01.svg" />
        </div>

        <div className={styles.column}>
          <h1 className={styles.title}>Recently expired</h1>
          <DataTable data={tableData} />
          <TablePagination
            numberOfPages={numberOfPages}
            onClick={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
