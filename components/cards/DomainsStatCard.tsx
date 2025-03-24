import { CircularProgress } from "@mui/material";
import { Info } from "lucide-react";
import { FC, ReactNode, useState } from "react";
import styles from "../../styles/DomainsStatCard.module.css";

interface StatCardProps {
  title: string;
  statValue: number | string;
  isLoading?: boolean;
  icon?: string | ReactNode;
  tooltip?: string;
  customClass?: string;
}

const DomainsStatCard: FC<StatCardProps> = ({
  title,
  statValue,
  isLoading = false,
  icon,
  tooltip,
  customClass = "",
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={`${styles.card} ${customClass}`}>
      <div className="flex flex-col justify-between w-full gap-2">
        <div className="flex justify-between items-center w-full">
          <h3 className={styles.title}>{title}</h3>

          {tooltip ? (
            <div
              className={styles.tooltipWrapper}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Info className={styles.infoIcon} />
              {showTooltip && (
                <div className={styles.tooltipBox}>
                  <p className={styles.tooltipText}>{tooltip}</p>
                </div>
              )}
            </div>
          ) : (
            <Info className={styles.infoIcon} />
          )}
        </div>

        <div className={styles.countContainer}>
          {isLoading ? (
            <CircularProgress className={styles.loader} />
          ) : (
            <span className={styles.valueLabel}>
              {typeof statValue === "number"
                ? statValue.toLocaleString()
                : statValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DomainsStatCard;
