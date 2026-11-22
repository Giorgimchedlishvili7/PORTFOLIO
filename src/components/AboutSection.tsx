import type { TranslationDictionary } from '../utils/i18n';

interface AboutSectionProps {
  t: TranslationDictionary;
}

export function AboutSection({ t }: AboutSectionProps) {
  const principles = [
    {
      title: t.about.principles.oneTitle,
      body: t.about.principles.oneBody,
    },
    {
      title: t.about.principles.twoTitle,
      body: t.about.principles.twoBody,
    },
    {
      title: t.about.principles.threeTitle,
      body: t.about.principles.threeBody,
    },
  ];

  return (
    <section
      id="about"
      className="border-t border-zinc-200 py-16 lg:py-20 dark:border-zinc-800"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-4 lg:col-span-5">
          <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            {t.about.sectionTitle}
          </h2>
          <p className="text-lg font-medium leading-relaxed text-zinc-900 dark:text-zinc-100">
            {t.about.lead}
          </p>
          <p className="text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
            {t.about.body}
          </p>
        </div>

        <div className="divide-y divide-zinc-200 border-y border-zinc-200 lg:col-span-7 dark:divide-zinc-800 dark:border-zinc-800">
          {principles.map((item) => (
            <div key={item.title} className="py-6 first:pt-4 last:pb-4">
              <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
