"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ConnectedServices() {
  const services = [
    {
      name: "Psicología",
      icon: "🧠",
      patients: 8,
      attended: 24,
      waiting: 3,
    },
    {
      name: "Radiografías",
      icon: "🩻",
      patients: 5,
      attended: 12,
      waiting: 1,
    },
  ]

  return (
    <Card className="bg-card border-border p-6">
      <h2 className="text-xl font-bold mb-4">Servicios Conectados</h2>
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.name} className="border border-border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{service.icon}</span>
              <h3 className="font-semibold">{service.name}</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm mb-3">
              <div className="bg-background rounded p-2">
                <p className="text-muted-foreground text-xs">En Atención</p>
                <p className="text-lg font-bold text-purple-400">{service.patients}</p>
              </div>
              <div className="bg-background rounded p-2">
                <p className="text-muted-foreground text-xs">Hoy</p>
                <p className="text-lg font-bold text-blue-400">{service.attended}</p>
              </div>
              <div className="bg-background rounded p-2">
                <p className="text-muted-foreground text-xs">En Espera</p>
                <p className="text-lg font-bold text-yellow-400">{service.waiting}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                Historial
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                Programar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
