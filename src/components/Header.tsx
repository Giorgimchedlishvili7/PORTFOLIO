import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { TranslationDictionary } from '../utils/i18n';

interface HeaderProps {
  t: TranslationDictionary;
}

export function Header({ t }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '#home', label: t.nav.home },
    { href: '#websites', label: t.nav.websites },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-zinc-50/90 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#050505]/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-zinc-950 transition-colors hover:text-[#D91E2A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D91E2A] dark:text-zinc-50 dark:hover:text-[#E12D39] whitespace-nowrap shrink-0"
        >
          {t.brandName}
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 text-sm font-medium text-zinc-600 md:flex dark:text-zinc-400"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 border-b border-transparent py-0.5 transition-colors hover:border-zinc-900 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D91E2A] dark:hover:border-zinc-100 dark:hover:text-zinc-50"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary CTA on desktop + mobile drawer trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#contact"
            className="hidden rounded-lg bg-[#D91E2A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B91822] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A] md:inline-flex whitespace-nowrap shrink-0 dark:bg-[#E12D39] dark:hover:bg-[#C81E2A]"
          >
            {t.nav.primaryCta}
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-800 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A] md:hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile"
          className="border-t border-zinc-200 bg-white px-4 py-4 md:hidden dark:border-zinc-800 dark:bg-[#111113]"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleNavClick}
              className="mt-1 inline-flex items-center justify-center rounded-lg bg-[#D91E2A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B91822] dark:bg-[#E12D39]"
            >
              {t.nav.primaryCta}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
