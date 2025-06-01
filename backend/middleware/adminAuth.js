const adminAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false, 
                message: "No token provided" 
            });
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if the decoded token has the correct admin email
        if (!decodedToken || decodedToken.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ 
                success: false, 
                message: "Token is invalid" 
            });
        }

        next();
    } catch (e) {
        console.error(e);
        res.status(500).json({ 
            success: false, 
            message: "Error verifying token" 
        });
    }
};

export default adminAuth;