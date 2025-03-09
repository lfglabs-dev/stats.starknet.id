import React from 'react';
import styles from '../../styles/Analytics.module.css';
import SubdomainCard from '../../components/cards/SubdomainCard';

const AnalyticsPage = () => {
    const handleFilterChange = (filter: any) => {
        console.log('Filter changed to:', filter);
        // Implement your filter logic here
      };
  return (
    <div className={styles.analyticsWrapper}>
        <div className={styles.pageContainer}>
          <div className={styles.statsRow}>
            <SubdomainCard count={28145} />
          </div>
        </div>
    </div>
  );
};

export default AnalyticsPage;