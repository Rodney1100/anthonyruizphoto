import { Link } from "wouter";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/30 mt-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <div className="flex flex-col mb-8">
              <span className="text-lg font-semibold tracking-wide">ANTHONY RUIZ PHOTOGRAPHY</span>
              <span className="text-[10px] text-muted-foreground tracking-[0.2em] mt-1">REAL ESTATE MEDIA</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed" style={{ letterSpacing: "0.01em" }}>
              Professional real estate photography and video services in South Florida. 24-hour
              turnaround, competitive pricing, and Part 107 certified drone pilot.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold uppercase tracking-[0.15em] mb-8">Quick Links</h3>
            <nav className="flex flex-col gap-4">
              <Link href="/services">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer" style={{ letterSpacing: "0.01em" }} data-testid="link-footer-services">
                  Services
                </span>
              </Link>
              <Link href="/gallery">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer" style={{ letterSpacing: "0.01em" }} data-testid="link-footer-gallery">
                  Gallery
                </span>
              </Link>
              <Link href="/pricing">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer" style={{ letterSpacing: "0.01em" }} data-testid="link-footer-pricing">
                  Pricing
                </span>
              </Link>
              <Link href="/faq">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer" style={{ letterSpacing: "0.01em" }} data-testid="link-footer-faq">
                  FAQ
                </span>
              </Link>
              <Link href="/contact">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer" style={{ letterSpacing: "0.01em" }} data-testid="link-footer-contact">
                  Contact
                </span>
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-base font-semibold uppercase tracking-[0.15em] mb-8">Contact Info</h3>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground" style={{ letterSpacing: "0.01em" }}>
                  Serving South Florida
                </span>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground" style={{ letterSpacing: "0.01em" }}>
                  Available 7 Days a Week
                </span>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground" style={{ letterSpacing: "0.01em" }}>
                  24-Hour Response Time
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-16 pt-10 text-center">
          <p className="text-xs text-muted-foreground tracking-wider">
            © {new Date().getFullYear()} Anthony Ruiz Photography. All rights reserved. | FAA Part
            107 Certified Drone Pilot
          </p>
        </div>
      </div>
    </footer>
  );
}
