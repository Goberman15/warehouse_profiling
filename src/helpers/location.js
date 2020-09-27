export function locationCategorizer(volume) {
    if (volume >= 3.213) {
        return "Floor";
    } else if (volume >= 0.02) {
        return "Racking";
    } else if (volume >= 0.0078) {
        return "Shelving";
    } else {
        return "Cabinet";
    }
}