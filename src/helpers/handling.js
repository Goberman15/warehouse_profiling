// export function handlingCategorizer(weight) {
//     if (weight >= 1000) {
//         return "Forklift";
//     } else if (weight >= 25) {
//         return "Hand Jack Pallet";
//     } else {
//         return "People";
//     }
// }

export function handlingCategorizer(type, weight) {
    if (type.includes('Container')) {
        return 'Reach Stacker';
    } else if (type.includes('Tyres')) {

    }
}

const tyresHandler = weight => {
    if (weight >= 2000) {
        return 'Crane'
    } else {
        return 'Bale Clamp';
    }
}
