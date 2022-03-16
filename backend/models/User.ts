import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface User {
    name: string;
    email: string;
    password: string;
    profilePic: string;
    bio: string;
    phone: string;
    age: string;
    userDesignation: string;
    userExperience: string;
    userLocation: string;
    experiences: any[];
    skills: string[];
};

const userSchema: Schema = new Schema<User>({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    profilePic: {
        type: String,
        default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    },
    bio: {
        type: String,
        trim: true,
        default: ''
    },
    phone: {
        type: String,
        trim: true
    },
    age: {
        type: String,
        trim: true
    },
    userDesignation: {
        type: String,
        trim: true,
        default: ''
    },
    userExperience: {
        type: String,
        trim: true
    },
    userLocation: {
        type: String,
        trim: true
    },
    experiences: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Experience'
        }
    ],
    skills: [String]
}, { timestamps: true });

userSchema.methods.matchPassword = async function(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = model<User>('User', userSchema);

export default User;
