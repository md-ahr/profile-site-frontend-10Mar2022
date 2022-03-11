import { Schema, Types, model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface User {
    name: string;
    email: string;
    password: string;
    profilePic: string;
    bio: string;
    phone: string;
    age: number;
    userDesignation: string;
    userExperience: number;
    userLocation: string;
    experiences: Types.ObjectId;
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
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    age: {
        type: Number
    },
    userDesignation: {
        type: String,
        trim: true
    },
    userExperience: {
        type: Number,
        default: 0
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

userSchema.pre('save' , async function(next: any) {
    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword: any) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = model<User>('User', userSchema);

export default User;
