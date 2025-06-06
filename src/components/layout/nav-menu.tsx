"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, RadioTower, ListChecks, Award, Users, Star, MapPin, type LucideIcon } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: "/", label: "Início", icon: Home },
  { href: "/live-scores", label: "Placares ao Vivo", icon: RadioTower },
  { href: "/results", label: "Resultados", icon: ListChecks },
  { href: "/medal-table", label: "Quadro de Medalhas", icon: Award },
  { href: "/fan-o-meter", label: "Torcidômetro", icon: Users },
  { href: "/athletes", label: "Atletas Destaque", icon: Star },
  { href: "/locations", label: "Locais dos Jogos", icon: MapPin },
];

export function NavMenu() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              className={cn(
                "justify-start w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                pathname === item.href && "bg-sidebar-primary text-sidebar-primary-foreground font-semibold" 
              )}
              tooltip={item.label}
            >
              <a> {/* Changed from <> to <a> */}
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
