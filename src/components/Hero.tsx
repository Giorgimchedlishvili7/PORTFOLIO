import { useState } from 'react';
import { ArrowDownRight, Flag } from 'lucide-react';
import { GEORGIA_FLAG_IMAGE } from '../utils/projects';
import type { TranslationDictionary } from '../utils/i18n';

interface HeroProps {
  t: TranslationDictionary;
}

export function Hero({ t }: HeroProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="home" className="pb-16 pt-2 lg:pb-20">
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Editorial Typographic Hierarchy */}
        <div className="flex flex-col justify-between gap-8 lg:col-span-6 lg:py-4">
          <div className="space-y-6">
            <p className="text-xs font-medium tracking-wide text-zinc-600 dark:text-zinc-400">
              {t.hero.kicker}
            </p>

            <h1 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-zinc-950 text-balance sm:text-4xl lg:text-[2.85rem] dark:text-zinc-50">
              {t.hero.headline}
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
              {t.hero.lead}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#websites"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#D91E2A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B91822] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A] whitespace-nowrap shrink-0 dark:bg-[#E12D39] dark:hover:bg-[#C81E2A]"
            >
              <span>{t.hero.primaryAction}</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href="#contact"
              className="inline-flex min-h-[44px] items-center rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A] whitespace-nowrap shrink-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              {t.hero.secondaryAction}
            </a>
          </div>
        </div>

        {/* Right Column: First Photo — National Flag of Georgia */}
        <div className="lg:col-span-6">
          <figure className="relative h-full min-h-[300px] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 sm:min-h-[380px] dark:border-zinc-800 dark:bg-zinc-900">
            {!imageError ? (
              <img
                src={GEORGIA_FLAG_IMAGE}
                alt={t.hero.flagAlt}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-100 to-zinc-200 p-8 text-center dark:from-zinc-900 dark:to-zinc-800">
                <Flag className="h-10 w-10 text-[#D91E2A]" aria-hidden="true" />
                <p className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {t.hero.flagCaptionTitle}
                </p>
              </div>
            )}

            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 pb-5 pt-14 text-white">
              <p className="font-display text-base font-semibold tracking-tight">
                {t.hero.flagCaptionTitle}
              </p>
              <p className="mt-0.5 text-xs text-zinc-200">
                {t.hero.flagCaptionSub}
              </p>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Full-width editorial strip below hero split */}
      <div className="mt-10 grid grid-cols-1 gap-6 border-y border-zinc-200 py-5 sm:grid-cols-3 dark:border-zinc-800">
        <div>
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {t.hero.stripLocationLabel}
          </p>
          <p className="mt-1 font-display text-base font-semibold text-zinc-950 dark:text-zinc-50">
            {t.hero.stripLocationValue}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {t.hero.stripFocusLabel}
          </p>
          <p className="mt-1 font-display text-base font-semibold text-zinc-950 dark:text-zinc-50">
            {t.hero.stripFocusValue}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {t.hero.stripStatusLabel}
          </p>
          <p className="mt-1 font-display text-base font-semibold text-[#D91E2A] dark:text-[#F87171]">
            {t.hero.stripStatusValue}
          </p>
        </div>
      </div>
    </section>
  );
}
