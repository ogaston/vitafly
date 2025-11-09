"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Brain,
  Clock,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Zap,
  UserPlus,
  UserX,
  Stethoscope
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export interface Doctor {
  id: string
  name: string
  specialty: string
  experience: string
  rating: string
}

export interface PredictiveNotification {
  id: string
  patientId: string
  patientName: string
  patientAge: number
  condition: string
  modelType: "cardiac_risk" | "deterioration" | "anomaly" | "trend_analysis" | "readmission_risk"
  severity: "critical" | "high" | "medium" | "low"
  title: string
  description: string
  confidence: number // 0-100
  predictedTimeframe?: string
  recommendedAction?: string
  timestamp: Date
  acknowledged: boolean
  assignedDoctorId?: string
  assignedDoctorName?: string
  metrics: {
    heartRate?: number
    oxygenSat?: number
    bloodPressure?: { systolic: number; diastolic: number }
    temperature?: number
  }
}

const availableDoctors: Doctor[] = [
  { id: "1", name: "Dr. Carlos Mendoza", specialty: "Medicina General", experience: "15 años", rating: "4.9" },
  { id: "2", name: "Dra. Ana García", specialty: "Cardiología", experience: "12 años", rating: "4.8" },
  { id: "3", name: "Dr. Luis Rodríguez", specialty: "Pediatría", experience: "10 años", rating: "4.7" },
  { id: "4", name: "Dra. María López", specialty: "Dermatología", experience: "8 años", rating: "4.9" },
]

const mockNotifications: PredictiveNotification[] = [
  {
    id: "N001",
    patientId: "P001",
    patientName: "María García",
    patientAge: 65,
    condition: "Cardiac Monitoring",
    modelType: "cardiac_risk",
    severity: "critical",
    title: "Alto Riesgo de Evento Cardiaco",
    description: "El modelo predictivo indica un riesgo elevado (87%) de evento cardiaco en las próximas 2-4 horas basado en patrones de frecuencia cardíaca irregular y presión arterial elevada.",
    confidence: 87,
    predictedTimeframe: "2-4 horas",
    recommendedAction: "Revisión inmediata por cardiólogo. Considerar intervención preventiva.",
    timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    acknowledged: false,
    assignedDoctorId: "2",
    assignedDoctorName: "Dra. Ana García",
    metrics: {
      heartRate: 98,
      oxygenSat: 89,
      bloodPressure: { systolic: 145, diastolic: 92 },
      temperature: 37.2
    }
  },
  {
    id: "N002",
    patientId: "P003",
    patientName: "Rosa Fernández",
    patientAge: 58,
    condition: "Diabetic Control",
    modelType: "deterioration",
    severity: "high",
    title: "Predicción de Deterioro de Salud",
    description: "Análisis de tendencias sugiere posible deterioro en las próximas 6-8 horas. Patrones de temperatura y frecuencia cardíaca muestran desviaciones significativas.",
    confidence: 72,
    predictedTimeframe: "6-8 horas",
    recommendedAction: "Monitoreo intensificado. Revisar medicación y considerar ajustes.",
    timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    acknowledged: false,
    metrics: {
      heartRate: 82,
      oxygenSat: 96,
      bloodPressure: { systolic: 138, diastolic: 88 },
      temperature: 37.5
    }
  },
  {
    id: "N003",
    patientId: "P004",
    patientName: "Carlos Ruiz",
    patientAge: 71,
    condition: "Elderly Care",
    modelType: "anomaly",
    severity: "medium",
    title: "Detección de Anomalía en Patrones",
    description: "El modelo de detección de anomalías ha identificado un patrón inusual en los datos de saturación de oxígeno durante las últimas 2 horas.",
    confidence: 65,
    predictedTimeframe: "Inmediato",
    recommendedAction: "Verificar sensor y validar lectura. Si persiste, evaluación clínica.",
    timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
    acknowledged: true,
    assignedDoctorId: "1",
    assignedDoctorName: "Dr. Carlos Mendoza",
    metrics: {
      heartRate: 68,
      oxygenSat: 92,
      bloodPressure: { systolic: 155, diastolic: 98 },
      temperature: 36.9
    }
  },
  {
    id: "N004",
    patientId: "P001",
    patientName: "María García",
    patientAge: 65,
    condition: "Cardiac Monitoring",
    modelType: "trend_analysis",
    severity: "high",
    title: "Tendencia Descendente en Saturación de Oxígeno",
    description: "Análisis de tendencias muestra una disminución constante de SpO2 en las últimas 4 horas. Proyección indica posible caída crítica si continúa.",
    confidence: 78,
    predictedTimeframe: "4-6 horas",
    recommendedAction: "Aumentar frecuencia de monitoreo. Considerar oxigenoterapia preventiva.",
    timestamp: new Date(Date.now() - 45 * 60000), // 45 minutes ago
    acknowledged: false,
    metrics: {
      heartRate: 98,
      oxygenSat: 89,
      bloodPressure: { systolic: 145, diastolic: 92 }
    }
  },
  {
    id: "N005",
    patientId: "P002",
    patientName: "Juan López",
    patientAge: 42,
    condition: "Post-Surgery",
    modelType: "readmission_risk",
    severity: "low",
    title: "Riesgo Moderado de Reingreso",
    description: "Modelo de riesgo de reingreso indica probabilidad del 45% de requerir atención hospitalaria en los próximos 7 días.",
    confidence: 45,
    predictedTimeframe: "7 días",
    recommendedAction: "Seguimiento ambulatorio reforzado. Programar consulta de seguimiento.",
    timestamp: new Date(Date.now() - 60 * 60000), // 1 hour ago
    acknowledged: true,
    assignedDoctorId: "1",
    assignedDoctorName: "Dr. Carlos Mendoza",
    metrics: {
      heartRate: 72,
      oxygenSat: 99,
      bloodPressure: { systolic: 128, diastolic: 78 },
      temperature: 36.8
    }
  },
  {
    id: "N006",
    patientId: "P003",
    patientName: "Rosa Fernández",
    patientAge: 58,
    condition: "Diabetic Control",
    modelType: "anomaly",
    severity: "medium",
    title: "Variación Inusual en Temperatura Corporal",
    description: "Detección de fluctuaciones anómalas en temperatura que no corresponden con patrones históricos del paciente.",
    confidence: 58,
    predictedTimeframe: "Inmediato",
    recommendedAction: "Verificar sensor y comparar con medición manual. Monitorear evolución.",
    timestamp: new Date(Date.now() - 90 * 60000), // 1.5 hours ago
    acknowledged: false,
    metrics: {
      temperature: 37.5,
      heartRate: 82
    }
  }
]

