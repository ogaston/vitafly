"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DroneMonitor() {
  const drones = [
    { id: "DR-001", status: "En misión", battery: 92, zone: "Zone A", mission: "Cardíaca" },
    { id: "DR-002", status: "En espera", battery: 87, zone: "Zone B", mission: "Standby" },
    { id: "DR-003", status: "En misión", battery: 78, zone: "Zone C", mission: "Trauma" },
    { id: "DR-004", status: "En mantenimiento", battery: 45, zone: "Maintenance", mission: "N/A" },
    { id: "DR-005", status: "En espera", battery: 94, zone: "Zone A", mission: "Standby" },
    { id: "DR-006", status: "En misión", battery: 65, zone: "Zone D", mission: "Psicológica" },
  ]

  const getStatusColor = (status: string) => {
    if (status === "En misión") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
    if (status === "En espera") return "bg-blue-500/10 text-blue-400 border-blue-500/30"
    return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
  }

  const getBatteryColor = (battery: number) => {
    if (battery > 80) return "text-emerald-400"
    if (battery > 50) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <Card className="bg-card border-border p-6">
      <h2 className="text-xl font-bold mb-4">Monitor de Drones</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">ID Dron</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Estado</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Batería</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Zona</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Misión Actual</th>
            </tr>
          </thead>
          <tbody>
            {drones.map((drone) => (
              <tr key={drone.id} className="border-b border-border/50 hover:bg-background/50 transition-colors">
                <td className="py-3 px-4 font-mono">{drone.id}</td>
                <td className="py-3 px-4">
                  <Badge className={`${getStatusColor(drone.status)} border`}>{drone.status}</Badge>
                </td>
                <td className={`py-3 px-4 font-semibold ${getBatteryColor(drone.battery)}`}>{drone.battery}%</td>
                <td className="py-3 px-4 text-muted-foreground">{drone.zone}</td>
                <td className="py-3 px-4">{drone.mission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
