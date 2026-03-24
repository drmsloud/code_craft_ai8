interface TrendChartProps {
  today: number;
  thisWeek: number;
  thisMonth: number;
}

export default function TrendChart({
  today,
  thisWeek,
  thisMonth,
}: TrendChartProps) {
  const max = Math.max(today, thisWeek, thisMonth, 1);
  const todayHeight = (today / max) * 100;
  const weekHeight = (thisWeek / max) * 100;
  const monthHeight = (thisMonth / max) * 100;

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Revenue Trend</h3>
      <div className="flex items-end justify-around h-48 gap-4">
        {/* Today */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-full bg-slate-700 rounded-t-lg relative overflow-hidden">
            <div
              className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500"
              style={{ height: `${todayHeight}%` }}
            >
              {todayHeight > 20 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    ${today.toFixed(0)}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-slate-400 text-sm font-medium">Today</p>
            <p className="text-white font-bold">${today.toFixed(2)}</p>
          </div>
        </div>

        {/* This Week */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-full bg-slate-700 rounded-t-lg relative overflow-hidden">
            <div
              className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all duration-500"
              style={{ height: `${weekHeight}%` }}
            >
              {weekHeight > 20 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    ${thisWeek.toFixed(0)}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-slate-400 text-sm font-medium">This Week</p>
            <p className="text-white font-bold">${thisWeek.toFixed(2)}</p>
          </div>
        </div>

        {/* This Month */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-full bg-slate-700 rounded-t-lg relative overflow-hidden">
            <div
              className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg transition-all duration-500"
              style={{ height: `${monthHeight}%` }}
            >
              {monthHeight > 20 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    ${thisMonth.toFixed(0)}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-slate-400 text-sm font-medium">This Month</p>
            <p className="text-white font-bold">${thisMonth.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
