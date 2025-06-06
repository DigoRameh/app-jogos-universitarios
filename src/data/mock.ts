
export interface Team {
  name: string;
  score: number;
  logo: string;
  players?: string[]; // List of player names
  statistics?: Record<string, string>; // Key-value pairs for simple stats e.g. { "Possession": "60%", "Shots": "12" }
}

export interface Game {
  id: string;
  sport: string;
  teamA: Team;
  teamB: Team;
  status: 'Agendado' | 'Ao Vivo' | 'Finalizado' | 'Adiado';
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  locationId: string;
  liveStreamUrl?: string;
  highlights?: string[]; // List of text highlights
}

export interface MedalEntry {
  id: string;
  name: string;
  gold: number;
  silver: number;
  bronze: number;
  logo: string;
}

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  university: string;
  achievement: string;
  photo: string;
  universityLogo?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  sports: string[];
  mapUrl?: string;
}

export interface FanData {
  university: string;
  fans: number;
  logo: string;
}

// Novas interfaces para o Chaveamento
export interface BracketTeam {
  name:string;
  logo: string;
  score?: number;
}

export interface BracketMatch {
  id: string;
  teamA: BracketTeam;
  teamB: BracketTeam;
  winner?: 'teamA' | 'teamB' | 'TBD'; // TBD for matches not yet decided
  status: 'Finalizado' | 'Agendado' | 'Em Andamento';
  details?: string; // e.g., "Jogo 1", "Semifinal 1"
  date?: string; // Opcional: data da partida específica do chaveamento
  time?: string; // Opcional: hora da partida específica do chaveamento
}

export interface BracketPhase {
  id: string;
  name: string; // e.g., "Oitavas de Final", "Quartas de Final"
  matches: BracketMatch[];
}

export interface Tournament {
  id: string;
  sport: string;
  phases: BracketPhase[];
}

export const mockGames: Game[] = [
  { 
    id: '1', 
    sport: 'Futebol', 
    teamA: { 
      name: 'Dragões Azuis', 
      score: 2, 
      logo: 'https://placehold.co/64x64.png',
      players: ['Carlos Eduardo', 'Fernando Lima', 'Gustavo Alves', 'Henrique Souza', 'Igor Santos', 'João Pedro', 'Lucas Martins', 'Matheus Oliveira', 'Nicolas Costa', 'Otávio Pereira', 'Pedro Rocha'],
      statistics: { "Chutes a Gol": "12", "Posse de Bola": "62%", "Faltas Cometidas": "8", "Escanteios": "5" }
    }, 
    teamB: { 
      name: 'Águias Douradas', 
      score: 1, 
      logo: 'https://placehold.co/64x64.png',
      players: ['André Barros', 'Bruno Carvalho', 'Caio Dias', 'Daniel Moreira', 'Eduardo Pires', 'Fábio Ribeiro', 'Gabriel Almeida', 'Hugo Azevedo', 'Isaac Barbosa', 'Jorge Castro', 'Kevin Dias'],
      statistics: { "Chutes a Gol": "8", "Posse de Bola": "38%", "Faltas Cometidas": "10", "Escanteios": "3" }
    }, 
    status: 'Finalizado', 
    date: '2024-07-28', 
    time: '16:00', 
    locationId: 'loc1',
    highlights: [
      "15' - Gol! Dragões Azuis abrem o placar com um chute de fora da área.",
      "30' - Cartão amarelo para jogador das Águias Douradas.",
      "45' - Intervalo: Dragões Azuis 1 x 0 Águias Douradas.",
      "60' - Gol! Águias Douradas empatam a partida em cobrança de falta.",
      "75' - Gol! Dragões Azuis marcam novamente e lideram o placar.",
      "90' - Fim de jogo! Vitória dos Dragões Azuis."
    ]
  },
  { id: '2', sport: 'Basquete', teamA: { name: 'Tubarões Prateados', score: 78, logo: 'https://placehold.co/64x64.png' }, teamB: { name: 'Lobos Cinzentos', score: 82, logo: 'https://placehold.co/64x64.png' }, status: 'Ao Vivo', date: '2024-07-29', time: '19:00', locationId: 'loc2', liveStreamUrl: '#' },
  { id: '3', sport: 'Vôlei', teamA: { name: 'Fênix Escarlates', score: 1, logo: 'https://placehold.co/64x64.png' }, teamB: { name: 'Ursos Verdes', score: 2, logo: 'https://placehold.co/64x64.png' }, status: 'Ao Vivo', date: '2024-07-29', time: '20:00', locationId: 'loc1' },
  { id: '4', sport: 'Futsal', teamA: { name: 'Cobras Roxas', score: 0, logo: 'https://placehold.co/64x64.png' }, teamB: { name: 'Leões Laranjas', score: 0, logo: 'https://placehold.co/64x64.png' }, status: 'Agendado', date: '2024-07-30', time: '10:00', locationId: 'loc3' },
  { id: '5', sport: 'Handebol', teamA: { name: 'Panteras Negras', score: 22, logo: 'https://placehold.co/64x64.png' }, teamB: { name: 'Tigres Brancos', score: 19, logo: 'https://placehold.co/64x64.png' }, status: 'Finalizado', date: '2024-07-28', time: '14:00', locationId: 'loc2' },
];

