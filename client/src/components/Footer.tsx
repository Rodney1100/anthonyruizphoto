import { Link } from "wouter";
import { Camera, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Camera className="w-8 h-8 text-primary" />
              <div className="flex flex-col">
                <span className="text-xl font-semibold tracking-tight">ANTHONY RUIZ</span>
                <span className="text-xs text-muted-foreground tracking-wider">PHOTOGRAPHY</span>
              </div>
            </div>
            <p className="text-base text-muted-foreground leading-loose">
              Professional real estate photography and video services in South Florida. 24-hour
              turnaround, competitive pricing, and Part 107 certified drone pilot.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider mb-6">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/services">
                <a className="text-base text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-services">
                  Services
                </a>
              </Link>
              <Link href="/gallery">
                <a className="text-base text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-gallery">
                  Gallery
                </a>
              </Link>
              <Link href="/pricing">
                <a className="text-base text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-pricing">
                  Pricing
                </a>
              </Link>
              <Link href="/faq">
                <a className="text-base text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-faq">
                  FAQ
                </a>
              </Link>
              <Link href="/contact">
                <a className="text-base text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">
                  Contact
                </a>
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider mb-6">Contact Info</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-base text-muted-foreground">
                  Serving South Florida
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-base text-muted-foreground">
                  Available 7 Days a Week
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-base text-muted-foreground">
                  24-Hour Response Time
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Anthony Ruiz Photography. All rights reserved. | FAA Part
            107 Certified Drone Pilot
          </p>
        </div>
      </div>
    </footer>
  );
}
