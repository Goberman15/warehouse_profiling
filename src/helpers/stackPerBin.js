export function stackPerBin (type, height, diameter) {
    const twoStack = ['Pallet'];
    const threeStack = ['Container 40 ft.', 'Container HC 40 ft.'];
    const fourStack = ['Container 20 ft.', 'Container HC 20 ft.'];
    const threeHundred = ['Tyres A (Stack Position)', 'Box'];
    const twoHundred = ['Pipe'];
    const hundredAndFiftyHeight = ['Plate', 'H-Beam'];
    const hundredAndFiftyDiameter = ['Steel Bars'];

    if (twoStack.includes(type)) {
        return 2;
    } else if (threeStack.includes(type)) {
        return 3;
    } else if (fourStack.includes(type)) {
        return 4;
    } else if (threeHundred.includes(type)) {
        return Math.ceil(300/height);
    } else if (twoHundred.includes(type)) {
        return Math.ceil(200/diameter);
    } else if (hundredAndFiftyHeight.includes(type)) {
        return Math.ceil(150/height);
    } else if (hundredAndFiftyDiameter.includes(type)) {
        return Math.ceil(150/diameter);
    } else {
        return null;
    }
}
