<script>
export default {
    name: 'SnakeView',
};
</script>

<script setup>
import { reactive, watch } from 'vue';

import { getFoodRandomPosition, hasCollision, isChangeDirectionAllowed } from '@/utils/snake';
import {
    BOARD_SIZE,
    INITIAL_SNAKE_POSITIONS,
    INITIAL_SNAKE_DIRECTION,
    SNAKE_HEAD_MOVEMENTS,
    INITIAL_SNAKE_SPEED,
    SNAKE_DIRECTIONS,
} from '@/enums/snake';
import ButtonUI from '@/components/UI/ButtonUI';
import ArrowIcon from '@/components/icons/ArrowIcon';
import RestartIcon from '@/components/icons/RestartIcon';
import PlayIcon from '@/components/icons/PlayIcon';

/*-----------------------------------------------------------------
                             Game state
-----------------------------------------------------------------*/

const gameState = reactive({
    score: 0,
    isStarted: false,
    isOver: false,
});

/*-----------------------------------------------------------------
                            Snake state
-----------------------------------------------------------------*/

const snakeState = reactive({
    positions: [...INITIAL_SNAKE_POSITIONS],
    direction: INITIAL_SNAKE_DIRECTION,
    speed: INITIAL_SNAKE_SPEED,
});

let snakeMoveInterval;

const setSnakeMoveInterval = () => {
    clearInterval(snakeMoveInterval);

    snakeMoveInterval = setInterval(moveSnake, snakeState.speed);
};

const setInitialSnakeState = () => {
    snakeState.positions = [...INITIAL_SNAKE_POSITIONS];
    snakeState.direction = INITIAL_SNAKE_DIRECTION;
    snakeState.speed = INITIAL_SNAKE_SPEED;
};

watch(
    () => gameState.score,
    (score) => {
        const speed = Math.max(100, INITIAL_SNAKE_SPEED - Math.floor(score / 5) * 15);

        if (snakeState.speed !== speed) {
            snakeState.speed = speed;

            setSnakeMoveInterval();
        }

        if (score === 30) {
            gameOver();
        }
    }
);

/*-----------------------------------------------------------------
                             Food state
-----------------------------------------------------------------*/

const foodPosition = reactive({
    x: getFoodRandomPosition(true),
    y: getFoodRandomPosition(true),
});

const setRandomFoodPosition = () => {
    foodPosition.x = getFoodRandomPosition(gameState.isOver);
    foodPosition.y = getFoodRandomPosition(gameState.isOver);
};

/*-----------------------------------------------------------------
                            Game events
-----------------------------------------------------------------*/

const moveSnake = () => {
    const head = { ...snakeState.positions[0] };

    const { x, y } = SNAKE_HEAD_MOVEMENTS[snakeState.direction];

    head.x += x;
    head.y += y;

    if (hasCollision(head, snakeState.positions.slice(1))) {
        gameOver();

        return;
    }

    snakeState.positions.unshift(head);

    if (head.x === foodPosition.x && head.y === foodPosition.y) {
        gameState.score++;

        setRandomFoodPosition();
    } else {
        snakeState.positions.pop();
    }
};

/**
 * @param event {KeyboardEvent}
 */
const changeDirection = ({ key }) => {
    if (isChangeDirectionAllowed(snakeState.direction, key)) {
        snakeState.direction = key;
    }
};

/**
 * @param direction {String}
 */
const onClickDirectionControl = (direction) => {
    if (gameState.isStarted && isChangeDirectionAllowed(snakeState.direction, direction)) {
        snakeState.direction = direction;
    }
};

const startGame = () => {
    if (gameState.isOver) {
        setInitialSnakeState();
        setRandomFoodPosition();
    }

    gameState.score = 0;
    gameState.isStarted = true;
    gameState.isOver = false;

    setSnakeMoveInterval();

    window.addEventListener('keydown', changeDirection);
};

const gameOver = () => {
    gameState.isStarted = false;
    gameState.isOver = true;

    clearInterval(snakeMoveInterval);

    window.removeEventListener('keydown', changeDirection);
};

/**
 * @param x {Number}
 * @param y {Number}
 *
 * @return {Boolean}
 */
const isSnakeCell = (x, y) => snakeState.positions.some((segment) => segment.x === x && segment.y === y);

/**
 * @param x {Number}
 * @param y {Number}
 *
 * @return {Boolean}
 */
const isFoodCell = (x, y) => foodPosition.x === x && foodPosition.y === y;

/**
 * @param direction {String}
 *
 * @return {Boolean}
 */
const isDirectionControlDisabled = (direction) =>
    !gameState.isStarted || !isChangeDirectionAllowed(snakeState.direction, direction);
</script>

