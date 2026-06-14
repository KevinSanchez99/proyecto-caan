import axios from 'axios';

const API = 'http://localhost:3000/api';

const instance = axios.create({
    baseURL: API,
    withCredentials: true
});

export const refreshTokenRequest = () => instance.post('/refresh');

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 && 
            !originalRequest._retry && 
            originalRequest.url !== '/login' && 
            originalRequest.url !== '/refresh'
        ) {
            originalRequest._retry = true;

            try {
                await refreshTokenRequest();
                
                return instance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const loginRequest = user => instance.post(`/login`, user);

export const logoutRequest = () => instance.post('/logout');

export const verifyTokenRequest = () => instance.post('/verify');

// Peticion de crear animal 1/06/2026 - Tomas S
export const createAnimalRequest = (animalData) => instance.post('/animals', animalData);

// Peticion de obtener animales 4/06/2026 - Tomas S
export const getAnimalsRequest = (params = {}) => instance.get('/animals', { params });

// Peticion de obtener un animal por ID 7/06/2026 - Tomas S
export const getAnimalByIdRequest = (id) => instance.get(`/animals/${id}`);

// Peticion de modificar animal 06/06/2026 - Tomas S
export const updateAnimalRequest = (id, animalData) => instance.patch(`/animals/${id}`, animalData);

// Peticion de eliminar animal 06/06/2026 - Tomas S
export const deleteAnimalRequest = (id) => instance.delete(`/animals/${id}`);

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
