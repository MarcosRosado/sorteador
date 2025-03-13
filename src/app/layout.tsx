import '@/styles/globals.css';
import Providers from "@components/providers";
import {NavItem} from "@components/nav-item";
import {ClipboardCheck, Dice6, Settings} from "lucide-react";

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({children}: { children: React.ReactNode; })
{
  return (
    <html lang="en">
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"/>
    </head>
    <body className="flex min-h-screen w-full flex-col">
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
    </body>
    </html>
  );
}


function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-50 flex-col border-r border-gray-200 bg-background shadow-2xl flex">
      <nav className="flex flex-col items-start gap-4 px-2 py-5">
        <NavItem href="/" label="Sortear">
          <Dice6 className="h-5 w-5" />
        </NavItem>

        <NavItem href="/generate" label="Gerar Cartelas">
          <ClipboardCheck className="h-5 w-5" />
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-start gap-4 px-2 py-5">
        <NavItem href="/settings" label="Configurações">
          <Settings className="h-5 w-5" />
        </NavItem>
      </nav>
    </aside>
  );
}