export const BOARD_SIZE = 20;

export const INITIAL_SNAKE_POSITIONS = [
    { x: 10, y: 8 },
    { x: 10, y: 7 },
    { x: 10, y: 6 },
];

export const SNAKE_DIRECTIONS = {
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
};

export const OPPOSITE_SNAKE_DIRECTIONS = {
    [SNAKE_DIRECTIONS.UP]: SNAKE_DIRECTIONS.DOWN,
    [SNAKE_DIRECTIONS.RIGHT]: SNAKE_DIRECTIONS.LEFT,
    [SNAKE_DIRECTIONS.DOWN]: SNAKE_DIRECTIONS.UP,
    [SNAKE_DIRECTIONS.LEFT]: SNAKE_DIRECTIONS.RIGHT,
};

export const INITIAL_SNAKE_DIRECTION = SNAKE_DIRECTIONS.DOWN;

export const SNAKE_HEAD_MOVEMENTS = {
    [SNAKE_DIRECTIONS.UP]: { x: 0, y: -1 },
    [SNAKE_DIRECTIONS.RIGHT]: { x: 1, y: 0 },
    [SNAKE_DIRECTIONS.DOWN]: { x: 0, y: 1 },
    [SNAKE_DIRECTIONS.LEFT]: { x: -1, y: 0 },
};

export const INITIAL_SNAKE_SPEED = 175;