<template>
    <transition
        appear
        name="slide-down"
        type="transition"
    >
        <div
            class="wm-game"
            style="transition-delay: 250ms"
        >
            <div class="wm-board">
                <div
                    v-for="row in BOARD_SIZE"
                    :key="`row: ${row}`"
                    class="wm-row"
                >
                    <div
                        v-for="cell in BOARD_SIZE"
                        :key="`cell: ${cell}`"
                        class="wm-cell"
                        :class="{
                            'wm-cell--snake': isSnakeCell(cell, row),
                            'wm-cell--food': isFoodCell(cell, row),
                        }"
                    />
                </div>
            </div>

            <div class="wm-controls">
                <div class="wm-controls__wrapper">
                    <ButtonUI
                        :is-active="snakeState.direction === SNAKE_DIRECTIONS.UP"
                        :disabled="isDirectionControlDisabled(SNAKE_DIRECTIONS.UP)"
                        @click="onClickDirectionControl(SNAKE_DIRECTIONS.UP)"
                    >
                        <ArrowIcon direction="up" />
                    </ButtonUI>
                </div>

                <div class="wm-controls__wrapper">
                    <ButtonUI
                        :is-active="snakeState.direction === SNAKE_DIRECTIONS.LEFT"
                        :disabled="isDirectionControlDisabled(SNAKE_DIRECTIONS.LEFT)"
                        @click="onClickDirectionControl(SNAKE_DIRECTIONS.LEFT)"
                    >
                        <ArrowIcon direction="left" />
                    </ButtonUI>

                    <ButtonUI
                        class="wm-game-state-control"
                        :disabled="gameState.isStarted"
                        @click="startGame"
                    >
                        <template v-if="gameState.isStarted">
                            <span>{{ gameState.score }}</span>
                            <small>score</small>
                        </template>

                        <template v-else-if="gameState.score > 0">
                            <RestartIcon
                                :width="20"
                                :height="20"
                            />

                            <small>{{ `score: ${gameState.score}` }}</small>
                        </template>

                        <PlayIcon
                            v-else
                            :width="28"
                            :height="28"
                        />
                    </ButtonUI>

                    <ButtonUI
                        :is-active="snakeState.direction === SNAKE_DIRECTIONS.RIGHT"
                        :disabled="isDirectionControlDisabled(SNAKE_DIRECTIONS.RIGHT)"
                        @click="onClickDirectionControl(SNAKE_DIRECTIONS.RIGHT)"
                    >
                        <ArrowIcon direction="right" />
                    </ButtonUI>
                </div>

                <div class="wm-controls__wrapper">
                    <ButtonUI
                        :is-active="snakeState.direction === SNAKE_DIRECTIONS.DOWN"
                        :disabled="isDirectionControlDisabled(SNAKE_DIRECTIONS.DOWN)"
                        @click="onClickDirectionControl(SNAKE_DIRECTIONS.DOWN)"
                    >
                        <ArrowIcon />
                    </ButtonUI>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/snake/variables' as gameVars;

.wm-game {
    @media screen and (max-width: vars.$mobile-lg-breakpoint) {
        flex: 1 1 100%;
        display: flex;
        flex-direction: column;
        gap: vars.$space;
    }
}

.wm-board {
    display: flex;
    flex-direction: column;
    border: 1px solid vars.$primary-color;
    border-radius: vars.$base-border-radius;
    aspect-ratio: 1/1;

    @media screen and (min-width: vars.$mobile-lg-breakpoint) {
        margin-bottom: vars.$space * 2;
    }
}

.wm-row {
    flex: 1 1 auto;
    display: flex;
}

.wm-cell {
    flex: 1 1 auto;

    &--snake,
    &--food {
        border-radius: 50%;
    }

    &--snake {
        background-color: gameVars.$snake-color;
        outline: 1px solid vars.$background-color;
    }

    &--food {
        background-color: gameVars.$food-color;
    }
}

.wm-controls {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: vars.$space--half;

    &__wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: vars.$space--half;

        > .wm-btn {
            $size: 60px;

            flex: 1 1 $size * 2;
            max-width: 50%;
            height: $size * 1.25;
            padding: 0;

            @media screen and (min-width: vars.$mobile-lg-breakpoint) {
                flex-grow: 0;
                height: $size;
            }

            &:not(.wm-game-state-control) > svg {
                $icon-size: calc($size * 0.6);

                width: $icon-size;
                height: $icon-size;
            }

            &.wm-game-state-control {
                flex-basis: $size;
                flex-direction: column;
                gap: 2px;

                @media screen and (min-width: vars.$mobile-lg-breakpoint) {
                    flex-basis: $size * 2;
                }

                > span {
                    font-size: 18px;
                }

                > small {
                    color: vars.$silver;
                }
            }

            &--active {
                border-color: gameVars.$direction-control-color;
                color: gameVars.$direction-control-color;
            }
        }
    }
}
</style>
