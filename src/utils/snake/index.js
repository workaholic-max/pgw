import { BOARD_SIZE, INITIAL_SNAKE_POSITIONS, OPPOSITE_SNAKE_DIRECTIONS, SNAKE_DIRECTIONS } from '@/enums/snake';

/**
 * @return {Number}
 */
export const getFoodRandomPosition = (excludeInitialSnakePositions = false) => {
    const position = Math.floor(Math.random() * BOARD_SIZE) + 1;

    if (excludeInitialSnakePositions && INITIAL_SNAKE_POSITIONS.some(({ x, y }) => position === x || position === y)) {
        return getFoodRandomPosition(excludeInitialSnakePositions);
    }

    return position;
};

/**
 * @param head {Object}
 * @param body {Object}
 *
 * @return {Boolean}
 */
export const hasCollision = (head, body) =>
    head.x <= 0 ||
    head.x > BOARD_SIZE ||
    head.y <= 0 ||
    head.y > BOARD_SIZE ||
    body.some(({ x, y }) => head.x === x && head.y === y);

/**
 * @param currentDirection {String}
 * @param newDirection {String}
 *
 * @return {Boolean}
 */
export const isChangeDirectionAllowed = (currentDirection, newDirection) =>
    Object.values(SNAKE_DIRECTIONS).some((direction) => direction === newDirection) &&
    currentDirection !== newDirection &&
    currentDirection !== OPPOSITE_SNAKE_DIRECTIONS[newDirection];
