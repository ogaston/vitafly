"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ActiveEmergencies() {
  const emergencies = [
    {
      id: "EMG-001",
      type: "Cardíaca",
      status: "En ruta",
      drone: "DR-001",
      elapsed: "3:42",
      patient: "Juan García",
      location: "Av. Principal 123",
    },
    {
      id: "EMG-002",
      type: "Trauma",
      status: "Atendido",
      drone: "DR-003",
      elapsed: "8:15",
      patient: "María López",
      location: "Calle 5 456",
    },
    {
      id: "EMG-003",
      type: "Psicológica",
      status: "En ruta",
      drone: "DR-006",
      elapsed: "2:30",
      patient: "Carlos Ruiz",
      location: "Plaza Central",
    },
    {
      id: "EMG-004",
      type: "Cardíaca",
      status: "Completado",
      drone: "DR-002",
      elapsed: "15:22",
      patient: "Ana Martínez",
      location: "Zona Comercial",
    },
    {
      id: "EMG-005",
      type: "Trauma",
      status: "En ruta",
      drone: "DR-005",
      elapsed: "1:15",
      patient: "Luis Fernández",
      location: "Zona Residencial",
    },
  ]

  const getTypeColor = (type: string) => {
    if (type === "Cardíaca") return "bg-red-500/10 text-red-400 border-red-500/30"
    if (type === "Trauma") return "bg-orange-500/10 text-orange-400 border-orange-500/30"
    return "bg-purple-500/10 text-purple-400 border-purple-500/30"
  }

  const getStatusColor = (status: string) => {
    if (status === "En ruta") return "bg-blue-500/10 text-blue-400 border-blue-500/30"
    if (status === "Atendido") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
    return "bg-gray-500/10 text-gray-400 border-gray-500/30"
  }

  return (
    <Card className="bg-card border-border p-6">
      <h2 className="text-xl font-bold mb-4">Emergencias Activas</h2>
      <div className="space-y-3">
        {emergencies.map((emergency) => (
          <div
            key={emergency.id}
            className="border border-border rounded-lg p-4 hover:border-emerald-500/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-3 flex-1">
                <span className="font-mono font-bold text-emerald-400">{emergency.id}</span>
                <Badge className={`${getTypeColor(emergency.type)} border`}>{emergency.type}</Badge>
                <Badge className={`${getStatusColor(emergency.status)} border`}>{emergency.status}</Badge>
              </div>
              <span className="text-sm font-semibold text-muted-foreground">{emergency.elapsed}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Paciente</p>
                <p className="font-medium">{emergency.patient}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Dron Asignado</p>
                <p className="font-mono font-semibold text-emerald-400">{emergency.drone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground text-xs">Ubicación</p>
                <p className="font-medium">{emergency.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
