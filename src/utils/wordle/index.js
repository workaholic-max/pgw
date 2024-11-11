import { WORDS } from '@/enums/wordle';

/**
 * @return {String}
 */
export const getRandomWord = () => {
    const wordIndex = Math.floor(Math.random() * WORDS.length);

    return WORDS[wordIndex];
};
