import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  pricing?: string;
}

export default function ServiceCard({ title, description, image, pricing }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate cursor-pointer" data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="aspect-[3/2] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold uppercase tracking-wide mb-3" data-testid={`text-service-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h3>
        <p className="text-base text-muted-foreground leading-loose mb-4" data-testid={`text-service-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {description}
        </p>
        {pricing && (
          <p className="text-sm text-primary font-medium tracking-wider" data-testid={`text-service-pricing-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {pricing}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
