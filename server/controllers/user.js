import userModel from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingEmail = await userModel.findOne({ email });
        if (!existingEmail) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingEmail.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials.' });

        const token = jwt.sign(
            { email: existingEmail.email, id: existingEmail._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ user: existingEmail, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) return res.status(404).json({ message: 'User already exists.' });

        if (password !== confirmPassword)
            return res.status(404).json({ message: 'password not match' });

        const formUser = {
            name: `${firstName} ${lastName}`,
            email,
            password: await bcrypt.hash(password, 10),
        };

        const newUser = await userModel.create(formUser);

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};
