import { Request, Response, RequestHandler } from 'express';
import  asyncHandler from 'express-async-handler';
import cloudinary  from 'cloudinary';
import User from '../models/User';
import Experience from '../models/Experience';

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

export const addExperience: RequestHandler = asyncHandler(async (req: any, res: Response): Promise<any> => {
    let experience;
    const { companyName, designation, jobDescription, startDate, endDate, location, userId } = req.body;
    if (!companyName || !designation || !jobDescription || !startDate || !location || !userId) {
        return res.status(400).json({ success: 0, message: 'Please enter all the required fields!'});
    }
    if (req.files && req.files.length > 0) {
        cloudinary.v2.uploader.upload(req.files[0].path, { overwrite: true }, async function(error: any, image: any) {
            experience = await Experience.create({ companyName, designation, jobDescription, startDate, endDate, location, companyLogo: image.url, userId });
            if (experience) {
                const user = await User.findById(userId);
                if (user) {
                    user.experiences = user.experiences.concat(experience._id);
                   await user.save();
                }
                res.status(201).json({
                    success: 1,
                    message: 'Experice added successfully!',
                    experience
                });
            } else {
                return res.status(500).json({ success: 0, message: 'Failed to add experiece!'});
            }
        });
    } else {
        experience = await Experience.create({ companyName, designation, jobDescription, startDate, endDate, location, userId });
        if (experience) {
            const user = await User.findById(userId);
            if (user) {
                user.experiences = user.experiences.concat(experience._id);
               await user.save();
            }
            res.status(201).json({
                success: 1,
                message: 'Experice added successfully!',
                experience
            });
        } else {
            return res.status(500).json({ success: 0, message: 'Failed to add experiece!'});
        }
    }
});

export const getAllExperienceByUser: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userExperience = await User.findById({ _id: req.params.id}).populate('experiences').sort({ 'createdAt': -1 });
    if (userExperience) {
        res.status(200).json({ success: 1, userExperience });
    } else {
        return res.status(404).json({ success: 0, message: 'Experience list not found!' });
    }
});

export const getSingleExperience: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
        res.status(200).json({ success: 1, experience });
    } else {
        return res.status(404).json({ success: 0, message: `No user found with this id - ${req.params.id}` });
    }
});

export const updateExperience: RequestHandler = asyncHandler(async (req: any, res: Response): Promise<any> => {
    let experience;
    const { companyName, designation, jobDescription, startDate, endDate, location, userId } = req.body;
    if (!companyName || !designation || !jobDescription || !startDate || !location || !userId) {
        return res.status(400).json({ success: 0, message: 'Please enter all the required fields!'});
    }
    if (req.files && req.files.length > 0) {
        cloudinary.v2.uploader.upload(req.files[0].path, { overwrite: true }, async function(error: any, image: any) {
            experience = await Experience.findByIdAndUpdate({ _id: req.params.id }, { companyName, designation, jobDescription, startDate, endDate, location, companyLogo: image.url, userId }, { new: true });
            if (experience) {
                res.status(200).json({
                    success: 1,
                    message: 'Experice Updated successfully!'
                });
            } else {
                return res.status(500).json({ success: 0, message: 'Failed to update experiece!'});
            }
        });
    } else {
        experience = await Experience.findByIdAndUpdate({ _id: req.params.id }, { companyName, designation, jobDescription, startDate, endDate, location, userId }, { new: true });
        if (experience) {
            res.status(200).json({
                success: 1,
                message: 'Experice Updated successfully!'
            });
        } else {
            return res.status(500).json({ success: 0, message: 'Failed to update experiece!'});
        }
    }
});

export const deleteExperience: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (experience) {
        res.status(200).json({ success: 1, message: 'Experice deleted successfully!', experience });
    } else {
        return res.status(404).json({ success: 0, message: `No user found with this id - ${req.params.id}` });
    }
});

