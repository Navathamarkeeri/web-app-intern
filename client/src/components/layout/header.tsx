import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", active: location === "/" },
    { href: "/features", label: "Features", active: location === "/features" },
    { href: "/pricing", label: "Pricing", active: location === "/pricing" },
    { href: "/jobs", label: "Jobs", active: location === "/jobs" },
    { href: "/about", label: "About", active: location === "/about" },
  ];

  return (
    <header className="border-b border-border bg-card" data-testid="header">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" data-testid="link-home">
              <div className="flex items-center space-x-2 cursor-pointer">
                <i className="fas fa-robot text-primary text-2xl"></i>
                <h1 className="text-xl font-bold text-foreground">AI InternMatch</h1>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replace(' ', '-')}`}>
                <span className={`transition-colors cursor-pointer ${
                  item.active 
                    ? "text-primary font-medium" 
                    : "text-muted-foreground hover:text-primary"
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/profile">
              <Button data-testid="button-profile">
                <i className="fas fa-user mr-2"></i>
                Profile
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">
                <i className="fas fa-paper-plane mr-2"></i>
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
