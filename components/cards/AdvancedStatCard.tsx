import { CircularProgress } from "@mui/material";
import { FC, ReactNode } from "react";
import style from "../../styles/AdvancedStatCard.module.css";

interface StatCardProps {
  title: string;
  statValue: number;
  isLoading?: boolean;
  progress?: string;
  progressDescription?: string;
  icon: string;
}

export const AdvancedStatCard: FC<StatCardProps> = ({
  title,
  statValue,
  isLoading,
  progress,
  progressDescription,
  icon,
}) => {
  return (
    <div className={style.card}>
      <div className={style.text}>
        <h3 className={style.subtitle}>{title}</h3>
        {isLoading ? (
          <CircularProgress className={style.loader} />
        ) : (
          <>
            <p className={style.valueLabel}>{statValue}</p>
            <span
              className={`${style.progress} ${
                progress?.startsWith("-") && style.negative
              }`}
            >
              {progress}
            </span>
            <label className={style.progressLabel}>{progressDescription}</label>
          </>
        )}
      </div>
      <img src={icon} alt="icon" className={style.icon} />
    </div>
  );
};
