import { SectionTitle } from '@/components/section-title';
import { GameCard } from '@/components/game-card';
import { mockGames, Game } from '@/data/mock';
import { RadioTower } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LiveScoresPage() {
  const liveGames = mockGames.filter(game => game.status === 'Ao Vivo');
  const scheduledGames = mockGames.filter(game => game.status === 'Agendado');
  
  const gamesBySport: { [key: string]: Game[] } = {};
  liveGames.forEach(game => {
    if (!gamesBySport[game.sport]) {
      gamesBySport[game.sport] = [];
    }
    gamesBySport[game.sport].push(game);
  });

  const scheduledBySport: { [key: string]: Game[] } = {};
  scheduledGames.forEach(game => {
    if (!scheduledBySport[game.sport]) {
      scheduledBySport[game.sport] = [];
    }
    scheduledBySport[game.sport].push(game);
  });

  const sportsWithLiveGames = Object.keys(gamesBySport);
  const sportsWithScheduledGames = Object.keys(scheduledBySport);
  const allSports = Array.from(new Set([...sportsWithLiveGames, ...sportsWithScheduledGames])).sort();


  return (
    <div className="space-y-8">
      <SectionTitle
        title="Placares ao Vivo e Agendados"
        description="Acompanhe os jogos em tempo real e veja os próximos confrontos."
        icon={RadioTower}
      />
      
      <Tabs defaultValue={allSports[0] || "all"} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {allSports.map(sport => (
            <TabsTrigger key={sport} value={sport} className="font-headline">{sport}</TabsTrigger>
          ))}
           {allSports.length === 0 && <TabsTrigger value="all" className="font-headline col-span-full">Todos</TabsTrigger>}
        </TabsList>

        {allSports.map(sport => (
          <TabsContent key={sport} value={sport} className="mt-6">
            <div className="mb-8">
              <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Jogos Ao Vivo - {sport}</h2>
              {gamesBySport[sport] && gamesBySport[sport].length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gamesBySport[sport].map(game => <GameCard key={game.id} game={game} />)}
                </div>
              ) : (
                <p className="text-muted-foreground">Nenhum jogo de {sport.toLowerCase()} ao vivo no momento.</p>
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Jogos Agendados - {sport}</h2>
               {scheduledBySport[sport] && scheduledBySport[sport].length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {scheduledBySport[sport].map(game => <GameCard key={game.id} game={game} />)}
                </div>
              ) : (
                <p className="text-muted-foreground">Nenhum jogo de {sport.toLowerCase()} agendado no momento.</p>
              )}
            </div>
          </TabsContent>
        ))}
         {allSports.length === 0 && (
          <TabsContent value="all" className="mt-6 text-center py-10">
            <p className="text-xl text-muted-foreground">Nenhum jogo ao vivo ou agendado no momento.</p>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
