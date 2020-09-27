const cabinetLevel = weight => {
    if (weight >= 200) {
        return 'A';
    } else if (weight >= 160) {
        return 'C';
    } else if (weight >= 80) {
        return 'H';
    }
}

const shelfLevel = weight => {
    if (weight >= 200) {
        return 'A';
    } else if (weight >= 160) {
        return 'B';
    } else if (weight >= 128) {
        return 'C';
    } else if (weight >= 102) {
        return 'D';
    } else if (weight >= 82) {
        return 'E';
    } else if (weight >= 66) {
        return 'F';
    } else if (weight >= 52) {
        return 'G';
    } else if (weight >= 42) {
        return 'A';
    } else if (weight >= 34) {
        return 'B';
    } else if (weight >= 27) {
        return 'C';
    } else if (weight >= 21) {
        return 'D';
    } else if (weight >= 17) {
        return 'E';
    } else if (weight >= 14) {
        return 'F';
    } else if (weight >= 11) {
        return 'G';
    }
}

const rackLevel = weight => {
    if (weight >= 1600) {
        return '1';
    } else if (weight >= 1280) {
        return '2'
    } else if (weight >= 1120) {
        return '3'
    } else if (weight >= 960) {
        return '4'
    } else if (weight >= 800) {
        return '5'
    } else if (weight >= 640) {
        return '6'
    } else if (weight >= 480) {
        return '7'
    }
}

export function levelCategorizer(weight, location) {
    if (location === 'Cabinet') {
        return cabinetLevel(weight);
    } else if (location === 'Shelving') {
        return shelfLevel(weight);
    } else if (location === 'Racking') {
        return rackLevel(weight);
    }
}