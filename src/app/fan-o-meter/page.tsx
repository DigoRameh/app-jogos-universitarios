"use client"; // Required for Recharts

import { SectionTitle } from '@/components/section-title';
import { mockFanData, FanData } from '@/data/mock';
import { Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Image from 'next/image';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export default function FanOMeterPage() {
  const sortedFanData = [...mockFanData].sort((a, b) => b.fans - a.fans);

  const chartData = sortedFanData.map(data => ({
    name: data.university,
    Torcedores: data.fans,
    logo: data.logo
  }));

  // Custom Tooltip for Chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover text-popover-foreground p-3 rounded-md shadow-lg border border-border">
          <div className="flex items-center mb-2">
            <Image src={data.logo} alt={`${data.name} logo`} width={24} height={24} className="rounded-full mr-2" data-ai-hint="logo abstract" />
            <p className="font-headline text-base">{label}</p>
          </div>
          <p className="text-sm">{`Torcedores: ${payload[0].value.toLocaleString('pt-BR')}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Torcidômetro"
        description="Veja qual universidade tem a torcida mais engajada!"
        icon={Users}
      />

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary flex items-center">
            <TrendingUp className="w-6 h-6 mr-2" /> Ranking de Torcidas
          </CardTitle>
          <CardDescription>Popularidade baseada no engajamento e apoio dos fãs.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8 h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                  height={70}
                />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
                <Legend wrapperStyle={{ fontSize: '14px', color: 'hsl(var(--muted-foreground))', paddingTop: '20px' }} />
                <Bar dataKey="Torcedores" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-headline font-semibold">Detalhes do Ranking:</h3>
            {sortedFanData.map((data, index) => (
              <Card key={data.university} className="bg-secondary/30">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold mr-4 w-6 text-center">{index + 1}.</span>
                    <Image src={data.logo} alt={`${data.university} logo`} width={32} height={32} className="rounded-full mr-3" data-ai-hint="logo abstract"/>
                    <span className="font-medium text-foreground">{data.university}</span>
                  </div>
                  <span className="font-bold text-primary text-lg">
                    {data.fans.toLocaleString('pt-BR')} fãs
                  </span>
                </CardContent>
              </Card>
            ))}
             {sortedFanData.length === 0 && (
                <p className="text-muted-foreground text-center py-8">Dados do torcidômetro indisponíveis.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
