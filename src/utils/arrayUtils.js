/**
 * @param target {Array}
 *
 * @return {Array}
 */
export const shuffleArray = (target) => {
    const result = Array.from(target);

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
};
