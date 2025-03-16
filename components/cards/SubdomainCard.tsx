import React, { useState } from "react";
import { Info } from "lucide-react"; // Using Lucide for the info icon
import styles from "../../styles/Subdomain.module.css";

interface SubdomainCardProps {
  count: number;
}

const SubdomainCard: React.FC<SubdomainCardProps> = ({ count }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Subdomains</h2>
        <div
          className={styles.tooltipWrapper}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Info className={styles.infoIcon} />
          {showTooltip && (
            <div className={styles.tooltipBox}>
              <p className={styles.tooltipText}>
                Total number of subdomains created from main domains (including
                Argent, Braavos, OG, Everai, and others)
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.countContainer}>
        <span className={styles.count}>{count.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default SubdomainCard;
