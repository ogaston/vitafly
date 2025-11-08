"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"
import dynamic from "next/dynamic"
import L from "leaflet"

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false })

// Component to fit map bounds - must be inside MapContainer
const MapBoundsFitter = dynamic(
  () =>
    Promise.all([import("react-leaflet"), import("react")]).then(([leafletMod, reactMod]) => {
      const { useMap } = leafletMod
      const { useEffect } = reactMod
      return function MapBoundsFitter({ drones }: { drones: Drone[] }) {
        const map = useMap()
        useEffect(() => {
          if (drones.length > 0) {
            const bounds = L.latLngBounds(
              drones.map((drone) => [drone.latitude, drone.longitude] as [number, number])
            )
            map.fitBounds(bounds.pad(0.1))
          }
        }, [map, drones])
        return null
      }
    }),
  { ssr: false }
)

interface Drone {
  id: string
  status: string
  battery: number
  zone: string
  mission: string
  latitude: number
  longitude: number
}

interface Emergency {
  id: string
  droneId: string
  patientName: string
  pickupLat: number
  pickupLng: number
  deliveryLat: number
  deliveryLng: number
  type: string
  status: string
}

// Bogotá coordinates (approximately center of the city)
const BOGOTA_CENTER: [number, number] = [4.7110, -74.0721]

// Custom drone icon
const createDroneIcon = (isActive: boolean, battery: number) => {
  const color = isActive ? "#10b981" : "#3b82f6"
  const batteryColor = battery > 70 ? "#10b981" : battery > 40 ? "#eab308" : "#ef4444"
  
  return L.divIcon({
    className: "custom-drone-icon",
    html: `
      <div style="position: relative;">
        <svg width="30" height="30" viewBox="0 0 30 30" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
          <polygon points="15,5 8,20 22,20" fill="${color}" stroke="white" stroke-width="1.5"/>
          <circle cx="15" cy="15" r="4" fill="white"/>
          <rect x="5" y="2" width="20" height="3" fill="none" stroke="#666" stroke-width="1" rx="1"/>
          <rect x="5" y="2" width="${(battery / 100) * 20}" height="3" fill="${batteryColor}" rx="1"/>
        </svg>
        <div style="position: absolute; top: 25px; left: 50%; transform: translateX(-50%); 
                    background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; 
                    border-radius: 4px; font-size: 10px; font-weight: bold; white-space: nowrap;">
        </div>
      </div>
    `,
    iconSize: [30, 35],
    iconAnchor: [15, 20],
  })
}


