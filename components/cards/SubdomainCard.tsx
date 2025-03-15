import React from 'react';
import styles from '../../styles/Subdomain.module.css';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface SubdomainCardProps {
  count: number;
}

const SubdomainCard: React.FC<SubdomainCardProps> = ({ count }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Subdomains</h2>
        <Tooltip 
          title="Total number of subdomains registered on Starknet.id" 
          arrow
          placement="top"
        >
          <InfoOutlinedIcon className={styles.infoIcon} />
        </Tooltip>
      </div>
      <div className={styles.countContainer}>
        <span className={styles.count}>
          {count.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default SubdomainCard;