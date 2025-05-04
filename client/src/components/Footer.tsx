import { Link } from "wouter";
import { Radar } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Radar className="text-primary text-xl mr-2" />
              <span className="text-lg font-bold text-foreground">IP<span className="text-primary">Info</span></span>
            </div>
            <p className="text-gray-500 text-sm mt-2">© {new Date().getFullYear()} IPInfo. All rights reserved.</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h3 className="font-semibold mb-2">Tools</h3>
              <ul className="text-gray-500 space-y-1">
                <li><a href="#tools" className="hover:text-primary transition-colors">IP Lookup</a></li>
                <li><a href="#tools" className="hover:text-primary transition-colors">DNS Lookup</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Traceroute</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="text-gray-500 space-y-1">
                <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
