import React, { useState } from 'react';
import { dimensionCategorizer } from '../helpers/dimension.js';
import { handlingCategorizer } from '../helpers/handling.js';
import { locationCategorizer } from '../helpers/location.js';
import { levelCategorizer} from '../helpers/level.js';

const Form = () => {
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
        <div className="container p-5">
            {!done &&
            <>
                <form>
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="length">Length</label>
                                <input
                                    type="number"
                                    name="length"
                                    id="length"
                                    className="form-control"
                                    value={ length }
                                    onChange={(event) => inputValueChange(event)}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="width">Width</label>
                                <input
                                    type="number"
                                    name="width"
                                    id="width"
                                    className="form-control"
                                    value={ width }
                                    onChange={(event) => inputValueChange(event)}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="height">Height</label>
                                <input
                                    type="number"
                                    name="height"
                                    id="height"
                                    className="form-control"
                                    value={ height }
                                    onChange={(event) => inputValueChange(event)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight">Gross Weight</label>
                        <input type="number" name="weight" id="weight" className="form-control" placeholder="0" min="0" value={ grossWeight } onChange={(event) => inputValueChange(event)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select
                            name="type"
                            id="type"
                            className="custom-select"
                            value={ type }
                            onChange={(event) => inputValueChange(event)}
                        >
                            <option value="" disabled>---Select Type---</option>
                            <option value="Ban">Ban</option>
                            <option value="Pallette">Pallette</option>
                            <option value="Parts">Parts</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="monthly">Monthly Storing</label>
                        <input
                            type="number"
                            name="monthly"
                            id="monthly"
                            className="form-control"
                            placeholder="0"
                            min="0"
                            value={ monthlyStoring }
                            onChange={(event) => inputValueChange(event)}
                        />
                    </div>
                </form>
                <button className="btn btn-primary btn-lg btn-block" onClick={ processInput }>Submit</button>
            </>
            }
            {done &&
            <div className="container mt-3 d-flex flex-column justify-content-center align-items-between">
                <h4 className="mb-3">Area Allocation: { areaAllocation } m2</h4>
                <h4 className="mb-3">Volume: { volume } m3</h4>
                <h4 className="mb-3">Dimension: { dimension }</h4>
                <h4 className="mb-3">Handling: { handling }</h4>
                <h4 className="mb-3">Location: { location }</h4>
                <h4 className="mb-3">Level: Level { level }</h4>

                <button className="btn btn-primary btn-lg" onClick={ restart }>Back to Input</button>
            </div>
            }
        </div>
    );
}

export default Form;
