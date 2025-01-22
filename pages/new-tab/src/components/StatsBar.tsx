import { Bar, BarChart, YAxis, Legend } from 'recharts';
import type { ChartConfig } from './ui/chart';
import { ChartContainer } from './ui/chart';

interface StatsBarProps {
  data: Array<{ label: string; male: number; female: number }>; // 데이터 형식 정의
}

const chartConfig = {
  male: {
    label: 'man',
    color: '#2B9D90',
  },
  female: {
    label: 'woman',
    color: '#FF6300',
  },
} satisfies ChartConfig;

export function StatsBar({ data }: StatsBarProps) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart
        data={data}
        width={400}
        height={200}
        margin={{ top: 20, bottom: 20 }} // 아래 여백을 조금 넉넉히 설정
      >
        <YAxis hide /> {/* Y축 숨김 */}
        <Legend layout="vertical" verticalAlign="top" align="center" />
        {/* 레전드 오른쪽 위에 위치 */}
        <Bar
          dataKey="male"
          fill={chartConfig.male.color}
          radius={[4, 4, 0, 0]} // 둥근 모서리
          barSize={80} // 바 크기
        />
        <Bar
          dataKey="female"
          fill={chartConfig.female.color}
          radius={[4, 4, 0, 0]} // 둥근 모서리
          barSize={80} // 바 크기
        />
      </BarChart>
    </ChartContainer>
  );
}
