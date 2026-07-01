export interface Order {
  id: string;
  customer: string;
  total: number;
  items: number;
}

export interface MetorikData {
  storeName: string;
  currency: string;
  todaySales: number;
  todayOrders: number;
  yesterdaySales: number;
  yesterdayOrders: number;
  averageOrderValue: number;
  conversionRate: string;
  recentOrders?: Order[];
  error?: string;
}

export interface AdCampaign {
  name: string;
  spend: string;
  revenue: string;
  conversions: number;
  roas: number;
  status: string;
}

export interface WindsorData {
  period: string;
  accounts: AdCampaign[];
  overallSummary: string;
}

export interface ClickUpTask {
  id: string;
  name: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  dueDate: string;
}

export interface SiteAnalytics {
  platform: string;
  visitorsToday: number;
  pageViewsToday: number;
  activeSessions: number;
  mostVisitedPage?: string;
  loadTime?: string;
  cartAbandonsToday?: number;
}

export type VoiceState = "idle" | "listening" | "thinking" | "speaking";

export interface Message {
  role: "user" | "assistant" | "model";
  content: string;
}
