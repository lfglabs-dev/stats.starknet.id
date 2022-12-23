import { CircularProgress } from "@mui/material";
import { FC } from "react";
import style from "../../styles/StatCard.module.css"

interface StatCardProps {
  title: string;
  statValue: number;
  isLoading?: boolean;
}

export const StatCard: FC<StatCardProps> = ({ title, statValue, isLoading }) => {

  return (
    <div className={style.card}>
      <h3 className={style.subtitle}>{title}</h3>
      {isLoading ? (
        <CircularProgress className={style.loader} />
      ) : <p className={style.valueLabel}>{statValue}</p>}
    </div>
  )
}