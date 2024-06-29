import { User } from "@/model/user";
import { IUser } from "@/types/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const findUserByEmail = async (email: string) => {
    return await User.findOne({ email });
};

export const validatePassword = async (inputPassword: string, userPassword: string) => {
    return await bcrypt.compare(inputPassword, userPassword);
};

export const generateToken = (user: IUser) => {
    const jwtToken = process.env.JWT_TOKEN;
    if (!jwtToken) {
        throw new Error('JWT token is not defined');
    }
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
        },
        jwtToken,
        { expiresIn: '1d' }
    );
};
