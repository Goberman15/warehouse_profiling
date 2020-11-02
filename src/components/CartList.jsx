import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNewCart, getCartList, setCartId } from '../store/action';
import moment from 'moment-timezone';
import accounting from 'accounting-js';
import '../styles/CartList.css';

const CartList = () => {
    const dispatch = useDispatch();
    const cartList = useSelector(state => state.cartList);
    let history = useHistory();

    const addCart = () => {
        dispatch(addNewCart());
    }

    const goToItemInput = (cartId) => {

        dispatch(setCartId({
            cartId
        }))

        history.push('/input');
    }

    useEffect(() => {
        dispatch(getCartList());
    },[])

    return (
        <div className="cart-list">
            <p className="cart-list-head">List Cart</p>
            <div className="d-flex w-90 mb-3 mt-3">
                <button className="btn btn-primary" onClick={addCart}>Add New Cart</button>
            </div>
            <table className="table table-hover table-bordered" style={{width: '90%'}}>
                <thead className="thead-dark">
                    <tr>
                        <th style={{width: '8%'}}>Id No.</th>
                        <th style={{width: '22%'}}>Total items</th>
                        <th style={{width: '25%'}}>Total Prices</th>
                        <th style={{width: '25%'}}>Created At</th>
                        <th style={{width: '20%'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cartList.map(cart => (
                        <tr key={cart.id}>
                            <td>{cart.id}</td>
                            <td>{cart.total_items}</td>
                            <td>{accounting.formatMoney(+cart.total_price, { symbol: 'Rp ', precision: 0, thousand: '.', decimal: ',' })}</td>
                            <td>{moment(cart.createdAt).tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')}</td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm mr-2"
                                    onClick={() => goToItemInput(cart.id)}
                                >
                                    <span><i className="fas fa-plus"></i>{' '}Add Item</span>
                                </button>
                                <button
                                    className="btn btn-primary btn-sm ml-2"
                                    onClick={() => history.push(`/list-item/${cart.id}`)}    
                                >
                                    <span><i className="fas fa-list"></i>{' '}See Items</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CartList;
