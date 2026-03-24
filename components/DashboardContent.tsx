'use client';

import { useEffect, useState, useCallback } from 'react';
import OrderTable from './OrderTable';
import StatCard from './StatCard';
import TrendChart from './TrendChart';
import Toast from './Toast';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  lastOrderTime: string | null;
  orders: Order[];
  trends: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  topProducts: TopProduct[];
  estimatedVisitors: number;
  conversionRate: number;
  systemStatus: {
    stripe: 'green' | 'yellow' | 'red';
    s3: 'green' | 'yellow' | 'red';
  };
}

interface Order {
  orderId: string;
  email: string;
  templateId: string;
  templateName: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  downloadUrl?: string;
  expiresAt?: string;
}

interface TopProduct {
  templateName: string;
  templateId: string;
  count: number;
  revenue: number;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'milestone';
  duration?: number;
}

const REVENUE_MILESTONES = [100, 500, 1000, 2500, 5000, 10000];

export default function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [prevOrderCount, setPrevOrderCount] = useState(0);
  const [prevRevenue, setPrevRevenue] = useState(0);
  const [refreshInterval, setRefreshInterval] = useState(10);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('/api/dashboard', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch stats');

      const newStats: DashboardStats = await response.json();

      // Check for new orders
      if (newStats.totalOrders > prevOrderCount) {
        const newOrderCount = newStats.totalOrders - prevOrderCount;
        addToast(
          `🎉 ${newOrderCount} new order${newOrderCount > 1 ? 's' : ''} received!`,
          'success',
          5000
        );
      }

      // Check for revenue milestones
      REVENUE_MILESTONES.forEach((milestone) => {
        if (
          newStats.totalRevenue >= milestone &&
          prevRevenue < milestone
        ) {
          addToast(
            `🚀 Revenue milestone: $${milestone} reached!`,
            'milestone',
            8000
          );
        }
      });

      setStats(newStats);
      setPrevOrderCount(newStats.totalOrders);
      setPrevRevenue(newStats.totalRevenue);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      addToast('Failed to fetch dashboard stats', 'error');
      setLoading(false);
    }
  }, [prevOrderCount, prevRevenue]);

  // Initial load
  useEffect(() => {
    fetchStats();
  }, []);

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(fetchStats, refreshInterval * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshInterval]);

  // Add toast
  const addToast = (message: string, type: Toast['type'], duration = 5000) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type, duration };
    setToasts((prev) => [...prev, newToast]);

    if (duration) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  };

  // Remove toast
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Export CSV
  const exportCSV = () => {
    if (!stats || !stats.orders.length) {
      addToast('No orders to export', 'error');
      return;
    }

    const headers = [
      'Order ID',
      'Email',
      'Template',
      'Amount',
      'Status',
      'Date',
    ];
    const rows = stats.orders.map((o) => [
      o.orderId,
      o.email,
      o.templateName,
      `$${o.amount.toFixed(2)}`,
      o.status,
      new Date(o.createdAt).toLocaleString(),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${cell}"`).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    addToast('Orders exported successfully', 'success');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-400">Failed to load dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Toasts */}
      <div className="fixed top-20 right-4 z-40 space-y-2 pointer-events-none">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Orders"
          value={stats.totalOrders}
          icon="📦"
          trend={`+${stats.trends.today} today`}
          status="green"
        />
        <StatCard
          label="Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          icon="💰"
          trend={`+$${stats.trends.today.toFixed(2)} today`}
          status="green"
        />
        <StatCard
          label="Avg Order Value"
          value={`$${stats.averageOrderValue.toFixed(2)}`}
          icon="📊"
          trend={`${stats.conversionRate.toFixed(2)}% conversion`}
          status="green"
        />
        <StatCard
          label="Visitors (Est.)"
          value={stats.estimatedVisitors}
          icon="👥"
          trend={`${stats.conversionRate.toFixed(2)}% conversion`}
          status="green"
        />
      </div>

      {/* System Status & Refresh */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">
            System Status
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Stripe API</span>
              <span
                className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
                  stats.systemStatus.stripe === 'green'
                    ? 'bg-green-900/30 text-green-400'
                    : stats.systemStatus.stripe === 'yellow'
                      ? 'bg-yellow-900/30 text-yellow-400'
                      : 'bg-red-900/30 text-red-400'
                }`}
              >
                ● {stats.systemStatus.stripe.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">S3 Storage</span>
              <span
                className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
                  stats.systemStatus.s3 === 'green'
                    ? 'bg-green-900/30 text-green-400'
                    : stats.systemStatus.s3 === 'yellow'
                      ? 'bg-yellow-900/30 text-yellow-400'
                      : 'bg-red-900/30 text-red-400'
                }`}
              >
                ● {stats.systemStatus.s3.toUpperCase()}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-3">
              Last update: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">
            Auto-Refresh
          </h3>
          <div className="flex items-center gap-2">
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 text-sm"
            >
              <option value={5}>5 seconds</option>
              <option value={10}>10 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute</option>
            </select>
            <button
              onClick={fetchStats}
              className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition"
            >
              Refresh Now
            </button>
            <button
              onClick={exportCSV}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition"
            >
              📥 CSV
            </button>
          </div>
        </div>
      </div>

      {/* Trends */}
      <div className="mb-8">
        <TrendChart
          today={stats.trends.today}
          thisWeek={stats.trends.thisWeek}
          thisMonth={stats.trends.thisMonth}
        />
      </div>

      {/* Orders and Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Last Orders */}
        <div className="lg:col-span-2">
          <OrderTable orders={stats.orders.slice(0, 10)} />
        </div>

        {/* Top Products */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Products</h3>
          <div className="space-y-3">
            {stats.topProducts.length > 0 ? (
              stats.topProducts.map((product, idx) => (
                <div
                  key={product.templateId}
                  className="flex items-start justify-between p-3 bg-slate-700/50 rounded border border-slate-600 hover:border-slate-500 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
                        #{idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-slate-200">
                        {product.templateName}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {product.count} sale{product.count !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-400">
                      ${product.revenue.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-sm text-center py-4">
                No products sold yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
