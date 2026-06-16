# Documento de Especificación y Arquitectura de Software

## 1. Descripción General del Proyecto

Como grupo hemos seleccionado a la Institución del CAAN (Centro de Ayuda al Animal de Necochea). El CAAN es una organización sin fines de lucro que trabaja principalmente con perros en situación de abandono o riesgo. Su labor se centra en brindar asistencia, recuperación y encontrarles un hogar definitivo mediante adopciones responsables, labor que complementan con el funcionamiento de un centro de castración gratuito para la comunidad.

### 1.1 Problemas Identificados

- Información distribuida en redes sociales sin centralización.
- Falta de un catálogo claro de animales en adopción.
- Procesos de adopción poco organizados.
- Dificultad para acceder a opciones de donación.

### 1.2 Necesidades Principales

- Centralizar la información en un único sitio web.
- Mostrar de forma clara los animales disponibles.
- Promover campañas y eventos.
- Simplificar el proceso de donación.
- Mostrar información clara de cómo contribuir a la organización.

### 1.3 Funcionalidades del Sitio Web

**Vista Persona (Usuario)**

- **Sección de adopciones:** Listado de animales con imágenes e información.
- **Facilitar el proceso de adopciones:** Información enfocada y concreta dentro de los apartados de Preguntas Frecuentes y Adopciones.
- **Información sobre cómo donar y contribuir:** Materiales de construcción, ropa y abrigo, alimento.
- **Información de cómo convertirse en SOCIO:** Incluido explícitamente dentro de la página de Donaciones.
- **Noticias y campañas:** Apartado dedicado a noticias y eventos.
- **Contacto:** Medios de comunicación como redes sociales (ubicados en el Footer) y ubicación geográfica (dentro de preguntas frecuentes).

**Vista Administrador**

- Creación, Edición y Eliminación de perros.
- Creación, Edición y Eliminación de noticias.

---

## 2. Listado de Integrantes y Roles

El equipo de trabajo y la asignación de sus múltiples funciones está compuesto por los siguientes miembros:

| Integrante | Roles Asignados |
|---|---|
| Sánchez, Kevin | Project Manager, Full Stack Developer, QA Tester |
| Sollberger, Tomás | Analista Funcional, Database Administrator, DevOps Engineer |
| Stutz, Tomás Bautista | Documentación, Frontend Developer, UX/UI Designer |

---

## 3. Descripción de la Arquitectura Seleccionada

El proyecto está construido como una aplicación web full-stack con dos subproyectos independientes gestionados mediante un monorepo con pnpm workspaces: un backend en Node.js y un frontend en React. Ambos se comunican exclusivamente a través de una API REST.

### 3.1 Lenguajes y Entorno de Ejecución

El lenguaje utilizado en ambas capas es JavaScript, con módulos ES (ESM) habilitados mediante la directiva `"type": "module"` en los archivos `package.json`. El backend corre sobre Node.js v20+ y el frontend se compila con Vite 8.

### 3.2 Frameworks y Librerías Principales

**Backend**

| Librería / Framework | Versión | Propósito |
|---|---|---|
| Express.js | 5.2.1 | Framework HTTP principal para definir rutas, middlewares y controladores |
| Mongoose | 9.4.1 | ODM para MongoDB: definición de esquemas y consultas a la base de datos |
| jsonwebtoken | 9.0.3 | Generación y verificación de tokens JWT para autenticación |
| bcrypt | 6.0.0 | Hasheo seguro de contraseñas antes de persistirlas en la base de datos |
| Zod | 4.3.6 | Validación de esquemas de entrada en los endpoints de la API |
| multer | 2.1.1 | Middleware para recibir archivos multimedia (imágenes, videos) en las peticiones |
| cloudinary | 2.10.0 | SDK para subir y eliminar archivos en el servicio de almacenamiento Cloudinary |
| express-rate-limit | 8.5.2 | Limitador de intentos de login por IP (5 intentos / 15 minutos) |
| cookie-parser | 1.4.7 | Parseo de cookies httpOnly que transportan los tokens JWT |
| dotenv | 17.4.2 | Carga de variables de entorno desde el archivo `.env` |

**Frontend**

