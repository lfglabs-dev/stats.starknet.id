import { TableContainer, TableHead, TableRow, TableCell, TableBody, Table } from "@mui/material";
import { FC } from "react";
import style from '../../styles/Table.module.css';
import { CustomTableRow } from "./CustomTableRow";

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
            <CustomTableRow key={row.domain} domain={row.domain} club={row.club} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}