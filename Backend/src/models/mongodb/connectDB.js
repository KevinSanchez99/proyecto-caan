import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Conectado a MongoDB: ${connection.connection.host} `);
    } catch (error) {
        console.error(`Error de conexión: ${error.message} `);
        process.exit(1); // Detiene la app si no hay base de datos
    }
};