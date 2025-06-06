
"use client"; 

import { useState, useEffect } from 'react'; 
import { SectionTitle } from '@/components/section-title';
import { GameCard } from '@/components/game-card';
import { TournamentMatchCard } from '@/components/tournament-match-card';
import { mockGames, mockTournamentBracket, Game, Tournament } from '@/data/mock';
import { ListChecks, GitMerge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ResultsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const finishedGames = mockGames.filter(game => game.status === 'Finalizado');
  const postponedGames = mockGames.filter(game => game.status === 'Adiado');

  const groupGamesByIsoDate = (games: Game[]) => {
    return games.reduce((acc, game) => {
      const isoDate = game.date; 
      if (!acc[isoDate]) {
        acc[isoDate] = [];
      }
      acc[isoDate].push(game);
      return acc;
    }, {} as Record<string, Game[]>);
  };

  const finishedGamesByIsoDate = groupGamesByIsoDate(finishedGames);
  const postponedGamesByIsoDate = groupGamesByIsoDate(postponedGames);

  const sortedFinishedDates = Object.keys(finishedGamesByIsoDate).sort((a,b) => b.localeCompare(a));
  const sortedPostponedDates = Object.keys(postponedGamesByIsoDate).sort((a,b) => b.localeCompare(a));

  const formatDateForDisplay = (isoDate: string) => {
    try {
      const dateObj = parseISO(isoDate + 'T00:00:00.000Z'); 
      return format(dateObj, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      console.error("Error formatting date:", isoDate, error);
      return isoDate; 
    }
  };

  if (!isMounted) {
    return (
      <div className="space-y-8">
        <SectionTitle
          title="Resultados e Chaveamentos"
          description="Confira os resultados das partidas e o andamento dos torneios."
          icon={ListChecks}
        />
        <div className="flex justify-center items-center py-10">
          <p className="text-muted-foreground text-lg">Carregando resultados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Resultados e Chaveamentos"
        description="Confira os resultados das partidas e o andamento dos torneios."
        icon={ListChecks}
      />

      <Tabs defaultValue="resultados" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2">
          <TabsTrigger value="resultados" className="font-headline">
            <ListChecks className="w-4 h-4 mr-2" />Resultados Finais
          </TabsTrigger>
          <TabsTrigger value="chaveamento" className="font-headline">
            <GitMerge className="w-4 h-4 mr-2" />Chaveamento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resultados" className="mt-6">
          {sortedFinishedDates.length > 0 ? (
            sortedFinishedDates.map(isoDate => {
              const gamesOnDate = finishedGamesByIsoDate[isoDate];
              const displayDate = formatDateForDisplay(isoDate);
              return (
                <Card key={isoDate} className="shadow-md mb-6">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">{displayDate}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {gamesOnDate.map(game => <GameCard key={game.id} game={game} />)}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p className="text-muted-foreground text-center py-8">Nenhum resultado final disponível no momento.</p>
          )}

          {postponedGames.length > 0 && (
            <>
              <Separator className="my-12" />
              <h2 className="text-2xl font-headline font-semibold mb-6 text-destructive">Jogos Adiados</h2>
              {sortedPostponedDates.length > 0 ? (
                sortedPostponedDates.map(isoDate => {
                  const gamesOnDate = postponedGamesByIsoDate[isoDate];
                  const displayDate = formatDateForDisplay(isoDate);
                  return (
                  <Card key={`postponed-${isoDate}`} className="shadow-md border-destructive/50 mb-6">
                    <CardHeader>
                      <CardTitle className="font-headline text-2xl text-destructive">{displayDate}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gamesOnDate.map(game => <GameCard key={game.id} game={game} />)}
                      </div>
                    </CardContent>
                  </Card>
                  );
                })
              ) : (
                 <p className="text-muted-foreground text-center py-8">Nenhum jogo adiado.</p>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="chaveamento" className="mt-6">
          {mockTournamentBracket.length > 0 ? (
            mockTournamentBracket.map((tournament: Tournament) => (
              <div key={tournament.id} className="mb-10">
                <h2 className="text-3xl font-headline font-semibold mb-6 text-accent border-b pb-2">{tournament.sport}</h2>
                {tournament.phases.map(phase => (
                  <Card key={phase.id} className="mb-6 shadow-lg bg-secondary/10">
                    <CardHeader className="bg-muted/30 p-4">
                      <CardTitle className="font-headline text-xl text-primary">{phase.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phase.matches.length > 0 ? (
                        phase.matches.map(match => (
                          <TournamentMatchCard key={match.id} match={match} />
                        ))
                      ) : (
                        <p className="text-muted-foreground col-span-full text-center py-4">Nenhuma partida programada para esta fase.</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))
          ) : (
            <Card className="shadow-md">
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center py-10 text-xl">Nenhum chaveamento disponível no momento.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

  