import Link from "next/link"
import Header from "@/components/header"
import PatientList from "@/components/patient-list"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PatientsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="p-6 space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Volver al Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Monitoreo de Pacientes con Wearables</h1>
          <div />
        </div>

        {/* Patient List with Details */}
        <PatientList />

        {/* Graphs will be rendered inside PatientList when patient is selected */}
      </div>
    </main>
  )
}
