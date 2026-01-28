import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartCard from './ChartCard';
import { useChartData } from '../hooks/useChartData';
import { fetchConversionData } from '../services/dataService';
import { DashboardFilters } from '../types';

interface ConversionChartProps {
  filters: DashboardFilters;
}

const ConversionChart: React.FC<ConversionChartProps> = ({ filters }) => {
  const { data, loading, error, refetch } = useChartData(
    () => fetchConversionData(filters.dateRange, filters.category),
    [filters.dateRange, filters.category]
  );

  const options: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
      height: 300,
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: data?.map(d => d.stage) || [],
      lineColor: '#e5e7eb',
      tickColor: '#e5e7eb',
      labels: {
        style: {
          color: '#374151',
          fontSize: '12px',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Count',
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
      enabled: false,
    },
    tooltip: {
      pointFormat: '<b>{point.y}</b> users',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderRadius: 8,
      shadow: true,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: '{point.y}',
          style: {
            fontSize: '11px',
            fontWeight: '600',
            textOutline: 'none',
            color: '#374151',
          },
        },
        colorByPoint: true,
        borderWidth: 0,
        borderRadius: 6,
      },
    },
    series: [
      {
        name: 'Conversion Funnel',
        type: 'bar',
        data: data?.map(d => ({
          y: d.value,
          color: d.color,
        })) || [],
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <ChartCard
      title="Conversion Funnel"
      loading={loading}
      error={error}
      onRefresh={refetch}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartCard>
  );
};

export default ConversionChart;
