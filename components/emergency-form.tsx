"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function EmergencyForm() {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    emergencyType: "Cardíaca",
    location: "",
    symptoms: "",
    priority: "Alta",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Emergency registered:", formData)
    setFormData({
      patientName: "",
      age: "",
      emergencyType: "Cardíaca",
      location: "",
      symptoms: "",
      priority: "Alta",
      phone: "",
    })
  }

  return (
    <Card className="bg-card border-border p-6">
      <h2 className="text-xl font-bold mb-4">Registrar Emergencia</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nombre del Paciente</label>
          <input
            type="text"
            required
            value={formData.patientName}
            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Nombre completo"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-2">Edad</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Edad"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tipo de Emergencia</label>
            <select
              value={formData.emergencyType}
              onChange={(e) => setFormData({ ...formData, emergencyType: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option>Cardíaca</option>
              <option>Trauma</option>
              <option>Psicológica</option>
              <option>Otra</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Ubicación (GPS o Dirección)</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Dirección o coordenadas"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Síntomas / Descripción</label>
          <textarea
            value={formData.symptoms}
            onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            rows={3}
            placeholder="Descripción de síntomas"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-2">Prioridad</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option>Crítica</option>
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Teléfono</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Número de contacto"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Registrar Emergencia
        </Button>
      </form>
    </Card>
  )
}
