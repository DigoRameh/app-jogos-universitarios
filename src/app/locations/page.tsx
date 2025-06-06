import { SectionTitle } from '@/components/section-title';
import { LocationCard } from '@/components/location-card';
import { mockLocations } from '@/data/mock';
import { MapPin } from 'lucide-react';

export default function LocationsPage() {
  return (
    <div className="space-y-8">
      <SectionTitle
        title="Locais dos Jogos"
        description="Encontre os endereços e informações sobre onde as competições acontecem."
        icon={MapPin}
      />
      {mockLocations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLocations.map(location => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      ) : (
         <p className="text-muted-foreground text-center py-10 text-xl">Nenhum local de jogo cadastrado no momento.</p>
      )}
    </div>
  );
}
