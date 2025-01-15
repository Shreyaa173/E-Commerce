import {createContext, useState, useEffect} from 'react'
import {products} from "../assets/assets/frontend_assets/assets"
import { ToastContainer, toast } from 'react-toastify'
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 20;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId, size) => {
        if(!size){
            toast.error('Please select a size');
            return;
        }
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            } 
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }

    const getCardCount = () => {
        let count = 0;
        for(let items in cartItems){
            for(let item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        count += cartItems[items][item];
                    }
                }
                catch(error){
                    console.log(error);
                }
            }
        }
        return count;
    }

    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, addToCart, cartItems, getCardCount
    }

    useEffect(() =>{
        console.log(cartItems);
    }, [cartItems]);

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;