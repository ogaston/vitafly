import Header from "@/components/header"
import KPIMetrics from "@/components/kpi-metrics"
import DroneMonitor from "@/components/drone-monitor"
import ActiveEmergencies from "@/components/active-emergencies"
import EmergencyForm from "@/components/emergency-form"
import ConnectedServices from "@/components/connected-services"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="p-6 space-y-6">
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
