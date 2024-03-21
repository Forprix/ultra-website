import { Injectable } from '@nestjs/common';
import * as translations from './translations.json'
import * as languageIndexes from './languageIndexes.json'

export type Translatable = 'HELLO_WORLD'
export type SupportedLanguage = 'ru' | 'en';

@Injectable()
export class LanguageService {
  supportedLangs: string[] = [
    'ru',
    'en'
  ]
  getLanguageIndex(lang: SupportedLanguage): number | undefined {
    return languageIndexes.indexOf(lang);
  }
  translateByLangIndex(translatable: Translatable, langIndex: number): string | undefined {
    return translations[translatable]?.[langIndex];
  }
  translateByLang(translatable: Translatable, lang: SupportedLanguage): string | undefined {
    const langIndex = this.getLanguageIndex(lang);
    return this.translateByLangIndex(translatable, langIndex);
  }
  translateByHTTPHeader(translatable: Translatable, header: string): string | undefined {
    const lang = this.getBestSupportedLangByHTTPHeader(header);
    return this.translateByLang(translatable, lang);
  }
  translateByHTTPHeaders(translatable: Translatable, headers: Record<string, string>): string | undefined {
    return this.translateByHTTPHeader(translatable, headers['accept-language']);
  }
  translate(translatable: Translatable, { headers, header, lang, langIndex }: { headers?: Record<string, string>, header?: string, lang?: SupportedLanguage, langIndex?: number }): string | undefined {
    if (langIndex)   return this.translateByLangIndex(translatable, langIndex);
    if (lang)        return this.translateByLang(translatable, lang);
    if (header)  return this.translateByHTTPHeader(translatable, header);
    if (headers) return this.translateByHTTPHeaders(translatable, headers);
  }
  getBestSupportedLangByHTTPHeader(header: string): SupportedLanguage {
    let bestQFactor: number = 0,
        bestLang: SupportedLanguage = 'en';
    for (const fields of header.split(',').map(x => x.split(';'))) {
      let lang: string,
          qFactor: number = 1;
      for (const field of fields) {
        const normalizedField = field.trim().toLowerCase();
        if (!normalizedField.includes('='))
          lang = normalizedField;
        else if (normalizedField.startsWith('q='))
          qFactor = Number(normalizedField.slice(2));
      }
      if (qFactor > bestQFactor && this.supportedLangs.includes(lang))
        bestQFactor = qFactor,
        bestLang = lang as SupportedLanguage;
    }
    return bestLang;
  }
}
