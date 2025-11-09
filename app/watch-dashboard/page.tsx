import WatchDashboardMockup from "@/components/watch-dashboard-mockup"
import Link from "next/link"
import { Smartphone, Home } from "lucide-react"

export default function WatchDashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-start justify-center p-8 pt-8 relative">
      <Link 
        href="/"
        className="absolute top-8 left-8 text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2 opacity-60 hover:opacity-100"
      >
        <Home className="w-4 h-4" />
        <span>Dashboard Principal</span>
      </Link>
      <Link 
        href="/customer-dashboard"
        className="absolute top-8 right-8 text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2 opacity-60 hover:opacity-100"
      >
        <Smartphone className="w-4 h-4" />
        <span>Ver App</span>
      </Link>
      <WatchDashboardMockup />
    </main>
  )
}

