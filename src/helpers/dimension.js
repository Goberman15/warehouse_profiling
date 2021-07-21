export function dimensionCategorizer(type, volume) {
    if (type.includes('Tyres')) {
        return tyreCategorizer(volume);
    } else {
        return nonTyreCategorizer(volume);
    } 
}

const tyreCategorizer = volume => {
    if (volume >= 90) {
        return 'Giant';
    } else if (volume >= 60) {
        return 'Large';
    } else if (volume >= 40) {
        return 'Medium'
    } else {
        return 'Small';
    }
}

const nonTyreCategorizer = volume => {
    if (volume >= 6000) {
        return 'Large';
    } else if (volume >= 1000) {
        return 'Medium';
    } else if (volume >= 125) {
        return 'Small'
    } else {
        return 'Very Small';
    }
}