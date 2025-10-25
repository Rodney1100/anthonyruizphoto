import Hero from "@/components/Hero";
import FAQAccordion from "@/components/FAQAccordion";

import heroImage from "@assets/generated_images/Commercial_office_space_interior_1dd1161c.png";

export default function FAQ() {
  const faqs = [
    {
      question: "How long does a typical shoot take?",
      answer:
        "Most residential shoots take 45-90 minutes depending on property size and complexity. Smaller condos or townhomes may take less time, while larger estates can require 2-3 hours. Commercial properties typically need 2-4 hours. We work efficiently while ensuring we capture every important detail and angle.",
    },
    {
      question: "What if the weather isn't ideal for the shoot?",
      answer:
        "We closely monitor weather conditions and will proactively reach out to reschedule if necessary at no additional charge. For drone shoots specifically, we require clear skies and wind speeds under 20mph for both safety and optimal image quality. Interior shoots can proceed in most weather conditions.",
    },
    {
      question: "When will the photos be ready?",
      answer:
        "Our standard turnaround time is 24 hours from the completion of the shoot. All images are professionally edited with HDR processing, color correction, and retouching before delivery. Rush same-day delivery is available for an additional $100 fee if you need the images urgently.",
    },
    {
      question: "Can you shoot twilight/blue hour photos?",
      answer:
        "Absolutely! Twilight photography is one of our specialties. These dramatic blue-hour shots showcase properties with warm interior lighting against stunning evening skies. Twilight shoots are scheduled separately from daytime shoots and are weather-dependent. We recommend twilight shots for luxury listings and waterfront properties.",
    },
    {
      question: "Do you offer photo editing and retouching?",
      answer:
        "Yes, all our packages include professional editing and retouching at no extra cost. This includes HDR blending, color correction, perspective correction, and removal of minor distractions. We can also provide virtual staging, sky replacements, and advanced retouching for an additional fee.",
    },
    {
      question: "How far in advance should I book?",
      answer:
        "We recommend booking at least 48-72 hours in advance to ensure availability, especially during peak listing season (spring and summer). However, we understand that sometimes properties need to be photographed quickly, so we offer same-day or next-day bookings when our schedule allows.",
    },
    {
      question: "What should I do to prepare the property?",
      answer:
        "We'll send you a detailed preparation checklist upon booking, but key points include: declutter all surfaces, turn on all lights, open blinds/curtains, hide personal items and toiletries, remove hoses and trash cans from exteriors, and ensure the property is clean. Proper preparation significantly improves the final results.",
    },
    {
      question: "Do you provide 3D virtual tours?",
      answer:
        "Yes, we offer Matterport 3D virtual tours as an add-on service or as part of our Luxury package. These immersive tours allow potential buyers to explore the property remotely as if they were walking through in person. They're especially valuable for out-of-town buyers and significantly increase online engagement.",
    },
    {
      question: "Are you licensed and insured?",
      answer:
        "Yes, we are fully licensed and insured. We carry comprehensive general liability insurance and professional equipment insurance. For drone operations, we are FAA Part 107 certified, which is required for all commercial drone photography. We can provide certificates of insurance upon request.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We primarily serve South Florida including Miami-Dade, Broward, and Palm Beach counties. This includes Miami, Fort Lauderdale, West Palm Beach, Boca Raton, and surrounding areas. For shoots outside our primary service area, a small travel fee may apply depending on distance.",
    },
    {
      question: "What file formats will I receive?",
      answer:
        "All images are delivered as high-resolution JPEGs (4000+ pixels on the longest side) optimized for both print and web use. Images are delivered via a secure online gallery where you can download, share, and order prints. The gallery link remains active indefinitely for your convenience.",
    },
    {
      question: "Can I use the photos for marketing and advertising?",
      answer:
        "Yes, you receive unlimited usage rights for all MLS listings, print marketing materials, social media, websites, and advertising for the specific property photographed. The only restriction is that the photos cannot be used to market other properties or resold to third parties.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero
        backgroundImage={heroImage}
        headline="FREQUENTLY ASKED QUESTIONS"
        subheadline="Find answers to common questions about our services and process"
        showCTAs={false}
        height="partial"
      />

      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold uppercase tracking-wide mb-4" data-testid="text-faq-heading">
            Got Questions?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We've compiled answers to the most common questions we receive. Don't see your question
            here? Feel free to contact us directly.
          </p>
        </div>

        <FAQAccordion faqs={faqs} />

        <div className="mt-16 text-center p-8 bg-card rounded-md border border-card-border">
          <h3 className="text-2xl font-semibold mb-4">Still Have Questions?</h3>
          <p className="text-lg text-muted-foreground mb-6">
            We're here to help. Contact us directly and we'll respond within 24 hours.
          </p>
          <a href="/contact" data-testid="link-contact-us">
            <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground border border-primary-border shadow-xs h-9 min-h-9 rounded-md px-4 text-sm hover-elevate active-elevate-2">
              CONTACT US
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
