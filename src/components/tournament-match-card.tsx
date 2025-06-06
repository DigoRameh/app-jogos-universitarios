
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BracketMatch } from '@/data/mock';
import { cn } from '@/lib/utils';

interface TournamentMatchCardProps {
  match: BracketMatch;
}

export function TournamentMatchCard({ match }: TournamentMatchCardProps) {
  const getStatusVariant = (status: BracketMatch['status']) => {
    switch (status) {
      case 'Finalizado': return 'default';
      case 'Em Andamento': return 'destructive'; // Using 'destructive' for live-like feel
      case 'Agendado': return 'secondary';
      default: return 'default';
    }
  };

  const teamAStyles = cn(
    "flex flex-col items-center space-y-1 w-2/5 text-center flex-shrink-0",
    match.winner === 'teamA' && "font-bold text-primary"
  );
  const teamBStyles = cn(
    "flex flex-col items-center space-y-1 w-2/5 text-center flex-shrink-0",
    match.winner === 'teamB' && "font-bold text-primary"
  );
  
  const scoreA = match.teamA.score !== undefined ? match.teamA.score : (match.status === 'Agendado' ? '' : '-');
  const scoreB = match.teamB.score !== undefined ? match.teamB.score : (match.status === 'Agendado' ? '' : '-');

  return (
    <Card className="bg-card hover:shadow-md transition-shadow border border-border/70">
      <CardContent className="p-3 md:p-4">
        {match.details && <p className="text-xs text-muted-foreground mb-2 text-center truncate">{match.details}</p>}
        <div className="flex items-center justify-around">
          <div className={teamAStyles}>
            <Image 
              src={match.teamA.logo} 
              alt={`${match.teamA.name} logo`} 
              width={40} 
              height={40} 
              className="rounded-full mb-1 object-cover" 
              data-ai-hint="logo sport" 
            />
            <p className="text-sm truncate w-full px-1">{match.teamA.name}</p>
            {match.status !== 'Agendado' || match.teamA.score !== undefined ? <p className="text-lg h-7">{scoreA}</p> : <div className="h-7"></div>}
          </div>

          <div className="flex flex-col items-center mx-2">
            <span className="text-lg md:text-xl font-headline text-muted-foreground">VS</span>
            <Badge variant={getStatusVariant(match.status)} className="text-xs mt-1 whitespace-nowrap">{match.status}</Badge>
          </div>
          
          <div className={teamBStyles}>
            <Image 
              src={match.teamB.logo} 
              alt={`${match.teamB.name} logo`} 
              width={40} 
              height={40} 
              className="rounded-full mb-1 object-cover" 
              data-ai-hint="logo sport"
            />
            <p className="text-sm truncate w-full px-1">{match.teamB.name}</p>
            {match.status !== 'Agendado' || match.teamB.score !== undefined ? <p className="text-lg h-7">{scoreB}</p> : <div className="h-7"></div>}
          </div>
        </div>
        {match.winner && match.winner !== 'TBD' && match.status === 'Finalizado' && (
          <div className="mt-2 pt-2 border-t border-border/50 text-center text-xs md:text-sm font-medium text-accent">
            Vencedor: {match.winner === 'teamA' ? match.teamA.name : match.teamB.name}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

    