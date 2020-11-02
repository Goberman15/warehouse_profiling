import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCargoType } from '../store/action';
import '../styles/CargoType.css';

const CargoType = () => {
    const dispatch = useDispatch();
    const cargoType = useSelector(state => state.cargoType);
    const cargo = useSelector(state => state.cargo);

    const chooseCargoType = cargo => {
        const payload = {
            cargoType: cargo
        };

        dispatch(setCargoType(payload));
    }

    return (
        <div className="full-width container flex flex-column justify-content-center">
            <p className="input-title">Cargo Type</p>
            <div className="cargo-type-container">
                {cargo.map((type, idx) => (
                    <div className={`cargo-type-box ${cargoType === type ? 'selected' : ''}`} key={idx} onClick={() => chooseCargoType(type)}>
                        <p className="cargo-type-name">{ type }</p>
                    </div>
                ))

                }
            </div>

        </div>
    );
}

export default CargoType;
