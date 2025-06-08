

const addToCart = async (req, res) => {

    const { itemId, size } = req.body;
    if (!size) {
        return res.status(400).json({ message: 'Please select a size' });
    }

    try {
        let cartData = req.session.cart || {};
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
        req.session.cart = cartData;
        return res.status(200).json({ message: 'Item added to cart', cart: cartData });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const updateCart = async (req, res) => {
    const { itemId, size, quantity } = req.body;
    if (!size || quantity < 0) {
        return res.status(400).json({ message: 'Invalid size or quantity' });
    }

    try {
        let cartData = req.session.cart || {};
        if (cartData[itemId] && cartData[itemId][size]) {
            if (quantity === 0) {
                delete cartData[itemId][size];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            } else {
                cartData[itemId][size] = quantity;
            }
            req.session.cart = cartData;
            return res.status(200).json({ message: 'Cart updated', cart: cartData });
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getUserCart = (req, res) => {
    const cartData = req.session.cart || {};
    return res.status(200).json({ cart: cartData });
}  

const clearCart = (req, res) => {
    req.session.cart = {};
    return res.status(200).json({ message: 'Cart cleared' });
}

export {
    addToCart,
    updateCart,
    getUserCart,
    clearCart
};