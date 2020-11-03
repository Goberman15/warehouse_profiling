import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWeight } from '../store/action';

const Weight = () => {
    const dispatch = useDispatch();
    const weight = useSelector(state => state.weight);

    const inputChangeHandler = event => {
        const { name, value } = event.target;
        const payload = {
            [name]: value
        };

        dispatch(setWeight(payload));
    }

    return (
        <div className="full-width container">
            <label htmlFor="weight" className="input-title">Weight</label>
            <div class="input-group mb-3 justify-content-center w-100">
                <input
                    type="text"
                    className="form-control col-3"
                    name="weight"
                    value={ weight }
                    onChange={ inputChangeHandler }
                    autoFocus
                />
                <div class="input-group-append">
                    <span class="input-group-text">Kg</span>
                </div>
            </div>
        </div>
    );
}

export default Weight;
