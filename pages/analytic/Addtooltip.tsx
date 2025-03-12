import { HelpCircle } from "lucide-react";
import { useState } from "react";
import styles from "../../styles/AnalyticAddToolTip.module.css";

export function Addtooltip() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={styles.addtooltipContainer}>
      <div className={styles.addtooltipContent}>
        <div className={styles.statsCard}>
          <div className={styles.statsHeader}>
            <div>
              <h2 className={styles.statsTitle}>Total Domains</h2>
              <p className={styles.statsValue}>435,124</p>
            </div>
            <div>
              <h2 className={styles.statsTitle}>Subdomains</h2>
              <div className={styles.subdomainsContainer}>
                <p className={styles.statsValue}>28,145</p>
                <div
                  className={styles.tooltipWrapper}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <HelpCircle className={styles.tooltipIcon} />

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
            </div>
          </div>

          <div className={styles.graphSection}></div>
        </div>
      </div>
    </div>
  );
}
