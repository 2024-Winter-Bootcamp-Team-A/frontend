import { Bar, BarChart, YAxis, LabelList, Legend } from 'recharts';
import type { ChartConfig } from './ui/chart';
import { ChartContainer } from './ui/chart';

const chartData = [
  { label: 'Man', desktop: 186 },
  { label: 'Woman', mobile: 80 },
];

const chartConfig = {
  desktop: {
    label: 'man',
    color: '#2B9D90',
  },
  mobile: {
    label: 'woman',
    color: '#FF6300',
  },
} satisfies ChartConfig;

export function StatsBar() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart
        data={chartData}
        width={400}
        height={200}
        margin={{ top: 20, bottom: 20 }} // 아래 여백을 조금 넉넉히 설정
      >
        <YAxis hide /> {/* Y축 숨김 */}
        <Legend
          layout="vertical"
          verticalAlign="top"
          align="center"
          // 오른쪽 위 여백 추가
        />{' '}
        {/* 레전드 오른쪽 위에 위치 */}
        <Bar
          dataKey="desktop"
          fill={chartConfig.desktop.color}
          radius={[4, 4, 0, 0]} // 둥근 모서리
          barSize={80} // 바 크기
        ></Bar>
        <Bar
          dataKey="mobile"
          fill={chartConfig.mobile.color}
          radius={[4, 4, 0, 0]} // 둥근 모서리
          barSize={80} // 바 크기
        />
      </BarChart>
    </ChartContainer>
  );
}
