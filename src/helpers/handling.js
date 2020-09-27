export function handlingCategorizer(weight) {
    if (weight >= 1000) {
        return "Forklift";
    } else if (weight >= 25) {
        return "Hand Jack Pallet";
    } else {
        return "People";
    }
}