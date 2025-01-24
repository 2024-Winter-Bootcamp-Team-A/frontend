import * as React from 'react';
import { Label, Pie, PieChart, Cell } from 'recharts';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import type { ChartConfig } from './ui/chart';
const chartConfig = {
  '10s': {
    label: '10-19',
    color: '#2B9D90',
  },
  '20s': {
    label: '20-29',
    color: 'rgb(76, 175, 80)',
  },
  '30s': {
    label: '30-39',
    color: 'hsl(0, 100%, 50%)',
  },
  '40s': {
    label: '40-49',
    color: 'gold',
  },
  '50+': {
    label: '50+',
    color: 'purple',
  },
} satisfies ChartConfig;

interface StatsData {
  category: '10s' | '20s' | '30s' | '40s' | '50+'; // 정확한 타입 정의
  count: number;
}

interface StatsPieProps {
  data: Array<StatsData>;
}

export default function StatsPie({ data }: StatsPieProps) {
  const totalVisitors = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <CardContent className="flex-1 pb-0">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie data={data} dataKey="count" nameKey="category" innerRadius={60} strokeWidth={5}>
            {data.map((entry, index) => {
              const color = chartConfig[entry.category]?.color || '#ccc'; // 카테고리별 색상 가져오기
              return (
                <Cell key={`cell-${index}`} fill={color} /> // 색상 적용
              );
            })}
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                        Age Distribution
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </CardContent>
  );
}
