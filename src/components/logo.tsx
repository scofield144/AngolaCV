import { Building2 } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2.5 px-2 py-1 font-headline text-lg font-bold text-primary-foreground">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-foreground/10 text-primary-foreground">
        <Building2 className="h-5 w-5" />
      </div>
      <span className="hidden group-data-[state=expanded]:block">AngolaCV Pro</span>
    </div>
  );
}
