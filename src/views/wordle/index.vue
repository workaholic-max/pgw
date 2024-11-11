<script>
export default {
    name: 'WordleView',
};
</script>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue';

import { getRandomWord } from '@/utils/wordle';
import { ATTEMPTS_COUNT, ALPHABET_LETTERS } from '@/enums/wordle';
import ButtonUI from '@/components/UI/ButtonUI';

/*-----------------------------------------------------------------
                             Game state
-----------------------------------------------------------------*/

const gameState = reactive({
    isOver: false,
});

/*-----------------------------------------------------------------
                           Attempts state
-----------------------------------------------------------------*/

const attemptsState = reactive({
    word: getRandomWord(),
    current: 1,
    data: new Map([[1, []]]),
});

const resetAttemptsState = () => {
    attemptsState.word = getRandomWord();
    attemptsState.current = 1;
    attemptsState.data = new Map([[1, []]]);
};

/**
 * @param attempt {Number}
 *
 * @return {Array<Number>}
 */
const getAttemptData = (attempt) => attemptsState.data.get(attempt) || [];

/**
 * @param data {Array}
 */
const setAttemptData = (data) => {
    attemptsState.data.set(attemptsState.current, data);
};

const currentAttemptData = computed(() => getAttemptData(attemptsState.current));

/*-----------------------------------------------------------------
                           Letters state
-----------------------------------------------------------------*/

const lettersState = reactive({
    correct: new Set(),
    halfCorrect: new Set(),
    incorrect: new Set(),
});

const resetLettersState = () => {
    lettersState.correct.clear();
    lettersState.halfCorrect.clear();
    lettersState.incorrect.clear();
};

/**
 * @param attempt {Number}
 * @param letterIndex {Number}
 *
 * @return {String || null}
 */
const getLetterStatus = (attempt, letterIndex) => {
    if (attemptsState.current <= attempt) {
        return null;
    }

    const { word } = attemptsState;

    const letter = getAttemptData(attempt)[letterIndex];

    if (word[letterIndex] === letter) {
        return 'correct';
    }

    if (word.includes(letter)) {
        return 'half-correct';
    }

    return 'incorrect';
};

/**
 * @param attempt {Number}
 * @param letterIndex {Number}
 *
 * @return {Object}
 */
const getLetterDynamicClasses = (attempt, letterIndex) => {
    const { isOver } = gameState;
    const { current } = attemptsState;

    const status = getLetterStatus(attempt, letterIndex);

    return {
        'wm-letter--current': !isOver && current === attempt && currentAttemptData.value.length === letterIndex,
        'wm-letter--inactive': isOver || current < attempt,
        [`wm-letter--${status}`]: status !== null,
    };
};

/**
 * @param letter {String}
 *
 * @return {Object}
 */
const getAlphabetLetterDynamicClasses = (letter) => {
    let status = null;

    if (lettersState.correct.has(letter)) {
        status = 'correct';
    } else if (lettersState.halfCorrect.has(letter)) {
        status = 'half-correct';
    } else if (lettersState.incorrect.has(letter)) {
        status = 'incorrect';
    }

    return {
        [`wm-alphabet-letter--${status}`]: status !== null,
    };
};

const isKeyboardDisabled = computed(
    () => gameState.isOver || currentAttemptData.value.length === attemptsState.word.length
);

/*-----------------------------------------------------------------
                            Game events
-----------------------------------------------------------------*/

const checkAttempt = () => {
    const { word } = attemptsState;

    for (let i = 0; i < currentAttemptData.value.length; i++) {
        const letter = currentAttemptData.value[i];

        if (lettersState.correct.has(letter)) {
            continue;
        }

        if (word[i] === letter) {
            lettersState.correct.add(letter);
            lettersState.halfCorrect.delete(letter);
        } else if (word.includes(letter)) {
            lettersState.halfCorrect.add(letter);
        } else {
            lettersState.incorrect.add(letter);
        }
    }

    if (attemptsState.current === ATTEMPTS_COUNT || currentAttemptData.value.join('') === word) {
        gameState.isOver = true;
    }

    attemptsState.current++;

    setAttemptData([]);
};

const clearLastLetter = () => {
    setAttemptData(currentAttemptData.value.slice(0, -1));
};

/**
 * @param letter {String}
 */
const onClickAlphabetLetter = (letter) => {
    if (!isKeyboardDisabled.value) {
        setAttemptData([...currentAttemptData.value, letter]);
    }
};

/**
 * @param event {KeyboardEvent}
 */
const onKeydown = ({ code }) => {
    if (gameState.isOver) {
        return;
    }

    if (code === 'Backspace' && currentAttemptData.value.length > 0) {
        clearLastLetter();

        return;
    }

    if (code === 'Enter' && currentAttemptData.value.length === attemptsState.word.length) {
        checkAttempt();

        return;
    }

    const letter = code.toLowerCase().replace('key', '');

    if (ALPHABET_LETTERS.has(letter) && !isKeyboardDisabled.value) {
        setAttemptData([...currentAttemptData.value, letter]);
    }
};

