import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/services", label: "SERVICES" },
    { path: "/gallery", label: "GALLERY" },
    { path: "/pricing", label: "PRICING" },
    { path: "/faq", label: "FAQ" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Close menu if scrolling
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      
      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-xl border-b border-border/50 transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0 shadow-sm" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/" data-testid="link-home">
            <div className="flex flex-col cursor-pointer transition-all duration-300 px-4 py-3 rounded-sm hover:bg-muted/30">
              <span className="text-lg font-semibold tracking-wide">ANTHONY RUIZ PHOTOGRAPHY</span>
              <span className="text-[10px] text-muted-foreground tracking-[0.2em] mt-0.5">REAL ESTATE MEDIA</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`text-xs tracking-[0.15em] font-medium transition-all duration-300 ${
                    location === item.path ? "text-foreground bg-muted/40" : "text-muted-foreground"
                  }`}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href="https://listings.anthonyruizphoto.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-book-now"
            >
              <Button variant="default" size="default" className="tracking-[0.1em] text-xs font-medium">
                BOOK NOW
              </Button>
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="flex flex-col p-6 gap-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm tracking-wider ${
                    location === item.path ? "text-primary" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <a
              href="https://listings.anthonyruizphoto.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4"
              data-testid="button-mobile-book-now"
            >
              <Button variant="default" className="w-full">
                BOOK NOW
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
