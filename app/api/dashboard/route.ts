import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

export async function GET() {
  try {
    const ordersPath = path.join(process.cwd(), 'lib', 'orders.json');
    const fileContent = fs.readFileSync(ordersPath, 'utf-8');
    const data = JSON.parse(fileContent);

    const orders = data.orders || [];
    const now = new Date();

    const completedOrders = orders.filter((o: any) => o.status === 'completed');
    const totalRevenue = completedOrders.reduce((sum: number, o: any) => sum + o.amount, 0);
    const totalOrders = completedOrders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const lastOrderTime = completedOrders.length > 0 ? completedOrders[completedOrders.length - 1].createdAt : null;

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const todayRevenue = completedOrders
      .filter((o: any) => new Date(o.createdAt) >= today)
      .reduce((sum: number, o: any) => sum + o.amount, 0);
    const weekRevenue = completedOrders
      .filter((o: any) => new Date(o.createdAt) >= weekAgo)
      .reduce((sum: number, o: any) => sum + o.amount, 0);
    const monthRevenue = completedOrders
      .filter((o: any) => new Date(o.createdAt) >= monthAgo)
      .reduce((sum: number, o: any) => sum + o.amount, 0);

    const productMap = new Map();
    completedOrders.forEach((o: any) => {
      if (!productMap.has(o.templateId)) {
        productMap.set(o.templateId, { name: o.templateName, id: o.templateId, count: 0, revenue: 0 });
      }
      const p = productMap.get(o.templateId);
      p.count += 1;
      p.revenue += o.amount;
    });

    const topProducts = Array.from(productMap.values())
      .sort((a: any, b: any) => b.revenue - a.revenue)
      .slice(0, 10)
      .map((p: any) => ({ templateName: p.name, templateId: p.id, count: p.count, revenue: p.revenue }));

    const estimatedVisitors = Math.max(totalOrders * 100, 500);
    const conversionRate = estimatedVisitors > 0 ? (totalOrders / estimatedVisitors) * 100 : 0;

    return NextResponse.json({
      totalOrders,
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      averageOrderValue: parseFloat(averageOrderValue.toFixed(2)),
      lastOrderTime,
      orders: completedOrders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 20),
      trends: {
        today: parseFloat(todayRevenue.toFixed(2)),
        thisWeek: parseFloat(weekRevenue.toFixed(2)),
        thisMonth: parseFloat(monthRevenue.toFixed(2)),
      },
      topProducts,
      estimatedVisitors,
      conversionRate: parseFloat(conversionRate.toFixed(2)),
      systemStatus: { stripe: 'green', s3: 'green' },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch stats',
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        lastOrderTime: null,
        orders: [],
        trends: { today: 0, thisWeek: 0, thisMonth: 0 },
        topProducts: [],
        estimatedVisitors: 0,
        conversionRate: 0,
        systemStatus: { stripe: 'red', s3: 'red' },
      },
      { status: 500 }
    );
  }
}