export const mockMedalTable: MedalEntry[] = [
  { id: 'uniA', name: 'Universidade Alpha', gold: 12, silver: 8, bronze: 15, logo: 'https://placehold.co/40x40.png' },
  { id: 'uniB', name: 'Instituto Beta', gold: 10, silver: 12, bronze: 7, logo: 'https://placehold.co/40x40.png' },
  { id: 'uniC', name: 'Faculdade Gama', gold: 8, silver: 5, bronze: 10, logo: 'https://placehold.co/40x40.png' },
  { id: 'uniD', name: 'Centro Delta', gold: 5, silver: 10, bronze: 6, logo: 'https://placehold.co/40x40.png' },
];

export const mockAthletes: Athlete[] = [
  { id: 'ath1', name: 'Carlos Alberto', sport: 'Natação', university: 'Universidade Alpha', achievement: 'Recorde nos 100m livre', photo: 'https://placehold.co/100x100.png', universityLogo: 'https://placehold.co/30x30.png' },
  { id: 'ath2', name: 'Mariana Silva', sport: 'Atletismo', university: 'Instituto Beta', achievement: 'Ouro no Salto em Altura', photo: 'https://placehold.co/100x100.png', universityLogo: 'https://placehold.co/30x30.png' },
  { id: 'ath3', name: 'Ricardo Souza', sport: 'Judô', university: 'Faculdade Gama', achievement: 'Campeão Peso Médio', photo: 'https://placehold.co/100x100.png', universityLogo: 'https://placehold.co/30x30.png' },
  { id: 'ath4', name: 'Beatriz Pereira', sport: 'Ginástica Artística', university: 'Universidade Alpha', achievement: 'Melhor Performance Individual', photo: 'https://placehold.co/100x100.png', universityLogo: 'https://placehold.co/30x30.png' },
];

export const mockLocations: Location[] = [
  { id: 'loc1', name: 'Ginásio Principal', address: 'Av. Universitária, 1000, Campus Central', sports: ['Futebol', 'Vôlei'], mapUrl: 'https://maps.google.com/?q=Ginásio+Principal,Campus+Central' },
  { id: 'loc2', name: 'Complexo Aquático', address: 'Rua das Piscinas, 250, Setor Esportivo', sports: ['Natação', 'Polo Aquático', 'Basquete', 'Handebol'], mapUrl: 'https://maps.google.com/?q=Complexo+Aquático,Setor+Esportivo' },
  { id: 'loc3', name: 'Quadra Poliesportiva Anexa', address: 'Travessa dos Atletas, S/N, Bloco C', sports: ['Basquete', 'Futsal', 'Handebol'], mapUrl: 'https://maps.google.com/?q=Quadra+Poliesportiva+Anexa,Bloco+C' },
];

export const mockFanData: FanData[] = [
  { university: 'Universidade Alpha', fans: 1250, logo: 'https://placehold.co/40x40.png' },
  { university: 'Instituto Beta', fans: 980, logo: 'https://placehold.co/40x40.png' },
  { university: 'Faculdade Gama', fans: 750, logo: 'https://placehold.co/40x40.png' },
  { university: 'Centro Delta', fans: 600, logo: 'https://placehold.co/40x40.png' },
];

