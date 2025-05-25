"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ChartDataPoint, FilterState } from "./types"

interface InteractiveChartProps {
  title: string
  data: ChartDataPoint[]
  filterKey: keyof FilterState
  chartType?: "pie" | "bar"
  colors?: string[]
  activeFilters: string[]
  onFilterChange: (filterKey: keyof FilterState, values: string[]) => void
}

const DEFAULT_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export function InteractiveChart({
  title,
  data,
  filterKey,
  chartType = "pie",
  colors = DEFAULT_COLORS,
  activeFilters,
  onFilterChange,
}: InteractiveChartProps) {
  const handleClick = (entry: ChartDataPoint) => {
    const isSelected = activeFilters.includes(entry.name)

    let newFilters: string[]
    if (isSelected) {
      newFilters = activeFilters.filter((f) => f !== entry.name)
    } else {
      newFilters = [...activeFilters, entry.name]
    }

    onFilterChange(filterKey, newFilters)
  }

  const renderChart = () => {
    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip formatter={(value: number) => [value, "Count"]} labelFormatter={(label: string) => `${label}`} />
            <Bar dataKey="value" onClick={handleClick} cursor="pointer">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={activeFilters.includes(entry.name) ? colors[index % colors.length] : "#E5E7EB"}
                  stroke={activeFilters.includes(entry.name) ? "#374151" : "none"}
                  strokeWidth={activeFilters.includes(entry.name) ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" onClick={handleClick} cursor="pointer">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={activeFilters.includes(entry.name) ? colors[index % colors.length] : "#E5E7EB"}
                stroke={activeFilters.includes(entry.name) ? "#374151" : "none"}
                strokeWidth={activeFilters.includes(entry.name) ? 3 : 0}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string, item) => {
              const percentage = item.payload?.percentage || 0
              return [`${value} (${percentage.toFixed(1)}%)`, "Candidates"]
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderChart()}
        <div className="mt-4 flex flex-wrap gap-2">
          {data.map((entry, index) => (
            <div
              key={entry.name}
              className={`flex items-center gap-2 px-2 py-1 rounded text-sm cursor-pointer transition-colors ${
                activeFilters.includes(entry.name) ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
              onClick={() => handleClick(entry)}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: activeFilters.includes(entry.name) ? colors[index % colors.length] : "#9CA3AF",
                }}
              />
              <span>
                {entry.name} ({entry.value})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}