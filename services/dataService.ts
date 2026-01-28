import {
  RevenueData,
  UserGrowthData,
  CategoryPerformanceData,
  ConversionData,
} from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchUserMetrics = async (_dateRange: number, _category: string) => {
  await delay(Math.random() * 800 + 300);

  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch user metrics');
  }

  const total = 577;
  const active = 543;
  const inactive = total - active;

  return {
    metrics: [
      { label: 'Total Users', value: total.toString() },
      { label: 'Active', value: active.toString() },
      { label: 'Inactive', value: inactive.toString() }
    ]
  };
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatDate = (date: Date): string => `${months[date.getMonth()]} ${date.getDate()}`;

export const fetchUniqueLogins = async (dateRange: number, _category: string) => {
  await delay(Math.random() * 800 + 300);

  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch unique logins');
  }

  const data = [];
  const startDate = new Date(2025, 0, 9);
  const numDays = dateRange || 90;

  for (let i = 0; i < numDays; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: formatDate(date),
      value: Math.floor(Math.random() * 5) + 2
    });
  }

  return { total: 374, data };
};

export const fetchQueriesExecuted = async (dateRange: number, _category: string) => {
  await delay(Math.random() * 800 + 300);

  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch queries data');
  }

  const data = [];
  const startDate = new Date(2025, 0, 9);
  const numDays = dateRange || 90;

  for (let i = 0; i < numDays; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: formatDate(date),
      value: Math.floor(Math.random() * 5000) + 2000
    });
  }

  return { total: '371.8k', data };
};

export const fetchQueriesBySource = async (_dateRange: number, _category: string) => {
  await delay(Math.random() * 800 + 300);

  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch queries by source');
  }

  return [
    { name: 'Slack', value: 171000, color: '#E01E5A' },
    { name: 'Microsoft Teams', value: 21000, color: '#5B5FC7' },
    { name: 'AWS Cloud', value: 7800, color: '#FF9900' },
    { name: 'Google Cloud', value: 2100, color: '#4285F4' },
    { name: 'Oracle', value: 987, color: '#F80000' },
    { name: 'G Suite Gmail', value: 809, color: '#EA4335' }
  ];
};

export const fetchAvgResponseTimeWorkflow = async (dateRange: number, _category: string) => {
  await delay(Math.random() * 800 + 300);

  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch workflow response time');
  }

  const data = [];
  const startDate = new Date(2025, 0, 9);
  const numDays = dateRange || 90;

  for (let i = 0; i < numDays; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: formatDate(date),
      value: Math.random() * 8 + 7
    });
  }

  return { avg: '10.5s', data };
};

export const fetchFirewallAPICalls = async (dateRange: number, _category: string) => {
  await delay(Math.random() * 800 + 300);

  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch firewall API calls');
  }

  const data = [];
  const startDate = new Date(2025, 0, 9);
  const numDays = dateRange || 90;

  for (let i = 0; i < numDays; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: formatDate(date),
      value: Math.floor(Math.random() * 1200) + 400
    });
  }

  return { total: '12.5k', data };
};

export const fetchAvgResponseTimeFirewall = async (dateRange: number, _category: string) => {
  await delay(Math.random() * 800 + 300);

  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch firewall response time');
  }

  const data = [];
  const startDate = new Date(2025, 0, 9);
  const numDays = dateRange || 90;

  for (let i = 0; i < numDays; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: formatDate(date),
      value: Math.random() * 1.5 + 1.5
    });
  }

  return { avg: '2.47s', data };
};

const generateRevenueData = (days: number): RevenueData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const numMonths = Math.min(Math.ceil(days / 30), 12);

  return months.slice(0, numMonths).map(month => ({
    month,
    revenue: Math.floor(Math.random() * 50000) + 30000,
    target: Math.floor(Math.random() * 40000) + 35000,
  }));
};

const generateUserGrowthData = (days: number): UserGrowthData[] => {
  const data: UserGrowthData[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      users: Math.floor(Math.random() * 5000) + 1000 + (days - i) * 50,
    });
  }

  return data;
};

const generateCategoryData = (category: string): CategoryPerformanceData[] => {
  const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Home'];
  const filteredCategories = category === 'all'
    ? categories
    : categories.filter(c => c.toLowerCase() === category.toLowerCase());

  return filteredCategories.map(cat => ({
    name: cat,
    value: Math.floor(Math.random() * 10000) + 5000,
    percentage: Math.floor(Math.random() * 30) + 10,
  }));
};

const generateConversionData = (): ConversionData[] => {
  return [
    { stage: 'Visits', value: 10000, color: '#6366f1' },
    { stage: 'Sign Ups', value: 7500, color: '#10b981' },
    { stage: 'Active Users', value: 5000, color: '#f59e0b' },
    { stage: 'Conversions', value: 2500, color: '#ef4444' },
  ];
};

export const fetchRevenueData = async (dateRange: number, _category: string): Promise<RevenueData[]> => {
  await delay(Math.random() * 1000 + 500);

  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch revenue data');
  }

  return generateRevenueData(dateRange);
};

export const fetchUserGrowthData = async (dateRange: number, _category: string): Promise<UserGrowthData[]> => {
  await delay(Math.random() * 1000 + 500);

  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch user growth data');
  }

  return generateUserGrowthData(dateRange);
};

export const fetchCategoryData = async (_dateRange: number, category: string): Promise<CategoryPerformanceData[]> => {
  await delay(Math.random() * 1000 + 500);

  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch category data');
  }

  return generateCategoryData(category);
};

export const fetchConversionData = async (_dateRange: number, _category: string): Promise<ConversionData[]> => {
  await delay(Math.random() * 1000 + 500);

  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch conversion data');
  }

  return generateConversionData();
};
