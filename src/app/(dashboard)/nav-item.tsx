import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavItem({
                          href,
                          label,
                          children
                        }: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={clsx(
            'flex items-center gap-2 rounded-full text-muted-foreground transition-colors hover:text-foreground hover:bg-gray-200 md:h-8 md:w-full',
            {
              'bg-accent text-black': pathname === href
            }
          )}
        >
          {children}
          <span>{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}