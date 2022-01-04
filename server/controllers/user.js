import UserModel from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { fileSizeFormatter } from '../helpers/file-size-formatter.js';

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingEmail = await UserModel.findOne({ email });
        if (!existingEmail) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingEmail.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials.' });

        const token = jwt.sign(
            { email: existingEmail.email, id: existingEmail._id },
            process.env.JWT_SECRET,
            { expiresIn: '2 days' }
        );

        res.status(200).json({ user: existingEmail, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) return res.status(404).json({ message: 'User already exists.' });

        if (password !== confirmPassword)
            return res.status(404).json({ message: 'password not match' });

        const formUser = {
            name: `${firstName} ${lastName}`,
            email,
            password: await bcrypt.hash(password, 10),
        };

        const newUser = await UserModel.create(formUser);

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '2 days',
        });

        res.status(200).json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const listUser = await UserModel.find({});

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: 'No user with that id' });

        const userNeedToFind = listUser.find((user) => user._id.toString() === String(id));

        res.status(200).json(userNeedToFind);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const info = req.body;
        delete info?.id;

        const userUpdated = await UserModel.findByIdAndUpdate(id, info, { new: true });

        res.status(200).json(userUpdated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const unsetAvatar = async (req, res) => {
    try {
        const { id } = req.params;
        const file = {
            fileName: '',
            filePath: '',
            fileType: '',
            fileSize: '',
        };

        const userUpdated = await UserModel.findByIdAndUpdate(id, { avatar: file }, { new: true });

        res.status(200).json(userUpdated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const updateAvatar = async (req, res) => {
    try {
        if (!req.file) return res.status(404).json({ message: 'avatar file is not valid' });

        const { id } = req.params;
        const file = {
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        };

        const userUpdated = await UserModel.findByIdAndUpdate(id, { avatar: file }, { new: true });
        res.status(200).json(userUpdated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
