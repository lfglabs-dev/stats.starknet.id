import { Pagination, PaginationItem } from "@mui/material";

import { FC } from "react";
import style from '../../styles/Pagination.module.css';

interface PaginationProps {
  onClick?: () => void;
  numberOfPages: number;
}

export const TablePagination: FC<PaginationProps> = ({ onClick, numberOfPages }) => {
  return (
    <Pagination
      count={numberOfPages}
      renderItem={(item) => (
        <PaginationItem
          className={style.paginationItem}
          {...item}
        />
      )}
    />
  );
};

