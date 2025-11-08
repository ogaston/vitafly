"use client"

import { Card } from "@/components/ui/card"

export default function KPIMetrics() {
  const metrics = [
    { label: "Drones Active", value: "12", percentage: "+8.2%", icon: "📡" },
    { label: "Active Emergencies", value: "5", percentage: "-2.1%", icon: "🚨" },
    { label: "Patients Attended", value: "47", percentage: "+12.5%", icon: "👥" },
    { label: "Avg Response Time", value: "4.2 min", percentage: "-0.8 min", icon: "⏱️" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => (
        <Card key={idx} className="bg-card border-border p-6 hover:border-emerald-500/50 transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
              <p className="text-3xl font-bold mt-2">{metric.value}</p>
              <p
                className={`text-xs mt-2 ${metric.percentage.startsWith("-") && metric.label !== "Avg Response Time" ? "text-red-400" : "text-emerald-400"}`}
              >
                {metric.percentage}
              </p>
            </div>
            <span className="text-2xl">{metric.icon}</span>
          </div>
        </Card>
      ))}
    </div>
  )
}
