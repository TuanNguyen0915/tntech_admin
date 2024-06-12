"use client"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ISaleChartProps {
  data: any[]
}

const SaleChart = ({ data }: ISaleChartProps) => {
  return (
    <Card className="mt-24">
      <CardHeader>
        <CardTitle className="text-center">Sale Chart ($)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            className="h-full w-full"
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis dataKey="sales" />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default SaleChart
