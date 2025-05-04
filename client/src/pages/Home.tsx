import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InfoCards from "@/components/InfoCards";
import MapSection from "@/components/MapSection";
import ToolsSection from "@/components/ToolsSection";
import InfoSection from "@/components/InfoSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useIpInfo } from "@/hooks/useIpInfo";
import { useSystemInfo } from "@/hooks/useSystemInfo";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const { ipInfo, isLoading, error, refetch } = useIpInfo();
  const systemInfo = useSystemInfo();
  
  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Refreshed",
        description: "Your IP information has been updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error refreshing",
        description: "Failed to update your IP information.",
      });
    }
  };
  
  const handleCopy = () => {
    if (!ipInfo) return;
    
    navigator.clipboard.writeText(ipInfo.ip);
    toast({
      title: "Copied!",
      description: "IP address copied to clipboard.",
    });
  };
  
  // Use useEffect for error toast to avoid re-render loop
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load IP information. Please try again.",
      });
    }
  }, [error, toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-6 flex-grow">
        <HeroSection 
          ipInfo={ipInfo || null} 
          isLoading={isLoading} 
          onRefresh={handleRefresh} 
          onCopy={handleCopy} 
        />
        <InfoCards 
          ipInfo={ipInfo || null} 
          systemInfo={systemInfo} 
          isLoading={isLoading} 
        />
        <MapSection 
          latitude={ipInfo?.latitude} 
          longitude={ipInfo?.longitude} 
          isLoading={isLoading} 
        />
        <ToolsSection />
        <InfoSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
