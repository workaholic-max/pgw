import { shuffleArray } from '@/utils/arrayUtils';
import { CARD_TYPES, CARD_MATCH_COUNT } from '@/enums/memory-cards';

/**
 * @return {Array<String>}
 */
export const getShuffledCards = () => {
    const cardDeck = Array.from({ length: CARD_MATCH_COUNT }, () => CARD_TYPES).flat();

    return shuffleArray(cardDeck);
};
