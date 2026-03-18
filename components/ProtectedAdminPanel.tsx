'use client'

import { useState, useEffect } from 'react'

interface Order {
  id: string
  templateName: string
  email: string
  amount: number
  date: string
}

interface Stats {
  totalSales: number
  totalRevenue: number
  ordersCount: number
  lastOrder: Order | null
}

export default function ProtectedAdminPanel() {
  const [stats, setStats] = useState<Stats>({
    totalSales: 0,
    totalRevenue: 0,
    ordersCount: 0,
    lastOrder: null,
  })
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    window.location.reload()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Total Revenue</p>
            <p className="text-4xl font-bold text-indigo-600">
              ${stats.totalRevenue.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Total Orders</p>
            <p className="text-4xl font-bold text-indigo-600">{stats.ordersCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Avg. Order Value</p>
            <p className="text-4xl font-bold text-indigo-600">
              ${stats.ordersCount > 0 ? (stats.totalRevenue / stats.ordersCount).toFixed(2) : '0.00'}
            </p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            {orders.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Template</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm text-gray-700 font-mono">{order.id.substring(0, 8)}...</td>
                      <td className="px-6 py-3 text-sm text-gray-700">{order.templateName}</td>
                      <td className="px-6 py-3 text-sm text-gray-700">{order.email}</td>
                      <td className="px-6 py-3 text-sm text-gray-700 font-semibold">${order.amount}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 text-center text-gray-500">
                No orders yet. Be the first to sell!
              </div>
            )}
          </div>
        </div>

        {/* Placeholder for Upload */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Upload New Template</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">Coming soon: Drag and drop templates here</p>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700" disabled>
              Select File
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
