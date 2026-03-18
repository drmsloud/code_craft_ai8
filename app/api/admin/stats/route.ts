import { NextRequest, NextResponse } from 'next/server'

// Mock data - in production, this would query DynamoDB
const mockOrders = [
  {
    id: 'order_1',
    templateName: 'React Admin Dashboard',
    email: 'customer@example.com',
    amount: 19,
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'order_2',
    templateName: 'Next.js SaaS Starter',
    email: 'user@test.com',
    amount: 29,
    date: new Date().toISOString().split('T')[0],
  },
]

export async function GET(request: NextRequest) {
  try {
    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.amount, 0)
    const ordersCount = mockOrders.length
    const lastOrder = mockOrders[0] || null

    return NextResponse.json({
      totalSales: ordersCount,
      totalRevenue,
      ordersCount,
      lastOrder,
      orders: mockOrders,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
