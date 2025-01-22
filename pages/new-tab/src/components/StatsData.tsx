interface StatInfo {
  views: number;
  wished: number;
  Shares: number;
  BookVisit: number;
}

interface StatsDataProps {
  title: string;
  data: Array<{ StatInfo: StatInfo }>;
  order: number;
}

export default function StatsData({ title, data, order }: StatsDataProps) {
  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-xl font-dm-serif">{title}</h3>
      <p className="text-lg text-[#FF6F3A]">{data[order].StatInfo.views}</p>
    </div>
  );
}
