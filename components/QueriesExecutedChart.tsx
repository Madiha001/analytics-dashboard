import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useChartData } from '../hooks/useChartData';
import { fetchQueriesExecuted } from '../services/dataService';
import { DashboardFilters } from '../types';
import InlineChartCard from './InlineChartCard';
import './ChartCard.css';

interface QueriesExecutedChartProps {
  filters: DashboardFilters;
}

const QueriesExecutedChart: React.FC<QueriesExecutedChartProps> = ({ filters }) => {
  const { data, loading, error, refetch } = useChartData(
    () => fetchQueriesExecuted(filters.dateRange, filters.category),
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
      max: 8000,
      tickInterval: 4000,
      gridLineColor: '#f3f4f6',
      labels: {
        style: { fontSize: '11px', color: '#9ca3af' },
        formatter: function () {
          const val = Number(this.value);
          return val === 0 ? '0' : `${val / 1000}k`;
        }
      },
    },
    legend: { enabled: false },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderRadius: 6,
      shadow: true,
    },
    plotOptions: {
      column: {
        pointWidth: 3.41,
        borderWidth: 0,
        borderRadius: { radius: 4, scope: 'point', where: 'end' } as unknown as number,
        color: 'rgba(132, 189, 96, 1)',
      },
    },
    series: [{
      name: 'Queries',
      type: 'column',
      data: data?.data.map(d => d.value) || [],
    }],
    credits: { enabled: false },
  };

  return (
    <InlineChartCard
      title="Queries Executed in the Workflow"
      value={data?.total || '371.8k'}
      accentColor="rgba(141, 211, 238, 1)"
      loading={loading}
      error={error}
      onRefresh={refetch}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </InlineChartCard>
  );
};

export default QueriesExecutedChart;
