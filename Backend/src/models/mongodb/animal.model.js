import mongoose from 'mongoose';

const { Schema } = mongoose;

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
    fecha_nacimiento: {       
        type: Date,
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

// Cálculo dinámico de la edad mediante un campo virtual
animalSchema.virtual('edad').get(function() {
    if (!this.fecha_nacimiento) return null;
    
    const hoy = new Date();
    const nacimiento = this.fecha_nacimiento;
    
    let meses = (hoy.getFullYear() - nacimiento.getFullYear()) * 12;
    meses -= nacimiento.getMonth();
    meses += hoy.getMonth();
    
    if (meses < 1) {
        return "Menos de 1 mes";
    } else if (meses < 12) {
        return `${meses} meses`;
    } else {
        const anios = Math.floor(meses / 12);
        return `${anios} año${anios > 1 ? 's' : ''}`;
    }
});

// Configuración para incluir los campos virtuales al transformar el documento
animalSchema.set('toJSON', { virtuals: true });
animalSchema.set('toObject', { virtuals: true });

const Animal = mongoose.model('Animal', animalSchema);

export class AnimalModel {

    // Obtener todos los animales, con filtro opcional
    static async getAllAnimals(filters = {}) {
        try {
            return await Animal.find(filters);
        } catch (error) {
            throw new Error('No se pudieron obtener los animales.');
        }
    }

    // Obtener un animal por ID 7/06/2026 - Tomas S 
    static async getAnimalById(id) {
        try {
            const animal = await Animal.findById(id);
            return animal;
        } catch (error) {
            throw new Error('No se pudo obtener el animal.');
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