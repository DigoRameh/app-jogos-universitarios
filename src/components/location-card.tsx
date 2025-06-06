import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Location } from '@/data/mock';
import { MapPin, Dices, ExternalLink } from 'lucide-react'; // Dices for sports

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-4 bg-muted/30">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-primary" />
          <CardTitle className="text-xl font-headline">{location.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div>
          <h4 className="text-sm font-semibold mb-1 text-foreground">Endereço:</h4>
          <p className="text-sm text-muted-foreground">{location.address}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-1 text-foreground flex items-center">
            <Dices className="w-4 h-4 mr-2" /> Esportes Praticados:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {location.sports.map(sport => (
              <span key={sport} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                {sport}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      {location.mapUrl && (
        <CardFooter className="p-4 border-t bg-muted/30">
          <Button variant="outline" size="sm" asChild className="w-full">
            <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
              Ver no Mapa <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
