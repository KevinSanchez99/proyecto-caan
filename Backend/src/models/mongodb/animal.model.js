import mongoose from 'mongoose';

const { Schema } = mongoose;

// Esquema para la unidad de edad
const edadSchema = new Schema({
    valor: {
        type: Number,
        required: true,
    },
    unidad: {
        type: String,
        enum: ['meses', 'años'],
        required: true,
    },
});

// Esquema para la salud del animal
const saludSchema = new Schema({
    vacunado: {
        type: Boolean,
        required: true,
    },
    castrado: {
        type: Boolean,
        required: true,
    },
    desparacitado: {           // <-- NUEVO DATO 3/06/2026
        type: Boolean,
        required: true,
    },
    condiciones_especiales: {
        type: String,
        default: 'Ninguna',
    },
});

// Esquema para el modelo de Animal
const animalSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    especie: {
        type: String,
        required: true,
    },
    raza: {
        type: String,
        required: true,
    },
    pelaje: {                  // <-- NUEVO DATO 3/06/2026
        type: String,
        required: true,
    },
    edad: {
        type: edadSchema,
        required: true,
    },
    sexo: {
        type: String,
        enum: ['Macho', 'Hembra'],
        required: true,
    },
    tamaño: {
        type: String,
        enum: ['Pequeño', 'Mediano', 'Grande'],
        required: true,
    },
    estado: {
        type: String,
        enum: ['Disponible', 'En Proceso', 'Adoptado'], // Estado de adopción
        required: true,
    },
    salud: {
        type: saludSchema,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    imagenes: {
        type: [String], // Array de URLs para las imágenes
        required: true,
    }
}, { timestamps: true });

const Animal = mongoose.model('Animal', animalSchema);

export class AnimalModel {

    // Obtener todos los animales
    static async getAllAnimals() {
        try {
            return await Animal.find();
        } catch (error) {
            throw new Error('No se pudieron obtener los animales.');
        }
    }

    // Crear un nuevo animal
    static async createAnimal(input) {
        try {
            const newAnimal = new Animal(input);
            await newAnimal.save();
            return newAnimal;
        } catch (error) {
            throw new Error('No se pudo crear el animal.');
        }
    }

    // Eliminar un animal por ID
    static async deleteAnimal(id) {
        try {
            const deletedAnimal = await Animal.findByIdAndDelete(id);
            if (!deletedAnimal) {
                throw new Error('Animal no encontrado');
            }
            return deletedAnimal;
        } catch (error) {
            throw new Error('No se pudo eliminar el animal.');
        }
    }

    // Actualizar un animal por ID
    static async updateAnimal(id, input) {
        try {
            const updatedAnimal = await Animal.findByIdAndUpdate(id, input, { returnDocument: 'after' });
            if (!updatedAnimal) {
                throw new Error('Animal no encontrado');
            }
            return updatedAnimal;
        } catch (error) {
            throw new Error('No se pudo actualizar el animal.');
        }
    }
}