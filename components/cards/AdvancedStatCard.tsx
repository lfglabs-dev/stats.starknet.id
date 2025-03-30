import { CircularProgress } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { Info } from "lucide-react";
import style from "../../styles/AdvancedStatCard.module.css";
import starks from "../../public/icons/starknet.png";

interface StatCardProps {
  title: string;
  statValue: number;
  isLoading?: boolean;
  progress?: string;
  progressDescription?: string;
  icon: string;
  tooltipText: string;
}

export const AdvancedStatCard: FC<StatCardProps> = ({
  title,
  statValue,
  isLoading,
  progress,
  progressDescription,
  icon,
  tooltipText,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className={style.card}>
      <img
        className={style.starknetLogo}
        src="/icons/starknet.png"
        alt="StarkNet Logo"
      />
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
      <div className={style.illustrations}>
        <div
          className={style.tooltipWrapper}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Info className={style.infoIcon} />
          {showTooltip && (
            <div className={style.tooltipBox}>
              <p className={style.tooltipText}>{tooltipText}</p>
            </div>
          )}
        </div>
        <img src={icon} alt="icon" className={style.icon} />
      </div>
    </div>
  );
};
