import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig';
import { notFound, errorHandler } from './middlewares/appErrorHandler';
import loginRoute from './routes/authRoute';

dotenv.config();

const PORT: number | string = process.env.PORT || 4000;
const API_PREFIX: string | undefined = process.env.API_PREFIX;

connectDB();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${API_PREFIX}/auth`, loginRoute);

app.use(notFound);
app.use(errorHandler);

try {
    app.listen(PORT, (): void => {
        console.log(`Server connected successfully on port ${PORT}`);
    });
} catch (error) {
    if (error instanceof Error) {
        console.error(`Error occured: ${error.message}`);
    }
}
