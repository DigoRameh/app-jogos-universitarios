import type { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  title: string;
  icon?: LucideIcon;
  description?: string;
  className?: string;
}

export function SectionTitle({ title, icon: Icon, description, className }: SectionTitleProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-8 w-8 text-primary" />}
        <h1 className="text-3xl font-headline font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
      </div>
      {description && <p className="mt-2 text-lg text-muted-foreground">{description}</p>}
    </div>
  );
}