export const mockTournamentBracket: Tournament[] = [
  {
    id: 'futebol-masc-2024',
    sport: 'Futebol Masculino',
    phases: [
      {
        id: 'quartas',
        name: 'Quartas de Final',
        matches: [
          { id: 'qf1', teamA: { name: 'Dragões Azuis', logo: 'https://placehold.co/40x40.png', score: 3 }, teamB: { name: 'Cobras Roxas', logo: 'https://placehold.co/40x40.png', score: 1 }, winner: 'teamA', status: 'Finalizado', details: 'Jogo A - 25/07 10:00' },
          { id: 'qf2', teamA: { name: 'Águias Douradas', logo: 'https://placehold.co/40x40.png', score: 2 }, teamB: { name: 'Leões Laranjas', logo: 'https://placehold.co/40x40.png', score: 2 }, winner: 'teamA', status: 'Finalizado', details: 'Jogo B - (Pen. 5-4) 25/07 14:00' },
          { id: 'qf3', teamA: { name: 'Tubarões Prateados', logo: 'https://placehold.co/40x40.png', score: 0 }, teamB: { name: 'Panteras Negras', logo: 'https://placehold.co/40x40.png', score: 1 }, winner: 'teamB', status: 'Finalizado', details: 'Jogo C - 26/07 10:00' },
          { id: 'qf4', teamA: { name: 'Lobos Cinzentos', logo: 'https://placehold.co/40x40.png', score: 4 }, teamB: { name: 'Tigres Brancos', logo: 'https://placehold.co/40x40.png', score: 2 }, winner: 'teamA', status: 'Finalizado', details: 'Jogo D - 26/07 14:00' },
        ]
      },
      {
        id: 'semis',
        name: 'Semifinais',
        matches: [
          { id: 'sf1', teamA: { name: 'Dragões Azuis', logo: 'https://placehold.co/40x40.png', score: 2 }, teamB: { name: 'Águias Douradas', logo: 'https://placehold.co/40x40.png', score: 0 }, winner: 'teamA', status: 'Finalizado', details: 'Jogo E - 28/07 16:00' },
          { id: 'sf2', teamA: { name: 'Panteras Negras', logo: 'https://placehold.co/40x40.png', score: 1 }, teamB: { name: 'Lobos Cinzentos', logo: 'https://placehold.co/40x40.png', score: 3 }, winner: 'teamB', status: 'Finalizado', details: 'Jogo F - 28/07 19:00' },
        ]
      },
      {
        id: 'final',
        name: 'Final',
        matches: [
          { id: 'f1', teamA: { name: 'Dragões Azuis', logo: 'https://placehold.co/40x40.png' }, teamB: { name: 'Lobos Cinzentos', logo: 'https://placehold.co/40x40.png' }, winner: 'TBD', status: 'Agendado', details: 'Grande Final - 30/07 16:00' },
        ]
      },
      {
        id: 'terceiro-lugar',
        name: 'Disputa de 3º Lugar',
        matches: [
          { id: 'tl1', teamA: { name: 'Águias Douradas', logo: 'https://placehold.co/40x40.png' }, teamB: { name: 'Panteras Negras', logo: 'https://placehold.co/40x40.png' }, winner: 'TBD', status: 'Agendado', details: 'Vale o Bronze - 30/07 14:00' },
        ]
      }
    ]
  },
  {
    id: 'basquete-fem-2024',
    sport: 'Basquete Feminino',
    phases: [
       {
        id: 'semis-basquete',
        name: 'Semifinais',
        matches: [
          { id: 'sf-b1', teamA: { name: 'Corujas Roxas', logo: 'https://placehold.co/40x40.png', score: 68 }, teamB: { name: 'Serpentes Verdes', logo: 'https://placehold.co/40x40.png', score: 65 }, winner: 'teamA', status: 'Finalizado', details: 'Jogo X - 27/07 18:00' },
          { id: 'sf-b2', teamA: { name: 'Leoas Amarelas', logo: 'https://placehold.co/40x40.png', score: 55 }, teamB: { name: 'Gatas Pretas', logo: 'https://placehold.co/40x40.png', score: 58 }, winner: 'teamB', status: 'Em Andamento', details: 'Jogo Y - 27/07 20:00' },
        ]
      },
      {
        id: 'final-basquete',
        name: 'Final',
        matches: [
          { id: 'f-b1', teamA: { name: 'Corujas Roxas', logo: 'https://placehold.co/40x40.png' }, teamB: { name: 'Gatas Pretas', logo: 'https://placehold.co/40x40.png' }, winner: 'TBD', status: 'Agendado', details: 'Final - 29/07 20:00' },
        ]
      }
    ]
  }
];

// Helper function to get university logo (example)
export const getUniversityLogo = (universityName: string): string => {
  const uni = mockMedalTable.find(u => u.name === universityName) || mockFanData.find(f => f.university === universityName);
  return uni ? uni.logo : 'https://placehold.co/30x30.png';
};
