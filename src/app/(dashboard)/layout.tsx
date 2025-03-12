"use client";

import {ClipboardCheck, Dice6, Notebook, Settings,} from 'lucide-react';
import Providers from './providers';
import {NavItem} from './nav-item';

export default function DashboardLayout({children}: { children: React.ReactNode; }) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40 pl-10">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>
      </main>
    </Providers>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-40 flex-col border-r border-gray-200 bg-background shadow-2xl flex">
      <nav className="flex flex-col items-start gap-4 px-2 py-5">
        <NavItem href="#" label="Sortear">
          <Dice6 className="h-5 w-5" />
        </NavItem>

        <NavItem href="#" label="Gerar Cartelas">
          <ClipboardCheck className="h-5 w-5" />
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-start gap-4 px-2 py-5">
        <NavItem href="#" label="Configurações">
          <Settings className="h-5 w-5" />
        </NavItem>
      </nav>
    </aside>
  );
}