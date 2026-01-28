import React from 'react';
import { useChartData } from '../hooks/useChartData';
import { fetchQueriesBySource } from '../services/dataService';
import { DashboardFilters } from '../types';
import './QueriesBySourceList.css';
import SlackIcon from '../assets/icons/slack.svg';
import MSTeamsIcon from '../assets/icons/msteams.svg';
import AWSCloudIcon from '../assets/icons/aws-cloud.svg';
import GoogleCloudIcon from '../assets/icons/google-cloud.svg';
import OracleIcon from '../assets/icons/oracle.svg';
import GmailIcon from '../assets/icons/gmail.svg';

interface QueriesBySourceListProps {
  filters: DashboardFilters;
}

const sourceIcons: Record<string, string> = {
  'Slack': SlackIcon,
  'Microsoft Teams': MSTeamsIcon,
  'AWS Cloud': AWSCloudIcon,
  'Google Cloud': GoogleCloudIcon,
  'Oracle': OracleIcon,
  'G Suite Gmail': GmailIcon,
};

const getBarColor = (value: number): string => {
  if (value >= 100000) {
    return 'rgba(132, 189, 96, 1)'; // Green for 100k+
  } else if (value >= 5000) {
    return 'rgba(28, 168, 221, 1)'; // Blue for 5k-100k
  } else {
    return 'rgba(246, 119, 44, 1)'; // Orange for less than 5k
  }
};

const formatValue = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  }
  return value.toString();
};

const QueriesBySourceList: React.FC<QueriesBySourceListProps> = ({ filters }) => {
  const { data, loading, error, refetch } = useChartData(
    () => fetchQueriesBySource(filters.dateRange, filters.category),
    [filters.dateRange, filters.category]
  );

  const maxValue = data ? Math.max(...data.map(d => d.value)) : 1;

  return (
    <div className="queries-source-card">
      <div className="queries-source-header">
        <h3 className="queries-source-title">Queries by Source</h3>
        <button className="queries-source-refresh" onClick={refetch} disabled={loading}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={loading ? 'spinning' : ''}>
            <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84871 2 11.5058 2.87014 12.5858 4.24264M12.5858 4.24264V1.5M12.5858 4.24264H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      {loading && <div className="queries-source-loading"><div className="spinner-small"></div></div>}
      {error && <div className="queries-source-error">{error}</div>}
      {!loading && !error && data && (
        <>
          <div className="queries-source-labels">
            <span>Source</span>
            <span>Queries</span>
          </div>
          <div className="queries-source-list">
            {data.map((item, index) => (
              <div key={index} className="queries-source-item">
                <div className="queries-source-name">
                  <span className="source-icon">
                    <img src={sourceIcons[item.name]} alt={item.name} width="20" height="20" />
                  </span>
                  <span>{item.name}</span>
                </div>
                <div className="queries-source-bar-container">
                  <div className="queries-source-bar-track">
                    <div
                      className="queries-source-bar"
                      style={{
                        width: `${(item.value / maxValue) * 100}%`,
                        backgroundColor: getBarColor(item.value)
                      }}
                    ></div>
                  </div>
                  <span className="queries-source-value">{formatValue(item.value)}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QueriesBySourceList;
