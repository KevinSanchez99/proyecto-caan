# 📚 Documentación del Backend

## Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Configuración](#configuración)
4. [Base de Datos](#base-de-datos)
5. [API REST](#api-rest)
6. [Autenticación](#autenticación)
7. [Modelos](#modelos)
8. [Controladores](#controladores)
9. [Esquemas de Validación](#esquemas-de-validación)
10. [Middlewares](#middlewares)
11. [Rutas](#rutas)

---

## Descripción General

Este es el backend de una aplicación full-stack desarrollada con **Node.js** y **Express**. El proyecto implementa un sistema completo de gestión de animales, noticias y autenticación de usuarios.

### Tecnologías Utilizadas

- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web para Node.js
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT**: Para autenticación basada en tokens
- **bcrypt**: Para encriptación de contraseñas
- **Zod**: Para validación de esquemas
- **dotenv**: Para gestión de variables de entorno
- **Cookie-parser**: Para gestión de cookies
- **CORS**: Para permitir solicitudes entre dominios

---

## Estructura del Proyecto

```
Backend/
├── src/
│   ├── config/
│   │   └── config.js                 # Configuración global
│   ├── controllers/
│   │   ├── animals.controller.js     # Controlador de animales
│   │   ├── news.controller.js        # Controlador de noticias
│   │   └── user.controller.js        # Controlador de usuarios
│   ├── models/
│   │   └── mongodb/
│   │       ├── connectDB.js          # Conexión a MongoDB
│   │       ├── animal.model.js       # Modelo de animales
│   │       ├── news.model.js         # Modelo de noticias
│   │       └── user.model.js         # Modelo de usuarios
│   ├── routes/
│   │   ├── animals.routes.js         # Rutas de animales
│   │   ├── news.routes.js            # Rutas de noticias
│   │   └── user.routes.js            # Rutas de usuarios
│   ├── schemas/
│   │   ├── animal.schema.js          # Esquema Zod de animales
│   │   ├── news.schema.js            # Esquema Zod de noticias
│   │   └── user.schema.js            # Esquema Zod de usuarios
│   ├── middlewares/
│   │   ├── verifyToken.js            # Validación de JWT
│   │   └── validator.js              # Validación de esquemas
│   ├── lib/
│   │   └── createToken.js            # Generación de JWT
│   └── index.js                      # Punto de entrada principal
├── .env                              # Variables de entorno
└── package.json                      # Dependencias del proyecto
```

---

## Configuración

### Archivo: `config.js`

Centraliza las variables de entorno y parámetros globales de la aplicación.

```javascript
import dotenv from 'dotenv';
dotenv.config(); 

export const PORT = process.env.PORT || 3000;
export const SALT_ROUND = process.env.SALT_ROUND ? parseInt(process.env.SALT_ROUND) : 10;
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY || 'clave_por_defecto_segura';
```

#### Variables de Entorno Requeridas

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto en el que escucha el servidor | `3000` |
| `SALT_ROUND` | Rondas de hash para bcrypt | `10` |
| `SECRET_JWT_KEY` | Clave secreta para firmar tokens JWT | `clave_por_defecto_segura` |
| `MONGO_URI` | URI de conexión a MongoDB | **Requerida** |

---

## Base de Datos

### Conexión a MongoDB

Archivo: `models/mongodb/connectDB.js`

```javascript
export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Conectado a MongoDB: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error de conexión: ${error.message}`);
        process.exit(1);
    }
};
```

- Establece la conexión con MongoDB de forma asincrónica
- Si falla la conexión, detiene la aplicación
- Se ejecuta al iniciar el servidor

---

## API REST

### Endpoints Principales

#### Base URL
```
http://localhost:3000/api
```

#### Resumen de Endpoints

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| POST | `/login` | ❌ | Iniciar sesión |
| POST | `/register` | ❌ | Registrar usuario |
| POST | `/logout` | ❌ | Cerrar sesión |
| POST | `/verify` | ✅ | Obtener datos del usuario |
| GET | `/animals` | ❌ | Obtener todos los animales |
| POST | `/animals` | ✅ | Crear nuevo animal |
| PATCH | `/animals/:id` | ✅ | Actualizar animal |
| DELETE | `/animals/:id` | ✅ | Eliminar animal |
| GET | `/news` | ❌ | Obtener todas las noticias |
| POST | `/news` | ✅ | Crear noticia |
| PATCH | `/news/:id` | ✅ | Actualizar noticia |
| DELETE | `/news/:id` | ✅ | Eliminar noticia |

---

## Autenticación

### Sistema JWT (JSON Web Token)

#### Creación de Tokens

Archivo: `lib/createToken.js`

```javascript
export async function createToken(payload){
    return new Promise((res,rej) =>{
        jwt.sign(payload, SECRET_JWT_KEY, {expiresIn:'1h'}, (err, token)=>{
            if (err) rej(err);
            res(token);
        });
    });
}
```

**Características:**
- Token válido por **1 hora**
- Se firma con `SECRET_JWT_KEY`
- Contiene el `id` del usuario

#### Verificación de Tokens

Archivo: `middlewares/verifyToken.js`

```javascript
export const verifyToken = (req, res, next) => {
    try {
        const {token} = req.cookies;

        if(!token)
            return res.status(401).json({message:"authorization denied"});

        jwt.verify(token, SECRET_JWT_KEY, (error, user) => {
            if(error) return res.status(401).json({ message: "Token is not valid" });
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
```

**Funcionamiento:**
1. Extrae el token de las cookies
2. Valida la firma del token
3. Si es válido, agrega los datos del usuario a `req.user`
4. Si no es válido, devuelve error 401

#### Flujo de Autenticación

```
Usuario           Backend              MongoDB
  │                 │                     │
  ├─Register───────>│                     │
  │                 ├─Hash Password───────>│
  │                 │                     │
  │                 │<─Guardar Usuario────┤
  │                 │                     │
  │<─Token───────────│                     │
  │ (Cookie)        │                     │
  │                 │                     │
  ├─Login───────────>│                     │
  │                 ├─Buscar Usuario──────>│
  │                 │<─Usuario────────────┤
  │                 ├─Comparar Password    │
  │<─Token───────────│                     │
```

---

## Modelos

### 1. Modelo de Usuarios

Archivo: `models/mongodb/user.model.js`

#### Esquema MongoDB

```javascript
userSchema = {
    username: String (único, requerido),
    password: String (requerido, hasheado)
}
```

#### Métodos Estáticos

**`login({ username, password })`**
- Busca el usuario por username
- Compara la contraseña con bcrypt
- Retorna el usuario si las credenciales son válidas
- Lanza error si el usuario no existe o contraseña es incorrecta

**`register({ username, password })`**
- Verifica que el username no exista
- Hashea la contraseña con bcrypt (SALT_ROUND)
- Crea y guarda el nuevo usuario
- Retorna el usuario registrado

**`obtainUserByID(id)`**
- Busca usuario por ID
- Retorna solo el username (sin contraseña)
- Útil para verificar que el token es válido

---

### 2. Modelo de Animales

Archivo: `models/mongodb/animal.model.js`

#### Esquema MongoDB

```javascript
animalSchema = {
    nombre: String (requerido),
    especie: String (requerido),
    raza: String (requerido),
    edad: {
        valor: Number,
        unidad: String (enum: ['meses', 'años'])
    },
    sexo: String (enum: ['Macho', 'Hembra']),
    tamaño: String (enum: ['Pequeño', 'Mediano', 'Grande']),
    estado: String (enum: ['Disponible', 'En Proceso', 'Adoptado']),
    salud: {
        vacunado: Boolean,
        castrado: Boolean,
        condiciones_especiales: String
    },
    descripcion: String (requerido),
    imagenes: Array<String> (URLs),
    timestamps: true (createdAt, updatedAt)
}
```

#### Métodos Estáticos

**`getAllAnimals()`**
- Retorna todos los animales de la base de datos
- Lanza error si hay problema en la consulta

**`createAnimal(input)`**
- Crea un nuevo documento de animal
- Valida el esquema antes de guardar
- Retorna el animal creado

**`updateAnimal(id, input)`**
- Actualiza un animal por ID
- Busca por ID y retorna el documento actualizado
- Retorna null si no existe

**`deleteAnimal(id)`**
- Elimina un animal por ID
- Retorna el animal eliminado
- Lanza error si no existe

---

### 3. Modelo de Noticias

Archivo: `models/mongodb/news.model.js`

#### Esquema MongoDB

```javascript
newsSchema = {
    titulo: String (requerido),
    slug: String (único, requerido),
    contenido: String (requerido),
    imagen_portada: String (URL, requerido),
    publicado: Boolean (default: false),
    timestamps: true (createdAt, updatedAt)
}
```

#### Métodos Estáticos

**`getAllNews()`**
- Retorna todas las noticias

**`createNews(input)`**
- Crea una nueva noticia
- Valida que el slug sea único

**`getNewsBySlug(slug)`**
- Busca una noticia específica por su slug
- Útil para acceder a noticias desde URLs amigables

**`updateNews(id, input)`**
- Actualiza una noticia por ID
- Permite cambiar título, contenido, imagen, etc.

**`deleteNews(id)`**
- Elimina una noticia por ID

---

## Controladores

### 1. UserController

Archivo: `controllers/user.controller.js`

#### Métodos

**`login(req, res)`**
```
POST /api/login
Content-Type: application/json

{
    "username": "usuario",
    "password": "password123"
}

Respuesta (200):
"logueado correctamente"

// Token se envía en cookie 'token'
```

**`register(req, res)`**
```
POST /api/register
Content-Type: application/json

{
    "username": "nuevo_usuario",
    "password": "password123"
}

Respuesta (201):
{
    "user": {
        "_id": "...",
        "username": "nuevo_usuario"
    }
}
```

**`logout(req, res)`**
```
POST /api/logout

Respuesta (200):
{
    "message": "Deslogueado correctamente"
}
```

**`obtainUser(req, res)`** ✅ Requiere autenticación
```
POST /api/verify
Authorization: Bearer <token>

Respuesta (200):
{
    "username": "usuario"
}
```

---

### 2. AnimalController

Archivo: `controllers/animals.controller.js`

#### Métodos

**`getAllAnimals(req, res)`**
```
GET /api/animals

Respuesta (200):
[
    {
        "_id": "...",
        "nombre": "Rex",
        "especie": "Canino",
        "raza": "Labrador",
        ...
    }
]
```

**`createAnimal(req, res)`** ✅ Requiere autenticación
```
POST /api/animals
Authorization: Bearer <token>
Content-Type: application/json

{
    "nombre": "Luna",
    "especie": "Felino",
    "raza": "Persa",
    "edad": { "valor": 2, "unidad": "años" },
    "sexo": "Hembra",
    "tamaño": "Pequeño",
    "estado": "Disponible",
    "salud": {
        "vacunado": true,
        "castrado": true,
        "condiciones_especiales": "Ninguna"
    },
    "descripcion": "Gato persa muy amigable y cariñoso",
    "imagenes": ["https://example.com/cat1.jpg"]
}

Respuesta (201):
{
    "_id": "...",
    "nombre": "Luna",
    ...
    "createdAt": "2024-01-15T10:30:00Z"
}
```

**`updateAnimal(req, res)`** ✅ Requiere autenticación
```
PATCH /api/animals/:id
Authorization: Bearer <token>
Content-Type: application/json

{
    "estado": "Adoptado"
}

Respuesta (200):
{
    "_id": "...",
    "estado": "Adoptado",
    "updatedAt": "2024-01-15T11:00:00Z"
}
```

**`deleteAnimal(req, res)`** ✅ Requiere autenticación
```
DELETE /api/animals/:id
Authorization: Bearer <token>

Respuesta (200):
{
    "message": "Animal eliminado exitosamente"
}
```

---

### 3. NewsController

Archivo: `controllers/news.controller.js`

#### Métodos

**`getAllNews(req, res)`**
```
GET /api/news

Respuesta (200):
[
    {
        "_id": "...",
        "titulo": "Nuevo sistema de adopción",
        "slug": "nuevo-sistema-adopcion",
        "contenido": "...",
        "imagen_portada": "https://example.com/image.jpg",
        "publicado": true
    }
]
```

**`getNewsBySlug(req, res)`**
```
GET /api/news/:slug

Respuesta (200):
{
    "_id": "...",
    "titulo": "Nuevo sistema de adopción",
    "slug": "nuevo-sistema-adopcion",
    "contenido": "...",
    "publicado": true
}
```

**`createNews(req, res)`** ✅ Requiere autenticación
```
POST /api/news
Authorization: Bearer <token>
Content-Type: application/json

{
    "titulo": "Nueva campaña de adopción",
    "slug": "nueva-campana-adopcion",
    "contenido": "Este mes lanzamos una nueva campaña...",
    "imagen_portada": "https://example.com/image.jpg",
    "publicado": true
}

Respuesta (201):
{
    "_id": "...",
    "titulo": "Nueva campaña de adopción",
    ...
}
```

**`updateNews(req, res)`** ✅ Requiere autenticación
```
PATCH /api/news/:id
Authorization: Bearer <token>
Content-Type: application/json

{
    "publicado": false
}

Respuesta (200):
{
    "_id": "...",
    "publicado": false
}
```

**`deleteNews(req, res)`** ✅ Requiere autenticación
```
DELETE /api/news/:id
Authorization: Bearer <token>

Respuesta (200):
{
    "message": "Noticia eliminada exitosamente"
}
```

---

## Esquemas de Validación

Se utiliza **Zod** para validar los datos de entrada. Todos los esquemas se definen en la carpeta `schemas/`.

### 1. animal.schema.js

#### animalSchema (Crear Animal)

```javascript
{
    nombre: String (min: 2),
    especie: String (min: 2),
    raza: String (min: 2),
    edad: {
        valor: Number positivo,
        unidad: 'meses' | 'años'
    },
    sexo: 'Macho' | 'Hembra',
    tamaño: 'Pequeño' | 'Mediano' | 'Grande',
    estado: 'Disponible' | 'En Proceso' | 'Adoptado',
    salud: {
        vacunado: Boolean,
        castrado: Boolean,
        condiciones_especiales: String (opcional, default: 'Ninguna')
    },
    descripcion: String (min: 5),
    imagenes: Array<URL>
}
```

#### updateAnimalSchema (Actualizar Animal)

Mismo esquema que `animalSchema` pero con todos los campos opcionales.

---

### 2. news.schema.js

#### newsSchema (Crear Noticia)

```javascript
{
    titulo: String (min: 5),
    slug: String (min: 5, regex: /^[a-z0-9-]+$/),
    contenido: String (min: 10),
    imagen_portada: URL (válida),
    publicado: Boolean
}
```

#### updateNewsSchema (Actualizar Noticia)

Mismo esquema que `newsSchema` pero con todos los campos opcionales.

---

### 3. user.schema.js

#### loginSchema

```javascript
{
    username: String (requerido),
    password: String (min: 6, max: 50)
}
```

---

## Middlewares

### 1. verifyToken.js

**Propósito:** Validar que el usuario tiene un token JWT válido

**Ubicación en flujo:**
```
Solicitud → verifyToken → ¿Token válido? → Si: next() → No: error 401
```

**Uso en rutas:**
```javascript
animalsRouter.post('/', verifyToken, validateSchema(animalSchema), AnimalController.createAnimal);
```

**Errores retornados:**
- `401 "authorization denied"` - No hay token
- `401 "Token is not valid"` - Token inválido o expirado
- `500` - Error del servidor

---

### 2. validator.js

**Propósito:** Validar datos de entrada contra un esquema Zod

**Ubicación en flujo:**
```
Solicitud → validateSchema(schema) → ¿Válido? → Si: next() → No: error 400
```

**Uso en rutas:**
```javascript
newsRouter.post('/', validateSchema(newsSchema), verifyToken, NewsController.createNews);
```

**Respuesta de error (400):**
```javascript
{
    "message": "Error de validación",
    "errors": [
        {
            "path": "nombre",
            "message": "El nombre del animal debe tener al menos 2 caracteres"
        }
    ]
}
```

---

## Rutas

### animals.routes.js

```javascript
GET    /api/animals              → getAllAnimals (público)
POST   /api/animals              → createAnimal (autenticado + validado)
PATCH  /api/animals/:id          → updateAnimal (autenticado + validado)
DELETE /api/animals/:id          → deleteAnimal (autenticado)
```

---

### news.routes.js

```javascript
GET    /api/news                 → getAllNews (público)
POST   /api/news                 → createNews (validado + autenticado)
PATCH  /api/news/:id             → updateNews (validado + autenticado)
DELETE /api/news/:id             → deleteNews (autenticado)
```

---

### user.routes.js

```javascript
POST   /api/login                → login (validado)
POST   /api/register             → register
POST   /api/logout               → logout
POST   /api/verify               → obtainUser (autenticado)
```

---

## Punto de Entrada: index.js

Archivo: `src/index.js`

```javascript
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './models/mongodb/connectDB.js';
import { PORT } from './config/config.js';
import cookieParser from 'cookie-parser';
import { animalsRouter } from './routes/animals.routes.js';
import { newsRouter } from './routes/news.routes.js';
import { userRouter } from './routes/user.routes.js';
```

### Configuración de la Aplicación

**CORS:**
```javascript
app.use(cors({
    origin: 'http://localhost:5173',  // Permite solicitudes del frontend
    credentials: true                  // Permite cookies
}));
```

**Middlewares Globales:**
```javascript
app.use(express.json());          // Parsea JSON
app.use(cookieParser());          // Parsea cookies
app.disable('x-powered-by');      // Oculta header de seguridad
```

**Registro de Rutas:**
```javascript
app.use('/api/animals', animalsRouter);
app.use('/api/news', newsRouter);
app.use('/api', userRouter);
```

### Flujo de Inicio

```
1. Cargar variables de entorno (.env)
2. Crear aplicación Express
3. Conectar a MongoDB
4. Configurar middlewares
5. Registrar rutas
6. Escuchar en puerto (default: 3000)
```

---

## Manejo de Errores

### Códigos HTTP Utilizados

| Código | Significado | Caso de Uso |
|--------|------------|------------|
| 200 | OK | Operación exitosa (GET, UPDATE, DELETE) |
| 201 | Created | Recurso creado exitosamente (POST) |
| 400 | Bad Request | Errores de validación |
| 401 | Unauthorized | Token inválido o faltante |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error en el servidor |

### Estructura de Errores

**Error de Validación (400):**
```json
{
    "message": "Error de validación",
    "errors": [
        {
            "path": "campo",
            "message": "Descripción del error"
        }
    ]
}
```

**Error de Autenticación (401):**
```json
{
    "message": "authorization denied"
}
```

**Error General (500):**
```json
{
    "message": "Descripción del error"
}
```

---

## Variables de Entorno (.env)

Archivo recomendado:
```env
PORT=3000
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/basedatos
SALT_ROUND=10
SECRET_JWT_KEY=tu_clave_secreta_muy_segura_aqui
```

⚠️ **IMPORTANTE:** Nunca commitear el archivo `.env` a git. Usar `.env.example` como referencia.

---

## Instalación y Ejecución

### Instalación de Dependencias

```bash
npm install
```

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:
```bash
cp .env.example .env
# Editar .env con tus valores
```

### Ejecutar el Servidor

**Modo desarrollo:**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

---

## Flujos Principales

### Flujo de Registro e Inicio de Sesión

```
┌─────────────────────┐
│   Usuario intenta   │
│   registrarse       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Validar esquema     │
│ (validateSchema)    │
└──────────┬──────────┘
           │
      ✓────┴────✗
      │         │
      ▼         ▼
┌──────────┐  ┌──────────────┐
│ Verificar│  │ Error 400    │
│ username │  │ Validación   │
│ único    │  └──────────────┘
└──────────┘
      │
   ✓──┴──✗
   │     │
   ▼     ▼
┌────┐ ┌─────────────┐
│Hash│ │Error 400    │
│pwd │ │Usuario existe
└────┘ └─────────────┘
   │
   ▼
┌──────────────┐
│ Guardar en DB│
└──────────────┘
   │
   ▼
┌──────────────┐
│Crear Token   │
│(1h válido)   │
└──────────────┘
   │
   ▼
┌──────────────┐
│Enviar Cookie │
│+ Response 201│
└──────────────┘
```

---

## Consideraciones de Seguridad

✅ **Implementado:**
- Contraseñas hasheadas con bcrypt
- Tokens JWT con expiración
- Validación de entrada con Zod
- CORS configurado
- Cookies con tokens

⚠️ **Mejoras Futuras:**
- Implementar refresh tokens
- Validar HTTPS en producción
- Rate limiting para login
- Logging de eventos de seguridad
- Encriptación de datos sensibles

---

## Testing de Endpoints

### Ejemplo con cURL

**Registro:**
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"usuario1","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"username":"usuario1","password":"password123"}'
```

**Crear Animal (con token):**
```bash
curl -X POST http://localhost:3000/api/animals \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d 
  '{
    "nombre":"Rex",
    "especie":"Canino",
    "raza":"Labrador",
    "edad":{"valor":3,"unidad":"años"},
    "sexo":"Macho",
    "tamaño":"Grande",
    "estado":"Disponible",
    "salud":{"vacunado":true,"castrado":true,"condiciones_especiales":"Ninguna"},
    "descripcion":"Perro muy amigable",
    "imagenes":["https://example.com/dog.jpg"]
  }'
```

---
