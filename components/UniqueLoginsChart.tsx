import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useChartData } from '../hooks/useChartData';
import { fetchUniqueLogins } from '../services/dataService';
import { DashboardFilters } from '../types';
import InlineChartCard from './InlineChartCard';
import './ChartCard.css';

interface UniqueLoginsChartProps {
  filters: DashboardFilters;
}

const UniqueLoginsChart: React.FC<UniqueLoginsChartProps> = ({ filters }) => {
  const { data, loading, error, refetch } = useChartData(
    () => fetchUniqueLogins(filters.dateRange, filters.category),
    [filters.dateRange, filters.category]
  );

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      height: 220,
      scrollablePlotArea: {
        minWidth: 700,
        scrollPositionX: 1
      }
    },
    title: { text: '' },
    xAxis: {
      categories: data?.data.map(d => d.date) || [],
      labels: {
        enabled: true,
        step: Math.max(1, Math.floor((data?.data.length || 1) / 5)),
        style: { fontSize: '11px', color: '#9ca3af' }
      },
      lineColor: '#e5e7eb',
      tickLength: 0,
    },
    yAxis: {
      title: { text: '' },
      min: 0,
      max: 8,
      tickInterval: 4,
      gridLineColor: '#f3f4f6',
      labels: {
        style: { fontSize: '11px', color: '#9ca3af' },
        formatter: function () { return String(this.value); }
      },
    },
    legend: { enabled: false },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderRadius: 6,
      shadow: true,
      style: { fontSize: '11px' },
    },
    plotOptions: {
      column: {
        pointWidth: 3.25,
        borderWidth: 0,
        borderRadius: { radius: 4, scope: 'point', where: 'end' } as unknown as number,
        color: 'rgba(28, 168, 221, 1)',
      },
    },
    series: [{
      name: 'Logins',
      type: 'column',
      data: data?.data.map(d => d.value) || [],
    }],
    credits: { enabled: false },
  };

  return (
    <InlineChartCard
      title="Number of Unique Logins"
      value={data?.total || '374'}
      accentColor="rgba(28, 168, 221, 1)"
      loading={loading}
      error={error}
      onRefresh={refetch}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </InlineChartCard>
  );
};

export default UniqueLoginsChart;
