import { useState } from "react";
import { Info } from "lucide-react"; // Using Lucide for the info icon
import styles from "../styles/AnalyticAddToolTip.module.css";

export function AddToolTip() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.statsCard}>
        <div className={styles.statsHeader}>
          <h2 className={styles.statsTitle}>Subdomains</h2>
          <div
            className={styles.tooltipWrapper}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Info className={styles.tooltipIcon} />
            {showTooltip && (
              <div className={styles.tooltipBox}>
                <p className={styles.tooltipText}>
                  Total number of subdomains created from main domains
                  (including Argent, Braavos, OG, Everai, and others)
                </p>
              </div>
            )}
          </div>
        </div>
        <p className={styles.statsValue}>28,145</p>
      </div>
    </div>
  );
}
