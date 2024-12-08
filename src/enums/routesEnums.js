/*-----------------------------------------------------------------
                              General
-----------------------------------------------------------------*/

export const ROUTES_NAMES = {
    HOME: 'wm.route.home',
    TIC_TAC_TOE: 'wm.route.tic-tac-toe',
    SNAKE: 'wm.route.snake',
    MEMORY_CARDS: 'wm.route.memory-cards',
    WORDLE: 'wm.route.wordle',
    NOT_FOUND: 'wm.route.not-found',
};

/*-----------------------------------------------------------------
                            Game routes
-----------------------------------------------------------------*/

export const GAME_ROUTES = [
    { name: ROUTES_NAMES.TIC_TAC_TOE, title: 'Tic Tac Toe' },
    { name: ROUTES_NAMES.SNAKE, title: 'Snake' },
    { name: ROUTES_NAMES.MEMORY_CARDS, title: 'Memory Cards' },
    { name: ROUTES_NAMES.WORDLE, title: 'Wordle' },
];
