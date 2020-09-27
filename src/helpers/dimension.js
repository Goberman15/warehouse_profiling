export function dimensionCategorizer(volume) {
    if (volume >= 6000) {
        return "Large";
    } else if (volume >= 1000) {
        return "Medium";
    } else if (volume >= 125) {
        return "Small";
    } else {
        return "Very Small"
    }
}