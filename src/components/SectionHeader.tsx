import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeaderProps {
  /** Afişteki gibi geniş aralıklı üst etiket. */
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Başlığın sağına hizalanacak ek içerik (ör. gün seçici). */
  aside?: ReactNode;
}

export default function SectionHeader({ eyebrow, title, description, aside }: SectionHeaderProps) {
  return (
    <Reveal className="mb-10 border-t rule pt-6 sm:mb-14">
      <span className="eyebrow">{eyebrow}</span>
      <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-extrabold uppercase leading-[1.05] text-fg sm:text-4xl lg:text-5xl">{title}</h2>
          {description && <p className="mt-4 max-w-2xl text-base text-fg-muted sm:text-lg">{description}</p>}
        </div>
        {aside}
      </div>
    </Reveal>
  );
}