| Librería / Framework | Versión | Propósito |
|---|---|---|
| React | 19.2.5 | Biblioteca para construir la interfaz de usuario con componentes funcionales |
| React Router DOM | 7.15.0 | Enrutamiento del lado del cliente (SPA) |
| Tailwind CSS | 4.2.4 | Framework de utilidades CSS para el diseño de la interfaz |
| Axios | 1.16.1 | Cliente HTTP para las peticiones a la API, con interceptor de refresh token |
| React Hook Form | 7.76.1 | Gestión de formularios con validación integrada |
| BlockNote | 0.51.4 | Editor de texto enriquecido por bloques para la creación y visualización de noticias |
| react-icons | 5.6.0 | Colección de iconos SVG como componentes React |

### 3.3 Repositorio y Control de Versiones

El código se gestiona con Git. La organización del repositorio sigue un enfoque monorepo con dos carpetas raíz independientes: `Backend/` y `Frontend/`. Cada una tiene su propio `package.json` y archivo `pnpm-lock.yaml`. En el Backend, el archivo `pnpm-workspace.yaml` permite compilar dependencias nativas como bcrypt.

### 3.4 Arquitectura Web del Proyecto

**Patrón general: API REST + SPA desacopladas**

El sistema sigue una arquitectura cliente-servidor donde el frontend (Single Page Application) y el backend (API REST) son completamente independientes. El frontend no renderiza HTML desde el servidor; todo el enrutamiento y la presentación ocurren en el navegador. La comunicación entre ambas capas se realiza exclusivamente mediante peticiones HTTP con cuerpos JSON.

**Backend: Arquitectura en capas (Layered Architecture)**

El backend organiza el código en cuatro capas bien delimitadas:

| Capa | Archivos | Responsabilidad |
|---|---|---|
| Rutas | `animals.routes.js`, `news.routes.js`, `user.routes.js`, `upload.routes.js` | Definen los endpoints HTTP y aplican los middlewares correspondientes antes de delegar al controlador |
| Middlewares | `verifyToken.js`, `validator.js`, `loginLimiter.js`, `upload.js` | Funciones reutilizables que se ejecutan antes del controlador: autenticación, validación de esquemas, límite de intentos y gestión de archivos |
| Controladores | `animals.controller.js`, `news.controller.js`, `user.controller.js` | Procesan la petición HTTP, ejecutan la lógica de negocio y construyen la respuesta |
| Modelos | `animal.model.js`, `news.model.js`, `user.model.js` | Definen el esquema de MongoDB mediante Mongoose y exponen métodos estáticos de acceso a datos |

Además, existe una capa de configuración centralizada (`config.js` y `cloudinary.js`) que concentra las variables de entorno y la lógica de conexión con servicios externos.

**Frontend: Arquitectura por componentes con Context API**

El frontend organiza el código en tres niveles:

- **Pages:** vistas completas que componen la página (`home`, `adoptions`, `news`, `login`, `reports`, `faq`, `donations`, `about-us`, `NewsCreate`, `NewsEdit`, `NewsDetail`).
- **Components:** piezas reutilizables agrupadas por dominio funcional (`adoptions/`, `news/`, `home/`, `aboutUs/`, `donations/`, `faq/`).
- **Context:** `AuthContext.jsx` gestiona el estado global de autenticación (usuario, token, loading) y lo expone a toda la app mediante React Context API.
- **Capa de API:** el archivo `api/auth.js` centraliza todas las llamadas HTTP con Axios e incluye un interceptor que renueva automáticamente el Access Token usando el Refresh Token cuando recibe un error 401.

**Autenticación: Doble Token con cookies httpOnly**

El sistema implementa autenticación con dos tokens JWT: un Access Token de 15 minutos de duración y un Refresh Token de 7 días. Ambos se almacenan en cookies httpOnly (no en localStorage), lo que los protege de ataques XSS. Cuando el Access Token expira, el interceptor de Axios detecta el error 401, llama automáticamente al endpoint `/api/refresh` y reintenta la petición original de forma transparente para el usuario.

**Base de datos: MongoDB con Mongoose**

La base de datos es MongoDB (NoSQL orientada a documentos), accedida a través del ODM Mongoose. Cada colección (`animals`, `news`, `users`) tiene su propio schema con validaciones a nivel de base de datos. Los métodos de acceso a datos se encapsulan como métodos estáticos en clases de modelo (`AnimalModel`, `NewsModel`, `UserModel`).

