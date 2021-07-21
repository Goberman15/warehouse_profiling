import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSTickerLabel, setWrapping } from '../store/action';

const AdditionalServices = () => {
    const dispatch = useDispatch()
    const cargoType = useSelector(state => state.cargoType);
    const stickerLabel = useSelector(state => state.stickerLabel);
    const wrapping = useSelector(state => state.wrapping);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if(cargoType === 'Parts') {
            setDisabled(true);
        }
    }, [cargoType])

    const checkHandler = event => {
        const { name, checked } = event.target;
        if (name === 'wrapping') {
            dispatch(setWrapping({wrapping: checked}))
        } else {
            dispatch(setSTickerLabel({stickerLabel: checked}))
        }
    }

    return (
        <div className="full-width container">
            <p className="input-title">Additional Services</p>
            <div className="form-check form-check-inline mb-1">
                <input 
                    className="form-check-input check-box"
                    name="sticker"
                    type="checkbox"
                    checked={stickerLabel}
                    onChange={checkHandler}
                    disabled={disabled}
                />
                <span className="check-title">
                    Sticker Label
                </span>
            </div>
            <div className="form-check form-check-inline mb-1 ml-5">
                <input 
                    className="form-check-input check-box"
                    name="wrapping"
                    type="checkbox"
                    checked={wrapping}
                    onChange={checkHandler}
                />
                <span className="check-title">
                    Wrapping
                </span>
            </div>
        </div>
    );
}

export default AdditionalServices;
