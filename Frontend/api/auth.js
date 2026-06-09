import axios from 'axios';

const API = 'http://localhost:3000/api';

const instance = axios.create({
    baseURL: API,
    withCredentials: true
});

export const loginRequest = user => instance.post(`/login`, user);

export const logoutRequest = () => instance.post('/logout');

export const verifyTokenRequest = () => instance.post('/verify');

export const getNewsRequest = (page = 1, limit = 6, category = '', search = '', date = '') => {
    const params = new URLSearchParams({ page, limit });
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    if (date) params.append('date', date);
    
    return instance.get(`/news?${params.toString()}`);
};

export const getNewsBySlugRequest = (slug) => instance.get(`/news/${slug}`);

// Crear noticia
export const createNewsRequest = (newsData) => instance.post('/news', newsData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

// Actualizar noticia
export const updateNewsRequest = (id, newsData) => instance.patch(`/news/${id}`, newsData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

// Eliminar noticia
export const deleteNewsRequest = (id) => instance.delete(`/news/${id}`);

// Subir imágenes o videos sueltos (para BlockNote)
export const uploadMediaRequest = (formData) => instance.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
