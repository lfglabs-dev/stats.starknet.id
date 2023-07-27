import { FC, useMemo } from "react";
import { Club, Period, PeriodRange } from "../../types/metrics";
import { useGetExpiredClubDomains } from "../../hooks/metrics";
import styles from "../../styles/Home.module.css";
import { DataInfo, DataTable } from "../tables/DataTable";
import { TablePagination } from "../tables/TablePagination";
import { useTable } from "../../hooks/useTable";
import { clubToString } from "../../utils/clubToString";

export const ExpiredDomainsTable: FC = () => {
  const { expiredDomains } = useGetExpiredClubDomains();

  const tableDataOrdered = useMemo(() => {
    if(!expiredDomains?.length) return []
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

  return (
    <div className={styles.column}>
      <h1 className={styles.title}>Recently expired</h1>
      <DataTable data={tableData} />
      <TablePagination
        numberOfPages={numberOfPages}
        onClick={handleChangePage}
      />
    </div>
  )
}