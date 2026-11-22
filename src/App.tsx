import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { UtilityBar } from './components/UtilityBar';
import { WebsitesSection } from './components/WebsitesSection';
import { getTranslation, type LanguageCode } from './utils/i18n';

const THEME_STORAGE_KEY = 'giorgi_portfolio_theme';
const LANG_STORAGE_KEY = 'giorgi_portfolio_lang';

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
  if (stored === 'en' || stored === 'ka' || stored === 'de' || stored === 'es') {
    return stored;
  }
  return 'en';
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANG_STORAGE_KEY, language);
  }, [language]);

  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 transition-colors duration-200 dark:bg-[#050505] dark:text-zinc-50">
      <Header t={t} />

      <main className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <UtilityBar
          language={language}
          onLanguageChange={setLanguage}
          theme={theme}
          onToggleTheme={() =>
            setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
          }
          t={t}
        />

        <Hero t={t} />
        <WebsitesSection t={t} />
        <AboutSection t={t} />
        <ContactSection t={t} />
      </main>

      <Footer t={t} />
    </div>
  );
}