**Almacenamiento de media: Cloudinary con múltiple cuenta**

Las imágenes y videos se almacenan en Cloudinary. La lógica de subida (`cloudinary.js`) itera sobre un arreglo de hasta tres cuentas configuradas en variables de entorno: si una cuenta falla o supera su límite, intenta la siguiente. Esto permite operar dentro del nivel gratuito del servicio sin interrupciones.

**Diagrama de flujo:**

```
Navegador (React SPA)
 | petición HTTP/JSON + cookie httpOnly
 v
Express.js (Puerto 3000)
 -> Middleware: loginLimiter (rate limiting)
 -> Middleware: verifyToken (valida JWT)
 -> Middleware: validator (valida esquema Zod)
 -> Middleware: uploadCover (Multer, si aplica)
 |
 v
Controlador -> Modelo (Mongoose) -> MongoDB Atlas
 |
 ----> Cloudinary (si hay archivo)
```

---

## 4. Estado Actual del Código

A continuación, se detallan los bloques de código donde se detectaron oportunidades de mejora en términos de calidad, mantenibilidad y aplicación de buenas prácticas de diseño de software.

---

### Mejora 1 — Controladores con múltiples responsabilidades (principio SRP)

> `NewsController` mezcla lógica HTTP con transformaciones de datos y orquestación de servicios

| Campo | Detalle |
|---|---|
| **Módulo / Paquete** | `Backend / src/controllers/news.controller.js` |
| **Solución a implementar** | Extraer la lógica de transformación y orquestación a una clase `NewsService`. El servicio se encarga de: parsear el contenido JSON del editor BlockNote, convertir el campo "publicado" de string a booleano, coordinar la subida a Cloudinary y construir el objeto final que persiste en MongoDB. El controlador queda reducido a: recibir la petición, llamar al servicio y devolver la respuesta. |
| **Ventajas** | Cada clase tiene una sola razón para cambiar (Principio de Responsabilidad Única). La lógica de transformación se puede probar en tests unitarios sin necesidad de levantar Express. Si en el futuro se agrega un nuevo canal (CLI, otro endpoint), el servicio se reutiliza sin copiar código. |
| **Posibles desventajas** | Viabilidad: alta. Implica crear un archivo `src/services/news.service.js` y refactorizar el controlador. Impacto en otros módulos: bajo. Las rutas (`news.routes.js`) no cambian. Tolerancia a cambios: alta. Nuevas reglas de negocio se agregan en el servicio, no en el controlador. |

**El problema en el código (método `createNews`, simplificado):**

```javascript
// news.controller.js — createNews hace demasiadas cosas:
static async createNews(req, res) {
  // 1) Decide donde viene la imagen y la sube a Cloudinary
  let imageUrl = req.body.imagen_portada;
  if (req.file) {
    imageUrl = await uploadMedia(req.file.buffer);
  }
  if (!imageUrl) return res.status(400).json({ message: "..." });

  // 2) Parsea el JSON del editor BlockNote
  const contenido = typeof req.body.contenido === "string"
    ? JSON.parse(req.body.contenido)
    : req.body.contenido;

  // 3) Convierte "publicado" de string a booleano
  const newsData = {
    ...req.body,
    contenido,
    imagen_portada: imageUrl,
    publicado: req.body.publicado === "true"
  };

  // 4) Persiste en la base de datos
  const newNews = await NewsModel.createNews(newsData);
  res.status(201).json(newNews);
}

// Con Service Layer el controlador quedaría así:
static async createNews(req, res) {
  const newNews = await NewsService.createNews(req.body, req.file);
  res.status(201).json(newNews);
}
```

---

### Mejora 2 — Módulo `api/auth.js` del frontend agrupa lógica de dominios distintos

> El archivo `api/auth.js` concentra las peticiones de autenticación, animales, noticias y media

