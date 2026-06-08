import axios from 'axios';

const API = 'http://localhost:3000/api';

const instance = axios.create({
    baseURL: API,
    withCredentials: true
});

export const loginRequest = user => instance.post(`/login`, user);

export const logoutRequest = () => instance.post('/logout');

export const verifyTokenRequest = () => instance.post('/verify');

// Peticion de crear animal 1/06/2026 - Tomas S
export const createAnimalRequest = (animalData) => instance.post('/animals', animalData);

// Peticion de obtener animales 4/06/2026 - Tomas S
export const getAnimalsRequest = () => instance.get('/animals');

// Peticion de obtener un animal por ID 7/06/2026 - Tomas S
export const getAnimalByIdRequest = (id) => instance.get(`/animals/${id}`);

// Peticion de modificar animal 06/06/2026 - Tomas S
export const updateAnimalRequest = (id, animalData) => instance.patch(`/animals/${id}`, animalData);


// Peticion de eliminar animal 06/06/2026 - Tomas S
export const deleteAnimalRequest = (id) => instance.delete(`/animals/${id}`);