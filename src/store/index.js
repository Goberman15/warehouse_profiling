import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
    ADD_NEW_CART,
    RESET_INPUT,
    SET_CARGO_TYPE,
    SET_CART_ID,
    SET_CART_ITEM,
    SET_CART_LIST,
    SET_DIAMETER,
    SET_DIMENSION,
    SET_HEIGHT,
    SET_LENGTH,
    SET_LOADING_STATUS,
    SET_QUANTITY,
    SET_STEP,
    SET_STICKER_LABEL,
    SET_STORAGE_LOCATION,
    SET_WAREHOUSE_TYPE,
    SET_WEIGHT,
    SET_WIDTH, 
    SET_WRAPPING
} from './action';
import cargo from './cargoType.json';

const initialState = {
    step: 1,
    direction: '',
    isLoading: false,
    cargoType: '',
    warehouseType: '',
    storageLocation: '',
    cargoLength: 0,
    width: 0,
    height: 0,
    diameter: 0,
    dimension: 0,
    quantity: 0,
    weight: 0,
    wrapping: false,
    stickerLabel: false,
    cartList: [],
    itemList: [],
    cartId: '',
    cargo
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case SET_STEP:
            const { step, direction } = payload;
            return {
                ...state,
                step,
                direction
            }
        case SET_CARGO_TYPE:
            const { cargoType } = payload;
            return {
                ...state,
                cargoType
            }
        case SET_WAREHOUSE_TYPE:
            const { warehouseType } = payload;
            return {
                ...state,
                warehouseType
            }
        case SET_STORAGE_LOCATION:
            const { storageLocation } = payload;
            return {
                ...state,
                storageLocation
            }
        case SET_LENGTH:
            const { cargoLength } = payload;
            return {
                ...state,
                cargoLength
            }
        case SET_WIDTH:
            const { width } = payload;
            return {
                ...state,
                width
            }
        case SET_HEIGHT:
            const { height } = payload;
            return {
                ...state,
                height
            }
        case SET_DIAMETER:
            const { diameter } = payload;
            return {
                ...state,
                diameter
            }
        case SET_DIMENSION:
            const { dimension } = payload;
            return {
                ...state,
                dimension
            }
        case SET_WEIGHT:
            const { weight } = payload;
            return {
                ...state,
                weight
            }
        case SET_QUANTITY:
            const { quantity } = payload;
            return {
                ...state,
                quantity
            }
        case SET_CART_LIST:
            const { carts } = payload;
            return {
                ...state,
                cartList: carts
            }
        case SET_CART_ITEM:
            const { items } = payload;
            return {
                ...state,
                itemList: items
            }
        case SET_CART_ID:
            const { cartId } = payload;
            return {
                ...state,
                cartId
            }
        case SET_WRAPPING:
            const { wrapping } = payload;
            return {
                ...state,
                wrapping
            }
        case SET_STICKER_LABEL:
            const { stickerLabel } = payload;
            return {
                ...state,
                stickerLabel
            }
        case SET_LOADING_STATUS:
            const { isLoading } = payload;
            return {
                ...state,
                isLoading
            }
        case ADD_NEW_CART:
            const { cart } = payload;
            return {
                ...state,
                cartList: [...state.cartList, cart]
            }
        case RESET_INPUT:
            return {
                ...state,
                step: 1,
                cargoType: '',
                warehouseType: '',
                storageLocation: '',
                cargoLength: 0,
                width: 0,
                height: 0,
                diameter: 0,
                dimension: 0,
                quantity: 0,
                weight: 0,
                wrapping: false,
                stickerLabel: false
            }
        default:
            return state;
    }
}

const store = createStore(reducer, compose(applyMiddleware(thunkMiddleware)));

export default store;
