export const parseFormData = (req, res, next) => {
    if (req.body && req.body.datos) {
        try {
            req.body = JSON.parse(req.body.datos);
        } catch (error) {
            return res.status(400).json({ message: "Error al leer datos" });
        }
    }
    next();
};