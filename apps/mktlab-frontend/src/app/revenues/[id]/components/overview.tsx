"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { RevenueListResponse } from "../../../common/services/requests/revenues/getRevenuesByDealId";




export function Overview({ revenues }: { revenues: RevenueListResponse[] | undefined }) {
  let amountAccumulator = 0;
  
  const data = revenues?.map((revenue) => {
    const month = new Date(revenue.expectedPayDate).toLocaleString("en-US", { month: "short" })
    return {
      name: month,
      total: amountAccumulator += revenue.amount / 100,
    }
  })


  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}