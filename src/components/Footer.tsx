import { RECIPIENT_EMAIL } from '../utils/contact';
import type { TranslationDictionary } from '../utils/i18n';

interface FooterProps {
  t: TranslationDictionary;
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#050505]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:px-6 lg:px-8 dark:text-zinc-400">
        <p>© 2026 {t.footer.rights}</p>

        <div className="flex flex-wrap items-center gap-3">
          <span>{t.footer.madeIn}</span>
          <span aria-hidden="true">·</span>
          <a
            href={`mailto:${RECIPIENT_EMAIL}`}
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            {RECIPIENT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
