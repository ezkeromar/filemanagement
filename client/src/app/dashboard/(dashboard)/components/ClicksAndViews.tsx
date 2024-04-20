import { formatNumber } from "@/lib/utils";

export default function ClicksAndViews({
  className = "",
  clicks,
  totalViews,
}: {
  className?: string;
  clicks: number;
  totalViews: number;
}) {
  const totalViewsPercentage = Math.floor(
    (totalViews * 100) / (clicks + totalViews)
  );

  return (
    <div
      className={`bg-[#8487c3b2] rounded-lg p-5 flex justify-center flex-col gap-4 font-semibold w-[16rem] ${className}`}
    >
      <div className="flex-between gap-4">
        <div className="flex-start flex-col ">
          <p className="">Clicks</p>
          <div className="text-[30px]">{formatNumber(clicks)}</div>
        </div>
        <div className="flex-start flex-col ">
          <p className="">Total Views</p>
          <div className="text-[30px]">{formatNumber(totalViews)}</div>
        </div>
      </div>
      <div className="flex h-16 bg-[#474EFFB2] rounded-lg border border-white">
        <div className={`grow bg-[#ffffff] rounded-lg flex-start p-4`}>
          <p className="text-[#474EFFB2]">{100 - totalViewsPercentage}%</p>
        </div>
        <div className={`w-[${String(totalViewsPercentage)}%grow flex-end p-4`}>
          <p className="">{totalViewsPercentage}%</p>
        </div>
      </div>
    </div>
  );
}
