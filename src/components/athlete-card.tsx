import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Medal, Trophy, University } from 'lucide-react'; // University icon from lucide
import type { Athlete } from '@/data/mock';

interface AthleteCardProps {
  athlete: Athlete;
}

export function AthleteCard({ athlete }: AthleteCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-4 text-center bg-muted/30">
        <div className="relative mx-auto w-24 h-24 mb-2">
          <Image 
            src={athlete.photo} 
            alt={athlete.name} 
            layout="fill" 
            objectFit="cover" 
            className="rounded-full border-2 border-primary"
            data-ai-hint="portrait sport person" 
          />
        </div>
        <CardTitle className="text-xl font-headline text-primary">{athlete.name}</CardTitle>
        <CardDescription className="text-sm">{athlete.sport}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center text-muted-foreground mb-2">
          {athlete.universityLogo && <Image src={athlete.universityLogo} alt={`${athlete.university} logo`} width={20} height={20} className="mr-2 rounded-sm" data-ai-hint="logo abstract"/>}
          <University className="w-4 h-4 mr-2 shrink-0" />
          <span className="text-sm font-medium">{athlete.university}</span>
        </div>
        <div className="flex items-start text-foreground">
          <Trophy className="w-4 h-4 mr-2 mt-1 shrink-0 text-amber-500" />
          <p className="text-sm leading-relaxed">{athlete.achievement}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/30 border-t">
        <span className="text-xs text-muted-foreground flex items-center">
          <Medal className="w-4 h-4 mr-1.5 text-primary" /> Destaque Universitário
        </span>
      </CardFooter>
    </Card>
  );
}
