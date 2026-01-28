import React from 'react';
import { DashboardFilters as Filters } from '../types';
import './DashboardControls.css';

interface DashboardControlsProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onRefreshAll: () => void;
  isRefreshing: boolean;
}

const DashboardControls: React.FC<DashboardControlsProps> = ({
  filters,
  onFilterChange,
  onRefreshAll,
  isRefreshing,
}) => {
  const dateRangeOptions = [
    { label: 'Last 7 days', value: 7 },
    { label: 'Last 30 days', value: 30 },
    { label: 'Last 90 days', value: 90 },
  ];

  const categoryOptions = [
    { label: 'All Categories', value: 'all' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Food', value: 'food' },
    { label: 'Books', value: 'books' },
    { label: 'Home', value: 'home' },
  ];

  return (
    <div className="dashboard-controls">
      <div className="controls-group">
        <div className="filter-group">
          <label htmlFor="dateRange" className="filter-label">
            Date Range
          </label>
          <select
            id="dateRange"
            className="filter-select"
            value={filters.dateRange}
            onChange={(e) =>
              onFilterChange({ ...filters, dateRange: Number(e.target.value) })
            }
          >
            {dateRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="category" className="filter-label">
            Category
          </label>
          <select
            id="category"
            className="filter-select"
            value={filters.category}
            onChange={(e) =>
              onFilterChange({ ...filters, category: e.target.value })
            }
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="refresh-all-btn"
        onClick={onRefreshAll}
        disabled={isRefreshing}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={isRefreshing ? 'spinning' : ''}
        >
          <path
            d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84871 2 11.5058 2.87014 12.5858 4.24264M12.5858 4.24264V1.5M12.5858 4.24264H9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Refresh All
      </button>
    </div>
  );
};

export default DashboardControls;
