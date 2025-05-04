import { Card, CardContent } from "@/components/ui/card";
import { Info, HelpCircle } from "lucide-react";

export default function InfoSection() {
  return (
    <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* What is an IP address? */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Info className="text-primary mr-2 h-5 w-5" />
          What is an IP Address?
        </h3>
        <CardContent className="p-0">
          <p className="text-gray-600 mb-3">An IP (Internet Protocol) address is a unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication.</p>
          <p className="text-gray-600">Your IP address serves as your online identity, allowing websites and services to send information back to your device.</p>
        </CardContent>
      </Card>
      
      {/* Why Check Your IP? */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <HelpCircle className="text-accent mr-2 h-5 w-5" />
          Why Check Your IP Information?
        </h3>
        <CardContent className="p-0">
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Verify your VPN is working correctly</li>
            <li>Troubleshoot network connection issues</li>
            <li>Check for potential geolocation-based restrictions</li>
            <li>Understand what information websites can see about you</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
