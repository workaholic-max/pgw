<script>
export default {
    name: 'MemoryCardsView',
};
</script>

<script setup>
import { reactive, computed } from 'vue';

import { getShuffledCards } from '@/utils/memory-cards';
import { TRANSITION_DELAY } from '@/enums/styleEnums';
import { CARD_TYPES, CARD_MATCH_COUNT } from '@/enums/memory-cards';
import ButtonUI from '@/components/UI/ButtonUI';
import Card from './partials/Card';

/*-----------------------------------------------------------------
                             Game state
-----------------------------------------------------------------*/

const cardsState = reactive({
    shuffled: getShuffledCards(),
    flipped: new Map(),
    matched: new Set(),
    areDisabled: false,
});

/**
 * @param card {String}
 * @param index {Number}
 *
 * @return {Boolean}
 */
const isCardFlipped = (card, index) => {
    const indexes = cardsState.flipped.get(card) || [];

    return indexes.includes(index) || cardsState.matched.has(card);
};

const isGameOver = computed(() => cardsState.matched.size === CARD_TYPES.length);

/*-----------------------------------------------------------------
                            Game events
-----------------------------------------------------------------*/

const restartGame = () => {
    cardsState.shuffled = getShuffledCards();
    cardsState.flipped.clear();
    cardsState.matched.clear();
    cardsState.areDisabled = false;
};

/**
 * @param card {String}
 * @param index {Number}
 */
const flipCard = (card, index) => {
    const { flipped } = cardsState;

    if (cardsState.areDisabled || isGameOver.value || isCardFlipped(card, index)) {
        return;
    }

    const indexes = [...(flipped.get(card) ?? []), index];

    flipped.set(card, indexes);

    if (flipped.size > 1) {
        cardsState.areDisabled = true;

        setTimeout(() => {
            cardsState.areDisabled = false;

            flipped.clear();
        }, TRANSITION_DELAY * 3);
    } else if (indexes.length === CARD_MATCH_COUNT) {
        setTimeout(() => {
            cardsState.matched.add(card);

            flipped.clear();
        }, TRANSITION_DELAY);
    }
};
</script>

<template>
    <div class="wm-game">
        <div class="wm-cards">
            <Card
                v-for="(card, index) in cardsState.shuffled"
                :key="`card: ${index}`"
                :type="card"
                :is-flipped="isCardFlipped(card, index)"
                :is-matched="cardsState.matched.has(card)"
                @click="flipCard(card, index)"
            />
        </div>

        <transition
            appear
            name="slide-up"
            type="transition"
            mode="out-in"
        >
            <ButtonUI
                v-if="isGameOver"
                size="lg"
                @click="restartGame"
            >
                Restart
            </ButtonUI>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;

.wm-game {
    display: flex;
    flex-direction: column;
    align-items: center;

    > .wm-btn--lg {
        width: calc(100% * 2 / 3);
    }
}

.wm-cards {
    display: flex;
    flex-wrap: wrap;
    gap: vars.$space--half;
    width: 100%;
    margin-bottom: vars.$space;
}
</style>
