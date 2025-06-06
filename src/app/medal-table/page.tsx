
import Image from 'next/image';
import { SectionTitle } from '@/components/section-title';
import { mockMedalTable, MedalEntry } from '@/data/mock';
import { Award } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MedalTablePage() {
  const sortedTable = [...mockMedalTable].sort((a, b) => {
    if (b.gold !== a.gold) return b.gold - a.gold;
    if (b.silver !== a.silver) return b.silver - a.silver;
    return b.bronze - a.bronze;
  });

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Quadro de Medalhas"
        description="Classificação geral das universidades na competição."
        icon={Award}
      />
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">Classificação Oficial</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] text-center font-headline">Pos.</TableHead>
                <TableHead className="font-headline">Universidade</TableHead>
                <TableHead className="text-center font-headline">
                  <div className="inline-flex items-center justify-center">
                    <Award className="w-5 h-5 mr-1 text-yellow-500" /> Ouro
                  </div>
                </TableHead>
                <TableHead className="text-center font-headline">
                  <div className="inline-flex items-center justify-center">
                    <Award className="w-5 h-5 mr-1 text-gray-400" /> Prata
                  </div>
                </TableHead>
                <TableHead className="text-center font-headline">
                  <div className="inline-flex items-center justify-center">
                    <Award className="w-5 h-5 mr-1 text-orange-400" /> Bronze
                  </div>
                </TableHead>
                <TableHead className="text-center font-headline">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTable.map((entry, index) => (
                <TableRow key={entry.id} className={index < 3 ? "bg-secondary/30 hover:bg-secondary/50" : "hover:bg-muted/50"}>
                  <TableCell className="font-semibold text-center">{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Image src={entry.logo} alt={`${entry.name} logo`} width={28} height={28} className="rounded-full mr-3" data-ai-hint="logo abstract" />
                      {entry.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-semibold">{entry.gold}</TableCell>
                  <TableCell className="text-center font-semibold">{entry.silver}</TableCell>
                  <TableCell className="text-center font-semibold">{entry.bronze}</TableCell>
                  <TableCell className="text-center font-bold">{entry.gold + entry.silver + entry.bronze}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           {sortedTable.length === 0 && (
            <p className="text-muted-foreground text-center py-10">O quadro de medalhas ainda não foi populado.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
