"use client";

import Image from 'next/image';
import Link from 'next/link';
import { SectionTitle } from '@/components/section-title';
import { mockGames, mockMedalTable, mockAthletes, mockFanData, Game, MedalEntry, Athlete, FanData } from '@/data/mock';
import { GameCard } from '@/components/game-card';
import { AthleteCard } from '@/components/athlete-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Award, Users, ArrowRight, Flame } from 'lucide-react';

export default function HomePage() {
  const liveGames = mockGames.filter(game => game.status === 'Ao Vivo').slice(0, 2);
  const upcomingGames = mockGames.filter(game => game.status === 'Agendado').slice(0, 1);
  const featuredAthlete = mockAthletes[0];
  const topUniversitiesMedals = [...mockMedalTable].sort((a, b) => b.gold - a.gold || b.silver - a.silver || b.bronze - a.bronze).slice(0, 3);
  const fanDataForChart = mockFanData.map(f => ({ name: f.university, Torcedores: f.fans, logo: f.logo }));

  return (
    <div className="space-y-10">
      <SectionTitle
        title="Bem-vindo ao Placar Universitário!"
        description="Seu portal central para acompanhar toda a emoção dos jogos universitários."
        icon={Flame}
      />

      {/* Live and Upcoming Games */}
      <section>
        <h2 className="text-2xl font-headline font-semibold mb-4">Jogos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveGames.map(game => <GameCard key={game.id} game={game} />)}
          {upcomingGames.map(game => <GameCard key={game.id} game={game} />)}
          {liveGames.length === 0 && upcomingGames.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center py-8">Nenhum jogo ao vivo ou agendado no momento.</p>
          )}
        </div>
        {(liveGames.length > 0 || upcomingGames.length > 0) && (
          <div className="mt-6 text-center">
            <Button asChild variant="outline">
              <Link href="/live-scores">Ver Todos os Placares <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Medal Table Sneak Peek */}
        <section className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center"><Award className="mr-2 h-6 w-6 text-primary" />Quadro de Medalhas (Top 3)</CardTitle>
              <CardDescription>As universidades liderando a competição.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {topUniversitiesMedals.map((uni, index) => (
                  <li key={uni.id} className="flex items-center justify-between p-3 rounded-md bg-secondary/50">
                    <div className="flex items-center">
                      <span className="text-lg font-semibold mr-3">{index + 1}.</span>
                      <Image src={uni.logo} alt={uni.name} width={32} height={32} className="rounded-full mr-3" data-ai-hint="logo abstract" />
                      <span className="font-medium">{uni.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span title="Ouro" className="flex items-center"><Award className="h-4 w-4 text-yellow-500 mr-1" />{uni.gold}</span>
                      <span title="Prata" className="flex items-center"><Award className="h-4 w-4 text-gray-400 mr-1" />{uni.silver}</span>
                      <span title="Bronze" className="flex items-center"><Award className="h-4 w-4 text-orange-400 mr-1" />{uni.bronze}</span>
                    </div>
                  </li>
                ))}
                 {topUniversitiesMedals.length === 0 && (
                  <p className="text-muted-foreground text-center py-6">Nenhuma universidade no quadro de medalhas ainda.</p>
                )}
              </ul>
              <Button asChild variant="link" className="mt-4">
                <Link href="/medal-table">Ver Quadro Completo <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Featured Athlete */}
        {featuredAthlete && (
          <section>
             <h2 className="text-2xl font-headline font-semibold mb-4 text-center lg:text-left">Atleta em Destaque</h2>
            <AthleteCard athlete={featuredAthlete} />
            <Button asChild variant="link" className="mt-4 w-full justify-center">
              <Link href="/athletes">Ver Mais Atletas <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </section>
        )}
         {!featuredAthlete && (
           <section className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-center py-8">Nenhum atleta em destaque no momento.</p>
           </section>
        )}
      </div>
      
      {/* Fan-o-meter Sneak Peek */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center"><Users className="mr-2 h-6 w-6 text-primary" />Torcidômetro</CardTitle>
            <CardDescription>Qual torcida está fazendo mais barulho?</CardDescription>
          </CardHeader>
          <CardContent>
          {fanDataForChart.length > 0 ? (
            <>
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer>
                <BarChart data={fanDataForChart.slice(0,4)} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                    labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                    itemStyle={{ color: 'hsl(var(--primary))' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '14px', color: 'hsl(var(--muted-foreground))' }} />
                  <Bar dataKey="Torcedores" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <Button asChild variant="link" className="mt-4">
              <Link href="/fan-o-meter">Ver Torcidômetro Completo <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            </>
            ) : (
              <p className="text-muted-foreground text-center py-8">Dados do torcidômetro indisponíveis.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
