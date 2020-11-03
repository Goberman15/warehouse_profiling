import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDiameter, setHeight, setLength, setStep, setWidth } from '../store/action';

const Dimension = () => {
    const dispatch = useDispatch();
    const step = useSelector(state => state.step);
    const direction = useSelector(state => state.direction);
    const cargoType = useSelector(state => state.cargoType);
    const cargoLength = useSelector(state => state.cargoLength);
    const width = useSelector(state => state.width);
    const height = useSelector(state => state.height)
    const diameter = useSelector(state => state.diameter);

    const [showLength, setShowLength] = useState(true);
    const [showWidth, setShowWidth] = useState(true);
    const [showHeight, setShowHeight] = useState(true);
    const [showDiameter, setShowDiameter] = useState(false);

    const skipLength = ["Tyre A (Stack Position)", "Tyre B (Non Stack)"];
    const skipWidth = ["Tyre A (Stack Position)", "Tyre B (Non Stack)", "Pipe", "Steel Bars"];
    const skipHeight = ["Pallet", "Pipe", "Chain", "Steel Bars"];
    const unskipDiameter = ["Tyre A (Stack Position)", "Tyre B (Non Stack)", "Pipe", "Steel Bars"];

    useEffect(() => {
        if(cargoType.includes('Container')) {
            dispatch(setWidth({width: 605}));
            if (cargoType.includes('20 ft.')) {
                dispatch(setLength({cargoLength: 604}))
            } else if (cargoType.includes('40 ft.')) {
                dispatch(setLength({cargoLength: 1219}))
            }

            if (cargoType.includes('HC')) {
                dispatch(setHeight({height: 268}));
            } else {
                dispatch(setHeight({height: 259}));
            }

            if (direction === 'forward') {
                dispatch(setStep({
                    step: step + 1,
                    direction: 'forward'
                }));
            } else {
                dispatch(setStep({
                    step: step - 1,
                    direction: 'backward'
                }));
            }           
        } else {
            if (skipLength.includes(cargoType)) {
                setShowLength(false);
            }
            if (skipWidth.includes(cargoType)) {
                setShowWidth(false);
            }
            if (skipHeight.includes(cargoType)) {
                setShowHeight(false);
            }
            if (unskipDiameter.includes(cargoType)) {
                setShowDiameter(true);
            }
        }
    }, [])

    const inputChangeHandler = event => {
        const { name, value } = event.target;
        const payload = {
            [name]: value
        }
        switch(name) {
            case 'cargoLength':
                dispatch(setLength(payload));
                break;
            case 'width':
                dispatch(setWidth(payload));
                break;
            case 'height':
                dispatch(setHeight(payload));
                break;
            case 'diameter':
                dispatch(setDiameter(payload));
                break;
            default:
                break;
        }
        
    }

    return (
        <div className="full-width container">
            <p className="input-title">Dimension</p>
            <div className="row text-center">
                {showLength &&
                    <div className="col-3 mx-auto">
                        <label htmlFor="length">Length</label>
                        <div className="input-group mb-3 justify-content-center">
                            <input
                                type="number"
                                name="cargoLength"
                                className="form-control"
                                value={ cargoLength }
                                onChange={ inputChangeHandler }
                                autoFocus
                            />
                            <div className="input-group-append">
                                <span className="input-group-text">cm</span>
                            </div>
                        </div>
                    </div>
                }
                {showWidth &&
                    <div className="col-3 mx-auto">
                        <label htmlFor="width">Width</label>
                        <div className="input-group mb-3 justify-content-center">
                            <input
                                type="number"
                                name="width"
                                className="form-control"
                                value={ width }
                                onChange={ inputChangeHandler }
                                autoFocus
                            />
                            <div className="input-group-append">
                                <span className="input-group-text">cm</span>
                            </div>
                        </div>
                    </div>
                }
                {showHeight &&
                    <div className="col-3 mx-auto">
                        <label htmlFor="height">Height</label>
                        <div className="input-group mb-3 justify-content-center">
                            <input
                                type="number"
                                name="height"
                                className="form-control"
                                value={ height }
                                onChange={ inputChangeHandler }
                                autoFocus
                            />
                            <div className="input-group-append">
                                <span className="input-group-text">cm</span>
                            </div>
                        </div>
                    </div>
                }
                {showDiameter &&
                    <div className="col-3 mx-auto">
                        <label htmlFor="diameter">Diameter</label>
                        <div className="input-group mb-3 justify-content-center">
                            <input
                                type="number"
                                name="diameter"
                                className="form-control"
                                value={ diameter }
                                onChange={ inputChangeHandler }
                                autoFocus
                            />
                            <div className="input-group-append">
                                <span className="input-group-text">cm</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Dimension;
