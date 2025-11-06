import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  pricing?: string;
}

export default function ServiceCard({ title, description, image, pricing }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl group border-primary/20 bg-gradient-to-br from-card to-secondary/10" data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="aspect-[3/2] overflow-hidden bg-gradient-to-br from-primary/5 to-accent/10 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <CardContent className="p-8">
        <h3 className="text-xl font-semibold uppercase tracking-[0.15em] mb-4 text-foreground" style={{ letterSpacing: "0.1em" }} data-testid={`text-service-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5" style={{ letterSpacing: "0.01em" }} data-testid={`text-service-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {description}
        </p>
        {pricing && (
          <div className="inline-flex items-center gap-2 text-xs text-primary font-bold tracking-[0.15em] bg-primary/10 px-4 py-2 rounded-full" data-testid={`text-service-pricing-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {pricing}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
