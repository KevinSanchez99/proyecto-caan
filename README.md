# Cómo poner a funcionar el proyecto

Este proyecto tiene el Frontend y el Backend separados en carpetas independientes. Se utiliza `pnpm` como gestor de paquetes y una base de datos MongoDB local.

## Requisitos previos
* Tener instalado Node.js.
* Tener instalado `pnpm` (si no lo tienes, puedes instalarlo globalmente con `npm install -g pnpm`).
* Tener una instancia de MongoDB local ejecutándose.

---

## 1. Configuración del Backend

1. Abre una terminal y dirígete a la carpeta del backend:
   ```bash
   cd Backend
   ```
2. Instala las dependencias del proyecto:
   ```bash
   pnpm install
   ```
3. Crea un archivo llamado .env en la raíz de la carpeta Backend/ y define las siguientes variables de entorno con tus valores locales:
   ```bash
   MONGO_URI=
   PORT=
   SALT_ROUND=
   SECRET_JWT_KEY=
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   pnpm run dev
   ```
## 2. Configuración del Frontend
1. Abre otra terminal (o regresa a la raíz) y dirígete a la carpeta del frontend:
   ```bash
   cd Frontend
   ```
2. Instala las dependencias del proyecto:
   ```bash
   pnpm install
   ```
3. Inicia el servidor de desarrollo de Vite:
   ```bash
   pnpm run dev
   ```
