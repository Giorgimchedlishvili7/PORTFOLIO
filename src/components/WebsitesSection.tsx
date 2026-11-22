import type { TranslationDictionary } from '../utils/i18n';

interface WebsitesSectionProps {
  t: TranslationDictionary;
}

export function WebsitesSection({ t }: WebsitesSectionProps) {
  return (
    <section
      id="websites"
      className="border-t border-zinc-200 py-16 lg:py-20 dark:border-zinc-800"
    >
      <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-12 text-center sm:px-10 sm:py-16 dark:border-zinc-800 dark:bg-[#111113]">
        <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          {t.websites.sectionTitle}
        </h2>
        <p className="mt-3 font-display text-xl font-semibold tracking-tight text-[#D91E2A] sm:text-2xl dark:text-[#F87171]">
          {t.websites.comingSoon}
        </p>
      </div>
    </section>
  );
}
