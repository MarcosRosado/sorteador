import '@/styles/globals.css';

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
    {children}
    </body>
    </html>
  );
}