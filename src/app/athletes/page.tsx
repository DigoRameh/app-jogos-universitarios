import { SectionTitle } from '@/components/section-title';
import { AthleteCard } from '@/components/athlete-card';
import { mockAthletes } from '@/data/mock';
import { Star } from 'lucide-react';

export default function AthletesPage() {
  return (
    <div className="space-y-8">
      <SectionTitle
        title="Atletas em Destaque"
        description="Conheça os atletas que estão brilhando nas competições."
        icon={Star}
      />
      {mockAthletes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockAthletes.map(athlete => (
            <AthleteCard key={athlete.id} athlete={athlete} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-10 text-xl">Nenhum atleta em destaque no momento.</p>
      )}
    </div>
  );
}
