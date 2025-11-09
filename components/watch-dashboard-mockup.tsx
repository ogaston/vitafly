"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  Activity, 
  Clock, 
  Flame,
  Footprints,
  Battery,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  X
} from "lucide-react"

type WatchStep = "stats" | "help-confirm" | "help-success"

export default function WatchDashboardMockup() {
  const [currentStep, setCurrentStep] = useState<WatchStep>("stats")
  const stats = [
    { 
      icon: Heart, 
      label: "Ritmo Cardíaco", 
      value: "72", 
      unit: "bpm",
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900/30"
    },
    { 
      icon: Activity, 
      label: "Pasos", 
      value: "8,234", 
      unit: "",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30"
    },
    { 
      icon: Flame, 
      label: "Calorías", 
      value: "1,245", 
      unit: "kcal",
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900/30"
    },
    { 
      icon: Footprints, 
      label: "Distancia", 
      value: "5.2", 
      unit: "km",
      color: "text-emerald-500",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30"
    },
    { 
      icon: Clock, 
      label: "Tiempo Activo", 
      value: "2h 15m", 
      unit: "",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/30"
    },
    { 
      icon: Battery, 
      label: "Batería", 
      value: "85", 
      unit: "%",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30"
    },
  ]

  return (
    <div className="relative flex items-start justify-center">
    <img src="/watch-mockup.png" alt="Vitafly" style={{
        width: "380px",
        position: "fixed",
        zIndex: "1",
        top: "130px",
    }} />
      {/* Watch Mockup Frame */}
      <div 
        className="relative rounded-[3rem] border-[12px] border-slate-300 dark:border-slate-700 bg-black shadow-2xl"
        style={{
          width: "340px",
          height: "400px",
          position: "fixed",
          zIndex: 1,
          top: "230px",
        }}
      >
        {/* Watch Crown */}
        <div 
          className="absolute right-[-8px] top-[80px] w-[6px] h-[40px] bg-slate-400 dark:bg-slate-600 rounded-full"
        />
      </div>

      {/* Content Inside Watch */}
      <div 
        className="relative rounded-[2.5rem] bg-gradient-to-b from-slate-900 to-black z-10 overflow-hidden"
        style={{
          width: "316px",
          height: "376px",
          marginTop: "12px",
          top: "200px",
        }}
      >
        <div className="h-full flex flex-col p-4">
          {/* Stats View */}
          {currentStep === "stats" && (
            <>
              {/* Stats Grid */}
              <div className="flex-1 grid grid-cols-2 gap-2 overflow-y-auto mb-3">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <Card 
                      key={index}
                      className="p-3 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div className="text-center">
                          <p className="text-white/60 text-[10px] mb-1">{stat.label}</p>
                          <div className="flex items-baseline justify-center gap-1">
                            <p className="text-white text-lg font-bold">{stat.value}</p>
                            {stat.unit && (
                              <p className="text-white/70 text-xs">{stat.unit}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>

              {/* Help Button */}
              <Button
                onClick={() => setCurrentStep("help-confirm")}
                className="w-full bg-red-600 hover:bg-red-700 text-white mb-3 h-12 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-5 h-5" />
                Solicitar Ayuda
              </Button>

              {/* Bottom Status Bar */}
              <div className="pt-3 border-t border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-white/70 text-xs">Objetivo: 10k pasos</span>
                  </div>
                  <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: "82%" }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Help Confirmation Screen */}
          {currentStep === "help-confirm" && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-white text-xl font-bold text-center">¿Necesitas Ayuda?</h2>
              <p className="text-white/70 text-sm text-center px-4">
                Se enviará una alerta de emergencia con tu ubicación actual
              </p>
              <div className="flex gap-3 w-full mt-4">
                <Button
                  onClick={() => setCurrentStep("stats")}
                  variant="outline"
                  className="flex-1 bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700/50 h-12 rounded-xl"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  onClick={() => setCurrentStep("help-success")}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white h-12 rounded-xl font-semibold"
                >
                  Confirmar
                </Button>
              </div>
            </div>
          )}

          {/* Help Success Screen */}
          {currentStep === "help-success" && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
              <h2 className="text-white text-xl font-bold text-center">¡Ayuda Enviada!</h2>
              <p className="text-white/70 text-sm text-center px-4">
                Tu solicitud de ayuda ha sido enviada. El equipo de emergencias está en camino.
              </p>
              <Card className="p-4 bg-slate-800/50 border-slate-700/50 w-full mt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Estado:</span>
                    <span className="text-emerald-400 font-semibold">En camino</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Tiempo estimado:</span>
                    <span className="text-white font-semibold">5-8 min</span>
                  </div>
                </div>
              </Card>
              <Button
                onClick={() => setCurrentStep("stats")}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-4 h-12 rounded-xl"
              >
                Volver
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

