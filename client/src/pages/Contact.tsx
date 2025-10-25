import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import heroImage from "@assets/generated_images/Twilight_exterior_photography_showcase_d1f7338e.png";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Hero
        backgroundImage={heroImage}
        headline="GET IN TOUCH"
        subheadline="Ready to elevate your listings? Contact us today for a quote or to schedule a shoot"
        showCTAs={false}
        height="partial"
      />

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-semibold uppercase tracking-wide mb-8" data-testid="text-contact-heading">
              Contact Information
            </h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Service Area</h3>
                  <p className="text-base text-muted-foreground leading-loose">
                    Miami-Dade, Broward, and Palm Beach Counties
                    <br />
                    South Florida
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Phone</h3>
                  <p className="text-base text-muted-foreground leading-loose">
                    Available 7 days a week
                    <br />
                    Call for immediate assistance
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <p className="text-base text-muted-foreground leading-loose">
                    24-hour response time guaranteed
                    <br />
                    Use the form or email directly
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Business Hours</h3>
                  <p className="text-base text-muted-foreground leading-loose">
                    Monday - Sunday: 7:00 AM - 8:00 PM
                    <br />
                    Flexible scheduling available
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-md border border-card-border">
              <h3 className="text-xl font-semibold mb-4">Quick Booking</h3>
              <p className="text-base text-muted-foreground leading-loose mb-6">
                Need to schedule a shoot right away? Use our online booking system for instant
                confirmation and availability.
              </p>
              <a
                href="https://listings.anthonyruizphoto.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-quick-book"
              >
                <button className="w-full inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground border border-primary-border shadow-xs h-9 min-h-9 rounded-md px-4 text-sm hover-elevate active-elevate-2">
                  BOOK ONLINE NOW
                </button>
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold uppercase tracking-wide mb-8" data-testid="text-form-heading">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold uppercase tracking-wide mb-4">What to Expect</h2>
          <p className="text-lg text-muted-foreground leading-loose">
            When you contact us, we'll respond within 24 hours (usually much sooner) to discuss
            your project, provide a detailed quote, and schedule your shoot at a time that works
            for you. We're committed to making the process as smooth and professional as possible.
          </p>
        </div>
      </section>
    </div>
  );
}
