/**
 * check_loop.cjs
 * Compares two strings (usually error messages) to determine if the agent is looping.
 */

const fs = require('fs');

const args = process.argv.slice(2);
const currentIdx = args.indexOf('--current');
const previousIdx = args.indexOf('--previous');

if (currentIdx === -1 || previousIdx === -1) {
    console.log("Usage: node check_loop.cjs --current \"error1\" --previous \"error2\"");
    process.exit(0);
}

const current = args[currentIdx + 1] || "";
const previous = args[previousIdx + 1] || "";

function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
            }
        }
    }
    return matrix[b.length][a.length];
}

const distance = levenshteinDistance(current, previous);
const maxLength = Math.max(current.length, previous.length);
const similarity = maxLength === 0 ? 1 : (1 - distance / maxLength);

console.log(`Similarity Score: ${(similarity * 100).toFixed(2)}%`);

if (similarity > 0.9) {
    console.log("\n⚠️ LOOP DETECTED!");
    console.log("Error outputs are nearly identical. Stop and change your approach.");
} else {
    console.log("\n✅ No loop detected. Errors are significantly different.");
}
