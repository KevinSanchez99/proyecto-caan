import { AnimalModel } from "../models/mongodb/animal.model.js";

export class AnimalController {

    static async getAllAnimals(req, res) {
        try {
            const {
                nombre,
                raza,
                pelaje,
                sexo,
                tamaño,
                edad,
                unidad_edad,
                especie,
                estado,
            } = req.query;

            const filters = {};

            if (nombre) filters.nombre = { $regex: nombre, $options: 'i' };
            if (raza) filters.raza = { $regex: raza, $options: 'i' };
            if (pelaje) filters.pelaje = { $regex: pelaje, $options: 'i' };
            if (sexo) filters.sexo = sexo;
            if (tamaño) filters.tamaño = tamaño;
            if (especie) filters.especie = especie;
            if (estado) filters.estado = estado;
            if (edad) filters['edad.valor'] = Number(edad);
            if (unidad_edad) filters['edad.unidad'] = unidad_edad;

            const animals = await AnimalModel.getAllAnimals(filters);
            res.status(200).json(animals);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // se agregó el método getAnimalById para obtener un animal específico por su ID 7/06/2026 - Tomas S
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
            const newAnimal = await AnimalModel.createAnimal(req.body);
            res.status(201).json(newAnimal);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async updateAnimal(req, res) {
        try {
            const { id } = req.params; 
            const updatedAnimal = await AnimalModel.updateAnimal(id, req.body);
            if (!updatedAnimal) {
                return res.status(404).json({ message: 'Animal no encontrado' });
            }
            return res.status(200).json(updatedAnimal);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async deleteAnimal(req, res) {
        try {
            const { id } = req.params;
            const deletedAnimal = await AnimalModel.deleteAnimal(id); 
            if (!deletedAnimal) {
                return res.status(404).json({ message: 'Animal no encontrado' });
            }
            return res.status(200).json({ message: 'Animal eliminado exitosamente' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}