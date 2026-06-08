import { AnimalModel } from "../models/mongodb/animal.model.js";

export class AnimalController {

    static async getAllAnimals(req, res) {
        try {
            const animals = await AnimalModel.getAllAnimals();
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