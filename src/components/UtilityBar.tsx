import { Globe, Moon, Sun } from 'lucide-react';
import {
  LANGUAGES,
  type LanguageCode,
  type TranslationDictionary,
} from '../utils/i18n';

interface UtilityBarProps {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  t: TranslationDictionary;
}

export function UtilityBar({
  language,
  onLanguageChange,
  theme,
  onToggleTheme,
  t,
}: UtilityBarProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <Globe className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t.controls.languageLabel}</span>
        </span>

        <div
          role="group"
          aria-label={t.controls.languageLabel}
          className="inline-flex items-center gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900"
        >
          {LANGUAGES.map((lang) => {
            const active = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => onLanguageChange(lang.code)}
                aria-pressed={active}
                aria-label={`${lang.nativeName} (${lang.shortLabel})`}
                className={`min-h-[36px] rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A] whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50'
                    : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50'
                }`}
              >
                <span className="sm:hidden">{lang.shortLabel}</span>
                <span className="hidden sm:inline">{lang.nativeName}</span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={
          theme === 'dark' ? t.controls.switchToLight : t.controls.switchToDark
        }
        aria-pressed={theme === 'dark'}
        className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A] whitespace-nowrap shrink-0 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
      >
        {theme === 'dark' ? (
          <>
            <Sun className="h-4 w-4 text-amber-400" aria-hidden="true" />
            <span>{t.controls.lightLabel}</span>
          </>
        ) : (
          <>
            <Moon className="h-4 w-4 text-zinc-700" aria-hidden="true" />
            <span>{t.controls.darkLabel}</span>
          </>
        )}
      </button>
    </div>
  );
}
