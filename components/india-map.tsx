"use client"

import { useRef, useEffect } from "react"
import type { CenterSnapshot } from "@/types/dashboard"

interface IndiaMapProps {
  centers: CenterSnapshot[]
}

export function IndiaMap({ centers }: IndiaMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    let destroyed = false

    async function initMap() {
      const mapboxgl = (await import("mapbox-gl")).default
      await import("mapbox-gl/dist/mapbox-gl.css")

      if (destroyed || !mapContainerRef.current) return

      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: process.env.NEXT_PUBLIC_MAPBOX_STYLE || "mapbox://styles/mapbox/light-v11",
        center: [78.5, 20.5],
        zoom: 3.8,
        projection: "mercator",
        attributionControl: false,
        interactive: true,
        pitchWithRotate: false,
        dragRotate: false,
      })

      mapRef.current = map

      map.on("load", () => {
        if (destroyed) return

        // Aggregate centers by location
        interface LocEntry {
          lat: number; lng: number; count: number; totalEmployees: number
          details: { name: string; type: string; city: string; employees: string }[]
        }
        const cityMap = new Map<string, LocEntry>()
        centers.forEach((c) => {
          const key = `${c.lat},${c.lng}`
          if (!cityMap.has(key)) {
            cityMap.set(key, { lat: c.lat, lng: c.lng, count: 0, totalEmployees: 0, details: [] })
          }
          const entry = cityMap.get(key)!
          entry.count++
          entry.totalEmployees += parseInt(c.employeeCount, 10) || 0
          entry.details.push({
            name: c.centerName,
            type: c.centerType,
            city: c.city,
            employees: c.employeeCount,
          })
        })

        const geojson: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: Array.from(cityMap.values()).map((loc) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [loc.lng, loc.lat],
            },
            properties: {
              city: loc.details[0].city,
              centerCount: loc.count,
              totalEmployees: loc.totalEmployees,
              details: JSON.stringify(loc.details),
            },
          })),
        }

        map.addSource("centers", {
          type: "geojson",
          data: geojson,
        })

        // Outer glow circle — sized by center count
        map.addLayer({
          id: "center-glow",
          type: "circle",
          source: "centers",
          paint: {
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", "centerCount"],
              1, 30,
              2, 40,
              3, 48,
              4, 55,
              5, 60,
              6, 65,
            ],
            "circle-color": "#F17C1D",
            "circle-opacity": 0.15,
          },
        })

        // Main circle — sized by center count
        map.addLayer({
          id: "center-circles",
          type: "circle",
          source: "centers",
          paint: {
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", "centerCount"],
              1, 16,
              2, 22,
              3, 27,
              4, 31,
              5, 34,
              6, 37,
            ],
            "circle-color": "#F17C1D",
            "circle-opacity": 0.9,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        })

        // Labels — show center count
        map.addLayer({
          id: "center-labels",
          type: "symbol",
          source: "centers",
          layout: {
            "text-field": ["to-string", ["get", "centerCount"]],
            "text-size": 14,
            "text-font": ["DIN Pro Bold", "Arial Unicode MS Bold"],
            "text-allow-overlap": true,
          },
          paint: {
            "text-color": "#ffffff",
          },
        })

        // Fit bounds to show all points with padding
        const points = Array.from(cityMap.values())
        if (points.length > 1) {
          const bounds = new mapboxgl.LngLatBounds()
          points.forEach((p) => bounds.extend([p.lng, p.lat]))
          map.fitBounds(bounds, { padding: 80, maxZoom: 6 })
        } else if (points.length === 1) {
          map.flyTo({ center: [points[0].lng, points[0].lat], zoom: 5.5 })
        }

        // Tooltip on hover
        const popup = new mapboxgl.Popup({
          offset: 20,
          closeButton: false,
          closeOnClick: false,
          maxWidth: "280px",
        })

        map.on("mouseenter", "center-circles", (e: any) => {
          map.getCanvas().style.cursor = "pointer"
          if (!e.features?.length) return

          const props = e.features[0].properties
          const coords = e.features[0].geometry.coordinates.slice()
          popup
            .setLngLat(coords)
            .setHTML(`
              <div style="font-family: Google Sans, system-ui, sans-serif; padding: 2px 0;">
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F17C1D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span style="font-weight: 700; font-size: 14px; color: #0f172a;">${props.city}</span>
                </div>
                <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 500;">
                  ${props.centerCount} Center${props.centerCount > 1 ? "s" : ""} &middot; ${props.totalEmployees} Total Employees
                </div>
              </div>
            `)
            .addTo(map)
        })

        map.on("mouseleave", "center-circles", () => {
          map.getCanvas().style.cursor = ""
          popup.remove()
        })
      })
    }

    initMap()

    return () => {
      destroyed = true
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [centers])

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ minHeight: "280px" }}
    />
  )
}
