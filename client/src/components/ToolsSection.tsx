import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { IPInfo } from "@/lib/types";

export default function ToolsSection() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'ip' | 'dns'>('ip');
  const [ipLookupInput, setIpLookupInput] = useState("");
  const [ipLookupResult, setIpLookupResult] = useState<IPInfo | null>(null);
  const [showIpResults, setShowIpResults] = useState(false);
  
  const [dnsLookupInput, setDnsLookupInput] = useState("");
  const [dnsRecordType, setDnsRecordType] = useState("A");
  const [dnsLookupResult, setDnsLookupResult] = useState<string[]>([]);
  const [showDnsResults, setShowDnsResults] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);

  const handleIpLookup = async () => {
    if (!ipLookupInput.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter an IP address"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await apiRequest("GET", `/api/ip-lookup?ip=${ipLookupInput}`);
      const data = await res.json();
      setIpLookupResult(data);
      setShowIpResults(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to lookup IP information."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDnsLookup = async () => {
    if (!dnsLookupInput.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a domain name"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await apiRequest("GET", `/api/dns-lookup?domain=${dnsLookupInput}&type=${dnsRecordType}`);
      const data = await res.json();
      setDnsLookupResult(data.results);
      setShowDnsResults(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to lookup DNS information."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="tools" className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Network Tools</h2>
      
      <Card>
        <div className="border-b">
          <div className="flex">
            <button 
              onClick={() => setActiveTab('ip')}
              className={`px-6 py-3 font-medium focus:outline-none ${activeTab === 'ip' ? 'tab-active' : 'text-gray-500 hover:text-foreground'}`}
            >
              IP Lookup
            </button>
            <button 
              onClick={() => setActiveTab('dns')}
              className={`px-6 py-3 font-medium focus:outline-none ${activeTab === 'dns' ? 'tab-active' : 'text-gray-500 hover:text-foreground'}`}
            >
              DNS Lookup
            </button>
          </div>
        </div>
        
        {/* IP Lookup Tool */}
        <CardContent className={`p-6 ${activeTab !== 'ip' ? 'hidden' : ''}`}>
          <p className="text-gray-600 mb-4">Check information about any IP address. Enter an IP address to get detailed information.</p>
          
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <Input 
              type="text" 
              placeholder="Enter an IP address (e.g., 8.8.8.8)" 
              value={ipLookupInput}
              onChange={(e) => setIpLookupInput(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleIpLookup}
              disabled={isLoading}
              className="bg-primary hover:bg-blue-600 text-white"
            >
              {isLoading ? "Loading..." : "Lookup"}
            </Button>
          </div>
          
          {showIpResults && ipLookupResult && (
            <div className="border rounded-md p-4 bg-gray-50">
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">IP Address</div>
                <div className="font-mono font-medium">{ipLookupResult.ip}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Location</div>
                  <div>{ipLookupResult.city}, {ipLookupResult.region}, {ipLookupResult.country}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Organization</div>
                  <div>{ipLookupResult.org || "N/A"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">ISP</div>
                  <div>{ipLookupResult.isp || "N/A"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Timezone</div>
                  <div>{ipLookupResult.timezone || "N/A"}</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        {/* DNS Lookup Tool */}
        <CardContent className={`p-6 ${activeTab !== 'dns' ? 'hidden' : ''}`}>
          <p className="text-gray-600 mb-4">Look up DNS records for any domain. Enter a domain name to get its DNS information.</p>
          
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <Input 
              type="text" 
              placeholder="Enter a domain (e.g., example.com)" 
              value={dnsLookupInput}
              onChange={(e) => setDnsLookupInput(e.target.value)}
              className="flex-1"
            />
            <Select
              value={dnsRecordType}
              onValueChange={setDnsRecordType}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Record Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="AAAA">AAAA</SelectItem>
                <SelectItem value="CNAME">CNAME</SelectItem>
                <SelectItem value="MX">MX</SelectItem>
                <SelectItem value="TXT">TXT</SelectItem>
                <SelectItem value="NS">NS</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={handleDnsLookup}
              disabled={isLoading}
              className="bg-primary hover:bg-blue-600 text-white"
            >
              {isLoading ? "Loading..." : "Lookup"}
            </Button>
          </div>
          
          {showDnsResults && (
            <div className="border rounded-md p-4 bg-gray-50">
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Domain</div>
                <div className="font-mono font-medium">{dnsLookupInput}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Record Type</div>
                <div className="font-mono">{dnsRecordType}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Results</div>
                <div className="font-mono bg-gray-100 p-3 rounded">
                  {dnsLookupResult.length > 0 ? (
                    dnsLookupResult.map((result, index) => (
                      <div key={index}>{result}</div>
                    ))
                  ) : (
                    <div>No records found</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
