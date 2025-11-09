import Header from "@/components/header"
import DroneLiveMap from "@/components/drone-live-map"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default function LiveMapPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Rastreo en Vivo</h2>
          <Link href="/">
            <Button variant="outline" className="bg-transparent">
              Volver al Dashboard
            </Button>
          </Link>
        </div>
        <DroneLiveMap />
      </div>
    </main>
  )
}
