import { TableContainer, TableHead, TableRow, TableCell, TableBody, Table } from "@mui/material";
import { FC } from "react";
import style from '../../styles/Table.module.css';

export interface DataInfo {
  club: string;
  domain: string;
}

interface TableProps {
  data: DataInfo[];
}

export const DataTable: FC<TableProps> = ({ data }) => {
  return (
    <TableContainer className={style.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={style.tableCellTitle}>Domain</TableCell>
            <TableCell align="center" className={style.tableCellTitle}>Club</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.domain}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row" className={style.tableCellLabel}>
                {row.domain}
              </TableCell>
              <TableCell align="center" className={style.tableCellLabel}>{row.club}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}