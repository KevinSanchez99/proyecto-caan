import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './models/mongodb/connectDB.js';
import { PORT } from './config/config.js';
import cookieParser from 'cookie-parser';
import { animalsRouter } from './routes/animals.routes.js';
import { newsRouter } from './routes/news.routes.js';
import { userRouter } from './routes/user.routes.js';

const app = express();

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true                
}));

// Cambio para que Express acepte paquetes de hasta 50mb
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(cookieParser());
app.disable('x-powered-by');

// Rutas
app.use('/api/animals', animalsRouter);
app.use('/api/news', newsRouter)
app.use('/api', userRouter);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server listening on port http://localhost:${PORT} 🚀`);
        });
    } catch (error) {
        console.error('No se pudo iniciar el servidor:', error);
    }
};

startServer();