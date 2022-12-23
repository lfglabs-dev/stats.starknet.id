import { useMemo, useState } from "react";

interface UseTableProps<T> {
  data: T[];
  limit?: number;
}

export const useTable = <T>({ data, limit }: UseTableProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limit || 15);
  const numberOfPages = useMemo(() => {
    return Math.ceil(data.length / rowsPerPage) - 1;
  }, [data, rowsPerPage])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    page,
    numberOfPages,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    data: data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
  };
}