import React from 'react';
import './ChartCard.css';

interface ChartCardProps {
  title: string;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  loading,
  error,
  onRefresh,
  children,
}) => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        <button
          className="refresh-btn"
          onClick={onRefresh}
          disabled={loading}
          aria-label="Refresh chart"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={loading ? 'spinning' : ''}
          >
            <path
              d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84871 2 11.5058 2.87014 12.5858 4.24264M12.5858 4.24264V1.5M12.5858 4.24264H9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="chart-content">
        {loading && (
          <div className="chart-loading">
            <div className="spinner"></div>
            <p>Loading data...</p>
          </div>
        )}
        {error && (
          <div className="chart-error">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#EF4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>{error}</p>
            <button className="retry-btn" onClick={onRefresh}>
              Try Again
            </button>
          </div>
        )}
        {!loading && !error && children}
      </div>
    </div>
  );
};

export default ChartCard;
