import { useState } from "react";
import { Link } from "wouter";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Radar } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Radar className="text-primary text-2xl mr-2" />
          <h1 className="text-xl font-bold text-foreground">IP<span className="text-primary">Info</span></h1>
        </div>
        <nav>
          <ul className="hidden md:flex space-x-6">
            <li><Link href="/" className="text-foreground hover:text-primary transition-colors">Home</Link></li>
            <li><a href="#tools" className="text-foreground hover:text-primary transition-colors">Tools</a></li>
            <li><a href="#about" className="text-foreground hover:text-primary transition-colors">About</a></li>
          </ul>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden text-foreground" aria-label="Menu">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
                <a href="#tools" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Tools</a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>About</a>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
