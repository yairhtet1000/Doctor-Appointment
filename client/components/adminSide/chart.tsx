"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Prop {
  chartHeader: string;
  chartDiscription: string;
  chartData: any;
  chartConfig: {};
  dataKeyY: string;
  dataKeyX: string;
  strokeColor: string;
}
export function Chart({
  chartHeader,
  chartDiscription,
  chartData,
  chartConfig,
  dataKeyY,
  dataKeyX,
  strokeColor,
}: Prop) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartHeader}</CardTitle>
        <CardDescription>{chartDiscription}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dataKeyX}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey={dataKeyY}
              type="natural"
              stroke={strokeColor}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
