"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
export default function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b border-border bg-card">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg  flex items-center justify-center">
              <Image src="/logo.png" alt="Vitafly" width={40} height={40} />    
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">Vitafly</h1>
              <p className="text-xs text-muted-foreground">Centro de Control y Monitoreo</p>
            </div>
          </Link>
          <nav className="flex items-center gap-1">
            <Link 
              href="/patients" 
              className={cn(
                "px-4 py-2 text-sm font-medium text-foreground hover:text-purple-600 rounded-md transition-colors relative",
                pathname === "/patients" && "text-purple-600"
              )}
            >
              Monitoreo de Pacientes
              {pathname === "/patients" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />
              )}
            </Link>
            <Link 
              href="/notifications" 
              className={cn(
                "px-4 py-2 text-sm font-medium text-foreground hover:text-purple-600 rounded-md transition-colors relative",
                pathname === "/notifications" && "text-purple-600"
              )}
            >
              Notificaciones Predictivas
              {pathname === "/notifications" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />
              )}
            </Link>
            <Link 
              href="/live-map" 
              className={cn(
                "px-4 py-2 text-sm font-medium text-foreground hover:text-purple-600 rounded-md transition-colors relative",
                pathname === "/live-map" && "text-purple-600"
              )}
            >
              Ver Mapa en Vivo
              {pathname === "/live-map" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
