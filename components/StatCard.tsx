interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
  status: 'green' | 'yellow' | 'red';
}

export default function StatCard({
  label,
  value,
  icon,
  trend,
  status,
}: StatCardProps) {
  const statusColors = {
    green: 'border-green-700/50 bg-green-900/10',
    yellow: 'border-yellow-700/50 bg-yellow-900/10',
    red: 'border-red-700/50 bg-red-900/10',
  };

  const statusIndicator = {
    green: 'bg-green-500/20 text-green-400',
    yellow: 'bg-yellow-500/20 text-yellow-400',
    red: 'bg-red-500/20 text-red-400',
  };

  return (
    <div
      className={`rounded-lg border p-6 bg-slate-800/50 ${statusColors[status]}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className={`text-2xl p-2 rounded-lg ${statusIndicator[status]}`}>
          {icon}
        </div>
      </div>
      {trend && <p className="text-xs text-slate-400 mt-2">{trend}</p>}
    </div>
  );
}
