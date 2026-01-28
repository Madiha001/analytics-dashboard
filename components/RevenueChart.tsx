import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartCard from './ChartCard';
import { useChartData } from '../hooks/useChartData';
import { fetchRevenueData } from '../services/dataService';
import { DashboardFilters } from '../types';

interface RevenueChartProps {
  filters: DashboardFilters;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ filters }) => {
  const { data, loading, error, refetch } = useChartData(
    () => fetchRevenueData(filters.dateRange, filters.category),
    [filters.dateRange, filters.category]
  );

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      height: 300,
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: data?.map(d => d.month) || [],
      crosshair: true,
      lineColor: '#e5e7eb',
      tickColor: '#e5e7eb',
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Revenue ($)',
        style: {
          color: '#6b7280',
          fontSize: '12px',
        },
      },
      gridLineColor: '#f3f4f6',
      labels: {
        style: {
          color: '#6b7280',
        },
      },
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      itemStyle: {
        color: '#6b7280',
        fontSize: '12px',
        fontWeight: '400',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>${point.y:.0f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderRadius: 8,
      shadow: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.15,
        borderWidth: 0,
        borderRadius: 6,
      },
    },
    series: [
      {
        name: 'Revenue',
        type: 'column',
        data: data?.map(d => d.revenue) || [],
        color: '#3b82f6',
      },
      {
        name: 'Target',
        type: 'column',
        data: data?.map(d => d.target) || [],
        color: '#10b981',
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <ChartCard
      title="Revenue vs Target"
      loading={loading}
      error={error}
      onRefresh={refetch}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartCard>
  );
};

export default RevenueChart;
