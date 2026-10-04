const checkRole = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const role = req.header("role");
            if (!role) {
                return res.status(403).json({ message: "Role is not provided" });
            }
            if (allowedRoles.includes(role)) {
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