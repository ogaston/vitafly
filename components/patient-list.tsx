"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, Zap, TrendingUp, TrendingDown } from "lucide-react"

interface PatientData {
  id: string
  name: string
  age: number
  condition: string
  heartRate: number
  oxygenSat: number
  bloodPressure: { systolic: number; diastolic: number }
  temperature: number
  lastAlert?: string
  alertTime?: string
  wearableId: string
  heartRateTrend: "up" | "down" | "stable"
  oxygenTrend: "up" | "down" | "stable"
}

const initialPatients: PatientData[] = [
  {
    id: "P001",
    name: "María García",
    age: 65,
    condition: "Cardiac Monitoring",
    heartRate: 98,
    oxygenSat: 89,
    bloodPressure: { systolic: 145, diastolic: 92 },
    temperature: 37.2,
    wearableId: "WB-001",
    lastAlert: "Critical Oxygen Level",
    alertTime: "2 min ago",
    heartRateTrend: "up",
    oxygenTrend: "down",
  },
  {
    id: "P002",
    name: "Juan López",
    age: 42,
    condition: "Post-Surgery",
    heartRate: 72,
    oxygenSat: 99,
    bloodPressure: { systolic: 128, diastolic: 78 },
    temperature: 36.8,
    wearableId: "WB-002",
    heartRateTrend: "stable",
    oxygenTrend: "stable",
  },
  {
    id: "P003",
    name: "Rosa Fernández",
    age: 58,
    condition: "Diabetic Control",
    heartRate: 82,
    oxygenSat: 96,
    bloodPressure: { systolic: 138, diastolic: 88 },
    temperature: 37.5,
    wearableId: "WB-003",
    heartRateTrend: "down",
    oxygenTrend: "stable",
  },
  {
    id: "P004",
    name: "Carlos Ruiz",
    age: 71,
    condition: "Elderly Care",
    heartRate: 68,
    oxygenSat: 92,
    bloodPressure: { systolic: 155, diastolic: 98 },
    temperature: 36.9,
    wearableId: "WB-004",
    heartRateTrend: "stable",
    oxygenTrend: "down",
  },
]

