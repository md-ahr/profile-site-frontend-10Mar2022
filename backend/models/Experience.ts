import { Schema, model } from 'mongoose';

interface Experience {
    companyLogo?: string;
    companyName: string;
    designation: string;
    jobDescription: string;
    location: string;
    startDate: string;
    endDate: string;
    userId: Schema.Types.ObjectId;
};

const experienceSchema: Schema = new Schema<Experience>({
    companyLogo: {
        type: String,
        default: 'https://scontent.fdac140-1.fna.fbcdn.net/v/t1.18169-1/12573187_770647256370550_6244657263633266837_n.png?stp=dst-png_p148x148&_nc_cat=1&ccb=1-5&_nc_sid=1eb0c7&_nc_eui2=AeH1F7NW1ho2DCs5JOSlid_ZGSg-mYFqajQZKD6ZgWpqNGkdiwJPide_ybISN8rVIylIdIW159Sr7BwKml3R11pr&_nc_ohc=A7t68yT1KZ0AX_mOqeh&_nc_ht=scontent.fdac140-1.fna&oh=00_AT-yMZcg6VkY4agvMQOS_9Oy6XHUzB8a9ELUV896z9FGmg&oe=6254DB2C'
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
    jobDescription: {
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
        default: 'present'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

experienceSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.userId;
    return obj;
};

const Experience = model<Experience>('Experience', experienceSchema);

export default Experience;
