import React, { useState, createRef } from 'react';
import { dimensionCategorizer } from '../helpers/dimension.js';
import { handlingCategorizer } from '../helpers/handling.js';
import { locationCategorizer } from '../helpers/location.js';
import { levelCategorizer} from '../helpers/level.js';
import Pdf from "react-to-pdf";

const XForm = () => {
    // Input
    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [grossWeight, setGrossWeight] = useState(0);
    const [monthlyStoring, setMonthlyStoring] = useState(0);
    const [type, setType] = useState("");
    // Output
    const constanta = 0.453592;
    const [volume, setVolume] = useState(0);
    const [areaAllocation, setAreaAllocation] = useState(0);
    const [dimension, setDimension] = useState("");
    const [handling, setHandling] = useState("");
    const [location, setLocation] = useState("");
    const [level, setLevel] = useState("");
    const [done, setDone] = useState(false);

    const ref = createRef();
    const options = {
        orientation: 'landscape'
    }

    const inputValueChange = event => {
        const { name, value } = event.target;

        switch (name) {
            case "length":
                setLength(value);
                break;
            case "width":
                setWidth(value);
                break;
            case "height":
                setHeight(value);
                break;
            case "weight":
                setGrossWeight(value);
                break;
            case "type":
                setType(value);
                break;
            case "monthly":
                setMonthlyStoring(value);
                break;
            default:
                break;
        }
    }

    const processInput = () => {
        const area = ((length * width)/1000000)*monthlyStoring
        const volumeQty = ((length * width * height)/1000000)*monthlyStoring;
        const weight = constanta * grossWeight;
        const dimensionCategory = dimensionCategorizer((volumeQty * 1000000)/monthlyStoring);
        const handlingCategory = handlingCategorizer(weight);
        const locationCategory = locationCategorizer(volumeQty);
        
        setDimension(dimensionCategory);
        setVolume(volumeQty);
        setAreaAllocation(area);
        setHandling(handlingCategory);
        setLocation(locationCategory);
        
        if (location !== 'Floor') {
            const levelCategory = levelCategorizer(weight, locationCategory)
            setLevel(levelCategory);
        } else {
            setLevel('-');
        }

        setLength(0);
        setHeight(0);
        setWidth(0);
        setGrossWeight(0);
        setType("");
        setMonthlyStoring(0);
        setDone(true);
    }

    const restart = () => {
        setDone(false);
    }

    return (
        <div className="container p-3">
            
            <Pdf targetRef={ref} filename="try.pdf" options={options} x={2}>
                {({ toPdf }) => <button onClick={toPdf}>Print PDF</button>}
            </Pdf>
        </div>
    );
}

export default XForm;
