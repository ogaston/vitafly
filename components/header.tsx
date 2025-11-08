import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">DroneCare Nexus</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/patients">
              <span className="text-sm hover:text-emerald-400 transition-colors cursor-pointer">Pacientes</span>
            </Link>
            <span className="text-sm text-muted-foreground">Emergency Medical Drone Operations Center</span>
          </div>
        </div>
      </div>
    </header>
  )
}
