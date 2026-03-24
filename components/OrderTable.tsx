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

interface OrderTableProps {
  orders: Order[];
}

export default function OrderTable({ orders }: OrderTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/30 text-green-400 border-green-700/50';
      case 'pending':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-700/50';
      case 'failed':
        return 'bg-red-900/30 text-red-400 border-red-700/50';
      default:
        return 'bg-slate-900/30 text-slate-400 border-slate-700/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'pending':
        return '⏳';
      case 'failed':
        return '✕';
      default:
        return '•';
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Last 10 Orders</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-3 text-slate-400 font-semibold">
                Order ID
              </th>
              <th className="text-left py-3 px-3 text-slate-400 font-semibold">
                Product
              </th>
              <th className="text-left py-3 px-3 text-slate-400 font-semibold">
                Amount
              </th>
              <th className="text-left py-3 px-3 text-slate-400 font-semibold">
                Status
              </th>
              <th className="text-left py-3 px-3 text-slate-400 font-semibold">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.orderId}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition"
                >
                  <td className="py-3 px-3">
                    <code className="text-xs font-mono text-slate-300 bg-slate-900/50 px-2 py-1 rounded">
                      {order.orderId.substring(0, 12)}...
                    </code>
                  </td>
                  <td className="py-3 px-3">
                    <div>
                      <p className="text-slate-200 font-medium">
                        {order.templateName}
                      </p>
                      <p className="text-xs text-slate-400">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-green-400">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)} {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-xs">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 px-3 text-center text-slate-400"
                >
                  No orders yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