export default function PatientList() {
  const [patients, setPatients] = useState<PatientData[]>(initialPatients)
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(initialPatients[0])
  const [alertTriggered, setAlertTriggered] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setPatients((prevPatients) =>
        prevPatients.map((patient) => {
          const hrVariation = Math.random() * 6 - 3 // ±3 bpm variation
          const o2Variation = Math.random() * 4 - 2 // ±2% variation
          const bpVariation = Math.random() * 4 - 2 // ±2 mmHg variation

          const newHR = Math.max(50, Math.min(130, patient.heartRate + hrVariation))
          const newO2 = Math.max(80, Math.min(100, patient.oxygenSat + o2Variation))
          const newBP = {
            systolic: Math.max(90, Math.min(180, patient.bloodPressure.systolic + bpVariation)),
            diastolic: Math.max(60, Math.min(120, patient.bloodPressure.diastolic + bpVariation)),
          }

          const hrTrend = newHR > patient.heartRate + 1 ? "up" : newHR < patient.heartRate - 1 ? "down" : "stable"
          const o2Trend = newO2 > patient.oxygenSat + 0.5 ? "up" : newO2 < patient.oxygenSat - 0.5 ? "down" : "stable"

          return {
            ...patient,
            heartRate: Math.round(newHR * 10) / 10,
            oxygenSat: Math.round(newO2 * 10) / 10,
            bloodPressure: {
              systolic: Math.round(newBP.systolic),
              diastolic: Math.round(newBP.diastolic),
            },
            heartRateTrend: hrTrend,
            oxygenTrend: o2Trend,
          }
        }),
      )

      setSelectedPatient((prev) => {
        if (!prev) return null
        const updated = patients.find((p) => p.id === prev.id)
        return updated || prev
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getHealthStatus = (heartRate: number, oxygenSat: number, bp: { systolic: number; diastolic: number }) => {
    if (oxygenSat < 90 || heartRate > 110 || bp.systolic > 160) return "critical"
    if (oxygenSat < 94 || heartRate > 100 || bp.systolic > 150) return "warning"
    return "normal"
  }

  const getStatusColor = (status: string) => {
    if (status === "critical") return "bg-red-500/10 text-red-400 border-red-500/30"
    if (status === "warning") return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
    return "bg-purple-500/10 text-purple-400 border-purple-500/30"
  }

  const getStatusBgColor = (status: string) => {
    if (status === "critical") return "border-l-4 border-l-red-500 bg-red-500/5"
    if (status === "warning") return "border-l-4 border-l-yellow-500 bg-yellow-500/5"
    return "border-l-4 border-l-purple-500 bg-purple-500/5"
  }

  const TrendIndicator = ({ trend }: { trend: "up" | "down" | "stable" }) => {
    if (trend === "up") return <TrendingUp className="w-3 h-3 text-red-400" />
    if (trend === "down") return <TrendingDown className="w-3 h-3 text-blue-400" />
    return <div className="w-3 h-3 bg-purple-400 rounded-full" />
  }

  const handleEmergencyAlert = (patient: PatientData) => {
    setAlertTriggered(patient.id)
    setTimeout(() => setAlertTriggered(null), 3000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Patients List */}
      <div className="lg:col-span-1 space-y-3">
        <h3 className="text-lg font-bold px-2">Monitoreo de Pacientes</h3>
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {patients.map((patient) => {
            const status = getHealthStatus(patient.heartRate, patient.oxygenSat, patient.bloodPressure)

            return (
              <Card
                key={patient.id}
                className={`p-3 cursor-pointer transition-all border ${selectedPatient?.id === patient.id ? "border-purple-500/50 bg-background" : "border-border hover:border-purple-500/30"} ${getStatusBgColor(status)}`}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">{patient.condition}</p>
                  </div>
                  <Badge className={`${getStatusColor(status)} border text-xs`}>{status.toUpperCase()}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-1 text-xs mt-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-muted-foreground">HR</p>
                      <TrendIndicator trend={patient.heartRateTrend} />
                    </div>
                    <p className="font-mono font-bold text-purple-400 transition-all duration-300">
                      {Math.round(patient.heartRate)}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-muted-foreground">O₂</p>
                      <TrendIndicator trend={patient.oxygenTrend} />
                    </div>
                    <p className="font-mono font-bold text-blue-400 transition-all duration-300">
                      {Math.round(patient.oxygenSat * 10) / 10}%
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">BP</p>
                    <p className="font-mono font-bold text-orange-400 transition-all duration-300">
                      {patient.bloodPressure.systolic}/{patient.bloodPressure.diastolic}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Main Patient Details */}
      {selectedPatient && (
        <div className="lg:col-span-3 space-y-6">
          {/* Header */}
          <Card className="bg-card border-border p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">{selectedPatient.name}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Age: {selectedPatient.age}</span>
                  <span>•</span>
                  <span className="font-mono text-purple-400">{selectedPatient.wearableId}</span>
                  <span>•</span>
                  <span>{selectedPatient.condition}</span>
                </div>
              </div>
              <Button
                onClick={() => handleEmergencyAlert(selectedPatient)}
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                Activar Alerta
              </Button>
            </div>

            {alertTriggered === selectedPatient.id && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400 text-sm animate-pulse">
                <Zap className="w-4 h-4" />
                Alerta de emergencia enviada - Dron en camino
              </div>
            )}

            {selectedPatient.lastAlert && (
              <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <div className="text-sm">
                  <p className="font-semibold text-yellow-400">Última Alerta: {selectedPatient.lastAlert}</p>
                  <p className="text-yellow-300/70 text-xs">{selectedPatient.alertTime}</p>
                </div>
              </div>
            )}
          </Card>

          {/* Current Vitals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card border-border p-4 text-center">
              <p className="text-muted-foreground text-sm mb-2">Heart Rate</p>
              <p className="text-3xl font-bold text-purple-400 transition-all duration-300">
                {Math.round(selectedPatient.heartRate)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">bpm</p>
            </Card>
            <Card className="bg-card border-border p-4 text-center">
              <p className="text-muted-foreground text-sm mb-2">Oxygen Sat</p>
              <p className="text-3xl font-bold text-blue-400 transition-all duration-300">
                {Math.round(selectedPatient.oxygenSat * 10) / 10}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">SpO₂</p>
            </Card>
            <Card className="bg-card border-border p-4 text-center">
              <p className="text-muted-foreground text-sm mb-2">Blood Pressure</p>
              <p className="text-2xl font-bold text-orange-400 transition-all duration-300">
                {selectedPatient.bloodPressure.systolic}/{selectedPatient.bloodPressure.diastolic}
              </p>
              <p className="text-xs text-muted-foreground mt-1">mmHg</p>
            </Card>
            <Card className="bg-card border-border p-4 text-center">
              <p className="text-muted-foreground text-sm mb-2">Temperature</p>
              <p className="text-3xl font-bold text-pink-400 transition-all duration-300">
                {selectedPatient.temperature}°
              </p>
              <p className="text-xs text-muted-foreground mt-1">Celsius</p>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
