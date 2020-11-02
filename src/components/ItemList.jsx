import React, { useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getCartItem } from '../store/action';
import accounting from 'accounting-js';
import Pdf from "react-to-pdf";
import '../styles/ItemList.css';

const ItemList = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const itemList = useSelector(state => state.itemList);
    let history = useHistory()

    const ref = createRef();

    const options = {
        orientation: 'landscape',
        format: [885, 630]
    }

    useEffect(() => {
        dispatch(getCartItem(id));
    }, [])

    useEffect(() => {
        console.log(itemList);
    }, [itemList])

    return (
        <div className="list-item">
            <h3 className="list-item-head">List Item</h3>
            <div className="d-flex w-100">
                <button 
                    className="btn btn-primary mt-3 mb-3"
                    onClick={() => history.push('/input')}
                >Add Item to Cart</button>
            </div>
            <table className="table table-hover table-bordered" ref={ref}>
                <thead className="thead-dark">
                    <tr>
                        <th style={{width: '2%'}}>No</th>
                        <th style={{width: '10%'}}>Type Goods</th>
                        <th style={{width: '5%'}}>Warehouse Type & Location</th>
                        <th style={{width: '5%'}}>Total Area (SqM)</th>
                        <th style={{width: '5%'}}>Volume (CBM)</th>
                        <th style={{width: '5%'}}>Volume Total (CBM)</th>
                        <th style={{width: '5%'}}>Weight Total (Kg)</th>
                        <th style={{width: '5%'}}>Total Stack</th>
                        <th style={{width: '5%'}}>Pallet</th>
                        <th style={{width: '5%'}}>Handling</th>
                        <th style={{width: '5%'}}>Storage</th>
                        <th style={{width: '5%'}}>Level</th>
                        <th style={{width: '5%'}}>Cost</th>
                        <th style={{width: '5%'}}>Added Service</th>
                        <th style={{width: '5%'}}>Added Cost</th>
                        <th style={{width: '5%'}}>Total Cost</th>
                        <th style={{width: '2%'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList.map((item, idx) => (
                        <>
                        <tr>
                            <td>{idx+1}</td>
                            <td>{item.type}</td>
                            <td>{item.warehouse_type} / {item.storage_location}</td>
                            <td>{Number(item.totalArea).toFixed(2)}</td>
                            <td>{Number(item.volume).toFixed(2)}</td>
                            <td>{Number(item.volume_quantity).toFixed(2)}</td>
                            <td>{item.weight}</td>
                            <td>{item.stck_per_bin || '-'}</td>
                            <td>{item.total_pallet}</td>
                            <td>{item.handling}</td>
                            <td>{item.location}</td>
                            <td>{item.level || '-'}</td>
                            <td>{accounting.formatMoney(+item.cost, { symbol: 'Rp ', precision: 0, thousand: '.', decimal: ',' })}</td>
                            <td>???</td>
                            <td>{accounting.formatMoney(+item.added_cost, { symbol: 'Rp ', precision: 0, thousand: '.', decimal: ',' })}</td>
                            <td>{accounting.formatMoney(+item.total_cost, { symbol: 'Rp ', precision: 0, thousand: '.', decimal: ',' })}</td>
                            <td>
                                <button className="btn btn-success btn-sm mr-2">
                                    <span><i className="fas fa-trash"></i></span>
                                </button>
                            </td>
                        </tr>
                        </>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-end w-100">
                <Pdf targetRef={ref} filename="code-example.pdf" options={options}>
                    {({ toPdf }) => <button className="btn btn-primary" onClick={toPdf}>Generate Pdf</button>}
                </Pdf>
            </div>
        </div>
    );
}

export default ItemList;
