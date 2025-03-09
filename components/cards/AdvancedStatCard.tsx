import { CircularProgress } from "@mui/material";
import { FC, ReactNode } from "react";
import style from "../../styles/AdvancedStatCard.module.css";

interface StatCardProps {
  title: string;
  statValue: number;
  isLoading?: boolean;
  progress?: string;
  progressDescription?: string;
  icon?: string;
}

export const AdvancedStatCard: FC<StatCardProps> = ({
  title,
  statValue,
  isLoading,
  progress,
  progressDescription,
  icon = "/icons/infoIcon.png",
}) => {
  return (
    <div className={style.card}>
      <div className="flex flex-col justify-between w-full gap-3">
        <div className="flex justify-between items-center w-full">
          <h3 className={style.title}>{title}</h3>
          <img src={icon} alt="icon" className={style.icon} />
        </div>
        {isLoading ? (
          <CircularProgress className={style.loader} />
        ) : (
          <>
            <p className={style.valueLabel}>{statValue}</p>
            {/* <span
              className={`${style.progress} ${
                progress?.startsWith("-") && style.negative
              }`}
            >
              {progress}
            </span>
            <label className={style.progressLabel}>{progressDescription}</label> */}
          </>
        )}
      </div>
    </div>
  );
};
