import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const jwtFromClient = req.headers.authorization?.split(' ')[1];

        if (jwtFromClient) {
            const decodedData = jwt.verify(jwtFromClient, process.env.JWT_SECRET);
            req.userId = decodedData?.id;
        }

        next();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export default auth;
