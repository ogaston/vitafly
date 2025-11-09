"use client"

import { useState, useEffect } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Card } from "@/components/ui/card"

interface GraphData {
  time: string
  value: number
}

interface PatientGraphProps {
  patientId: string
}

export default function PatientHealthGraphs({ patientId }: PatientGraphProps) {
  const [heartRateHistory, setHeartRateHistory] = useState<GraphData[]>(
    Array.from({ length: 12 }, (_, i) => ({
      time: `${String(i).padStart(2, "0")}:00`,
      value: 70 + Math.random() * 20,
    })),
  )

  const [oxygenHistory, setOxygenHistory] = useState<GraphData[]>(
    Array.from({ length: 12 }, (_, i) => ({
      time: `${String(i).padStart(2, "0")}:00`,
      value: 95 + Math.random() * 5,
    })),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRateHistory((prev) => {
        const newValue = Math.max(50, Math.min(130, prev[prev.length - 1].value + (Math.random() * 6 - 3)))
        return [...prev.slice(1), { time: new Date().toLocaleTimeString().slice(0, 5), value: newValue }]
      })

      setOxygenHistory((prev) => {
        const newValue = Math.max(80, Math.min(100, prev[prev.length - 1].value + (Math.random() * 4 - 2)))
        return [...prev.slice(1), { time: new Date().toLocaleTimeString().slice(0, 5), value: newValue }]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStats = (data: GraphData[]) => ({
    min: Math.min(...data.map((d) => d.value)),
    avg: Math.round(data.reduce((a, b) => a + b.value, 0) / data.length),
    max: Math.max(...data.map((d) => d.value)),
  })

  const hrStats = getStats(heartRateHistory)
  const o2Stats = getStats(oxygenHistory)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Heart Rate Graph */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-bold mb-4">Heart Rate (Latidos/min)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={heartRateHistory} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#888" style={{ fontSize: "12px" }} />
            <YAxis stroke="#888" style={{ fontSize: "12px" }} domain={[50, 120]} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}
              labelStyle={{ color: "#fff" }}
              formatter={(value) => `${Math.round(value as number)} bpm`}
            />
            <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorHR)" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <div className="text-center">
            <p className="text-muted-foreground">Min</p>
            <p className="font-bold text-purple-400 transition-all">{Math.round(hrStats.min)}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Avg</p>
            <p className="font-bold text-purple-400 transition-all">{hrStats.avg}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Max</p>
            <p className="font-bold text-purple-400 transition-all">{Math.round(hrStats.max)}</p>
          </div>
        </div>
      </Card>

      {/* Oxygen Saturation Graph */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-bold mb-4">Oxygen Saturation (SpO₂)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={oxygenHistory} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorO2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#888" style={{ fontSize: "12px" }} />
            <YAxis stroke="#888" style={{ fontSize: "12px" }} domain={[80, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}
              labelStyle={{ color: "#fff" }}
              formatter={(value) => `${Math.round(value as number)}%`}
            />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorO2)" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <div className="text-center">
            <p className="text-muted-foreground">Min</p>
            <p className="font-bold text-blue-400 transition-all">{Math.round(o2Stats.min)}%</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Avg</p>
            <p className="font-bold text-blue-400 transition-all">{o2Stats.avg}%</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Max</p>
            <p className="font-bold text-blue-400 transition-all">{Math.round(o2Stats.max)}%</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
