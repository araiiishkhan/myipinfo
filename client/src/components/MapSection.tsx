import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Grid2x2X } from 'lucide-react';

interface MapSectionProps {
  latitude?: number;
  longitude?: number;
  isLoading: boolean;
}

export default function MapSection({ latitude, longitude, isLoading }: MapSectionProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (isLoading || !latitude || !longitude) return;

    const initMap = async () => {
      if (typeof window !== 'undefined' && mapRef.current) {
        if (!hasInitialized.current) {
          // Import Leaflet only on client side
          const L = (await import('leaflet')).default;
          
          // Import Leaflet CSS
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          link.crossOrigin = '';
          document.head.appendChild(link);
          
          // Initialize map
          leafletMapRef.current = L.map(mapRef.current).setView([latitude, longitude], 13);

          // Add tile layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(leafletMapRef.current);

          // Add marker
          L.marker([latitude, longitude]).addTo(leafletMapRef.current);
          
          hasInitialized.current = true;
        } else if (leafletMapRef.current) {
          // Update existing map
          leafletMapRef.current.setView([latitude, longitude], 13);
          
          // Clear existing markers
          leafletMapRef.current.eachLayer((layer: any) => {
            if (layer instanceof L.Marker) {
              leafletMapRef.current.removeLayer(layer);
            }
          });
          
          // Add new marker
          L.marker([latitude, longitude]).addTo(leafletMapRef.current);
        }
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (leafletMapRef.current && !hasInitialized.current) {
        leafletMapRef.current.remove();
      }
    };
  }, [latitude, longitude, isLoading]);

  return (
    <section className="mb-12">
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-white p-4">
          <div className="flex items-center">
            <Grid2x2X className="h-5 w-5 mr-2" />
            <h2 className="text-lg font-semibold">Your Location Map</h2>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading || !latitude || !longitude ? (
            <div className="flex items-center justify-center aspect-[16/9] bg-gray-100">
              <p className="text-gray-500">Loading map...</p>
            </div>
          ) : (
            <div ref={mapRef} className="aspect-[16/9] bg-gray-100 z-0"></div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