export default function PredictiveNotifications() {
  const [notifications, setNotifications] = useState<PredictiveNotification[]>(mockNotifications)
  const [filterSeverity, setFilterSeverity] = useState<string>("all")
  const [filterModelType, setFilterModelType] = useState<string>("all")
  const [filterDoctor, setFilterDoctor] = useState<string>("all")
  const [showAcknowledged, setShowAcknowledged] = useState<boolean>(true)
  const [assignDialogOpen, setAssignDialogOpen] = useState<{ [key: string]: boolean }>({})

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/10 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/10 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30"
    }
  }

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-l-4 border-l-red-500 bg-red-500/5"
      case "high":
        return "border-l-4 border-l-orange-500 bg-orange-500/5"
      case "medium":
        return "border-l-4 border-l-yellow-500 bg-yellow-500/5"
      case "low":
        return "border-l-4 border-l-blue-500 bg-blue-500/5"
      default:
        return "border-l-4 border-l-gray-500 bg-gray-500/5"
    }
  }

  const getModelTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      cardiac_risk: "Riesgo Cardiaco",
      deterioration: "Deterioro",
      anomaly: "Anomalía",
      trend_analysis: "Análisis de Tendencia",
      readmission_risk: "Riesgo de Reingreso"
    }
    return labels[type] || type
  }

  const getModelTypeIcon = (type: string) => {
    switch (type) {
      case "cardiac_risk":
        return <Activity className="w-4 h-4" />
      case "deterioration":
        return <TrendingDown className="w-4 h-4" />
      case "anomaly":
        return <AlertCircle className="w-4 h-4" />
      case "trend_analysis":
        return <TrendingUp className="w-4 h-4" />
      case "readmission_risk":
        return <Brain className="w-4 h-4" />
      default:
        return <Zap className="w-4 h-4" />
    }
  }

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
    if (minutes < 1) return "Hace menos de un minuto"
    if (minutes < 60) return `Hace ${minutes} minuto${minutes > 1 ? "s" : ""}`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `Hace ${hours} hora${hours > 1 ? "s" : ""}`
    const days = Math.floor(hours / 24)
    return `Hace ${days} día${days > 1 ? "s" : ""}`
  }

  const toggleAcknowledge = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, acknowledged: !notif.acknowledged } : notif
      )
    )
  }

  const assignDoctor = (notificationId: string, doctorId: string) => {
    const doctor = availableDoctors.find(d => d.id === doctorId)
    if (doctor) {
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId
            ? { ...notif, assignedDoctorId: doctor.id, assignedDoctorName: doctor.name }
            : notif
        )
      )
      setAssignDialogOpen(prev => ({ ...prev, [notificationId]: false }))
    }
  }

  const unassignDoctor = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId
          ? { ...notif, assignedDoctorId: undefined, assignedDoctorName: undefined }
          : notif
      )
    )
  }

  const filteredNotifications = notifications.filter(notif => {
    if (filterSeverity !== "all" && notif.severity !== filterSeverity) return false
    if (filterModelType !== "all" && notif.modelType !== filterModelType) return false
    if (filterDoctor !== "all") {
      if (filterDoctor === "unassigned" && notif.assignedDoctorId) return false
      if (filterDoctor !== "unassigned" && notif.assignedDoctorId !== filterDoctor) return false
    }
    if (!showAcknowledged && notif.acknowledged) return false
    return true
  })

  const unacknowledgedCount = notifications.filter(n => !n.acknowledged).length
  const criticalCount = notifications.filter(n => n.severity === "critical" && !n.acknowledged).length
  const unassignedCount = notifications.filter(n => !n.assignedDoctorId).length

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Notificaciones</p>
              <p className="text-2xl font-bold">{notifications.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-muted-foreground" />
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pendientes</p>
              <p className="text-2xl font-bold text-orange-400">{unacknowledgedCount}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-400" />
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Críticas</p>
              <p className="text-2xl font-bold text-red-400">{criticalCount}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sin Asignar</p>
              <p className="text-2xl font-bold text-purple-400">{unassignedCount}</p>
            </div>
            <UserX className="w-8 h-8 text-purple-400" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card border-border">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filtros:</span>
          </div>
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Severidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Severidades</SelectItem>
              <SelectItem value="critical">Crítica</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="low">Baja</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterModelType} onValueChange={setFilterModelType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tipo de Modelo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Modelos</SelectItem>
              <SelectItem value="cardiac_risk">Riesgo Cardiaco</SelectItem>
              <SelectItem value="deterioration">Deterioro</SelectItem>
              <SelectItem value="anomaly">Anomalía</SelectItem>
              <SelectItem value="trend_analysis">Análisis de Tendencia</SelectItem>
              <SelectItem value="readmission_risk">Riesgo de Reingreso</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterDoctor} onValueChange={setFilterDoctor}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Doctor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Doctores</SelectItem>
              <SelectItem value="unassigned">Sin Asignar</SelectItem>
              {availableDoctors.map(doctor => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant={showAcknowledged ? "default" : "outline"}
            size="sm"
            onClick={() => setShowAcknowledged(!showAcknowledged)}
          >
            {showAcknowledged ? "Mostrar Todas" : "Solo Pendientes"}
          </Button>
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No hay notificaciones que coincidan con los filtros seleccionados.</p>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-6 transition-all ${getSeverityBgColor(notification.severity)} ${
                notification.acknowledged ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getSeverityColor(notification.severity)}`}>
                        {getModelTypeIcon(notification.modelType)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{notification.title}</h3>
                          <Badge className={getSeverityColor(notification.severity)}>
                            {notification.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {getModelTypeLabel(notification.modelType)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{notification.patientName}</span>
                          <span>•</span>
                          <span>{notification.patientAge} años</span>
                          <span>•</span>
                          <span>{notification.condition}</span>
                        </div>
                        {notification.assignedDoctorName && (
                          <div className="flex items-center gap-2 mt-2">
                            <Stethoscope className="w-3 h-3 text-emerald-400" />
                            <span className="text-xs text-emerald-400 font-medium">
                              Asignado a: {notification.assignedDoctorName}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {notification.acknowledged ? (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Revisada
                        </Badge>
                      ) : (
                        <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          Pendiente
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {notification.description}
                  </p>

                  {/* Metrics and Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">Métricas Relevantes:</p>
                      <div className="flex flex-wrap gap-3 text-xs">
                        {notification.metrics.heartRate && (
                          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded">
                            HR: {notification.metrics.heartRate} bpm
                          </span>
                        )}
                        {notification.metrics.oxygenSat && (
                          <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded">
                            SpO₂: {notification.metrics.oxygenSat}%
                          </span>
                        )}
                        {notification.metrics.bloodPressure && (
                          <span className="px-2 py-1 bg-orange-500/10 text-orange-400 rounded">
                            BP: {notification.metrics.bloodPressure.systolic}/{notification.metrics.bloodPressure.diastolic} mmHg
                          </span>
                        )}
                        {notification.metrics.temperature && (
                          <span className="px-2 py-1 bg-pink-500/10 text-pink-400 rounded">
                            Temp: {notification.metrics.temperature}°C
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">Predicción:</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Confianza del Modelo:</span>
                          <span className="font-semibold">{notification.confidence}%</span>
                        </div>
                        {notification.predictedTimeframe && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Ventana Temporal:</span>
                            <span className="font-semibold">{notification.predictedTimeframe}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Tiempo:</span>
                          <span className="font-semibold">{formatTimeAgo(notification.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Action */}
                  {notification.recommendedAction && (
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Acción Recomendada:</p>
                      <p className="text-sm text-foreground">{notification.recommendedAction}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {notification.assignedDoctorId ? (
                    <>
                      <Dialog
                        open={assignDialogOpen[notification.id] || false}
                        onOpenChange={(open) =>
                          setAssignDialogOpen(prev => ({ ...prev, [notification.id]: open }))
                        }
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="whitespace-nowrap">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Cambiar Doctor
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Asignar Doctor</DialogTitle>
                            <DialogDescription>
                              Selecciona un doctor para asignar a esta notificación
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-2 py-4">
                            {availableDoctors.map(doctor => (
                              <Card
                                key={doctor.id}
                                className={`p-3 cursor-pointer transition-colors ${
                                  notification.assignedDoctorId === doctor.id
                                    ? "border-emerald-500 bg-emerald-500/10"
                                    : "hover:border-emerald-500/50"
                                }`}
                                onClick={() => assignDoctor(notification.id, doctor.id)}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-semibold text-sm">{doctor.name}</p>
                                    <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                                  </div>
                                  {notification.assignedDoctorId === doctor.id && (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                  )}
                                </div>
                              </Card>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => unassignDoctor(notification.id)}
                        className="whitespace-nowrap text-red-400 hover:text-red-500"
                      >
                        <UserX className="w-4 h-4 mr-2" />
                        Quitar Doctor
                      </Button>
                    </>
                  ) : (
                    <Dialog
                      open={assignDialogOpen[notification.id] || false}
                      onOpenChange={(open) =>
                        setAssignDialogOpen(prev => ({ ...prev, [notification.id]: open }))
                      }
                    >
                      <DialogTrigger asChild>
                        <Button variant="default" size="sm" className="whitespace-nowrap">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Asignar Doctor
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Asignar Doctor</DialogTitle>
                          <DialogDescription>
                            Selecciona un doctor para asignar a esta notificación
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2 py-4">
                          {availableDoctors.map(doctor => (
                            <Card
                              key={doctor.id}
                              className="p-3 cursor-pointer transition-colors hover:border-emerald-500/50"
                              onClick={() => assignDoctor(notification.id, doctor.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-sm">{doctor.name}</p>
                                  <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {doctor.experience}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      ⭐ {doctor.rating}
                                    </span>
                                  </div>
                                </div>
                                <Stethoscope className="w-5 h-5 text-emerald-400" />
                              </div>
                            </Card>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  <Button
                    variant={notification.acknowledged ? "outline" : "default"}
                    size="sm"
                    onClick={() => toggleAcknowledge(notification.id)}
                    className="whitespace-nowrap"
                  >
                    {notification.acknowledged ? (
                      <>
                        <XCircle className="w-4 h-4 mr-2" />
                        Marcar Pendiente
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Marcar Revisada
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

