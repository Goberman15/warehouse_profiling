import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setStorageLocation } from '../store/action';

const StorageLocation = () => {
    const dispatch = useDispatch();
    const step = useSelector(state => state.step);
    const direction = useSelector(state => state.direction);
    const storageLocation = useSelector(state => state.storageLocation);
    const warehouseType = useSelector(state => state.warehouseType);
    const cargoType = useSelector(state => state.cargoType);
    const skipStep = ['Tyre B (Non Stack)', 'Container 20 ft.', 'Container 40 ft.', 'Container HC 20 ft.', 'Container HC 40 ft.', 'Heavy Equipment'];

    useEffect(() => {
        if (skipStep.includes(cargoType) || (cargoType === 'Parts' && warehouseType === 'NON-BLC')) {
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
            
            dispatch(setStorageLocation({
                storageLocation: 'Open Yard'
            }))
        }
    }, [])

    const chooseStorageLocation = location => {
        const payload = {
            storageLocation: location
        };

        dispatch(setStorageLocation(payload));
    }

    return (
        <div className="full-width container">
            <p className="input-title">Storage Location</p>
            <div className="d-flex full-width justify-content-center btn-choice">
                <button
                    className={`btn btn-outline-primary btn-lg mx-3 ${storageLocation === 'Open Yard' ? 'active' : ''}`}
                    onClick={() => chooseStorageLocation('Open Yard')}>Open Yard
                </button>
                <button
                    className={`btn btn-outline-primary btn-lg mx-3 ${storageLocation === 'Cover Yard' ? 'active' : ''}`}
                    onClick={() => chooseStorageLocation('Cover Yard')}>Cover Yard
                </button>
            </div>
        </div>
    );
}

export default StorageLocation;
