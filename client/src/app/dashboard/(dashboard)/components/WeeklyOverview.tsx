//

export default function WeeklyOverview({
  className,
  salesPerformance,
  chartData,
}: {
  className?: string;
  salesPerformance: number;
  chartData?: any;
}) {
  let performanceMessage = "";
  if (salesPerformance > 0) {
    performanceMessage = `Your sales performance is ${salesPerformance}% better compare to last month`;
  } else if (salesPerformance < 0) {
    performanceMessage = `Your sales performance is ${Math.abs(
      salesPerformance
    )}% worse compare to last month`;
  } else if (salesPerformance === 0) {
    performanceMessage = `Your sales performance is the same compare to last month`;
  }

  return (
    <div
      className={`bg-slate-100 rounded-lg p-5 flex flex-col gap-2 font-semibold ${className}`}
    >
      <p>Weekly Overview</p>
      <div className="flex justify-between gap-4 max-sm:flex-col">
        <div className="h-[12rem] w-[17rem] border flex-center">Chart data</div>
        <div className="flex flex-col gap-2 max-w-[20rem] flex-1">
          <div className="!text-[3rem]">{salesPerformance}%</div>
          <div className="text-gray-300 ">{performanceMessage}</div>
        </div>
      </div>
    </div>
  );
}
