import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  pricing?: string;
}

export default function ServiceCard({ title, description, image, pricing }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl group border-border/30" data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="aspect-[3/2] overflow-hidden bg-muted/20">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
        />
      </div>
      <CardContent className="p-8">
        <div className="w-12 h-0.5 bg-primary mb-4" />
        <h3 className="text-xl font-semibold uppercase tracking-[0.15em] mb-4" style={{ letterSpacing: "0.1em" }} data-testid={`text-service-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5" style={{ letterSpacing: "0.01em" }} data-testid={`text-service-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {description}
        </p>
        {pricing && (
          <p className="text-xs text-primary font-semibold tracking-[0.15em]" data-testid={`text-service-pricing-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {pricing}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
