import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWarehousetype } from '../store/action';

const WarehouseType = () => {
    const dispatch = useDispatch();
    const warehouseType = useSelector(state => state.warehouseType);

    const selectWarehouseType = warehouse => {
        const payload = {
            warehouseType: warehouse
        }

        dispatch(setWarehousetype(payload));
    }
    return (
        <div className="full-width container">
            <p className="input-title">Warehouse Type</p>
            <div className="d-flex full-width justify-content-center btn-choice">
                <button
                    className={`btn btn-outline-primary btn-lg mx-3 ${warehouseType === 'BLC' ? 'active' : ''}`}
                    onClick={() => selectWarehouseType('BLC')}>Bounded Logistic Center
                </button>
                <button
                    className={`btn btn-outline-primary btn-lg mx-3 ${warehouseType === 'NON-BLC' ? 'active' : ''}`}
                    onClick={() => selectWarehouseType('NON-BLC')}>NON - Bounded Logistic Center
                </button>
            </div>
        </div>
    );
}

export default WarehouseType;
