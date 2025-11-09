"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  Activity, 
  Clock, 
  MapPin, 
  Bell, 
  Home,
  Calendar as CalendarIcon,
  User,
  Pill,
  ArrowLeft,
  CheckCircle2,
  Store,
  Truck,
  Stethoscope,
  FileText,
  ChevronRight
} from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"

type FlowStep = "dashboard" | "drug-selection" | "estimated-arrival" | "drug-success" | "doctor-selection" | "date-selection" | "appointment-details" | "appointment-success"

export default function CustomerDashboardMockup() {
  const [currentStep, setCurrentStep] = useState<FlowStep>("dashboard")
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [appointmentNotes, setAppointmentNotes] = useState<string>("")

  const drugs = [
    { id: "1", name: "Paracetamol 500mg", description: "Analgésico y antipirético", price: "$5.99" },
    { id: "2", name: "Ibuprofeno 400mg", description: "Antiinflamatorio", price: "$7.50" },
    { id: "3", name: "Amoxicilina 500mg", description: "Antibiótico", price: "$12.99" },
    { id: "4", name: "Omeprazol 20mg", description: "Protector gástrico", price: "$8.75" },
  ]

  const drugStore = {
    name: "Farmacia Salud Total",
    address: "Av. Principal 123, Local 45",
    distance: "1.2 km",
    estimatedTime: "15-20 min",
    phone: "+1 (555) 123-4567"
  }

  const doctors = [
    { id: "1", name: "Dr. Carlos Mendoza", specialty: "Medicina General", experience: "15 años", rating: "4.9" },
    { id: "2", name: "Dra. Ana García", specialty: "Cardiología", experience: "12 años", rating: "4.8" },
    { id: "3", name: "Dr. Luis Rodríguez", specialty: "Pediatría", experience: "10 años", rating: "4.7" },
    { id: "4", name: "Dra. María López", specialty: "Dermatología", experience: "8 años", rating: "4.9" },
  ]

  const handleDrugSelect = (drugId: string) => {
    setSelectedDrug(drugId)
    setCurrentStep("estimated-arrival")
  }

  const handleBackToDashboard = () => {
    setCurrentStep("dashboard")
    setSelectedDrug(null)
    setSelectedDoctor(null)
    setSelectedDate(undefined)
    setAppointmentNotes("")
  }

  const handleBackToSelection = () => {
    setCurrentStep("drug-selection")
  }

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId)
    setCurrentStep("date-selection")
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const handleContinueToDetails = () => {
    if (selectedDate) {
      setCurrentStep("appointment-details")
    }
  }

  const handleBackToDoctorSelection = () => {
    setCurrentStep("doctor-selection")
  }

  const handleBackToDateSelection = () => {
    setCurrentStep("date-selection")
  }

  const handleAppointmentSubmit = () => {
    setCurrentStep("appointment-success")
  }

  const handleDrugRequestConfirm = () => {
    setCurrentStep("drug-success")
  }

  const handleSuccessComplete = () => {
    setCurrentStep("dashboard")
    setSelectedDrug(null)
    setSelectedDoctor(null)
    setSelectedDate(undefined)
    setAppointmentNotes("")
  }

  const handleStartAppointment = () => {
    setCurrentStep("doctor-selection")
  }
  return (
    <div className="relative flex items-start justify-center">
    <img src="/iphone-mockup.png" alt="Vitafly" style={{
        width: "455px",
        
        position: "fixed",
        zIndex: "1",
    }} />
      {/* iPhone Mockup Frame */}
      <div className="relative w-[375px] h-[832px] z-10 top-[8px]">
        <Image
          src="/iphone-mockup.png"
          alt="iPhone Mockup"
          fill
          className="object-contain"
          priority
        />
        
        {/* Customer Dashboard Content Inside Mockup */}
        <div className="absolute inset-[50px_18px_50px_18px] bg-background rounded-[2.5rem] overflow-hidden shadow-2xl">
          {/* Dashboard Content */}
          <div className="h-full flex flex-col bg-gradient-to-b from-emerald-50 to-background dark:from-emerald-950/20 dark:to-background">
            {/* Drug Selection Screen */}
            {currentStep === "drug-selection" && (
              <div className="h-full flex flex-col">
                <div className="px-6 pt-12 pb-4 bg-gradient-to-b from-emerald-500 to-emerald-600 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={handleBackToDashboard}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h1 className="text-2xl font-bold">Solicitar Medicamento</h1>
                      <p className="text-emerald-100 text-sm">Selecciona el medicamento</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-6">
                  <div className="space-y-3">
                    {drugs.map((drug) => (
                      <Card
                        key={drug.id}
                        className="p-4 bg-card border-border hover:border-emerald-500/50 transition-colors cursor-pointer"
                        onClick={() => handleDrugSelect(drug.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                              <Pill className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm mb-1">{drug.name}</h3>
                              <p className="text-xs text-muted-foreground mb-2">{drug.description}</p>
                              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{drug.price}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Doctor Selection Screen */}
            {currentStep === "doctor-selection" && (
              <div className="h-full flex flex-col">
                <div className="px-6 pt-12 pb-4 bg-gradient-to-b from-emerald-500 to-emerald-600 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={handleBackToDashboard}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h1 className="text-2xl font-bold">Agendar Cita</h1>
                      <p className="text-emerald-100 text-sm">Selecciona un médico</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-6">
                  <div className="space-y-3">
                    {doctors.map((doctor) => (
                      <Card
                        key={doctor.id}
                        className="p-4 bg-card border-border hover:border-emerald-500/50 transition-colors cursor-pointer"
                        onClick={() => handleDoctorSelect(doctor.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                            <Stethoscope className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm mb-1">{doctor.name}</h3>
                            <p className="text-xs text-muted-foreground mb-2">{doctor.specialty}</p>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="text-xs">
                                {doctor.experience}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-muted-foreground">⭐</span>
                                <span className="text-xs font-medium">{doctor.rating}</span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Date Selection Screen */}
            {currentStep === "date-selection" && selectedDoctor && (
              <div className="h-full flex flex-col">
                <div className="px-6 pt-12 pb-4 bg-gradient-to-b from-emerald-500 to-emerald-600 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={handleBackToDoctorSelection}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h1 className="text-2xl font-bold">Seleccionar Fecha</h1>
                      <p className="text-emerald-100 text-sm">
                        {doctors.find(d => d.id === selectedDoctor)?.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-6">
                  {/* Selected Doctor Info */}
                  <Card className="p-4 bg-card border-border mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                        <Stethoscope className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Médico seleccionado</p>
                        <p className="font-semibold text-sm">
                          {doctors.find(d => d.id === selectedDoctor)?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {doctors.find(d => d.id === selectedDoctor)?.specialty}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Calendar */}
                  <Card className="p-4 bg-card border-border mb-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => date < new Date()}
                      className="w-full"
                    />
                  </Card>

                  {/* Selected Date Display */}
                  {selectedDate && (
                    <Card className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 mb-4">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <div>
                          <p className="text-xs text-muted-foreground">Fecha seleccionada</p>
                          <p className="text-sm font-semibold">
                            {selectedDate.toLocaleDateString('es-ES', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Continue Button */}
                  <Button
                    onClick={handleContinueToDetails}
                    disabled={!selectedDate}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {/* Appointment Details Screen */}
            {currentStep === "appointment-details" && selectedDoctor && selectedDate && (
              <div className="h-full flex flex-col">
                <div className="px-6 pt-12 pb-4 bg-gradient-to-b from-emerald-500 to-emerald-600 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={handleBackToDateSelection}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h1 className="text-2xl font-bold">Detalles de la Cita</h1>
                      <p className="text-emerald-100 text-sm">Describe tu consulta</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-6">
                  {/* Appointment Summary */}
                  <Card className="p-4 bg-card border-border mb-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                          <Stethoscope className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Médico</p>
                          <p className="font-semibold text-sm">
                            {doctors.find(d => d.id === selectedDoctor)?.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                          <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Fecha</p>
                          <p className="font-semibold text-sm">
                            {selectedDate.toLocaleDateString('es-ES', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Notes Textbox */}
                  <Card className="p-4 bg-card border-border mb-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <label className="text-sm font-semibold">
                          ¿Qué te está pasando?
                        </label>
                      </div>
                      <Textarea
                        placeholder="Describe tus síntomas, motivo de consulta o cualquier información relevante..."
                        value={appointmentNotes}
                        onChange={(e) => setAppointmentNotes(e.target.value)}
                        className="min-h-[120px] resize-none bg-background border-border text-foreground"
                      />
                      <p className="text-xs text-muted-foreground">
                        Esta información ayudará al médico a prepararse para tu consulta.
                      </p>
                    </div>
                  </Card>

                  {/* Submit Button */}
                  <Button
                    onClick={handleAppointmentSubmit}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Confirmar Cita
                  </Button>
                </div>
              </div>
            )}

            {/* Estimated Arrival Screen */}
            {currentStep === "estimated-arrival" && selectedDrug && (
              <div className="h-full flex flex-col">
                <div className="px-6 pt-12 pb-4 bg-gradient-to-b from-emerald-500 to-emerald-600 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={handleBackToSelection}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h1 className="text-2xl font-bold">Confirmación</h1>
                      <p className="text-emerald-100 text-sm">Detalles de entrega</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-6">
                  {/* Selected Drug */}
                  <Card className="p-4 bg-card border-border mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">Medicamento seleccionado</p>
                        <p className="font-semibold text-sm">
                          {drugs.find(d => d.id === selectedDrug)?.name}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Estimated Time */}
                  <Card className="p-6 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30 border-emerald-200 dark:border-emerald-800 mb-4">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Clock className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Tiempo estimado de llegada</p>
                      <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                        {drugStore.estimatedTime}
                      </p>
                      <p className="text-xs text-muted-foreground">Tu pedido está en camino</p>
                    </div>
                  </Card>

                  {/* Drug Store Details */}
                  <Card className="p-4 bg-card border-border mb-4">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <Store className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{drugStore.name}</h3>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                            <p className="text-xs text-muted-foreground">{drugStore.address}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Distancia:</span>
                            <Badge variant="outline" className="text-xs">
                              {drugStore.distance}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Teléfono:</span>
                            <span className="text-xs font-medium">{drugStore.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Delivery Status */}
                  <Card className="p-4 bg-card border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                        <Truck className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">Estado del pedido</p>
                        <p className="text-xs text-muted-foreground">Preparando tu pedido...</p>
                      </div>
                      <Badge className="bg-orange-500 text-white">En proceso</Badge>
                    </div>
                  </Card>

                  {/* Action Button */}
                  <div className="mt-6">
                    <Button
                      onClick={handleDrugRequestConfirm}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Confirmar Pedido
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Drug Request Success Screen */}
            {currentStep === "drug-success" && selectedDrug && (
              <div className="h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center px-6">
                  <div className="text-center w-full">
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <CheckCircle2 className="w-16 h-16 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">¡Pedido Confirmado!</h1>
                    <p className="text-muted-foreground mb-6">
                      Tu pedido de <span className="font-semibold text-foreground">
                        {drugs.find(d => d.id === selectedDrug)?.name}
                      </span> ha sido confirmado exitosamente.
                    </p>
                    <Card className="p-4 bg-card border-border mb-6">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Tiempo estimado:</span>
                          <span className="font-semibold">{drugStore.estimatedTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Farmacia:</span>
                          <span className="font-semibold">{drugStore.name}</span>
                        </div>
                      </div>
                    </Card>
                    <Button
                      onClick={handleSuccessComplete}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Volver al inicio
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Appointment Success Screen */}
            {currentStep === "appointment-success" && selectedDoctor && selectedDate && (
              <div className="h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center px-6">
                  <div className="text-center w-full">
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <CheckCircle2 className="w-16 h-16 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">¡Cita Confirmada!</h1>
                    <p className="text-muted-foreground mb-6">
                      Tu cita ha sido agendada exitosamente.
                    </p>
                    <Card className="p-4 bg-card border-border mb-6">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3">
                          <Stethoscope className="w-5 h-5 text-emerald-600 shrink-0" />
                          <div className="flex-1 text-left">
                            <p className="text-muted-foreground text-xs">Médico</p>
                            <p className="font-semibold">
                              {doctors.find(d => d.id === selectedDoctor)?.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <CalendarIcon className="w-5 h-5 text-blue-600 shrink-0" />
                          <div className="flex-1 text-left">
                            <p className="text-muted-foreground text-xs">Fecha</p>
                            <p className="font-semibold">
                              {selectedDate.toLocaleDateString('es-ES', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                    <p className="text-xs text-muted-foreground mb-6">
                      Recibirás una notificación recordándote la cita.
                    </p>
                    <Button
                      onClick={handleSuccessComplete}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Volver al inicio
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Main Dashboard */}
            {currentStep === "dashboard" && (
              <>
                {/* Header */}
                <div className="px-6 pt-12 pb-4 bg-gradient-to-b from-emerald-500 to-emerald-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">Hola, María</h1>
                  <p className="text-emerald-100 text-sm">Bienvenida de vuelta</p>
                </div>
                <div className="relative">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="px-4 pt-6 pb-2">
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 bg-card border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Salud</p>
                      <p className="text-lg font-bold">Excelente</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-card border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Actividad</p>
                      <p className="text-lg font-bold">8,234</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Services Section */}
            <div className="px-4 pt-4 pb-2 flex-1 overflow-y-auto">
              <h2 className="text-lg font-semibold mb-3 px-2">Servicios Disponibles</h2>
              
              <div className="space-y-3">
                <Card 
                  className="p-4 bg-card border-border hover:border-emerald-500/50 transition-colors cursor-pointer"
                  onClick={() => setCurrentStep("drug-selection")}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Pill className="w-4 h-4 text-emerald-600" />
                        <h3 className="font-semibold text-sm">Solicitar Medicamento</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Entrega rápida a domicilio
                      </p>
                      <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                        Disponible
                      </Badge>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-card border-border hover:border-emerald-500/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <h3 className="font-semibold text-sm">Monitoreo de Emergencias</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Servicio activo las 24 horas
                      </p>
                      <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                        Activo
                      </Badge>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-card border-border hover:border-emerald-500/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <h3 className="font-semibold text-sm">Historial de Servicios</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        12 servicios este mes
                      </p>
                      <Badge variant="outline" className="text-xs">
                        Ver más
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-3 px-2">Actividad Reciente</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Servicio completado</p>
                      <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Nueva actualización</p>
                      <p className="text-xs text-muted-foreground">Ayer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

                {/* Bottom Navigation */}
                <div className="px-4 pb-6 pt-2 border-t border-border bg-card">
                  <div className="flex items-center justify-around">
                    <button className="flex flex-col items-center gap-1 p-2 text-emerald-600 dark:text-emerald-400">
                      <Home className="w-5 h-5" />
                      <span className="text-xs font-medium">Inicio</span>
                    </button>
                    <button 
                      onClick={handleStartAppointment}
                      className="flex flex-col items-center gap-1 p-2 text-muted-foreground"
                    >
                      <CalendarIcon className="w-5 h-5" />
                      <span className="text-xs">Citas</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-2 text-muted-foreground">
                      <Bell className="w-5 h-5" />
                      <span className="text-xs">Notificaciones</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-2 text-muted-foreground">
                      <User className="w-5 h-5" />
                      <span className="text-xs">Perfil</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

