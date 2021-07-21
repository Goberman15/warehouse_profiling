import { toast } from 'react-toastify';
import server from '../api';

export const SET_STEP = 'SET_STEP';
export const SET_WEIGHT = 'SET_WEIGHT';
export const SET_LENGTH = 'SET_LENGTH';
export const SET_WIDTH = 'SET_WIDTH';
export const SET_HEIGHT = 'SET_HEIGHT';
export const SET_DIAMETER = 'SET_DIAMETER';
export const SET_CARGO_TYPE = 'SET_CARGO_TYPE';
export const SET_WAREHOUSE_TYPE = 'SET_WAREHOUSE_TYPE';
export const SET_STORAGE_LOCATION = 'SET_STORAGE_LOCATION';
export const SET_QUANTITY = 'SET_QUANTITY';
export const SET_DIMENSION = 'SET_DIMENSION';
export const SET_CART_LIST = 'SET_CART_LIST';
export const SET_CART_ID = 'SET_CART_ID';
export const SET_CART_ITEM = 'SET_CART_ITEM';
export const SET_STICKER_LABEL = 'SET_STICKER_LABEL';
export const SET_WRAPPING = 'SET_WRAPPING';
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';

export const ADD_NEW_CART = 'ADD_NEW_CART';

export const RESET_INPUT = 'RESET_INPUT';

export const DELETE_CART = 'DELETE_CART';
export const DELETE_ITEM = 'DELETE_ITEM';

export const setStep = payload => {
    return {
        type: SET_STEP,
        payload
    }
}

export const setWeight = payload => {
    return {
        type: SET_WEIGHT,
        payload
    }
}

export const setLength = payload => {
    return {
        type: SET_LENGTH,
        payload
    }
}

export const setWidth = payload => {
    return {
        type: SET_WIDTH,
        payload
    }
}

export const setHeight = payload => {
    return {
        type: SET_HEIGHT,
        payload
    }
}

export const setDiameter = payload => {
    return {
        type: SET_DIAMETER,
        payload
    }
}

export const setCargoType = payload => {
    return {
        type: SET_CARGO_TYPE,
        payload
    }
}

export const setWarehousetype = payload => {
    return {
        type: SET_WAREHOUSE_TYPE,
        payload
    }
}

export const setStorageLocation = payload => {
    return {
        type: SET_STORAGE_LOCATION,
        payload
    }
}

export const setQuantity = payload => {
    return {
        type: SET_QUANTITY,
        payload
    }
}

export const setDimension = payload => {
    return {
        type: SET_DIMENSION,
        payload
    }
}

export const setCartList = payload => {
    return {
        type: SET_CART_LIST,
        payload
    }
}

export const setCartItem = payload => {
    return {
        type: SET_CART_ITEM,
        payload
    }
}

export const setCartId = payload => {
    return {
        type: SET_CART_ID,
        payload
    }
}

export const setWrapping = payload => {
    return {
        type: SET_WRAPPING,
        payload
    }
}

export const setSTickerLabel = payload => {
    return {
        type: SET_STICKER_LABEL,
        payload
    }
}

export const setLoadingStatus = payload => {
    return {
        type: SET_LOADING_STATUS,
        payload
    }
}

export const setLoginStatus = payload => {
    return {
        type: SET_LOGIN_STATUS,
        payload
    }
}

export const appendNewCart = payload => {
    return {
        type: ADD_NEW_CART,
        payload
    }
}

export const resetInput = () => {
    return {
        type: RESET_INPUT
    }
}

export const deleteCart = payload => {
    return {
        type: DELETE_CART,
        payload
    }
}

export const deleteItem = payload => {
    return {
        type: DELETE_ITEM,
        payload
    }
}

export const getCartList = () => {
    const { token } = localStorage;
    return dispatch => {
        dispatch(setLoadingStatus({isLoading: true}));
        server.get('/carts', {
            headers: {
                token
            }
        })
        .then(({ data }) => {
            const { carts } = data;

            dispatch(setCartList({
                carts
            }))
        })
        .catch(err => {
            console.error(err.response);
            toast.error(err.response.data.error);
        })
        .finally(() => {
            dispatch(setLoadingStatus({isLoading: false}));
        })
    }
}

export const addNewCart = () => {
    const { token } = localStorage;
    return dispatch => {
        // dispatch(setLoadingStatus({isLoading: true}));
        server.post('/carts', {}, {
            headers: {
                token
            }
        })
        .then(({ data }) => {
            const { cart, message } = data;

            dispatch(appendNewCart({
                cart
            }))

            toast.success(message);
        })
        .catch(err => {
            console.error(err.response);
            toast.error(err.response.data.error);
        })
        .finally(() => {
            // dispatch(setLoadingStatus({isLoading: false}));
        })
    }
}

export const getCartItem = payload => {
    const { token } = localStorage;
    return dispatch => {
        dispatch(setLoadingStatus({isLoading: true}));
        return server.get(`/carts/${payload}`, {
            headers: {
                token
            }
        })
        .then(({ data }) => {
            const { items } = data;

            dispatch(setCartItem({
                items
            }))

            return items;
        })
        .catch(err => {
            console.error(err.response);
            toast.error(err.response.data.error);
        })
        .finally(() => {
            dispatch(setLoadingStatus({isLoading: false}));
        })
    }
}
