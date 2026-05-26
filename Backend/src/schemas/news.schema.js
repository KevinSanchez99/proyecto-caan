import { z } from 'zod';

export const newsSchema = z.object({
    titulo: z.string().min(5, "El título debe tener al menos 5 caracteres"),
    slug: z.string().min(5, "El slug debe tener al menos 5 caracteres").regex(/^[a-z0-9-]+$/, "El slug solo puede contener letras minúsculas, números y guiones"),
    contenido: z.string().min(10, "El contenido debe tener al menos 10 caracteres"), 
    imagen_portada: z.string().url("La imagen de portada debe ser una URL válida"),
    publicado: z.boolean(),
});

export const updateNewsSchema = z.object({
    titulo: z.string().min(5, "El título debe tener al menos 5 caracteres").optional(),
    slug: z.string().min(5, "El slug debe tener al menos 5 caracteres").regex(/^[a-z0-9-]+$/, "El slug solo puede contener letras minúsculas, números y guiones").optional(),
    contenido: z.string().min(10, "El contenido debe tener al menos 10 caracteres").optional(), 
    imagen_portada: z.string().url("La imagen de portada debe ser una URL válida").optional(),
    publicado: z.boolean().optional(),
});