| Campo | Detalle |
|---|---|
| **Módulo / Paquete** | `Frontend / api/auth.js` |
| **Solución a implementar** | Dividir el módulo en archivos separados por dominio: `api/axiosInstance.js` (instancia Axios compartida e interceptor de refresh token), `api/authApi.js` (`loginRequest`, `logoutRequest`, `verifyTokenRequest`, `refreshTokenRequest`), `api/animalsApi.js` (`getAnimalsRequest`, `getAnimalByIdRequest`, `createAnimalRequest`, etc.), `api/newsApi.js` (`getNewsRequest`, `createNewsRequest`, `updateNewsRequest`, `deleteNewsRequest`, `uploadMediaRequest`). Cada componente importa solo el módulo que necesita. |
| **Ventajas** | Cada módulo tiene una cohesión alta: agrupa funciones que cambian por la misma razón. Un cambio en la API de noticias no obliga a revisar el módulo de autenticación. Reduce la probabilidad de conflictos en Git cuando varios integrantes trabajan en paralelo. |
| **Posibles desventajas** | Viabilidad: alta. Implica crear los archivos nuevos y actualizar los imports en páginas y componentes. Impacto en otros módulos: medio. Todos los archivos que importan desde `"../../api/auth"` deben actualizarse. Sin embargo, el cambio es mecánico (buscar y reemplazar el import) y no altera la lógica. Tolerancia a cambios: alta. Agregar nuevos endpoints solo modifica el módulo correspondiente. |

**Estado actual — todo en un único archivo:**

```javascript
// api/auth.js — mezcla de dominios en un mismo archivo:

// Autenticacion
export const loginRequest = user => instance.post("/login", user);
export const logoutRequest = () => instance.post("/logout");
export const verifyTokenRequest = () => instance.post("/verify");
export const refreshTokenRequest = () => instance.post("/refresh");

// Animales
export const createAnimalRequest = (data) => instance.post("/animals", data);
export const getAnimalsRequest = (params) => instance.get("/animals", { params });
export const getAnimalByIdRequest = (id) => instance.get(`/animals/${id}`);
export const updateAnimalRequest = (id, data) => instance.patch(`/animals/${id}`, data);
export const deleteAnimalRequest = (id) => instance.delete(`/animals/${id}`);

// Noticias
export const getNewsRequest = (...) => instance.get(`/news?...`);
export const createNewsRequest = (data) => instance.post("/news", data, {...});
export const updateNewsRequest = (id, data) => instance.patch(`/news/${id}`, data, {...});
export const deleteNewsRequest = (id) => instance.delete(`/news/${id}`);
export const getNewsBySlugRequest = (slug) => instance.get(`/news/${slug}`);

// Media
export const uploadMediaRequest = (data) => instance.post("/upload", data, {...});
```

---

### Mejora 3 — Lógica de fallback de Cloudinary sin patrón de diseño explícito

> La función `uploadMedia` itera cuentas con un bucle `for` que mezcla selección de cuenta y lógica de subida

| Campo | Detalle |
|---|---|
| **Módulo / Paquete** | `Backend / src/config/cloudinary.js` |
| **Solución a implementar** | Aplicar el patrón **Chain of Responsibility**. Crear una clase `CloudinaryHandler` con un constructor que recibe la cuenta y el siguiente handler. El método `handle(buffer)` intenta la subida; si falla, delega al siguiente handler en la cadena. La función `uploadMedia` queda reducida a iniciar la cadena: `handler1.handle(buffer)`. |
| **Ventajas** | Cada handler tiene una sola responsabilidad: intentar la subida con su cuenta. Agregar o quitar una cuenta consiste en agregar o quitar un nodo en la cadena, sin modificar la lógica existente (principio Abierto/Cerrado). El código es más declarativo y fácil de testear de forma aislada. |
| **Posibles desventajas** | Viabilidad: media. Requiere refactorizar `cloudinary.js` y la función `deleteMedia`. Impacto en otros módulos: bajo. `news.controller.js` y `upload.routes.js` llaman a `uploadMedia()` y `deleteMedia()` con la misma firma, por lo que no necesitan cambios. Tolerancia a cambios: alta. El diseño en cadena escala naturalmente con nuevas cuentas. |

**Código actual y propuesta:**