const restartGame = () => {
    gameState.isOver = false;

    resetAttemptsState();
    resetLettersState();
};

onMounted(() => {
    window.addEventListener('keydown', onKeydown);

    onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown));
});
</script>

<template>
    <div class="wm-game">
        <div class="wm-board">
            <ul
                v-for="attempt in ATTEMPTS_COUNT"
                :key="`attempt: ${attempt}`"
                class="wm-attempt"
            >
                <li
                    v-for="(_, index) in attemptsState.word.length"
                    :key="`attempt: ${attempt}; letter: ${index}`"
                    class="wm-letter"
                    :class="getLetterDynamicClasses(attempt, index)"
                >
                    {{ getAttemptData(attempt)[index] }}
                </li>
            </ul>
        </div>

        <div class="wm-keyboard">
            <button
                v-for="letter in ALPHABET_LETTERS"
                type="button"
                class="wm-alphabet-letter"
                :class="getAlphabetLetterDynamicClasses(letter)"
                :disabled="isKeyboardDisabled"
                @click="onClickAlphabetLetter(letter)"
            >
                {{ letter }}
            </button>
        </div>

        <transition
            name="slide-up"
            type="transition"
            mode="out-in"
        >
            <ButtonUI
                v-if="gameState.isOver"
                size="lg"
                @click="restartGame"
            >
                Restart
            </ButtonUI>

            <div
                v-else
                class="wm-controls"
            >
                <transition
                    name="slide-up"
                    type="transition"
                    mode="out-in"
                >
                    <ButtonUI
                        v-if="currentAttemptData.length > 0"
                        @click="clearLastLetter"
                    >
                        Clear
                    </ButtonUI>
                </transition>

                <transition
                    name="slide-up"
                    type="transition"
                    mode="out-in"
                >
                    <ButtonUI
                        v-if="currentAttemptData.length === attemptsState.word.length"
                        size="lg"
                        @click="checkAttempt"
                    >
                        Check
                    </ButtonUI>
                </transition>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/wordle/variables' as gameVars;
@use '@/assets/styles/mixins' as mixins;

.wm-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: vars.$space * 2;

    > .wm-btn--lg {
        width: calc(100% * 2 / 3);
    }
}

.wm-board {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: vars.$space--half;
}

.wm-attempt {
    flex: 1 1 auto;
    display: flex;
    gap: vars.$space--half;
}

.wm-letter {
    flex: 0 1 calc((100% / 5) - 4 / 5 * #{vars.$space--half});
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;
    border: 1px solid vars.$primary-color;
    border-radius: vars.$base-border-radius;
    user-select: none;
    pointer-events: none;
    font-size: 32px;
    text-transform: uppercase;
    transition: vars.$base-transition;

    &--current {
        position: relative;

        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            height: 40%;
            width: 1px;
            border-radius: vars.$base-border-radius;
            background-color: vars.$white;
            transform: translate(-50%, -50%);
            animation: fade-animation 1.25s ease-out infinite;
        }
    }

    &--inactive {
        border-color: vars.$tertiary-color;
    }

    &--correct {
        background-color: gameVars.$correct-color;
        border-color: gameVars.$correct-color;
    }

    &--half-correct {
        border-color: gameVars.$half-correct-color;
        color: gameVars.$half-correct-color;
    }

    &--incorrect {
        border-color: gameVars.$incorrect-color;
        color: gameVars.$incorrect-color;
    }
}

@keyframes fade-animation {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.wm-keyboard {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: vars.$space--half;

    @media screen and (max-width: vars.$mobile-lg-breakpoint) {
        max-width: 350px;
    }
}

.wm-alphabet-letter {
    flex: 0 1 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid vars.$primary-color;
    border-radius: vars.$base-border-radius;
    aspect-ratio: 1/1;
    user-select: none;
    font-size: 20px;
    text-transform: uppercase;
    transition: vars.$base-transition;

    @media screen and (max-width: vars.$mobile-lg-breakpoint) {
        flex-basis: 45px;
    }

    &--correct {
        background-color: gameVars.$correct-color;
        border-color: gameVars.$correct-color;
    }

    &--half-correct {
        border-color: gameVars.$half-correct-color;
        color: gameVars.$half-correct-color;
    }

    &--incorrect {
        border-color: gameVars.$incorrect-color;
        color: gameVars.$incorrect-color;
    }

    &:not(&--correct, &--half-correct, &--incorrect) {
        &:disabled {
            opacity: 0.25;
        }

        @include mixins.hover() {
            background-color: vars.$primary-color;
        }
    }
}

.wm-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: vars.$space * 2;
}
</style>
