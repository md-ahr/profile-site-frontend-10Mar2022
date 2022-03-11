import { Schema, model } from 'mongoose';

interface Experience {
    companyLogo?: string;
    companyName: string;
    designation: string;
    location: string;
    startDate: string;
    endDate: string;
};

const experienceSchema: Schema = new Schema<Experience>({
    companyLogo: {
        type: String,
        default: ''
    },
    companyName: {
        type: String,
        trim: true,
        required: true
    },
    designation: {
        type: String,
        trim: true,
        required: true
    },
    location: {
        type: String,
        trim: true,
        required: true
    },
    startDate: {
        type: String,
        trim: true,
        required: true
    },
    endDate: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true });

const Experience = model<Experience>('Experience', experienceSchema);

export default Experience;
