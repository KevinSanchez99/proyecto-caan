import { AnimalModel } from "../models/mongodb/animal.model.js";
import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from "../config/config.js";
import { UserModel } from "../models/mongodb/user.model.js";
import { uploadMedia, deleteMedia } from '../config/cloudinary.js';

export class AnimalController {

    static async getAllAnimals(req, res) {
        try {
            const { nombre, raza, pelaje, sexo, tamaño, especie, estado, fechaDesde, fechaHasta, edadMin, edadMax } = req.query;
            const filters = {};

            if (nombre) filters.nombre = { $regex: nombre, $options: 'i' };
            if (raza) filters.raza = { $regex: raza, $options: 'i' };
            if (pelaje) filters.pelaje = { $regex: pelaje, $options: 'i' };
            if (sexo) filters.sexo = sexo;
            if (tamaño) filters.tamaño = tamaño;
            if (especie) filters.especie = especie;
            if (estado) filters.estado = estado;

            if (fechaDesde || fechaHasta) {
                filters.createdAt = {};
                if (fechaDesde) filters.createdAt.$gte = new Date(fechaDesde);
                if (fechaHasta) {
                    const hasta = new Date(fechaHasta);
                    hasta.setDate(hasta.getDate() + 1); // Le sumamos un día
                    filters.createdAt.$lt = hasta;       // Cambiamos a $lt (menor que)
                }
            }
            
            if (edadMin || edadMax) {
                const hoy = new Date();
                filters.fecha_nacimiento = filters.fecha_nacimiento || {};
                if (edadMax) {
                    const fechaMax = new Date();
                    fechaMax.setFullYear(hoy.getFullYear() - edadMax);
                    filters.fecha_nacimiento.$gte = fechaMax;
                }
                if (edadMin) {
                    const fechaMin = new Date();
                    fechaMin.setFullYear(hoy.getFullYear() - edadMin);
                    filters.fecha_nacimiento.$lte = fechaMin;
                }
            }

            let isAuthenticated = false;
            const accessToken = req.cookies?.accessToken;
            if (accessToken) {
                try {
                    const decoded = jwt.verify(accessToken, SECRET_JWT_KEY);
                    const user = await UserModel.obtainUserByID(decoded.id);
                    if (user) isAuthenticated = true;
                } catch (error) {
                    isAuthenticated = false;
                }
            }

            if (!isAuthenticated) {
                filters.estado = 'Disponible';
            }

            const animals = await AnimalModel.getAllAnimals(filters);
            res.status(200).json(animals);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getAnimalById(req, res) {
        try {
            const { id } = req.params;
            const animal = await AnimalModel.getAnimalById(id); 
            res.json(animal);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async createAnimal(req, res) {
        try {
            const datosAnimal = req.body;

            if (req.file) {
                // Pasamos el req.file.buffer a la función de Cloudinary
                const urlImagen = await uploadMedia(req.file.buffer);
                datosAnimal.imagenes = [urlImagen]; 
            }

            const newAnimal = await AnimalModel.createAnimal(datosAnimal);
            res.status(201).json(newAnimal);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async updateAnimal(req, res) {
        try {
            const { id } = req.params; 
            
            // 4. Misma lógica: parseamos los datos
            const datosAnimal = req.body;

            if (req.file) {
                // Con multer el buffer viene en req.file.buffer
                const urlImagenNueva = await uploadMedia(req.file.buffer);
                datosAnimal.imagenes = [urlImagenNueva];

                // Buscamos el animal viejo para borrar su foto anterior de Cloudinary
                const animalViejo = await AnimalModel.getAnimalById(id);
                if (animalViejo && animalViejo.imagenes && animalViejo.imagenes.length > 0) {
                    await deleteMedia(animalViejo.imagenes[0]);
                }
            }
            const updatedAnimal = await AnimalModel.updateAnimal(id, datosAnimal);
            if (!updatedAnimal) return res.status(404).json({ message: 'Animal no encontrado' });
            return res.status(200).json(updatedAnimal);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async deleteAnimal(req, res) {
        try {
            const { id } = req.params;

            // 5. Antes de borrar el animal de Mongo, buscamos su foto y la borramos de Cloudinary
            const animalAEliminar = await AnimalModel.getAnimalById(id);
            if (animalAEliminar && animalAEliminar.imagenes && animalAEliminar.imagenes.length > 0) {
                await deleteMedia(animalAEliminar.imagenes[0]);
            }

            const deletedAnimal = await AnimalModel.deleteAnimal(id); 
            if (!deletedAnimal) return res.status(404).json({ message: 'Animal no encontrado' });
            return res.status(200).json({ message: 'Animal eliminado exitosamente' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}