```javascript
// cloudinary.js — ACTUAL: lógica mezclada en un bucle for
export const uploadMedia = async (buffer) => {
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    if (!account.cloud_name || !account.api_key || !account.api_secret) continue;
    try {
      const url = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "caan_noticias", resource_type: "auto", ...account },
          (error, result) => { if (error) return reject(error); resolve(result.secure_url); }
        );
        uploadStream.end(buffer);
      });
      return url;
    } catch (error) {
      if (i === accounts.length - 1) throw new Error("Todas las cuentas fallaron.");
    }
  }
};

// PROPUESTA: Chain of Responsibility
class CloudinaryHandler {
  constructor(account, next = null) {
    this.account = account;
    this.next = next;
  }

  async handle(buffer) {
    if (!this.account.cloud_name) {
      return this.next ? this.next.handle(buffer) : null;
    }
    try {
      return await subirConCuenta(buffer, this.account); // función auxiliar extraída
    } catch {
      if (this.next) return this.next.handle(buffer);
      throw new Error("Todas las cuentas de Cloudinary fallaron.");
    }
  }
}

// Construcción de la cadena al iniciar el módulo:
const chain = new CloudinaryHandler(accounts[0],
  new CloudinaryHandler(accounts[1],
    new CloudinaryHandler(accounts[2])
  )
);

export const uploadMedia = (buffer) => chain.handle(buffer);
```

---

### Mejora 4 — Ausencia de manejo de errores centralizado en el backend

> Cada método de cada controlador repite el mismo bloque `catch` con `res.status(500)`

| Campo | Detalle |
|---|---|
| **Módulo / Paquete** | `Backend / src/controllers/` (`animals.controller.js`, `news.controller.js`, `user.controller.js`) |
| **Solución a implementar** | Implementar un **middleware de manejo de errores de Express** (Error Handling Middleware). Crear `src/middlewares/errorHandler.js` con una función de cuatro parámetros: `(err, req, res, next)`. En los controladores, reemplazar los bloques `catch` por: `catch (error) { next(error); }`. Registrar el middleware al final de `index.js`, después de todas las rutas. Opcionalmente, definir clases de error personalizadas (`AppError`) con un campo `statusCode` para diferenciar errores de cliente (4xx) de errores de servidor (5xx). |
| **Ventajas** | Elimina la repetición del mismo código de error en los 12 métodos de controladores. Garantiza un formato de respuesta de error uniforme en toda la API. Facilita agregar logging centralizado de errores en un único lugar. Los controladores quedan más cortos y centrados en el camino exitoso. |
| **Posibles desventajas** | Viabilidad: alta. Es un patrón nativo de Express con documentación oficial. Impacto en otros módulos: requiere modificar todos los controladores, pero el cambio en cada uno es reemplazar 3 líneas por 1. Tolerancia a cambios: muy alta. Nuevos tipos de error se agregan en `errorHandler.js` sin tocar los controladores. |

**El patrón repetido en el código actual:**

```javascript
// animals.controller.js — el mismo bloque catch aparece en CADA método:
static async getAllAnimals(req, res) {
  try { /* ... */ }
  catch (error) { return res.status(500).json({ message: error.message }); }
}

static async getAnimalById(req, res) {
  try { /* ... */ }
  catch (error) { return res.status(500).json({ message: error.message }); }
}

static async createAnimal(req, res) {
  try { /* ... */ }
  catch (error) { return res.status(500).json({ message: error.message }); }
}

// ... se repite en updateAnimal, deleteAnimal, y en todos los otros controladores

// PROPUESTA — src/middlewares/errorHandler.js:
export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";
  res.status(status).json({ message });
};

// index.js — registrar al final de todas las rutas:
import { errorHandler } from "./middlewares/errorHandler.js";
app.use(errorHandler);

// Cada controlador queda así:
static async getAllAnimals(req, res, next) {
  try { const animals = await AnimalModel.getAllAnimals(); res.json(animals); }
  catch (error) { next(error); } // una sola línea
}
```

---

## Tabla Resumen de Mejoras Detectadas

| # | Módulo | Problema | Patrón / Técnica | Prioridad |
|---|---|---|---|---|
| 1 | `news.controller.js` | Controlador con múltiples responsabilidades | Service Layer (SRP) | Alta |
| 2 | `api/auth.js` (frontend) | Un archivo con todos los dominios mezclados | Modularización por dominio | Media |
| 3 | `cloudinary.js` | Bucle `for` para fallback de cuentas sin patrón | Chain of Responsibility | Media |
| 4 | Todos los controladores | Bloque `catch` repetido en cada método | Error Handling Middleware | Media |
