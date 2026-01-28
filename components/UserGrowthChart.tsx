import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartCard from './ChartCard';
import { useChartData } from '../hooks/useChartData';
import { fetchUserGrowthData } from '../services/dataService';
import { DashboardFilters } from '../types';

interface UserGrowthChartProps {
  filters: DashboardFilters;
}

const UserGrowthChart: React.FC<UserGrowthChartProps> = ({ filters }) => {
  const { data, loading, error, refetch } = useChartData(
    () => fetchUserGrowthData(filters.dateRange, filters.category),
    [filters.dateRange, filters.category]
  );

  const options: Highcharts.Options = {
    chart: {
      type: 'area',
      backgroundColor: 'transparent',
      height: 300,
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: data?.map(d => {
        const date = new Date(d.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }) || [],
      tickInterval: Math.max(1, Math.floor((data?.length || 1) / 10)),
      lineColor: '#e5e7eb',
      tickColor: '#e5e7eb',
      labels: {
        style: {
          color: '#6b7280',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Users',
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
      shared: true,
      valueSuffix: ' users',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderRadius: 8,
      shadow: true,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, 'rgba(139, 92, 246, 0.4)'],
            [1, 'rgba(139, 92, 246, 0.05)'],
          ],
        },
        marker: {
          radius: 3,
          fillColor: '#8b5cf6',
        },
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 3,
          },
        },
        threshold: null,
      },
    },
    series: [
      {
        name: 'User Growth',
        type: 'area',
        data: data?.map(d => d.users) || [],
        color: '#8b5cf6',
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <ChartCard
      title="User Growth Over Time"
      loading={loading}
      error={error}
      onRefresh={refetch}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartCard>
  );
};

export default UserGrowthChart;
