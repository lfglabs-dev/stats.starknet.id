import { useCallback, useMemo, useState } from "react";

interface UseTableProps<T> {
  data: T[];
  limit?: number;
}

export const useTable = <T>({ data, limit }: UseTableProps<T>) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(limit || 15);
  const numberOfPages = useMemo(() => {
    return Math.ceil(data.length / rowsPerPage) - 1;
  }, [data, rowsPerPage])

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, [setPage]);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, [setRowsPerPage, setPage]);

  return {
    page,
    numberOfPages,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    data: data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
  };
}