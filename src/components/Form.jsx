import React from 'react';
import CargoType from './CargoType.jsx';
import WarehouseType from './WarehouseType.jsx';
import StorageLocation from './StorageLocation.jsx';
import Dimension from './Dimension.jsx';
import Quantity from './Quantity.jsx';
import Weight from './Weight.jsx';
import server from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { resetInput, setStep } from '../store/action.js';
import { stackPerBin } from '../helpers/stackPerBin.js';
import '../styles/Form.css';
import { useHistory } from 'react-router-dom';
import AdditionalServices from './AdditionalServices.jsx';

const Form = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const step = useSelector(state => state.step);
    const cargoType = useSelector(state => state.cargoType);
    const cargoLength = useSelector(state => state.cargoLength);
    const warehouseType = useSelector(state => state.warehouseType);
    const storageLocation = useSelector(state => state.storageLocation);
    const width = useSelector(state => state.width);
    const height = useSelector(state => state.height)
    const diameter = useSelector(state => state.diameter);
    const quantity = useSelector(state => state.quantity);
    const weight = useSelector(state => state.weight);
    const wrapping = useSelector(state => state.wrapping);
    const stickerLabel = useSelector(state => state.stickerLabel);
    const cartId = useSelector(state => state.cartId);

    const noStackBin = ['Tyres B (Non Stack)', 'Parts', 'Chain', 'Heavy Equipment']
    const calculatePallet = ['Parts', 'Pallet', 'Box', 'Chain'];
    const addService = ['Parts', 'Box', 'Pallet']

    const changeStep = newStep => {
        const payload = {
            step: newStep
        };

        dispatch(setStep(payload));
    }

    const calculateInput = () => {
        const area = areaCalculation();
        let totalArea;
        const volume = volumeCalculation(area);
        let stackBin;
        let totalPallet;

        if (!noStackBin.includes(cargoType)) {
            stackBin =  stackPerBin(cargoType, height, diameter);

            totalArea = (area * quantity) / stackBin;
        } else {
            totalArea = area * quantity;
        }

        if (calculatePallet.includes(cargoType)) {
            totalPallet = Math.ceil(totalArea / 1.44)
        }

        server.post('/warehouses', {
            cargoType,
            warehouseType,
            storageLocation,
            quantity,
            totalArea,
            volume,
            weight,
            stackBin,
            totalPallet,
            diameter,
            wrapping,
            stickerLabel,
            cartId
        })
        .then(({ data }) => {
            console.log(data);
            dispatch(resetInput());

            console.log(cartId);

            history.push(`/list-item/${cartId}`);
        })
        .catch(err => {
            console.error(err);
        })
        // .finally(() => {

        // })
    }

    const volumeCalculation = (area) => {
        if (cargoType === 'Steel Bars' || cargoType === 'Pipe') {
            return (((Math.PI/4) * (diameter**2) * cargoLength)/1000000);
        } else {
            return (area * (height/100));
        }
    }

    const areaCalculation = () => {
        if(cargoType === 'Tyres A (Stack Position)') {
            return (((Math.PI/4)*(diameter**2))/10000);
        } else if (cargoType === 'Tyres B (Non Stack)') {
            return ((diameter * height)/10000);
        } else if (cargoType === 'Pipe' || cargoType === 'Steel Bars') {
            return ((cargoLength * diameter)/10000);
        } else {
            return((cargoLength*width)/10000);
        }
    }

    return (
        <div className="fullscreen">
            {step === 1 &&
                <CargoType />
            }
            {step === 2 &&
                <WarehouseType />
            }
            {step === 3 &&
                <StorageLocation />
            }
            {step === 4 &&
                <Dimension />
            }
            {step === 5 &&
                <Quantity />
            }
            {step === 6 &&
                <Weight />
            }
            {step === 7 &&
                <AdditionalServices />
            }
            <div className="d-flex container mt-2">
                {step !== 1 &&
                <button
                    className="btn btn-success mr-auto px-5"
                    onClick={() => changeStep(step-1)}
                >Back</button>
                }
                {((step !== 7 && addService.includes(cargoType) && warehouseType === 'NON-PLB')
                 || (step !== 6 && (!addService.includes(cargoType) || warehouseType !== 'NON-PLB'))) &&
                <button
                    className="btn btn-success ml-auto px-5"
                    onClick={() => changeStep(step+1)}
                >Next</button>
                }
                {((step === 7 && addService.includes(cargoType) && warehouseType === 'NON-PLB') 
                 || (step === 6 && (!addService.includes(cargoType) || warehouseType !== 'NON-PLB'))) &&
                <button
                    className="btn btn-success ml-auto px-5"
                    onClick={ calculateInput }
                >Submit</button>
                }
            </div>
        </div>
    );
}

export default Form;
