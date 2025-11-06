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
      className={`fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-xl border-b border-primary/10 transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0 shadow-sm" : "-translate-y-full"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          <Link href="/" data-testid="link-home">
            <div 
              className="flex flex-col cursor-pointer transition-all duration-300 px-4 py-3 rounded-sm hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground focus-visible:ring-offset-2"
              tabIndex={0}
              role="link"
              aria-label="Anthony Ruiz Photography - Return to homepage"
            >
              <span className="text-xl font-bold tracking-wide text-foreground">ANTHONY RUIZ PHOTOGRAPHY</span>
              <span className="text-xs text-muted-foreground tracking-[0.2em] mt-1">REAL ESTATE MEDIA</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-3" aria-label="Main navigation" role="navigation">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm tracking-[0.1em] font-bold transition-all duration-300 ${
                    location === item.path ? "text-foreground bg-muted border-foreground" : "text-foreground"
                  }`}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={location === item.path ? "page" : undefined}
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
              aria-label="Book a photography shoot - Opens in new window"
            >
              <Button variant="default" size="default" className="tracking-[0.08em] text-sm font-bold">
                BOOK NOW
              </Button>
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div 
          className="lg:hidden bg-background border-t border-border" 
          id="mobile-navigation"
          role="navigation"
          aria-label="Mobile navigation menu"
        >
          <nav className="flex flex-col p-6 gap-3">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  size="default"
                  className={`w-full justify-start text-base tracking-wide font-bold ${
                    location === item.path ? "text-foreground bg-muted border-foreground" : "text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={location === item.path ? "page" : undefined}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <a
              href="https://listings.anthonyruizphoto.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6"
              data-testid="button-mobile-book-now"
              aria-label="Book a photography shoot - Opens in new window"
            >
              <Button variant="default" size="lg" className="w-full tracking-[0.08em] font-bold">
                BOOK NOW
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
