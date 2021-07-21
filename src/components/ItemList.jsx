import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteItem, getCartItem, setCartId } from '../store/action';
import accounting from 'accounting-js';
import Loader from 'react-loader-spinner';
import '../styles/ItemList.css';
import server from '../api';
import { toast } from 'react-toastify';
import { pdfGenerator } from '../helpers/pdfMaker.js';

const ItemList = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const itemList = useSelector(state => state.itemList);
    const isLoading = useSelector(state => state.isLoading);
    let history = useHistory();
    let blcCount = 0;
    let hubCount = 0;

      useEffect(() => {
        dispatch(getCartItem(id));
    }, [])

    const addAnotherItem = () => {
        dispatch(setCartId({
            cartId: id
        }));

        history.push('/input');
    }

    const removeItem = (event, id) => {
        event.stopPropagation();
        const { token } = localStorage;

        server.delete(`/warehouses/${id}`, {
            headers: {
                token
            }
        })
        .then(({ data }) => {
            const { message } = data;
            toast.success(message);

            dispatch(deleteItem({id}))

        })
        .catch(err => {
            toast.error(err.response.data.error);
        })
    }

    return (
        <div className="list-item">
            <h3 className="list-item-head">List Item</h3>
            <div className="d-flex w-100">
                <button 
                    className="btn btn-primary mt-3 mb-3"
                    onClick={addAnotherItem}
                >Add Item to Cart</button>
            </div>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th style={{width: '2%'}}>No</th>
                        <th style={{width: '8%'}}>Type Goods</th>
                        <th style={{width: '10%'}}>Warehouse Type & Location</th>
                        <th style={{width: '5%'}}>Quantity</th>
                        <th style={{width: '7%'}}>Total Area (SqM)</th>
                        <th style={{width: '7%'}}>Total Volume (CBM)</th>
                        <th style={{width: '7%'}}>Total Weight (Kg)</th>
                        <th style={{width: '5%'}}>Cost</th>
                        <th style={{width: '5%'}}>Added Cost</th>
                        <th style={{width: '5%'}}>Total Cost</th>
                        <th style={{width: '2%'}}>Action</th>
                    </tr>
                </thead>
                {!isLoading &&
                <>
                    <tbody>
                        {itemList.map((item, idx) => {
                            if (item.warehouse_type === 'BLC') blcCount++;
                            else hubCount++;
                            return (
                            <>
                                <tr>
                                    <td rowSpan="2">{idx+1}</td>
                                    <td>{item.type}</td>
                                    <td>{item.warehouse_type} / {item.storage_location}</td>
                                    <td>{item.quantity}</td>
                                    <td>{Number(item.total_area).toFixed(2)}</td>
                                    <td>{Number(item.volume_quantity).toFixed(2)}</td>
                                    <td>{item.weight}</td>
                                    <td>{accounting.formatMoney(+item.cost, { symbol: 'Rp ', precision: 0, thousand: '.', decimal: ',' })}</td>
                                    <td>{accounting.formatMoney(+item.added_cost, { symbol: 'Rp ', precision: 0, thousand: '.', decimal: ',' })}</td>
                                    <td>{accounting.formatMoney(+item.total_cost, { symbol: 'Rp ', precision: 0, thousand: '.', decimal: ',' })}</td>
                                    <td>
                                        <button className="btn btn-success btn-sm mr-2" onClick={(event) => removeItem(event, item.id)}>
                                            <span><i className="fas fa-trash"></i></span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="10">
                                        <div className="row">
                                            <div className="col d-flex flex-column align-items-start">
                                                <p className="sub-head">Reccommendation:</p>
                                                <p>Handling: {item.handling}</p>
                                                <p>Storage: {item.location}</p>
                                                <p>Level: {item.level || '-'}</p>
                                            </div>
                                            <div className="col d-flex flex-column align-items-start">
                                                <p className="sub-head">Additional Information:</p>
                                                <p>Total Stack: {item.stack_per_bin || '-'}</p>
                                                <p>Total Pallet: {item.total_pallet || '-'}</p>
                                                <p>Consumption Storage: {Math.ceil(Number(item.consumption_storage))}</p>
                                                <p>Added Services: {item.added_services || '-'}</p>
                                            </div>
                                            
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )})}
                    </tbody>
                </>
                }
            </table>
            {isLoading &&
                <Loader
                    type="ThreeDots"
                    color="#FEC002"
                    height={80}
                    width={80}
                />
            }
            {!isLoading &&
                <div className="d-flex justify-content-end w-100">
                    {!!blcCount &&
                        <button className="btn btn-primary m-2" onClick={() => pdfGenerator(itemList, id, 'BLC')}>Generate PDF for BLC</button>
                    }
                    {!!hubCount &&
                        <button className="btn btn-primary m-2" onClick={() => pdfGenerator(itemList, id, 'NON-BLC')}>Generate PDF for NON-BLC</button>
                    }
                </div>
            }
        </div>
    );
}

export default ItemList;
