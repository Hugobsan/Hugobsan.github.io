import en, { type Dict } from './en';
import pt from './pt';
import es from './es';
import zh from './zh';

// One entry per published locale: routes, switcher, hreflang and JSON-LD all read from here.
export const LOCALES = {
  en: { dict: en, html: 'en', og: 'en_US', label: 'EN', path: '/' },
  pt: { dict: pt, html: 'pt-BR', og: 'pt_BR', label: 'PT', path: '/pt/' },
  es: { dict: es, html: 'es', og: 'es_ES', label: 'ES', path: '/es/' },
  zh: { dict: zh, html: 'zh-Hans', og: 'zh_CN', label: '中文', path: '/zh/' },
} satisfies Record<string, { dict: Dict; html: string; og: string; label: string; path: string }>;

export type Lang = keyof typeof LOCALES;
export const LANGS = Object.keys(LOCALES) as Lang[];
