import Link from "next/link"
import Header from "@/components/header"
import KPIMetrics from "@/components/kpi-metrics"
import DroneMonitor from "@/components/drone-monitor"
import ActiveEmergencies from "@/components/active-emergencies"
import EmergencyForm from "@/components/emergency-form"
import ConnectedServices from "@/components/connected-services"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/patients">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Monitoreo de Pacientes</Button>
            </Link>
          </div>
          <Link href="/live-map">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Ver Mapa en Vivo</Button>
          </Link>
        </div>
        <KPIMetrics />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DroneMonitor />
            <ActiveEmergencies />
          </div>
          <div className="space-y-6">
            <EmergencyForm />
            <ConnectedServices />
          </div>
        </div>
      </div>
    </main>
  )
}
