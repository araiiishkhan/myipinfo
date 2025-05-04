import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, Copy } from "lucide-react";
import { IPInfo } from "@/lib/types";

interface HeroSectionProps {
  ipInfo: IPInfo | null;
  isLoading: boolean;
  onRefresh: () => void;
  onCopy: () => void;
}

export default function HeroSection({ ipInfo, isLoading, onRefresh, onCopy }: HeroSectionProps) {
  return (
    <section className="mb-8">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Your Network & System Information</h1>
        <p className="text-gray-600 mb-6">Get detailed information about your IP address, location, and system specifications.</p>
        
        {/* IP Address Display */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-2">Your Public IP Address</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <div id="ip-container" className="text-3xl font-mono font-bold text-primary technical-data">
                {ipInfo?.ip || "Loading..."}
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={onRefresh} 
                  disabled={isLoading} 
                  className="bg-primary hover:bg-blue-600 text-white"
                >
                  <RefreshCw className="mr-1 h-4 w-4" /> Refresh
                </Button>
                <Button 
                  onClick={onCopy}
                  disabled={!ipInfo?.ip}
                  variant="outline" 
                  className="bg-gray-100 hover:bg-gray-200 text-foreground"
                >
                  <Copy className="mr-1 h-4 w-4" /> Copy
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4 animate-spin"></div>
            <p className="text-gray-600">Fetching your information...</p>
          </div>
        )}
      </div>
    </section>
  );
}