export default function DroneLiveMap() {
  const [drones] = useState<Drone[]>([
    {
      id: "DR-001",
      status: "En misión",
      battery: 92,
      zone: "Zone A",
      mission: "Cardíaca",
      latitude: 4.7110,
      longitude: -74.0721,
    },
    {
      id: "DR-002",
      status: "En espera",
      battery: 87,
      zone: "Zone B",
      mission: "Standby",
      latitude: 4.7258,
      longitude: -74.0541,
    },
    {
      id: "DR-003",
      status: "En misión",
      battery: 78,
      zone: "Zone C",
      mission: "Trauma",
      latitude: 4.6580,
      longitude: -74.0855,
    },
    {
      id: "DR-004",
      status: "En mantenimiento",
      battery: 45,
      zone: "Maintenance",
      mission: "N/A",
      latitude: 4.7489,
      longitude: -74.0680,
    },
    {
      id: "DR-005",
      status: "En espera",
      battery: 94,
      zone: "Zone A",
      mission: "Standby",
      latitude: 4.7505,
      longitude: -74.0900,
    },
    {
      id: "DR-006",
      status: "En misión",
      battery: 65,
      zone: "Zone D",
      mission: "Psicológica",
      latitude: 4.7614,
      longitude: -74.0776,
    },
  ])

  const [emergencies] = useState<Emergency[]>([
    {
      id: "EMG-001",
      droneId: "DR-001",
      patientName: "Juan García",
      pickupLat: 4.7110,
      pickupLng: -74.0721,
      deliveryLat: 4.7260,
      deliveryLng: -74.0597,
      type: "Cardíaca",
      status: "En ruta",
    },
    {
      id: "EMG-003",
      droneId: "DR-006",
      patientName: "Carlos Ruiz",
      pickupLat: 4.7614,
      pickupLng: -74.0776,
      deliveryLat: 4.7489,
      deliveryLng: -74.0680,
      type: "Psicológica",
      status: "En ruta",
    },
  ])

  const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getStatusColor = (status: string) => {
    if (status === "En misión") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
    if (status === "En espera") return "bg-blue-500/10 text-blue-400 border-blue-500/30"
    return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
  }

  const getTypeColor = (type: string) => {
    if (type === "Cardíaca") return "text-red-400"
    if (type === "Trauma") return "text-orange-400"
    return "text-purple-400"
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return (R * c * 1000).toFixed(0)
  }

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-card border-border p-6 h-[600px] overflow-hidden flex items-center justify-center">
              <p className="text-muted-foreground">Cargando mapa...</p>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border p-6 h-[600px] overflow-hidden">
            <h2 className="text-xl font-bold mb-4">Mapa de Drones en Vivo</h2>
            <div className="w-full h-[520px] rounded-lg border border-border/50 overflow-hidden">
              <MapContainer
                center={BOGOTA_CENTER}
                zoom={12}
                style={{ height: "100%", width: "100%", zIndex: 0 }}
                scrollWheelZoom={true}
              >
                {/* Bogotá Mapas Base Layer - Using OpenStreetMap as base, can be replaced with Bogotá WMS/WMTS */}
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Datos de Bogotá: <a href="https://mapas.bogota.gov.co">Mapas Bogotá</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Alternative: If you have the Bogotá WMS/WMTS endpoint, use this instead:
                <WMSTileLayer
                  url="BOGOTA_WMS_ENDPOINT_URL"
                  layers="LAYER_NAME"
                  format="image/png"
                  transparent={true}
                />
                */}
                
                <MapBoundsFitter drones={drones} />

                {/* Emergency routes */}
                {emergencies.map((emergency) => {
                  const route = [
                    [emergency.pickupLat, emergency.pickupLng] as [number, number],
                    [emergency.deliveryLat, emergency.deliveryLng] as [number, number],
                  ]
                  return (
                    <div key={`route-${emergency.id}`}>
                      <Polyline
                        positions={route}
                        pathOptions={{
                          color: "#4ade80",
                          weight: 3,
                          opacity: 0.6,
                          dashArray: "10, 5",
                        }}
                      />
                      {/* Delivery point */}
                      <Marker
                        position={[emergency.deliveryLat, emergency.deliveryLng]}
                        icon={L.divIcon({
                          className: "custom-delivery-icon",
                          html: `<div style="width: 16px; height: 16px; border-radius: 50%; 
                                       border: 3px solid #3b82f6; background: rgba(59, 130, 246, 0.3);"></div>`,
                          iconSize: [16, 16],
                          iconAnchor: [8, 8],
                        })}
                      >
                        <Popup>
                          <div className="text-sm">
                            <p className="font-semibold">Destino</p>
                            <p className="text-xs text-muted-foreground">{emergency.patientName}</p>
                          </div>
                        </Popup>
                      </Marker>
                    </div>
                  )
                })}

                {/* Drone markers */}
                {drones.map((drone) => {
                  const isActive = drone.status === "En misión"
                  const emergency = emergencies.find((e) => e.droneId === drone.id)
                  
                  return (
                    <Marker
                      key={drone.id}
                      position={[drone.latitude, drone.longitude]}
                      icon={createDroneIcon(isActive, drone.battery)}
                      eventHandlers={{
                        click: () => setSelectedDrone(drone),
                      }}
                    >
                      <Popup>
                        <div className="text-sm space-y-1">
                          <p className="font-bold text-emerald-400">{drone.id}</p>
                          <p className="text-xs">
                            <span className="font-semibold">Estado:</span> {drone.status}
                          </p>
                          <p className="text-xs">
                            <span className="font-semibold">Batería:</span> {drone.battery}%
                          </p>
                          <p className="text-xs">
                            <span className="font-semibold">Zona:</span> {drone.zone}
                          </p>
                          <p className="text-xs">
                            <span className="font-semibold">Misión:</span> {drone.mission}
                          </p>
                          {emergency && (
                            <div className="mt-2 pt-2 border-t border-border">
                              <p className="text-xs font-semibold text-red-400">Emergencia Activa</p>
                              <p className="text-xs">{emergency.patientName}</p>
                              <p className="text-xs text-muted-foreground">
                                Distancia:{" "}
                                {calculateDistance(
                                  drone.latitude,
                                  drone.longitude,
                                  emergency.deliveryLat,
                                  emergency.deliveryLng,
                                )}{" "}
                                m
                              </p>
                            </div>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  )
                })}
              </MapContainer>
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Selected Drone Info */}
          {selectedDrone ? (
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-bold mb-4">Detalles del Dron</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">ID Dron</p>
                  <p className="text-lg font-mono font-bold text-emerald-400">{selectedDrone.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Estado</p>
                  <Badge className={`${getStatusColor(selectedDrone.status)} border`}>{selectedDrone.status}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Batería</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-background rounded h-2">
                      <div
                        className={`h-full rounded ${selectedDrone.battery > 70 ? "bg-emerald-500" : selectedDrone.battery > 40 ? "bg-yellow-500" : "bg-red-500"}`}
                        style={{ width: `${selectedDrone.battery}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-semibold">{selectedDrone.battery}%</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Zona</p>
                  <p className="font-medium">{selectedDrone.zone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Misión</p>
                  <p className="font-medium">{selectedDrone.mission}</p>
                </div>

                {emergencies.find((e) => e.droneId === selectedDrone.id) && (
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="flex items-start gap-2 mb-3 p-2 bg-background rounded">
                      <AlertCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Emergencia Activa</p>
                        <p className="text-sm font-semibold">
                          {emergencies.find((e) => e.droneId === selectedDrone.id)?.id}
                        </p>
                      </div>
                    </div>
                    {emergencies
                      .filter((e) => e.droneId === selectedDrone.id)
                      .map((e) => (
                        <div key={e.id} className="text-sm space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Paciente</p>
                            <p className="font-medium">{e.patientName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Tipo</p>
                            <p className={`font-medium ${getTypeColor(e.type)}`}>{e.type}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Distancia a Destino</p>
                            <p className="font-mono font-semibold text-blue-400">
                              {calculateDistance(
                                selectedDrone.latitude,
                                selectedDrone.longitude,
                                e.deliveryLat,
                                e.deliveryLng,
                              )}{" "}
                              m
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card className="bg-card border-border p-6">
              <p className="text-muted-foreground text-sm">Haz clic en un dron en el mapa para ver los detalles</p>
            </Card>
          )}

          {/* Drone List */}
          <Card className="bg-card border-border p-6">
            <h3 className="text-lg font-bold mb-4">Flota de Drones</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {drones.map((drone) => (
                <div
                  key={drone.id}
                  onClick={() => setSelectedDrone(drone)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedDrone?.id === drone.id ? "border-emerald-500/50 bg-background" : "border-border hover:border-emerald-500/30"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-emerald-400">{drone.id}</span>
                    <Badge className={`${getStatusColor(drone.status)} border text-xs`}>{drone.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{drone.mission}</span>
                    <span
                      className={
                        drone.battery > 70
                          ? "text-emerald-400"
                          : drone.battery > 40
                            ? "text-yellow-400"
                            : "text-red-400"
                      }
                    >
                      {drone.battery}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
