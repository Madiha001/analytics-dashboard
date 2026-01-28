import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartCard from './ChartCard';
import { useChartData } from '../hooks/useChartData';
import { fetchCategoryData } from '../services/dataService';
import { DashboardFilters } from '../types';

interface CategoryChartProps {
  filters: DashboardFilters;
}

const CategoryChart: React.FC<CategoryChartProps> = ({ filters }) => {
  const { data, loading, error, refetch } = useChartData(
    () => fetchCategoryData(filters.dateRange, filters.category),
    [filters.dateRange, filters.category]
  );

  const colors = ['#3b82f6', '#f97316', '#10b981', '#8b5cf6', '#ec4899'];

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 300,
    },
    title: {
      text: '',
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b><br/>Value: ${point.y}',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderRadius: 8,
      shadow: true,
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        colors: colors,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f}%',
          style: {
            fontSize: '12px',
            textOutline: 'none',
            color: '#374151',
          },
          distance: 15,
        },
        showInLegend: true,
        borderWidth: 0,
      },
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      itemStyle: {
        color: '#6b7280',
        fontSize: '12px',
        fontWeight: '400',
      },
    },
    series: [
      {
        name: 'Categories',
        type: 'pie',
        data: data?.map((item, index) => ({
          name: item.name,
          y: item.value,
          sliced: index === 0,
          selected: index === 0,
        })) || [],
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <ChartCard
      title="Category Performance"
      loading={loading}
      error={error}
      onRefresh={refetch}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartCard>
  );
};

export default CategoryChart;
