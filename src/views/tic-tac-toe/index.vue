<script>
export default {
    name: 'TicTacToeView',
};
</script>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, reactive } from 'vue';

import { WINNABLE_POSITIONS } from '@/enums/tic-tac-toe';
import ButtonUI from '@/components/UI/ButtonUI';

const positionsState = reactive({
    selected: new Map(),
    winning: new Set(),
});

const isFirstPlayerTurn = ref(true);

const currentFigure = computed(() => (isFirstPlayerTurn.value ? 'x' : 'o'));

const isGameOver = computed(() => positionsState.selected.size === 9 || positionsState.winning.size > 0);

/**
 * @param position {Number}
 *
 * @return {String}
 */
const getCellRenderKey = (position) => {
    let key = `cell: ${position}`;

    if (positionsState.winning.has(position)) {
        key += ' (winnable)';
    }

    if (
        positionsState.selected.size === 9 &&
        positionsState.selected.has(position) &&
        positionsState.winning.size === 0
    ) {
        key += ' (draw)';
    }

    return key;
};

const restartGame = () => {
    positionsState.selected.clear();
    positionsState.winning.clear();

    isFirstPlayerTurn.value = true;
};

const hasPlayerWon = () => {
    if (positionsState.selected.size < 5) {
        return false;
    }

    const playerPositions = [];

    positionsState.selected.forEach((figure, position) => {
        if (currentFigure.value === figure) {
            playerPositions.push(position);
        }
    });

    playerPositions.sort((a, b) => a - b);

    const playerPositionsSet = new Set(playerPositions);

    for (const position of playerPositions) {
        if (WINNABLE_POSITIONS[position]) {
            for (const [a, b] of WINNABLE_POSITIONS[position]) {
                if (playerPositionsSet.has(a) && playerPositionsSet.has(b)) {
                    positionsState.winning = new Set([position, a, b]);

                    return true;
                }
            }
        }
    }

    return false;
};

/**
 * @param position {Number}
 */
const togglePosition = (position) => {
    if (!positionsState.selected.has(position) && !isGameOver.value) {
        positionsState.selected.set(position, currentFigure.value);

        if (!hasPlayerWon()) {
            isFirstPlayerTurn.value = !isFirstPlayerTurn.value;
        }
    }
};

/**
 * @param event {KeyboardEvent}
 */
const onKeypressPosition = ({ key }) => {
    const position = Number(key);

    if (position && position >= 1 && key <= 9) {
        togglePosition(Number(key));
    }
};

onMounted(() => {
    document.addEventListener('keyup', onKeypressPosition);

    onBeforeUnmount(() => removeEventListener('keyup', onKeypressPosition));
});
</script>

<template>
    <div class="wm-game">
        <transition
            appear
            name="fade"
            type="transition"
        >
            <div
                class="wm-board"
                :class="{
                    'wm-board--winnable': positionsState.winning.size > 0,
                }"
                style="transition-delay: 300ms"
            >
                <button
                    v-for="position in 9"
                    :key="`position: ${position}`"
                    class="wm-cell"
                    :class="{
                        'wm-cell--selected': positionsState.selected.has(position),
                        'wm-cell--winnable': positionsState.winning.has(position),
                    }"
                    :data-current-figure="currentFigure"
                    :disabled="isGameOver"
                    @click="togglePosition(position)"
                >
                    <transition
                        name="scale"
                        type="transition"
                        mode="out-in"
                    >
                        <span
                            v-if="positionsState.selected.has(position)"
                            :key="getCellRenderKey(position)"
                        >
                            {{ positionsState.selected.get(position) }}
                        </span>

                        <small v-else-if="!isGameOver">
                            {{ position }}
                        </small>
                    </transition>

                    <transition
                        appear
                        name="scale"
                        type="transition"
                        mode="out-in"
                    >
                        <b v-if="positionsState.winning.has(position)">
                            {{ position }}
                        </b>
                    </transition>
                </button>
            </div>
        </transition>

        <transition
            appear
            name="fade"
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
@use '@/assets/styles/mixins' as mixins;

.wm-game {
    display: flex;
    flex-direction: column;
    align-items: center;

    > .wm-btn--lg {
        width: calc(100% * 2 / 3);
    }
}

.wm-board {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: vars.$space;
    border: 1px solid vars.$primary-color;
    border-radius: vars.$base-border-radius;
    overflow: hidden;
    aspect-ratio: 1/1;

    &--winnable .wm-cell:not(.wm-cell--winnable) {
        color: vars.$silver;
    }
}

.wm-cell {
    flex: 1 1 33.3333%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: inherit;
    border: none;
    transition: vars.$base-transition;

    &:nth-child(-n + 6) {
        border-bottom: 1px solid vars.$primary-color;
    }

    &:nth-child(3n + 2) {
        border-left: 1px solid vars.$primary-color;
        border-right: 1px solid vars.$primary-color;
    }

    &::after {
        content: attr(data-current-figure);
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: vars.$silver;
        transform: scale(0);
    }

    &::after,
    > span {
        font-size: 48px;
        font-weight: 700;
        padding-bottom: 10px;
    }

    > small {
        font-size: 20px;
        color: vars.$silver;
        transition: vars.$base-transition;
    }

    > b {
        position: absolute;
        top: vars.$space;
        right: vars.$space;
        color: vars.$silver;
        font-size: 14px;
        line-height: 1;
    }

    &--selected {
        @include mixins.hover() {
            > small {
                transform: scale(0.75);
            }
        }
    }

    &:not(&--selected) {
        &::after {
            transition: vars.$base-transition;
        }

        @include mixins.hover() {
            &::after {
                transform: scale(1);
            }

            > small {
                opacity: 0.5;
                transform: translateY(-100%) scale(0.75);
            }
        }
    }

    &--winnable {
        position: relative;
        background-color: vars.$tertiary-color;
    }
}
</style>
