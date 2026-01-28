export interface DateRange {
  label: string;
  value: number;
}

export interface Category {
  label: string;
  value: string;
}

export interface ChartData {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'column';
  data: any;
  loading: boolean;
  error: string | null;
}

export interface DashboardFilters {
  dateRange: number;
  category: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  target: number;
}

export interface UserGrowthData {
  date: string;
  users: number;
}

export interface CategoryPerformanceData {
  name: string;
  value: number;
  percentage: number;
}

export interface ConversionData {
  stage: string;
  value: number;
  color: string;
}
