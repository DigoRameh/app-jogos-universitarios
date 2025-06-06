
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Game } from '@/data/mock';
import { CalendarDays, Clock, MapPin, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';
import { parse, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const getStatusVariant = (status: Game['status']) => {
    switch (status) {
      case 'Ao Vivo': return 'destructive';
      case 'Finalizado': return 'default';
      case 'Agendado': return 'secondary';
      case 'Adiado': return 'outline';
      default: return 'default';
    }
  };
  
  const scoreClass = "text-3xl font-bold font-headline";
  const liveScoreClass = game.status === 'Ao Vivo' ? 'text-accent animate-pulse' : 'text-primary';

  let formattedDate = game.date;
  try {
    const gameDateObj = parse(game.date, 'yyyy-MM-dd', new Date());
    formattedDate = format(gameDateObj, "dd 'de' MMM'.'", { locale: ptBR });
  } catch (error) {
    console.error("Error formatting game date in GameCard:", game.date, error);
  }
  
  return (
    <Link href={`/game/${game.id}`} passHref legacyBehavior>
      <a className="block hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg">
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
          <CardHeader className="bg-muted/50 p-4 border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-headline">{game.sport}</CardTitle>
              <Badge variant={getStatusVariant(game.status)} className="text-xs">{game.status}</Badge>
            </div>
            <CardDescription className="flex items-center text-sm pt-1">
              <CalendarDays className="w-4 h-4 mr-1.5" /> {formattedDate}
              <Clock className="w-4 h-4 ml-3 mr-1.5" /> {game.time}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-around text-center">
              <div className="flex flex-col items-center space-y-2 w-2/5">
                <Image src={game.teamA.logo} alt={`${game.teamA.name} logo`} width={48} height={48} className="rounded-full" data-ai-hint="logo sport" />
                <p className="font-semibold text-sm truncate w-full">{game.teamA.name}</p>
                <span className={cn(scoreClass, game.status !== 'Agendado' && liveScoreClass)}>{game.teamA.score}</span>
              </div>
              <span className="text-2xl font-headline text-muted-foreground">VS</span>
              <div className="flex flex-col items-center space-y-2 w-2/5">
                <Image src={game.teamB.logo} alt={`${game.teamB.name} logo`} width={48} height={48} className="rounded-full" data-ai-hint="logo sport" />
                <p className="font-semibold text-sm truncate w-full">{game.teamB.name}</p>
                <span className={cn(scoreClass, game.status !== 'Agendado' && liveScoreClass)}>{game.teamB.score}</span>
              </div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 mr-1.5" /> Local: {game.locationId} (Detalhes na pág. Locais)
            </div>
            {game.liveStreamUrl && game.status === 'Ao Vivo' && (
              <Button 
                variant="destructive" 
                size="sm" 
                className="w-full mt-2"
                onClick={(e) => {
                  e.stopPropagation(); 
                  window.open(game.liveStreamUrl, '_blank', 'noopener,noreferrer');
                }}
              >
                <Youtube className="w-4 h-4 mr-2" /> Assistir Ao Vivo
              </Button>
            )}
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}

