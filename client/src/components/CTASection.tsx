import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section id="about" className="mb-12">
      <div className="bg-primary bg-opacity-10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-primary">About IPInfo</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          IPInfo provides accurate and reliable information about IP addresses, network details, and system specifications. 
          Our tools help users understand their online presence and troubleshoot connection issues.
        </p>
        <Button className="bg-primary hover:bg-blue-600 text-white font-medium">
          Learn More
        </Button>
      </div>
    </section>
  );
}
