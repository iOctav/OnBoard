export const SUPPORTED_LANGUAGES = {
  English: 'en',
  Russian: 'ru',
  Deutsch: 'de',
  French: 'fr',
  Spanish: 'es',
  Italian: 'it',
  Japanese: 'ja',
  Korean: 'ko',
  Chinese: 'zh',
  Portuguese: 'pt',
  Polish: 'pl',
  Ukrainian: 'uk',
  Czech: 'cs',
  Hebrew: 'he',
  Hungarian: 'hu',
};

const userLocaleLang = `user_locale_lang`;

export const setUserLocaleLang = (lang) => {
  localStorage.setItem(userLocaleLang, lang || undefined);
}
export const getUserLocaleLang = (lang) => {
  return localStorage.getItem(userLocaleLang);
}