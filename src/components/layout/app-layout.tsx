
'use client';

import { useState, useEffect } from 'react';
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger, SidebarHeader, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { NavMenu } from './nav-menu';
import { Button } from '@/components/ui/button';
import { LogOut, ShieldCheck, PanelLeft } from 'lucide-react'; // PanelLeft for fallback header

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a fallback or simplified layout during SSR and initial client render
    // This avoids complex components that might interact with browser extensions prematurely
    // or rely on hooks like useSidebar before the context is fully ready.
    return (
      <>
        {/* Simplified header without SidebarTrigger which depends on SidebarProvider context */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 shadow-sm backdrop-blur-sm sm:px-6">
          <Button variant="ghost" size="icon" className="flex md:hidden" disabled>
            <PanelLeft /> {/* Placeholder for mobile trigger */}
          </Button>
          <h1 className="text-xl font-headline font-semibold text-foreground">
            Placar Universitário
          </h1>
        </header>
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </>
    );
  }

  // Render the full layout once mounted on the client
  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon" side="left" className="border-r-0 shadow-md">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-sidebar-foreground" />
            <h2 className="text-2xl font-headline font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              PlacarUni
            </h2>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <NavMenu />
        </SidebarContent>
        <SidebarFooter className="p-2 border-t border-sidebar-border">
           <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center">
            <LogOut className="h-5 w-5 group-data-[collapsible=icon]:mr-0 group-data-[collapsible=icon]:size-6 mr-2" />
            <span className="font-medium group-data-[collapsible=icon]:hidden">Sair</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 shadow-sm backdrop-blur-sm sm:px-6">
          <SidebarTrigger className="flex md:hidden" /> {/* Visible on mobile, hidden on md+ */}
          <h1 className="text-xl font-headline font-semibold text-foreground">
            Placar Universitário
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
