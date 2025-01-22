interface StatInfo {
  views: number;
  wishes: number;
  shares: number;
  bookVisits: number;
}

interface StatsDataProps {
  title: string;
  data: number; // 단일 숫자 데이터를 전달받도록 변경
}

export default function StatsData({ title, data }: StatsDataProps) {
  return (
    <div className="flex flex-col gap-10 items-center">
      <h3 className="text-xl font-dm-serif">{title}</h3>
      <p className="text-lg text-[#FF6F3A]">{data}</p>
    </div>
  );
}
