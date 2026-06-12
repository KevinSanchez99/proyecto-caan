import { z } from 'zod';

// Esquema para la salud del animal
const saludSchema = z.object({
    vacunado: z.boolean(),
    castrado: z.boolean(),
    condiciones_especiales: z.string().default('Ninguna'), 
});

// Esquema para el modelo de Animal
export const animalSchema = z.object({
    nombre: z.string().min(2, "El nombre del animal debe tener al menos 2 caracteres"),
    especie: z.string().min(2, "La especie debe tener al menos 2 caracteres"), 
    raza: z.string().min(2, "La raza debe tener al menos 2 caracteres"), 
    fecha_nacimiento: z.coerce.date({
        required_error: "La fecha de nacimiento es requerida",
        invalid_type_error: "Debe ser una fecha válida",
    }),  
    sexo: z.enum(['Macho', 'Hembra'], "El sexo debe ser 'Macho' o 'Hembra'"),  
    tamaño: z.enum(['Pequeño', 'Mediano', 'Grande'], "El tamaño debe ser 'Pequeño', 'Mediano' o 'Grande'"), 
    estado: z.enum(['Disponible', 'Adoptado'], "El estado debe ser 'Disponible' o 'Adoptado'"), 
    salud: saludSchema,
    descripcion: z.string().min(5, "La descripción debe tener al menos 5 caracteres"), 
    imagenes: z.array(z.string().url("Las imágenes deben ser URLs válidas")), 
});

// Esquema con los valores en optional para el update del animal
export const updateAnimalSchema = z.object({
    nombre: z.string().min(2, "El nombre del animal debe tener al menos 2 caracteres").optional(),
    especie: z.string().min(2, "La especie debe tener al menos 2 caracteres").optional(),
    raza: z.string().min(2, "La raza debe tener al menos 2 caracteres").optional(),
    fecha_nacimiento: z.coerce.date().optional(),
    sexo: z.enum(['Macho', 'Hembra']).optional(),
    tamaño: z.enum(['Pequeño', 'Mediano', 'Grande']).optional(),
    estado: z.enum(['Disponible','Adoptado']).optional(),
    salud: saludSchema.optional(),
    descripcion: z.string().min(5, "La descripción debe tener al menos 5 caracteres").optional(),
    imagenes: z.array(z.string().url("Las imágenes deben ser URLs válidas")).optional(),
});