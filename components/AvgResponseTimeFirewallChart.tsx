import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useChartData } from '../hooks/useChartData';
import { fetchAvgResponseTimeFirewall } from '../services/dataService';
import { DashboardFilters } from '../types';
import InlineChartCard from './InlineChartCard';
import './ChartCard.css';

const AvgResponseTimeFirewallChart: React.FC<{ filters: DashboardFilters }> = ({ filters }) => {
  const { data, loading, error, refetch } = useChartData(
    () => fetchAvgResponseTimeFirewall(filters.dateRange, filters.category),
    [filters.dateRange, filters.category]
  );

  const options: Highcharts.Options = {
    chart: { type: 'areaspline', backgroundColor: 'transparent', height: 220 },
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
      max: 4,
      tickInterval: 1,
      gridLineColor: '#f3f4f6',
      labels: {
        style: { fontSize: '11px', color: '#9ca3af' },
        formatter: function () {
          const val = Number(this.value);
          return val === 0 ? '0' : `${val}s`;
        }
      }
    },
    legend: { enabled: false },
    tooltip: { backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#e5e7eb', borderRadius: 6, valueSuffix: 's' },
    plotOptions: {
      series: {
        animation: false,
        lineWidth: 2,
        marker: { enabled: false },
        states: {
          hover: {
            lineWidth: 2
          }
        }
      },
      areaspline: {
        fillOpacity: 0.18
      }
    },
    series: [{
      name: 'Response Time', type: 'areaspline', data: data?.data.map(d => parseFloat(d.value.toFixed(2))) || [],
      color: 'rgba(141, 211, 238, 1)',
      fillColor: 'rgba(141, 211, 238, 0.18)'
    }],
    credits: { enabled: false },
  };

  return (
    <InlineChartCard
      title="Avg. Response Time – Firewall"
      value={data?.avg || '2.47s'}
      accentColor="rgba(141, 211, 238, 1)"
      loading={loading}
      error={error}
      onRefresh={refetch}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </InlineChartCard>
  );
};

export default AvgResponseTimeFirewallChart;
