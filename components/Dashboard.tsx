import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MetricCard from './MetricCard';
import UniqueLoginsChart from './UniqueLoginsChart';
import QueriesExecutedChart from './QueriesExecutedChart';
import QueriesBySourceList from './QueriesBySourceList';
import AvgResponseTimeWorkflowChart from './AvgResponseTimeWorkflowChart';
import FirewallAPICallsChart from './FirewallAPICallsChart';
import AvgResponseTimeFirewallChart from './AvgResponseTimeFirewallChart';
import TimeRangeDropdown from './TimeRangeDropdown';
import { DashboardFilters } from '../types';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: 90,
    category: 'all',
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefreshAll = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleDateRangeChange = (days: number) => {
    setFilters({ ...filters, dateRange: days });
  };

  return (
    <div className={`dashboard-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar collapsed={sidebarCollapsed} onToggleCollapsed={() => setSidebarCollapsed(v => !v)} />
      <div className="dashboard-main">
        <TopBar onRefresh={handleRefreshAll} />
        <div className="dashboard-content">
          <div className="page-filters">
            <TimeRangeDropdown
              value={filters.dateRange}
              onChange={handleDateRangeChange}
            />
          </div>
          <div className="dashboard-grid">
            <div className="dashboard-row dashboard-row-1">
              <div className="grid-item users-card">
                <MetricCard
                  title="Users"
                  metrics={[
                    { label: 'Total Users', value: '577' },
                    { label: 'Active', value: '543' },
                    { label: 'Inactive', value: '34' }
                  ]}
                  refreshKey={refreshKey}
                  filters={filters}
                />
              </div>
              <div className="grid-item logins-chart">
                <UniqueLoginsChart
                  key={`logins-${refreshKey}`}
                  filters={filters}
                />
              </div>
            </div>
            <div className="grid-item queries-chart">
              <QueriesExecutedChart
                key={`queries-${refreshKey}`}
                filters={filters}
              />
            </div>
            <div className="grid-item sources-list">
              <QueriesBySourceList
                key={`sources-${refreshKey}`}
                filters={filters}
              />
            </div>
            <div className="grid-item workflow-response">
              <AvgResponseTimeWorkflowChart
                key={`workflow-${refreshKey}`}
                filters={filters}
              />
            </div>
            <div className="grid-item firewall-calls">
              <FirewallAPICallsChart
                key={`firewall-calls-${refreshKey}`}
                filters={filters}
              />
            </div>
            <div className="grid-item firewall-response">
              <AvgResponseTimeFirewallChart
                key={`firewall-response-${refreshKey}`}
                filters={filters}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
