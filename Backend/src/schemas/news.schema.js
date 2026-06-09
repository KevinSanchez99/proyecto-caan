import { z } from 'zod';

export const newsSchema = z.object({
    titulo: z.string().min(5, "El título debe tener al menos 5 caracteres"),
    slug: z.string().min(5, "El slug debe tener al menos 5 caracteres").regex(/^[a-z0-9-]+$/, "El slug solo puede contener letras minúsculas, números y guiones"),
    contenido: z.any({ required_error: "El contenido es requerido" }), 
    imagen_portada: z.string().url("La imagen de portada debe ser una URL válida").optional(),
    publicado: z.string().transform((val) => val === 'true'),
    categoria: z.string().min(2, "La categoría es requerida"),
});

export const updateNewsSchema = z.object({
    titulo: z.string().min(5).optional(),
    slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
    contenido: z.any().optional(), 
    imagen_portada: z.string().url().optional(),
    publicado: z.string().transform((val) => val === 'true').optional(),
    categoria: z.string().optional(),
});