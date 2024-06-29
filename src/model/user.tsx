import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "@/types/user";
import bcrypt from "bcryptjs";
const UserSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    about: { type: String },
    profilePicUrl: { type: String },
});

export const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
