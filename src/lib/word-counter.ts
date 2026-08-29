export interface WordStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingMinutes: number;
  speakingMinutes: number;
  averageWordsPerSentence: number;
  averageWordLength: number;
}

const WORD_LIKE = /[\p{L}\p{M}\p{N}]/u;
const WORD_PATTERN = /[\p{L}\p{M}\p{N}]+(?:[.'’\-][\p{L}\p{M}\p{N}]+)*/gu;

function isWordLike(value: string) {
  return WORD_LIKE.test(value);
}

export function tokenizeWords(text: string): string[] {
  return text.match(WORD_PATTERN) ?? [];
}

export function countText(text: string): WordStats {
  const words = tokenizeWords(text);
  const sentences = text.trim() ? (text.match(/[.!?。！？]+(?=\s|$)/gu) ?? []).length || 1 : 0;
  const paragraphs = text.trim() ? text.trim().split(/\n\s*\n+/).length : 0;
  const lines = text ? text.split(/\r?\n/).length : 0;
  const characters = [...text].length;
  const charactersNoSpaces = [...text].filter((char) => !/\s/u.test(char)).length;
  const wordCharacters = words.reduce((total, word) => total + [...word].filter(isWordLike).length, 0);
  return {
    words: words.length,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    lines,
    readingMinutes: words.length ? Math.max(1, Math.ceil(words.length / 200)) : 0,
    speakingMinutes: words.length ? Math.max(1, Math.ceil(words.length / 130)) : 0,
    averageWordsPerSentence: sentences ? Number((words.length / sentences).toFixed(1)) : 0,
    averageWordLength: words.length ? Number((wordCharacters / words.length).toFixed(1)) : 0,
  };
}
