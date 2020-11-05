import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuantity } from '../store/action';

const Quantity = () => {
    const dispatch = useDispatch();
    const quantity = useSelector(state => state.quantity);

    const inputChangeHandler = event => {
        const { name, value } = event.target;
        const payload = {
            [name]: value
        };

        dispatch(setQuantity(payload));
    }

    return (
        <div className="full-width container">
            <label htmlFor="quantity" className="input-title">Quantity</label>
            <input
                type="number"
                className="form-control col-3 mx-auto"
                name="quantity"
                value={ quantity }
                onChange={ inputChangeHandler }
                placeholder="Item Quantity"
                autoFocus
            />
        </div>
    );
}

export default Quantity;
