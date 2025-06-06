
"use client";

import { useParams, notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockGames, mockLocations, Game, Location as GameLocation, Team } from '@/data/mock';
import { SectionTitle } from '@/components/section-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, CalendarDays, Clock, MapPin, Users, BarChart2, ListChecks, ExternalLink, YoutubeIcon } from 'lucide-react';
import { parse, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.id as string;

  const game = mockGames.find(g => g.id === gameId);
  const location = game ? mockLocations.find(l => l.id === game.locationId) : undefined;

  if (!game) {
    notFound();
    return null; 
  }

  const getStatusVariant = (status: Game['status']) => {
    switch (status) {
      case 'Ao Vivo': return 'destructive';
      case 'Finalizado': return 'default';
      case 'Agendado': return 'secondary';
      case 'Adiado': return 'outline';
      default: return 'default';
    }
  };

  let formattedDate = game.date;
  try {
    const gameDateObj = parse(game.date, 'yyyy-MM-dd', new Date());
    formattedDate = format(gameDateObj, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch (error) {
    console.error("Error formatting game date on detail page:", game.date, error);
  }

  const renderTeamSection = (team: Team, teamLabel: string) => (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-xl font-headline text-center">{team.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {team.players && team.players.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-2 flex items-center"><Users className="w-4 h-4 mr-2 text-primary" />Jogadores</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {team.players.map((player, idx) => <li key={`${teamLabel}-player-${idx}`}>{player}</li>)}
            </ul>
          </div>
        )}
        {team.statistics && Object.keys(team.statistics).length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center"><BarChart2 className="w-4 h-4 mr-2 text-primary" />Estatísticas</h4>
            <Table size="sm">
              <TableBody>
                {Object.entries(team.statistics).map(([key, value]) => (
                  <TableRow key={`${teamLabel}-stat-${key}`}>
                    <TableCell className="font-medium text-xs p-1">{key}</TableCell>
                    <TableCell className="text-xs p-1">{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
         {(!team.players || team.players.length === 0) && (!team.statistics || Object.keys(team.statistics).length === 0) && (
            <p className="text-sm text-muted-foreground text-center">Sem informações de jogadores ou estatísticas para {team.name}.</p>
         )}
      </CardContent>
    </Card>
  );


  return (
    <div className="space-y-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
      </Button>

      <SectionTitle
        title={`${game.sport}: Detalhes do Jogo`}
        icon={ListChecks}
      />

      {/* Game Header Card */}
      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/80 to-accent/80 text-primary-foreground p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Image src={game.teamA.logo} alt={`${game.teamA.name} logo`} width={64} height={64} className="rounded-full bg-white p-1" data-ai-hint="logo sport" />
              <h2 className="text-3xl font-headline">{game.teamA.name}</h2>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold font-headline">
                {game.teamA.score} <span className="text-3xl mx-2">vs</span> {game.teamB.score}
              </p>
              <Badge variant={getStatusVariant(game.status)} className="mt-2 text-sm px-3 py-1 bg-card text-card-foreground shadow-md">
                {game.status}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-headline text-right md:text-left">{game.teamB.name}</h2>
              <Image src={game.teamB.logo} alt={`${game.teamB.name} logo`} width={64} height={64} className="rounded-full bg-white p-1" data-ai-hint="logo sport" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-muted/20 space-y-3">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2 text-md text-muted-foreground">
            <div className="flex items-center">
              <CalendarDays className="w-5 h-5 mr-2 text-primary" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              <span>{game.time}</span>
            </div>
            {location && (
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                <span>{location.name}</span>
              </div>
            )}
          </div>
          {game.liveStreamUrl && game.status === 'Ao Vivo' && (
            <div className="mt-4 text-center">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                    <a href={game.liveStreamUrl} target="_blank" rel="noopener noreferrer">
                        <YoutubeIcon className="w-5 h-5 mr-2"/> Assistir Ao Vivo
                    </a>
                </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Location Details */}
      {location && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-primary" />Informações do Local</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold">{location.name}</h3>
            <p className="text-muted-foreground">{location.address}</p>
            {location.mapUrl && (
              <Button variant="outline" size="sm" asChild className="mt-3">
                <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
                  Ver no Mapa <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Players and Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderTeamSection(game.teamA, "teamA")}
        {renderTeamSection(game.teamB, "teamB")}
      </div>

      {/* Highlights */}
      {game.highlights && game.highlights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><ListChecks className="w-5 h-5 mr-2 text-primary" />Destaques da Partida</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {game.highlights.map((highlight, index) => (
                <li key={`highlight-${index}`} className="p-2 bg-secondary/30 rounded-md">{highlight}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
       {( !game.teamA.players && !game.teamA.statistics && !game.teamB.players && !game.teamB.statistics && !game.highlights) && (
         <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
                Nenhuma informação adicional de jogadores, estatísticas ou destaques disponível para esta partida.
            </CardContent>
         </Card>
       )}

    </div>
  );
}
