import { TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Pagination } from "@mui/material";
import { FC } from "react";
import style from '../../styles/Table.module.css';

interface DataInfo {
  club: string;
  domain: string;
  expiration: Date;
}

interface TableProps {
  data: DataInfo[];
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const DataTable: FC<TableProps> = ({ data }) => {
  return (
    <TableContainer className={style.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={style.tableCellTitle}>Domain</TableCell>
            <TableCell align="center" className={style.tableCellTitle}>Expiration</TableCell>
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
              <TableCell align="center" className={style.tableCellLabel}>{row.expiration.toLocaleDateString()}</TableCell>
              <TableCell align="center" className={style.tableCellLabel}>{row.club}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}