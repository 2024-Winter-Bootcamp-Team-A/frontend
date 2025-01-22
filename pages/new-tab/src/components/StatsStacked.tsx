import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import type { ChartConfig } from './ui/chart';
interface StatsStackedProps {
  data: Array<{ date: string; count: number }>; // 데이터 형식 정의
}

const chartConfig = {
  date: {
    label: 'Date',
    color: '#F7D1C7',
  },
  count: {
    label: 'Count',
    color: '#D5ECE9',
  },
} satisfies ChartConfig;

export default function StatsStacked({ data }: StatsStackedProps) {
  const transformedData = data.map(item => ({
    date: item.date,
    count: item.count,
  }));

  return (
    <CardContent className="h-[200px]">
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={transformedData}
          margin={{
            left: 12,
            right: 12,
            top: 20,
            bottom: 120,
          }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={value => value.slice(5)} // 날짜를 짧게 표시
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
          <Area
            dataKey="count"
            type="natural"
            fill="var(--color-mobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  );
}
