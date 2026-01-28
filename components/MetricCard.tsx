import React from 'react';
import { useChartData } from '../hooks/useChartData';
import { fetchUserMetrics } from '../services/dataService';
import { DashboardFilters } from '../types';
import './MetricCard.css';

interface MetricCardProps {
  title: string;
  metrics: Array<{ label: string; value: string }>;
  refreshKey: number;
  filters: DashboardFilters;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, metrics, refreshKey, filters }) => {
  const { data, loading, error, refetch } = useChartData(
    () => fetchUserMetrics(filters.dateRange, filters.category),
    [filters.dateRange, filters.category, refreshKey]
  );

  const resolvedMetrics = data?.metrics?.length ? data.metrics : metrics;

  return (
    <div className="metric-card">
      <div className="metric-card-header">
        <h3 className="metric-card-title">{title}</h3>
        <button className="metric-refresh-btn" onClick={refetch} disabled={loading}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={loading ? 'spinning' : ''}>
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
      <div className="metric-card-content">
        {loading && (
          <div className="metric-loading">
            <div className="spinner-small"></div>
          </div>
        )}
        {error && (
          <div className="metric-error">
            <p>{error}</p>
          </div>
        )}
        {!loading && !error && (
          <div className="metrics-list">
            {resolvedMetrics.slice(0, 3).map((m, idx) => (
              <div key={`${m.label}-${idx}`} className={`metric-row metric-row-${idx}`}>
                <span className="metric-accent" aria-hidden="true" />
                <div className="metric-row-main">
                  <div className="metric-label">{m.label}</div>
                  <div className="metric-value">{m.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
