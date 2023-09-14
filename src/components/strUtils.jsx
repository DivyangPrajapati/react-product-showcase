export function formatString(inputString) {
    if (!inputString) {
        return ''; // Handle empty input
    }

    // Replace hyphens with spaces and capitalize each word
    const formattedString = inputString
        .replace(/-/g, ' ') // Replace all hyphens globally
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return formattedString;
}