import React, { createContext, useState, useEffect } from 'react';
import { products } from "../assets/assets/frontend_assets/assets"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 20;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Please select a size');
            return;
        }

        let cartData = structuredClone(cartItems); 
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    };

    const getCartCount = () => {
        let count = 0;
        for (let items in cartItems) {
            for (let item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    count += cartItems[items][item];
                }
            }
        }
        return count;
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        cartItems,
        getCartCount
    };

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    return (
        <>
            <ToastContainer />
            <ShopContext.Provider value={value}>
                {props.children}
            </ShopContext.Provider>
        </>
    );
};

export default ShopContextProvider;
