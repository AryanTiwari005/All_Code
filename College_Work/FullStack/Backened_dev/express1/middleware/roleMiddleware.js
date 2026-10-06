const checkRole = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
           if(!req.user){
            
           }

            if (allowedRoles.includes(req.user.role)) {
                next();
            } else {
                return res.status(403).json({ message: "Access denied: Unauthorized role" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
};

export default checkRole;