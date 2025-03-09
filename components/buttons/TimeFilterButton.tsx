import React, { useState } from 'react';
import styles from '../../styles/TimeFilter.module.css';

const TimeFilter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('7D');
  
  const filters = [
    { id: '7D', label: '7D' },
    { id: '1m', label: '1m' },
    { id: 'Ytd', label: 'Ytd' },
    { id: 'ALL', label: 'ALL' }
  ];
  
  const handleFilterClick = (filterId: React.SetStateAction<string>) => {
    setActiveFilter(filterId);
    if (onFilterChange) {
      onFilterChange(filterId);
    }
  };
  
  return (
    <div className={styles.filterContainer}>
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`${styles.filterButton} ${activeFilter === filter.id ? styles.active : ''}`}
          onClick={() => handleFilterClick(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default TimeFilter;