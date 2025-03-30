import { CircularProgress } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { Info } from "lucide-react";
import style from "../../styles/AdvancedStatCard.module.css";

interface StatCardProps {
  title: string;
  statValue: number;
  isLoading?: boolean;
  tooltipText: string;
}

export const AdvancedStatCard: FC<StatCardProps> = ({
  title,
  statValue,
  isLoading,
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

      <div className="flex flex-col justify-between w-full gap-2">
        <div className="flex justify-between items-center w-full">
          <h3 className={style.title}>{title}</h3>
          <div className={style.illustrations}>
            <div
              className={style.tooltipWrapper}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <img
                src="/icons/infoIcon.png"
                alt="icon"
                className={style.icon}
              />
              {showTooltip && (
                <div className={style.tooltipBox}>
                  <p className={style.tooltipText}>{tooltipText}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {isLoading ? (
          <CircularProgress className={style.loader} />
        ) : (
          <>
            <p className={style.valueLabel}>{statValue}</p>
          </>
        )}
      </div>
    </div>
  );
};
