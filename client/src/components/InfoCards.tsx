import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Globe, Map, Cpu } from "lucide-react";
import { IPInfo } from "@/lib/types";
import { SystemInfo } from "@/hooks/useSystemInfo";
import { Skeleton } from "@/components/ui/skeleton";

interface InfoCardsProps {
  ipInfo: IPInfo | null;
  systemInfo: SystemInfo;
  isLoading: boolean;
}

export default function InfoCards({ ipInfo, systemInfo, isLoading }: InfoCardsProps) {
  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Geolocation Card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-primary text-white p-4">
            <div className="flex items-center">
              <Map className="h-5 w-5 mr-2" />
              <h2 className="text-lg font-semibold">Location Information</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="mb-1 text-sm text-gray-500">Country</div>
              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : (
                <div className="flex items-center">
                  {ipInfo?.country_code && (
                    <img 
                      src={`https://flagcdn.com/w40/${ipInfo.country_code.toLowerCase()}.png`} 
                      alt={`${ipInfo.country} flag`} 
                      className="mr-2 w-5 h-auto" 
                    />
                  )}
                  <span className="font-medium technical-data">{ipInfo?.country || "Unknown"}</span>
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="mb-1 text-sm text-gray-500">City / Region</div>
              {isLoading ? (
                <Skeleton className="h-6 w-40" />
              ) : (
                <span className="font-medium technical-data">
                  {ipInfo?.city ? `${ipInfo.city}, ${ipInfo.region || ""}` : "Unknown"}
                </span>
              )}
            </div>
            <div className="mb-4">
              <div className="mb-1 text-sm text-gray-500">Timezone</div>
              {isLoading ? (
                <Skeleton className="h-6 w-36" />
              ) : (
                <span className="font-medium technical-data">{ipInfo?.timezone || "Unknown"}</span>
              )}
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-500">Postal Code</div>
              {isLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                <span className="font-medium technical-data">{ipInfo?.postal || "Unknown"}</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Network Card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-secondary text-white p-4">
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              <h2 className="text-lg font-semibold">Network Information</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="mb-1 text-sm text-gray-500">ISP</div>
              {isLoading ? (
                <Skeleton className="h-6 w-48" />
              ) : (
                <span className="font-medium technical-data">{ipInfo?.isp || "Unknown"}</span>
              )}
            </div>
            <div className="mb-4">
              <div className="mb-1 text-sm text-gray-500">Organization</div>
              {isLoading ? (
                <Skeleton className="h-6 w-40" />
              ) : (
                <span className="font-medium technical-data">{ipInfo?.org || "Unknown"}</span>
              )}
            </div>
            <div className="mb-4">
              <div className="mb-1 text-sm text-gray-500">ASN</div>
              {isLoading ? (
                <Skeleton className="h-6 w-24" />
              ) : (
                <span className="font-medium technical-data">{ipInfo?.asn || "Unknown"}</span>
              )}
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-500">Connection Type</div>
              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : (
                <span className="font-medium technical-data">{ipInfo?.connection_type || "Unknown"}</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-accent text-white p-4">
            <div className="flex items-center">
              <Cpu className="h-5 w-5 mr-2" />
              <h2 className="text-lg font-semibold">System Information</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="mb-1 text-sm text-gray-500">Browser</div>
              <span className="font-medium technical-data">{systemInfo.browser}</span>
            </div>
            <div className="mb-4">
              <div className="mb-1 text-sm text-gray-500">Operating System</div>
              <span className="font-medium technical-data">{systemInfo.os}</span>
            </div>
            <div className="mb-4">
              <div className="mb-1 text-sm text-gray-500">Device</div>
              <span className="font-medium technical-data">{systemInfo.device}</span>
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-500">Screen Resolution</div>
              <span className="font-medium technical-data">{systemInfo.resolution}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
