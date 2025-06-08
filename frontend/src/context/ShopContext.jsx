import React, { createContext, useState, useEffect } from 'react'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 20;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const backend = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

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

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backend}/api/product/list`);
            if (response.status === 200) {
                setProducts(response.data.products);
            } else {
                toast.error('Failed to load products');
            }
        } catch (error) {
            console.error('Error fetching product data:', error);
            toast.error('Failed to load products');
            return [];
        }
    }

    // Authentication functions
    const login = (userData, authToken) => {
        setIsLoggedIn(true);
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userData', JSON.stringify(userData));
        toast.success('Login successful!');
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setToken('');
        setCartItems({}); // Clear cart on logout
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        toast.success('Logged out successfully!');
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    };

    // Check for existing authentication on component mount
    useEffect(() => {
        const savedToken = localStorage.getItem('authToken');
        const savedUserData = localStorage.getItem('userData');
        
        if (savedToken && savedUserData) {
            try {
                const userData = JSON.parse(savedUserData);
                setToken(savedToken);
                setUser(userData);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Error parsing saved user data:', error);
                // Clear corrupted data
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
            }
        }
    }, []);

    useEffect(() => {
        getProductsData();
    }, []);

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
        getCartCount,
        backend,
        token, 
        setToken,
        isLoggedIn,
        user,
        login,
        logout
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