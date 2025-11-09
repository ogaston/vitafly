"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const pathname = usePathname()
  
  // Don't show footer on customer-dashboard and watch-dashboard routes
  if (pathname === "/customer-dashboard" || pathname === "/watch-dashboard") {
    return null
  }

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-muted-foreground">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <p>&copy; {new Date().getFullYear()} Vitafly. Todos los derechos reservados.</p>
              <div className="flex items-center gap-4">
                <Link href="#" className="hover:text-foreground transition-colors">
                  Política de Privacidad
                </Link>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Términos de Servicio
                </Link>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Contacto
                </Link>
              </div>
            </div>
          </div>
          <Link href="/customer-dashboard">
            <Button variant="default" className="bg-purple-600 hover:bg-purple-700 text-white">
              Demo
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}

