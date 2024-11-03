import { WINNABLE_POSITIONS } from '@/enums/tic-tac-toe';

/**
 * @param selectedPositions {Map}
 * @param currentFigure {String}
 *
 * @return {Array}
 */
export const getWinnerPositions = (selectedPositions, currentFigure) => {
    if (selectedPositions.size < 5) {
        return [];
    }

    const playerPositions = [];

    selectedPositions.forEach((figure, position) => {
        if (currentFigure === figure) {
            playerPositions.push(position);
        }
    });

    playerPositions.sort((a, b) => a - b);

    const playerPositionsSet = new Set(playerPositions);

    for (const position of playerPositions) {
        if (WINNABLE_POSITIONS[position]) {
            for (const [a, b] of WINNABLE_POSITIONS[position]) {
                if (playerPositionsSet.has(a) && playerPositionsSet.has(b)) {
                    return [position, a, b];
                }
            }
        }
    }

    return [];
};
