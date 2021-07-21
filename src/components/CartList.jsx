import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNewCart, deleteCart, getCartItem, getCartList, setCartId } from '../store/action';
import moment from 'moment-timezone';
import accounting from 'accounting-js';
import Loader from 'react-loader-spinner';
import server from '../api';
import { toast } from 'react-toastify';
import { pdfGenerator } from '../helpers/pdfMaker.js';
import '../styles/CartList.css';

const CartList = () => {
    const dispatch = useDispatch();
    const cartList = useSelector(state => state.cartList);
    const isLoading = useSelector(state => state.isLoading);
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

    const removeCart = (event, id) => {
        const { token } = localStorage;
        event.stopPropagation();
        
        server.delete(`/carts/${id}`, {
            headers: {
                token
            }
        })
        .then(({ data }) => {
            const { message } = data;
            toast.success(message);

            dispatch(deleteCart({id}))

        })
        .catch(err => {
            toast.error(err.response.data.error);
        })
    }

    useEffect(() => {
        dispatch(getCartList());
    },[])

    const createPdf = (event, id) => {
        event.stopPropagation();
        dispatch(getCartItem(id))
        .then(items => {
            if (items) {
                pdfGenerator(items, id);
            }
        })
    }

    return (
        <div className="cart-list">
            <p className="cart-list-head">List Inquiry</p>
            <div className="d-flex w-90 mb-3 mt-3">
                <button className="btn btn-primary" onClick={addCart}>Add New Inquiry</button>
            </div>
            <table className="table table-hover table-bordered list-inquiry" style={{width: '90%'}}>
                <thead className="thead-dark">
                    <tr>
                        <th style={{width: '5%'}}>#</th>
                        <th style={{width: '18%'}}>Total items</th>
                        <th style={{width: '22%'}}>Total Prices</th>
                        <th style={{width: '25%'}}>Created At</th>
                        <th style={{width: '30%'}}>Actions</th>
                    </tr>
                </thead>
                {!isLoading &&
                    <tbody>
                        {cartList.map((cart, idx) => (
                            <tr key={cart.id}>
                                <td>{idx+1}</td>
                                <td>{cart.total_items}</td>
                                <td>{accounting.formatMoney(+cart.total_price, { symbol: 'Rp ', precision: 0, thousand: '.', decimal: ',' })}</td>
                                <td>{moment(cart.createdAt).tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')}</td>
                                <td>
                                    <div className="d-flex justify-content-center flex-wrap w-100">
                                        <button
                                            className="btn btn-primary btn-sm m-1"
                                            onClick={() => goToItemInput(cart.id)}
                                        >
                                            <span><i className="fas fa-plus"></i>{' '}Add Item</span>
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm m-1"
                                            onClick={() => history.push(`/list-item/${cart.id}`)}    
                                        >
                                            <span><i className="fas fa-list"></i>{' '}See Items</span>
                                        </button>
                                        <button className="btn btn-primary btn-sm m-1" onClick={(event) => removeCart(event, cart.id)}>
                                            <span><i className="fas fa-trash"></i>{' '}Delete Inquiry</span>
                                        </button>
                                        <button className="btn btn-primary btn-sm m-1" onClick={(event) => createPdf(event, cart.id)}>
                                            <span><i className="fas fa-file-pdf"></i>{' '}Generate PDF</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
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
        </div>
    );
}

export default CartList;
