import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetInput, setCargoType, setStep } from '../store/action';
import arr from '../helpers/pictureArray.js';
import '../styles/CargoType.css';

const CargoType = () => {
    const dispatch = useDispatch();
    const cargoType = useSelector(state => state.cargoType);
    const cargo = useSelector(state => state.cargo);

    const chooseCargoType = cargo => {
        const payload = {
            cargoType: cargo
        };
        dispatch(resetInput());
        dispatch(setCargoType(payload));
        dispatch(setStep({
            step: 2,
            direction: 'forward'
        }));
    }

    return (
        <div className="full-width container flex flex-column justify-content-center">
            <p className="input-title">Cargo Type</p>
            <div className="cargo-type-container">
                {cargo.map((type, idx) => (
                    <div className={`cargo-type-box ${cargoType === type ? 'selected' : ''}`} key={idx} onClick={() => chooseCargoType(type)}>
                        <img src={arr[idx]}
                             alt="pic"
                             className="background-image"
                        />
                        <div className="overlay">
                            <p className="cargo-type-name">{ type }</p>
                            <p className="cargo-type-select">
                                {cargoType === type 
                                 ? (<span className="selected-status"><i className="fas fa-check-square"></i>{'  '}Selected</span>)
                                 : (<span className="selected-status"><i className="fas fa-plus"></i>{'  '}Select</span>)}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default CargoType;
