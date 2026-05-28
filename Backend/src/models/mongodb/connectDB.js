import mongoose from 'mongoose';
import { MONGO_URI } from '../../config/config.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB conectado con éxito');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};