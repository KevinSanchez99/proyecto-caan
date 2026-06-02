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