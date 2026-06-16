# Trabajo Práctico Integrador

**Materia:** Gestión del desarrollo de software  
**Profesor:** Fernández Carbonell, Cesar Augusto  
**Regional:** UTN Mar del Plata

---

## Parte 1

El presente trabajo tiene como finalidad aplicar los conceptos desarrollados durante la primera parte de la cursada a un caso real. Para ello, cada grupo deberá utilizar como base el proyecto desarrollado en la asignatura Programación IV y elaborar un documento de gestión que permita analizar, planificar y justificar las decisiones tomadas durante el desarrollo del proyecto.

El trabajo deberá presentarse en formato digital (PDF) y redactarse de manera formal, clara y fundamentada.

---

## 1. Presentación del Proyecto

### 1.1 Descripción General

- **Nombre del proyecto:** Portal CAAN (Centro de Ayuda al Animal de Necochea).
- **Institución seleccionada:** Centro de Ayuda al Animal de Necochea (CAAN), una organización sin fines de lucro enfocada en el rescate, cuidado, castración gratuita y adopción responsable de perros callejeros o en situación de riesgo en la ciudad de Necochea.
- **Problemática identificada:** El CAAN cuenta con información dispersa en múltiples redes sociales sin un canal centralizado. Esto genera una falta de catálogo actualizado y estructurado de animales en adopción, desorganización en los procesos de postulación, dificultades para que los interesados accedan de forma unificada a las opciones de donación y asociamiento (socios), y sobrecarga del personal para responder consultas repetitivas.
- **Solución propuesta:** El desarrollo de una plataforma web integral autogestionable que centralice la información institucional. Contará con una sección pública para visualizar el catálogo de perros disponibles (con detalles de salud, tamaño y sexo), un apartado de noticias/eventos para difundir jornadas de castración y campañas, un área de donaciones y registro de socios, y un panel de administración robusto y seguro para que el personal del CAAN gestione la información (CRUD de animales y noticias) de manera simple y dinámica.

### 1.2 Justificación

- **Qué necesidad busca resolver el proyecto:** Centralizar y digitalizar la gestión de datos del CAAN. Permite agilizar la búsqueda de hogares para los animales, automatizar la difusión de campañas y simplificar la recaudación de fondos.
- **Cuál es su aporte para la institución:** Optimiza el tiempo de los voluntarios al automatizar la visualización de perros y reducir las consultas por canales informales. Además, profesionaliza la imagen digital de la organización, facilitando la captación de nuevos socios y donantes.
- **Qué beneficios podría generar para los usuarios:** Permite a la comunidad buscar y filtrar animales por tamaño o sexo en un catálogo confiable, informarse de manera transparente sobre los métodos de donación física y digital, y conocer el trabajo del CAAN a través de noticias actualizadas.

---

## 2. Misión y Visión

### 2.1 Misión

Ofrecer al Centro de Ayuda al Animal de Necochea (CAAN) una plataforma digital centralizada y eficiente que conecte de forma transparente y ágil a la comunidad con los animales en adopción, promoviendo la tenencia responsable y facilitando la recaudación de recursos para sostener su labor social y el centro de castración gratuito.

### 2.2 Visión

Posicionarse como el principal canal de interacción del CAAN con la comunidad de Necochea y la región, logrando automatizar por completo la gestión informativa del refugio, aumentando significativamente el índice de adopciones exitosas y consolidando una base de donantes activos que garantice la sostenibilidad del centro.

---

## 3. Objetivos del Proyecto

### 3.1 Objetivo General

Desarrollar e implementar un sistema web integral (Single Page Application en React y API REST en Node.js/Express) para centralizar la información institucional del CAAN, automatizar la gestión del catálogo de animales y noticias, y optimizar el proceso de donaciones durante el ciclo lectivo actual.

### 3.2 Objetivos Específicos

1. Diseñar e implementar una base de datos NoSQL en MongoDB Atlas con esquemas estructurados para almacenar y relacionar la información de perros, noticias y usuarios administradores.
2. Desarrollar un catálogo público interactivo en el Frontend con filtros de búsqueda por sexo, tamaño y estado del animal, integrando un diseño responsive y de alto rendimiento.
3. Crear un panel de administración seguro con control de acceso mediante tokens JWT (Access y Refresh tokens) almacenados en cookies httpOnly, que permita gestionar el contenido (CRUD) de animales y noticias.
4. Implementar un editor de texto enriquecido (BlockNote) en la sección de noticias del panel de administración para facilitar la redacción y maquetación de campañas por parte del staff del refugio.
5. Integrar el servicio de almacenamiento en la nube Cloudinary con un mecanismo de fallback multi-cuenta que garantice la disponibilidad de la carga de imágenes multimedia sin costo operativo para la institución.

---

## 4. Identificación de Stakeholders

Identificar los actores involucrados o afectados por el proyecto:

| Nombre o rol | Interés respecto al proyecto | Nivel de influencia |
|---|---|---|
| **Comisión Directiva del CAAN** | Administrar el catálogo de perros de manera ágil, difundir campañas de socios y noticias de castración, y recibir donaciones de forma transparente. | Alto |
| **Voluntarios del CAAN** | Reducir el tiempo dedicado a responder preguntas repetitivas en redes sociales sobre perros disponibles y formas de donar. | Medio |
| **Adoptantes Potenciales** | Visualizar con claridad qué perros están disponibles, conocer su estado de salud (vacunas, castración, desparasitado) y saber cómo iniciar el trámite. | Medio |
| **Donantes y Socios** | Disponer de canales claros y confiables para aportar fondos o insumos al refugio. | Bajo |
| **Equipo de Desarrollo (Kevin, Tomás, Tomás B.)** | Aplicar conocimientos técnicos de programación y metodologías de gestión de proyectos, logrando un software robusto y útil. | Alto |
| **Profesor de la Cátedra (Cesar A. Fernández C.)** | Evaluar que el proyecto cumpla con los estándares académicos y profesionales de gestión del desarrollo de software. | Alto |

---

## 5. Alcance del Proyecto

### 5.1 Funcionalidades Incluidas

- **Página de Inicio (Home):** Presentación institucional, visión resumida, accesos directos y footer con redes sociales del CAAN.
- **Catálogo de Adopciones:** Listado de animales disponibles con fotos, edad, sexo, tamaño, descripción detallada y estado de salud (vacunación, castración, desparasitación, condiciones especiales).
- **Sección de Donaciones y Socios:** Información detallada sobre cómo donar alimento, abrigos y materiales de construcción, así como datos de transferencia bancaria e información para asociarse.
- **Blog de Noticias y Campañas:** Listado público de novedades y eventos del refugio.
- **Sección FAQ:** Preguntas frecuentes sobre adopciones, castración y ubicación geográfica del refugio.
- **Panel de Administración (Admin Dashboard):**
  - Autenticación con Login/Logout seguro (JWT Access/Refresh token en cookies httpOnly con auto-refresh).
  - Listado y búsqueda interna de perros y noticias.
  - CRUD completo de Perros (Creación, lectura, actualización y borrado con subida de fotos).
  - CRUD completo de Noticias (Creación, lectura, actualización y borrado con editor enriquecido BlockNote).
- **Servicios Cloud y Base de Datos:**
  - Almacenamiento en la nube (Cloudinary) con fallback automático de 3 cuentas.
  - Base de datos en la nube (MongoDB Atlas).

### 5.2 Funcionalidades Excluidas

- **Pasarela de pago integrada automatizada:** No se realizará checkout de tarjetas en tiempo real dentro del sitio (ej. SDK de Mercado Pago Web Checkout); se presentarán links de pago externos o datos bancarios.
- **Sistema de turnos online para castración:** La coordinación se informará en el apartado FAQ y contacto, sin contar con agenda o base de datos de turnos.
- **Chat interno en tiempo real:** No se proveerá una mensajería directa tipo chat web; los adoptantes contactarán al CAAN por las redes sociales oficiales publicadas.
- **Aplicación móvil nativa:** El sistema será exclusivamente web responsivo (Desktop y Mobile Web).

---

## 6. Restricciones del Proyecto

Identificar las restricciones que podrían afectar el desarrollo.

Considerar, entre otras:

- **Tiempo disponible:** El desarrollo y la entrega del documento integrador deben realizarse estrictamente dentro del calendario académico del semestre en curso.
- **Recursos humanos:** El equipo de trabajo está compuesto únicamente por tres (3) estudiantes, quienes deben repartir sus roles técnicos y de gestión (Kevin Sánchez, Tomás Sollberger, Tomás B. Stutz).
- **Presupuesto:** Presupuesto de $0. El software debe apoyarse únicamente en tiers gratuitos de bases de datos (MongoDB Atlas), hosting y servicios multimedia (Cloudinary).
- **Tecnologías requeridas:** Obligatoriedad de utilizar la pila tecnológica pautada: React para Frontend, Node.js/Express para Backend y MongoDB para persistencia.
- **Curva de aprendizaje:** Adaptación al uso de Tailwind CSS en su última versión, control de cookies httpOnly seguras inter-dominio y el framework Vite.

---

## 7. Modelo de Desarrollo

Seleccionar uno de los modelos estudiados durante la cursada.

Para este proyecto se selecciona el **Modelo de Desarrollo Ágil (Scrum) combinado con un enfoque de Ciclo de Vida Incremental**.

**Justificación y razones por las cuales resulta adecuado para el proyecto:**

1. **Flexibilidad frente a imprevistos:** Al ser un equipo reducido con recursos limitados, el desarrollo incremental nos permite estructurar entregas de valor en cada iteración (Sprints de 2 semanas) y adaptarnos rápidamente si una tecnología (como el almacenamiento multi-cuenta) requiere ajustes.
2. **Mitigación del riesgo de integración:** Al desacoplar el Frontend y Backend, un ciclo incremental permite ir construyendo endpoints de la API y consumirlos de inmediato desde React, detectando errores de comunicación tempranamente en lugar de esperar al final del proyecto.
3. **Foco en el MVP (Mínimo Producto Viable):** Permite priorizar la funcionalidad core (el catálogo de animales y el panel admin) y dejar para las últimas iteraciones los aspectos estáticos e informativos (FAQ, Donaciones), asegurando que el corazón del sistema esté completamente operativo a la fecha de entrega.

---

## 8. Aplicación de Scrum

### 8.1 Roles

Definir quiénes asumirían los siguientes roles:

- **Product Owner:** **Sánchez, Kevin**. Responsable de definir las prioridades del backlog de producto y validar que las funcionalidades construidas resuelvan las necesidades reales del refugio CAAN.
- **Scrum Master:** **Sollberger, Tomás**. Encargado de remover impedimentos técnicos (configuración de DevOps, Base de Datos, deploy) y asegurar el cumplimiento de las dinámicas del desarrollo.
- **Equipo de Desarrollo:** **Sánchez Kevin, Sollberger Tomás, Stutz Tomás Bautista**. Equipo multidisciplinario a cargo del diseño de base de datos, maquetación UI/UX, desarrollo backend (rutas, controladores, modelos, validaciones) y frontend (componentes React, consumo de API, enrutamiento).

### 8.2 Product Backlog Inicial

Presentar una lista preliminar de funcionalidades o tareas organizadas según su prioridad:

1. **PB-01:** Configuración del entorno de base de datos MongoDB Atlas y conexión del Backend. (Alta)
2. **PB-02:** Implementación del sistema de autenticación seguro (JWT dual con cookies httpOnly y endpoint de refresh). (Alta)
3. **PB-03:** Desarrollo del modelo de datos y endpoints CRUD de Animales (Backend). (Alta)
4. **PB-04:** Desarrollo del panel de administración del catálogo de animales en Frontend (React). (Alta)
5. **PB-05:** Desarrollo de la interfaz pública del Catálogo de Animales con filtros por tamaño y sexo (Frontend). (Alta)
6. **PB-06:** Configuración de la integración con Cloudinary (subida de archivos multimedia). (Media)
7. **PB-07:** Desarrollo del modelo de datos y endpoints CRUD de Noticias con soporte de texto BlockNote (Backend). (Media)
8. **PB-08:** Desarrollo del editor y gestor de noticias en el panel de administración (Frontend). (Media)
9. **PB-09:** Implementación de la sección informativa de Donaciones, Socios y página institucional (Home, FAQ). (Baja)
10. **PB-10:** Refactorización de código: modularización de API Axios en Frontend y Service Layer en Backend. (Baja)

---

## 9. Historias de Usuario

Redactar un mínimo de diez (10) historias de usuario utilizando el formato establecido:

1. **HU-01:** Como adoptante, quiero visualizar el catálogo de perros del CAAN con sus fotos y datos de salud, para poder evaluar de forma informada cuál de ellos se adaptaría mejor a mi hogar.
2. **HU-02:** Como adoptante, quiero filtrar los animales por tamaño (pequeño, mediano, grande) y por sexo (macho, hembra), para buscar rápidamente perros que cumplan con los requisitos de espacio de mi vivienda.
3. **HU-03:** Como donante, quiero acceder a los datos de transferencia bancaria e información de insumos necesarios en la web, para realizar aportes físicos o monetarios de forma rápida y confiable.
4. **HU-04:** Como vecino de Necochea, quiero leer las noticias y campañas en la plataforma, para enterarme sobre las próximas jornadas de castración gratuita y eventos benéficos.
5. **HU-05:** Como administrador del refugio, quiero iniciar sesión mediante usuario y contraseña de forma segura, para acceder al panel de gestión y evitar accesos no autorizados a los datos.
6. **HU-06:** Como administrador del refugio, quiero registrar un nuevo animal ingresando su nombre, edad, tamaño, fotos y estado de salud, para que se muestre de inmediato en el catálogo público.
7. **HU-07:** Como administrador del refugio, quiero modificar el estado de un perro a "Adoptado" o editar su información de salud, para mantener el catálogo actualizado y evitar que los usuarios consulten por animales que ya encontraron un hogar.
8. **HU-08:** Como administrador del refugio, quiero eliminar de forma permanente la ficha de un animal, para limpiar el catálogo de registros obsoletos o erróneos.
9. **HU-09:** Como administrador del refugio, quiero redactar noticias utilizando un editor de texto enriquecido por bloques, para publicar anuncios institucionales atractivos y con formato sin requerir conocimientos técnicos de programación.
10. **HU-10:** Como administrador del refugio, quiero que el sistema gestione de manera automática la subida de imágenes a cuentas secundarias si la cuenta principal está saturada, para poder seguir actualizando la web sin interrupciones operativas.

---

## 10. Requerimientos

### 10.1 Requerimientos Funcionales

Identificar un mínimo de diez (10) requerimientos funcionales:

- **RF1 (Autenticación):** El sistema debe validar las credenciales de los administradores y gestionar la sesión utilizando cookies httpOnly seguras con tokens JWT.
- **RF2 (Registro de Animales):** El sistema debe permitir al administrador dar de alta un animal registrando nombre, especie, raza, fecha de nacimiento, sexo, tamaño, estado (Disponible/Adoptado), salud (vacunado, castrado, desparasitado, condiciones especiales), descripción e imágenes.
- **RF3 (Edición de Animales):** El sistema debe permitir al administrador modificar los datos de cualquier animal registrado mediante formularios de edición.
- **RF4 (Eliminación de Animales):** El sistema debe permitir al administrador borrar registros de animales de la base de datos.
- **RF5 (Consulta de Catálogo):** El sistema debe mostrar al público general la lista de animales disponibles para adopción, con paginación y filtros dinámicos.
- **RF6 (Creación de Noticias):** El sistema debe permitir al administrador crear noticias con título, slug descriptivo único, contenido dinámico en formato JSON, imagen de portada y categoría.
- **RF7 (Edición de Noticias):** El sistema debe permitir modificar el contenido y estado de publicación (borrador/publicado) de las noticias.
- **RF8 (Eliminación de Noticias):** El sistema debe permitir al administrador borrar noticias de la plataforma.
- **RF9 (Subida Multimedia):** El sistema debe procesar archivos de imagen a través del backend, subirlos a Cloudinary y almacenar la URL resultante en la base de datos.
- **RF10 (Visualización Pública de Contenido):** El sistema debe renderizar las vistas informativas de Home, Donaciones, Preguntas Frecuentes y Noticias de forma libre (sin necesidad de loguearse).

### 10.2 Requerimientos No Funcionales

Identificar un mínimo de cinco (5) requerimientos no funcionales:

- **RNF1 (Seguridad):** Los tokens JWT de autenticación no deben ser accesibles a través de scripts del lado del cliente (configurados como cookies `httpOnly` y `Secure`) para mitigar ataques de Cross-Site Scripting (XSS).
- **RNF2 (Confiabilidad y Fallback):** El módulo de subida a la nube debe implementar una cadena de responsabilidad (Chain of Responsibility) con hasta tres cuentas de Cloudinary para evitar interrupciones por límites de cuota gratuita.
- **RNF3 (Usabilidad y Responsividad):** La interfaz de usuario debe desarrollarse bajo la metodología Mobile-First utilizando Tailwind CSS, garantizando una correcta visualización en pantallas móviles y de escritorio.
- **RNF4 (Robustez y Validación):** Todos los datos de entrada en los endpoints de la API (Backend) deben ser validados sintáctica y semánticamente mediante esquemas de Zod antes de ser procesados o guardados en MongoDB.
- **RNF5 (Mantenibilidad y Arquitectura):** El backend debe estructurarse bajo una arquitectura de capas bien definidas (Rutas, Middlewares, Controladores, Modelos y Servicios), asegurando el principio de responsabilidad única (SRP).

---

## 11. Priorización de Requerimientos

Clasificar los requerimientos según su nivel de prioridad:

- **Prioridad Alta:** RF1, RF2, RF3, RF5, RNF1, RNF4.  
  *Justificación:* Constituyen el núcleo (Core) de la aplicación. Sin autenticación segura, catálogo público e ingreso/edición de animales, el sistema no cumple con la funcionalidad mínima requerida para el refugio. Zod garantiza que no ingrese basura a la base de datos.
- **Prioridad Media:** RF4, RF6, RF7, RF8, RF9, RNF2, RNF5.  
  *Justificación:* Las noticias y las imágenes enriquecen la experiencia del usuario y facilitan la comunicación de campañas. El fallback de Cloudinary y la arquitectura de servicios aseguran que la plataforma sea escalable, confiable y mantenible a mediano plazo.
- **Prioridad Baja:** RF10, RNF3.  
  *Justificación:* Las vistas informativas estáticas (Home, Donaciones, FAQ) y la adaptabilidad de la UI a dispositivos muy específicos, aunque sumamente importantes para el producto final, se pueden desarrollar en las etapas de cierre ya que no comprometen la lógica transaccional de la app.

---

## 12. Gestión de Riesgos

Identificar riesgos potenciales asociados al proyecto y clasificarlos en categorías:

1. **Riesgo 1 (R1) - Saturación del almacenamiento multimedia (Técnico):** Al utilizar la versión gratuita de Cloudinary, el refugio podría superar el límite mensual de ancho de banda o almacenamiento debido a fotos de animales en alta resolución, impidiendo que los administradores suban nuevas fotos.
2. **Riesgo 2 (R2) - Descoordinación de los endpoints del Frontend al consumir API (Humano):** Centralizar todas las llamadas HTTP en un archivo único gigante en el frontend (`api/auth.js`) puede provocar colisiones de Git frecuentes y dificultar que varios desarrolladores trabajen en paralelo.
3. **Riesgo 3 (R3) - Acoplamiento en controladores (Mezcla de responsabilidades) (Gestión/Técnico):** Que los controladores del backend orquesten directamente el parseo de BlockNote, el casteo de booleanos y la subida a la nube genera un código difícil de probar mediante tests unitarios aislados, comprometiendo la mantenibilidad.
4. **Riesgo 4 (R4) - Exposición de datos de error del servidor en respuestas API (Técnico/Seguridad):** La falta de un sistema de captura de errores homogéneo provoca que cada endpoint responda con códigos e información de error inconsistentes, pudiendo filtrar trazas de la base de datos (MongoDB) al cliente.
5. **Riesgo 5 (R5) - Retrasos en el cronograma por problemas en la puesta en marcha de base de datos o de despliegue (Gestión):** Dificultades técnicas en el despliegue del monorepo (pnpm workspaces) y configuraciones de variables de entorno entre entornos de desarrollo y producción que demoren las entregas.

---

## 13. Matriz de Riesgos

Construir una matriz de probabilidad e impacto:

| ID Riesgo | Descripción del Riesgo | Categoría | Probabilidad de ocurrencia | Impacto esperado | Nivel de Riesgo (Prob. x Imp.) |
|---|---|---|---|---|---|
| **R1** | Saturación de cuota en almacenamiento de fotos. | Técnico | Media | Alto | Alto |
| **R2** | Conflictos y colisiones de código en `api/auth.js`. | Humano | Alta | Medio | Medio-Alto |
| **R3** | Controladores con lógica acoplada (No-SRP). | Técnico | Alta | Medio | Medio-Alto |
| **R4** | Exposición de errores internos y falta de uniformidad. | Técnico | Media | Alto | Alto |
| **R5** | Retrasos en cronograma de entrega por configuración pnpm. | Gestión | Baja | Alto | Medio |

---

## 14. Estrategias de Mitigación

Definir acciones concretas para prevenir o reducir el impacto de los riesgos identificados:

- **Mitigación para R1 (Saturación Cloudinary):** Implementar en el backend un módulo de subida multimedia que aplique el patrón **Chain of Responsibility** (Cadena de Responsabilidad). Se configurarán tres cuentas gratuitas de Cloudinary en variables de entorno; si una cuenta retorna un error de cuota superada, el flujo derivará de forma transparente al siguiente manejador de la cadena.
- **Mitigación para R2 (Descoordinación de API en Frontend):** Dividir el módulo central `api/auth.js` en múltiples archivos específicos estructurados por dominios de negocio: `api/axiosInstance.js` (configuración del interceptor de refresh token), `api/authApi.js` (login/logout/verify), `api/animalsApi.js` (catálogo y CRUD de perros) y `api/newsApi.js` (noticias). Esto aísla los cambios de código y reduce drásticamente las colisiones en Git.
- **Mitigación para R3 (Acoplamiento de Controladores):** Introducir una capa de servicios (**Service Layer**). Por ejemplo, extraer la lógica del controlador de noticias hacia un archivo `src/services/news.service.js` que se encargue de orquestar la conversión de tipos, parsear JSON de BlockNote y coordinar la subida a Cloudinary, dejando al controlador con la única función de recibir y responder HTTP.
- **Mitigación para R4 (Exposición de Errores):** Desarrollar un **Middleware de Manejo de Errores Centralizado** en Express (`src/middlewares/errorHandler.js`). Todos los bloques `catch` de los controladores delegarán el error a la función `next(error)`, la cual procesará el error en un solo punto, registrará logs y responderá un JSON uniforme sin filtrar trazas internas del servidor.
- **Mitigación para R5 (Retrasos en Cronograma):** Definir tareas claras mediante un listado de control (checklists) y usar monorepos limpios con dependencias administradas por `pnpm`. Realizar integraciones frecuentes (mínimo dos veces por sprint) en la rama principal.

---

## 15. Calidad del Software

Analizar el proyecto considerando las características de calidad estudiadas en clase:

- **Adecuación funcional:** Garantizada al cubrir exactamente las necesidades de visualización pública y administración que el CAAN necesita. Las validaciones rigurosas con Zod evitan datos incompletos en la base de datos.
- **Usabilidad:** Interfaz limpia diseñada con Tailwind CSS, enfocada en la facilidad de uso para los adoptantes. En el panel administrativo, el editor BlockNote permite al personal formatear noticias con clics sencillos, simulando un editor tradicional.
- **Eficiencia:** El uso de índices en MongoDB Atlas optimiza las búsquedas en el catálogo. Adicionalmente, el frontend implementa peticiones asíncronas con Axios, evitando recargas completas de página y reduciendo el consumo de ancho de banda.
- **Fiabilidad:** El backend cuenta con middlewares de límite de peticiones (`express-rate-limit`) para prevenir ataques de denegación de servicio y el fallback de Cloudinary que asegura la persistencia de imágenes ante saturación de cuentas.
- **Seguridad:** Los tokens JWT no se almacenan en el almacenamiento local del navegador (evitando robos por XSS), sino en cookies httpOnly protegidas. Las contraseñas de los administradores se encriptan usando un algoritmo fuerte de hasheo (`bcrypt`).
- **Mantenibilidad:** El acoplamiento se reduce al implementar Service Layer, modularizar las llamadas API en frontend y estructurar el backend bajo capas definidas, facilitando la adición de nuevas funciones sin romper código previo.

---

## 16. Estrategia de Testing

Describir las pruebas que se realizarían sobre el sistema:

1. **Pruebas Unitarias (Unit Testing):**
   - **Objetivo:** Validar el comportamiento aislado de funciones clave como la lógica de subida en cadena de Cloudinary, los esquemas de validación Zod, y los servicios de transformación de datos (ej. `NewsService`).
   - **Momento:** Durante la codificación de cada módulo o servicio (fase de desarrollo).
2. **Pruebas de Integración (Integration Testing):**
   - **Objetivo:** Probar el correcto funcionamiento conjunto de componentes interdependientes del Backend (ej. que una ruta aplique correctamente el middleware de rate-limit, luego el de JWT, luego el validador Zod y finalmente llame al servicio correspondiente).
   - **Momento:** Al completar una ruta o flujo completo de la API.
3. **Pruebas de Sistema / Extremo a Extremo (E2E Testing):**
   - **Objetivo:** Verificar el flujo completo del usuario en el navegador interactuando con la API y la persistencia de datos (ej. login exitoso, redirección a dashboard, carga de un perro con imagen, verificación de su presencia en el catálogo).
   - **Momento:** En la etapa final de cada sprint previo a la entrega del incremento.
4. **Pruebas de Aceptación:**
   - **Objetivo:** Corroborar junto a representantes del CAAN que las interfaces, catálogos y sistemas de noticias se alinean con sus expectativas operativas.
   - **Momento:** Al cierre del proyecto.

---

## 17. Deuda Técnica

Identificar posibles situaciones en las cuales podría generarse deuda técnica:

- **Cómo podría originarse:**
  - Presión de tiempo para entregar las entregas académicas, incitando a dejar todas las APIs del frontend en un único archivo (`api/auth.js`).
  - No modularizar el backend inicialmente, mezclando la lógica multimedia y de negocio en controladores para "hacerlo andar rápido".
  - Ausencia de tests automatizados unitarios al inicio de la cursada.
- **Qué consecuencias tendría:**
  - Aumento exponencial del tiempo necesario para corregir bugs sencillos (el código se vuelve frágil).
  - Conflictos repetitivos al unir ramas en Git (merge conflicts).
  - Dificultad para incorporar nuevos desarrolladores al equipo debido a la falta de claridad arquitectónica y acoplamiento severo de las funciones.
- **Acciones para evitarla o reducirla:**
  - Reservar un porcentaje de tiempo de cada Sprint (aproximadamente un 15%) exclusivo para tareas de refactorización.
  - Implementar los patrones de arquitectura propuestos (Chain of Responsibility en Cloudinary, Service Layer en backend, separación de módulos de Axios en frontend) de forma temprana.
  - Ejecutar análisis estático de código (linters como ESLint) en el pipeline de desarrollo para obligar a mantener estándares de formateo y calidad sintáctica.

---

## 18. Conclusión

El desarrollo del proyecto Portal CAAN ha demostrado que el éxito de un producto de software no depende únicamente de la habilidad para escribir código, sino principalmente de una **gestión planificada y estructurada del desarrollo**. 

La aplicación de conceptos fundamentales como la definición rigurosa del alcance, el control de restricciones, y el análisis proactivo de riesgos técnicos y humanos (como la saturación de cuota y el acoplamiento de código) permite anticipar problemas antes de que se vuelvan costosos o catastróficos. La adopción de la metodología Scrum brindó al equipo un marco de trabajo ordenado, mejorando la comunicación y facilitando la priorización del backlog centrado en valor. 

Asimismo, la introducción de patrones de diseño específicos (como la Cadena de Responsabilidad para las cuentas de Cloudinary) y decisiones arquitectónicas formales (tales como la Service Layer y el middleware centralizado de errores) evidencian cómo las buenas prácticas de diseño impactan directamente en atributos críticos de calidad como la mantenibilidad, robustez y seguridad de la aplicación. En definitiva, este trabajo integrador consolida la perspectiva de que la ingeniería de software es una disciplina holística donde gestionar, diseñar y codificar deben ir de la mano.

---
## 19. Presentación del Proyecto

### 19.1 Estrategia de Estimación Seleccionada
Para el desarrollo de la plataforma CAAN, utilizaremos una **estrategia ágil de estimación basada en Story Points (Puntos de Historia)** y la técnica de **Planning Poker** apoyada por una **Estructura de Desglose de Trabajo (WBS - Work Breakdown Structure)** para identificar el alcance completo de manera jerárquica.
- **Justificación:** Al adoptar Scrum como marco de desarrollo, estimar en horas de reloj absolutas suele inducir a errores por la variabilidad en la experiencia de cada desarrollador y los imprevistos de integración. Los Story Points representan una medida relativa que combina: la *complejidad de la tarea*, el *esfuerzo requerido* y el *riesgo o incertidumbre*.
- Al usar una escala de Fibonacci modificada (1, 2, 3, 5, 8, 13), el equipo puede consensuar estimaciones comparando historias complejas con historias sencillas ya conocidas (historias pivote). Por ejemplo, crear una página estática como FAQ (2 SP) frente a implementar la autenticación segura mediante JWT en cookies httpOnly (8 SP).

### 19.2 Descomposición de Funcionalidades
Identificar las principales funcionalidades del sistema y dividirlas en tareas o componentes más pequeños. A continuación se presenta la descomposición jerárquica:
|
 Componente (WBS) 
|
 ID Tarea 
|
 Descripción de la Tarea / Funcionalidad 
|
|
---
|
---
|
---
|
|
**
Capa Transversal
**
|
 T-1.1 
|
 Configuración de base de datos MongoDB Atlas y conexión Mongoose. 
|
|
|
 T-1.2 
|
 Implementación de validaciones de entrada seguras utilizando Zod schemas. 
|
|
|
 T-1.3 
|
 Configuración de servidor Express, CORS, parser de cookies y variables de entorno. 
|
|
**
Autenticación (Auth)
**
|
 T-2.1 
|
 API: Endpoints de Login, Logout y Verificación de Token. 
|
|
|
 T-2.2 
|
 API: Middleware de autenticación y lógica de dual token (Access y Refresh JWT). 
|
|
|
 T-2.3 
|
 Frontend: AuthContext y consumo de Axios con interceptor de renovación de token. 
|
|
|
 T-2.4 
|
 Frontend: Interfaz visual de Login y ruta protegida para el Panel de Control. 
|
|
**
Mapeo de Animales
**
|
 T-3.1 
|
 API: CRUD completo de animales en base de datos. 
|
|
|
 T-3.2 
|
 API: Configuración de subida a Cloudinary con Chain of Responsibility (multi-cuenta). 
|
|
|
 T-3.3 
|
 Frontend: Vista pública del Catálogo con filtros dinámicos (sexo, tamaño) y paginación. 
|
|
|
 T-3.4 
|
 Frontend: Panel Admin - Formulario dinámico de creación/edición de animales con drag-and-drop. 
|
|
**
Blog de Noticias
**
|
 T-4.1 
|
 API: CRUD completo de noticias (título, slug, categoría, publicado). 
|
|
|
 T-4.2 
|
 Frontend: Integración de BlockNote Editor en panel administrativo para redactar noticias. 
|
|
|
 T-4.3 
|
 Frontend: Vista de listado público y detalle de noticias por slug. 
|
|
**
Vistas Generales
**
|
 T-5.1 
|
 Frontend: Maquetación responsive de Home, sección Donaciones/Socios y FAQ interactiva. 
|
### 19.3 Estimación de Esfuerzo
Realizar una estimación del esfuerzo requerido para cada funcionalidad o conjunto de tareas. Asignamos Story Points (SP) utilizando como referencia la historia pivote (T-5.1: 3 SP):
|
 ID Tarea 
|
 Funcionalidad / Tarea 
|
 Story Points (SP) 
|
 Justificación de la Estimación 
|
|
---
|
---
|
---
|
---
|
|
**
T-1.1
**
|
 Configurar MongoDB Atlas 
|
**
2 SP
**
|
 Tarea técnica conocida, requiere configuración cloud básica. 
|
|
**
T-1.2
**
|
 Validaciones Zod 
|
**
3 SP
**
|
 Requiere modelar esquemas estrictos de Zod para cada entidad (animal, noticia, login). 
|
|
**
T-1.3
**
|
 Configurar Express 
|
**
2 SP
**
|
 Boilerplate estándar y middlewares de base. 
|
|
**
T-2.1
**
|
 Endpoints de Auth 
|
**
3 SP
**
|
 Lógica de base de datos con bcrypt y endpoints HTTP estándar. 
|
|
**
T-2.2
**
|
 Cookies httpOnly & JWT 
|
**
8 SP
**
|
**
Complejidad Alta:
**
 requiere configuración de cabeceras seguras, ciclo de vida de tokens y middlewares cruzados. 
|
|
**
T-2.3
**
|
 AuthContext & Axios Interceptor 
|
**
8 SP
**
|
**
Complejidad Alta:
**
 interceptar errores 401 para hacer llamadas silenciosas de refresh sin interrumpir la UX. 
|
|
**
T-2.4
**
|
 Frontend Login & Protected Routes 
|
**
3 SP
**
|
 Formulario simple y envoltorio de rutas protegidas de React Router. 
|
|
**
T-3.1
**
|
 API CRUD Animales 
|
**
3 SP
**
|
 Lógica REST estándar apoyada en modelos de Mongoose. 
|
|
**
T-3.2
**
|
 Fallback Cloudinary 
|
**
5 SP
**
|
 Requiere modelar el patrón Chain of Responsibility para alternar entre credenciales ante saturación. 
|
|
**
T-3.3
**
|
 Vista Pública Catálogo 
|
**
5 SP
**
|
 Lógica de filtrado en el cliente y renderizado dinámico responsivo de cards. 
|
|
**
T-3.4
**
|
 Formulario Admin Perros 
|
**
8 SP
**
|
**
Complejidad Alta:
**
 subida asíncrona de múltiples archivos de imagen y manejo de estado complejo. 
|
|
**
T-4.1
**
|
 API CRUD Noticias 
|
**
3 SP
**
|
 Similitud con CRUD de animales, baja incertidumbre. 
|
|
**
T-4.2
**
|
 Editor BlockNote en Admin 
|
**
5 SP
**
|
 Integración del editor de bloques de terceros en el estado de React Hook Form. 
|
|
**
T-4.3
**
|
 Listado y Detalle de Noticias 
|
**
3 SP
**
|
 Renderizado estructurado del JSON devuelto por BlockNote. 
|
|
**
T-5.1
**
|
 Vistas Generales (Home, Donaciones, FAQ) 
|
**
3 SP
**
|
**
Historia Pivote:
**
 Desarrollo visual con baja interactividad lógica y baja incertidumbre. 
|
|
**
Total
**
|
|
**
63 SP
**
|
|
### 19.4 Análisis de Factores que Afectan la Estimación
Identificar los factores que podrían modificar las estimaciones realizadas:
- **Complejidad técnica del flujo de autenticación:** La implementación de JWT duales almacenados en cookies httpOnly seguras en entornos locales y de producción (cruzando subdominios/puertos entre Backend en 3000 y Frontend en 5173) suele demorar más de lo estimado debido a restricciones de seguridad del navegador (SameSite, Secure, etc.).
- **Dependencias Externas (Cloudinary y MongoDB Atlas):** Caídas de red temporales o cambios en la API gratuita de Cloudinary alteran los tiempos de testing del módulo multimedia.
- **Experiencia del equipo / Curva de aprendizaje:** El uso de React 19 y Tailwind CSS v4 presenta novedades de configuración sintáctica que podrían ralentizar el maquetado del Frontend.
- **Cambios en los requerimientos / Git conflicts:** Al trabajar tres desarrolladores sobre la misma SPA, la frecuencia de integración puede generar demoras imprevistas por resolución de conflictos.
---
## 20. Recursos del Proyecto
### 20.1 Recursos Humanos
Identificar los perfiles necesarios para llevar adelante el proyecto:
- **Sánchez, Kevin**
  - *Rol:* Product Owner (PO) / Full Stack Developer / PM.
  - *Responsabilidades:* Priorizar backlog, validar requerimientos, programar lógica de autenticación JWT y controladores backend, coordinar integraciones y QA Testing.
  - *Participación Estimada:* 15 horas semanales (45% del tiempo total durante las 6 semanas de desarrollo).
- **Sollberger, Tomás**
  - *Rol:* Scrum Master (SM) / DevOps / Database Administrator.
  - *Responsabilidades:* Facilitar reuniones, configurar el entorno monorepo con pnpm, administrar la base de datos MongoDB Atlas, e implementar la infraestructura y patrones backend.
  - *Participación Estimada:* 15 horas semanales (45% del tiempo total).
- **Stutz, Tomás Bautista**
  - *Rol:* Frontend Developer / UX-UI Designer / Documentación.
  - *Responsabilidades:* Diseñar prototipos visuales, maquetar la interfaz del portal público y el dashboard usando Tailwind CSS, integrar formularios de React Hook Form y redactar manuales.
  - *Participación Estimada:* 15 horas semanales (45% del tiempo total).
### 20.2 Recursos Tecnológicos
Identificar las herramientas, plataformas y tecnologías necesarias para el desarrollo:
- **Lenguajes y Entornos:** JavaScript (ES Modules), Node.js (v20+), Vite (v8+ como empaquetador del Frontend).
- **Frameworks y Librerías Backend:** Express.js (v5+), Mongoose (ODM), jsonwebtoken, bcrypt, Zod (validación), multer (gestión de archivos locales).
- **Frameworks y Librerías Frontend:** React (v19), React Router DOM (v7), Tailwind CSS (v4), Axios (HTTP Client), React Hook Form, BlockNote (editor enriquecido).
- **Herramientas de Diseño:** Figma (maquetación y prototipado visual de la interfaz responsiva).
- **Control de Versiones y Gestión:** Git, repositorios privados en GitHub, pnpm workspaces (monorepo).
- **Servicios de Alojamiento Cloud:** MongoDB Atlas (DBaaS), Cloudinary (almacenamiento de fotos).
### 20.3 Recursos de Infraestructura
Identificar los recursos físicos o virtuales requeridos para el funcionamiento del proyecto:
- **Servidores Locales de Desarrollo:** Computadoras personales con Windows/Linux con Node.js instalado, puertos locales 3000 (Backend) y 5173 (Frontend).
- **Bases de Datos Virtuales:** Cluster Sandbox gratuito en MongoDB Atlas.
- **Servicio de Hosting de Medios Cloud:** Cuenta en Cloudinary (hasta 25 GB de almacenamiento y ancho de banda mensual gratuito).
- **Hosting de la Aplicación:** Plataformas como Render, Vercel o servidores cloud equivalentes para la puesta en producción.
---
## 21. Costos del Proyecto
### 21.1 Costos Humanos
Realizar una estimación del costo asociado al trabajo del equipo de desarrollo, asumiendo valores de mercado en pesos argentinos (ARS):
- **Kevin S. (PM / Full Stack):** 15 hs/semana * 6 semanas = 90 hs. Valor hora: $4.500 ARS. Costo: $405.000 ARS.
- **Tomás S. (DevOps / DBA):** 15 hs/semana * 6 semanas = 90 hs. Valor hora: $4.500 ARS. Costo: $405.000 ARS.
- **Tomás B. (Frontend / UX):** 15 hs/semana * 6 semanas = 90 hs. Valor hora: $4.000 ARS. Costo: $360.000 ARS.
- **Costo Humano Total:** **$1.170.000 ARS** (durante la duración del desarrollo de 6 semanas).
### 21.2 Costos Tecnológicos
Identificar costos relacionados con hosting, dominio, bases de datos y licencias:
- **MongoDB Atlas:** TIER M0 Sandbox (Gratuito - 512 MB de almacenamiento) -> **$0 ARS**.
- **Cloudinary:** Plan Gratuito (Suficiente para el volumen inicial de fotos del CAAN) -> **$0 ARS**.
- **Hosting (Vercel/Render):** Planes Hobby Gratuitos -> **$0 ARS**.
- **Licencias de Software (VS Code, Git, pnpm):** Código Abierto / Gratuitos -> **$0 ARS**.
- **Dominio Web Personalizado:** Compra de un dominio `.org.ar` para formalizar la institución -> **$8.500 ARS anuales**.
- **Costo Tecnológico Total Inicial:** **$8.500 ARS**.
### 21.3 Costos de Operación y Mantenimiento
Analizar qué costos podrían aparecer luego de la puesta en producción del sistema:
- **Renovación anual del dominio:** **$8.500 ARS/año**.
- **Mantenimiento correctivo y evolutivo:** Soporte de 4 horas mensuales ante caídas de cuentas de Cloudinary o actualizaciones de seguridad. Costo anual estimado: **$96.000 ARS**.
- **Upgrade de infraestructura (opcional):** Si el volumen de datos excede los tiers gratuitos, un upgrade a planes pagos básicos de MongoDB Atlas y Cloudinary sumaría aproximadamente **$50.000 ARS/mes**.
### 21.4 Costo Total Estimado
Presentar una estimación global del proyecto consolidando todos los costos identificados:
|
 Concepto de Costo 
|
 Tipo de Costo 
|
 Frecuencia 
|
 Monto ($ARS) 
|
|
---
|
---
|
---
|
---
|
|
 Recursos Humanos (Equipo Dev) 
|
 Desarrollo 
|
 Pago Único 
|
 $1.170.000 ARS 
|
|
 Infraestructura Cloud y API 
|
 Tecnológico 
|
 Mensual 
|
 $0 ARS 
|
|
 Dominio Web (
`caan.org.ar`
) 
|
 Operativo 
|
 Anual 
|
 $8.500 ARS 
|
|
 Soporte y Mantenimiento Técnico 
|
 Mantenimiento 
|
 Anual 
|
 $96.000 ARS 
|
|
**
Costo Total de Desarrollo e Inicio
**
|
|
|
**
$1.178.500 ARS
**
|
|
**
Costo de Operación Anual Posterior
**
|
|
|
**
$104.500 ARS
**
|
---
## 22. Planificación del Proyecto
### 22.1 Cronograma General
Construir un cronograma básico estructurado en 3 Sprints (de 2 semanas cada uno), que contemple las principales etapas:
1. **Sprint 1 (Análisis y Diseño de Base de Datos - Backend Inicial):**
   - Configuración inicial de pnpm workspaces.
   - Definición de esquemas de datos e indexación.
   - Conexión a MongoDB Atlas.
   - Desarrollo del modelo y endpoints CRUD de Perros (Backend).
2. **Sprint 2 (Desarrollo Frontend y Seguridad):**
   - Diseño responsivo en Tailwind CSS v4.
   - Autenticación segura dual JWT (Access/Refresh token en cookies httpOnly).
   - Desarrollo del Catálogo público responsivo en React.
3. **Sprint 3 (Integración de Servicios, Testing e Implementación):**
   - Fallback de Cloudinary (Chain of Responsibility).
   - CRUD de noticias con BlockNote.
   - Dashboard administrativo completo.
   - Pruebas del sistema (E2E) y despliegue del portal.
### 22.2 Hitos del Proyecto
Definir al menos cinco hitos relevantes:
1. **Hito 1 (Día 5):** Requerimientos y Diseño de Base de Datos aprobados.
2. **Hito 2 (Día 12):** Conexión y API CRUD de Perros validada contra MongoDB Atlas.
3. **Hito 3 (Día 24):** Sistema de Autenticación JWT en cookies httpOnly integrado y funcionando.
4. **Hito 4 (Día 36):** Dashboard administrativo completado (CRUD de animales y noticias con BlockNote e imágenes).
5. **Hito 5 (Día 42):** Portal CAAN desplegado en producción y testing de aceptación aprobado por el cliente.
### 22.3 Entregables
Identificar los principales productos o resultados generados durante el proyecto:
- **Entregable 1 (Día 14):** Base de código del Backend con API de animales documentada y scripts de conexión.
- **Entregable 2 (Día 28):** Código fuente del Frontend con catálogo público interactivo y sistema de sesión de usuarios.
- **Entregable 3 (Día 40):** Dashboard administrativo completamente integrado con el editor BlockNote y subida asíncrona de imágenes.
- **Entregable 4 (Día 42):** Manual de Usuario Administrador (para el personal del CAAN) y Documento Integral de Gestión del Proyecto.
### 22.4 Dependencias
Identificar tareas o actividades cuya ejecución dependa de la finalización de otras y explicar cómo impactan en la planificación:
- **Dependencia API -> Frontend:** Las vistas de creación y edición de perros (Frontend) dependen críticamente de que la API de subida a Cloudinary (`upload.routes.js`) y el controlador de animales (`animals.controller.js`) estén 100% integrados y validados con Zod. *Impacto:* Si el backend se retrasa, el frontend de administración se ve bloqueado para testing real, demorando el Sprint 3.
- **Dependencia JWT -> Rutas Protegidas:** La maquetación de la seguridad en React depende de la correcta configuración de cabeceras de respuesta HTTP en Express. *Impacto:* Un error en la configuración de CORS inter-dominio frena el avance de las llamadas del Dashboard.
---
## 23. Gestión de Cambios
### 23.1 Escenarios de Cambio
Proponer al menos cinco situaciones de cambio que podrían surgir o surgieron durante el desarrollo del proyecto:
1. **Escenario C1 (Solicitud de Pasarela de Pagos integrada):** La directiva del CAAN solicita a mitad del desarrollo que las donaciones no se limiten a datos estáticos, sino que se pueda donar dinero directamente desde el sitio con tarjeta de crédito (Mercado Pago).
2. **Escenario C2 (Saturación de cuenta Cloudinary):** Durante las pruebas de carga, la cuenta principal de Cloudinary se suspende, deteniendo la carga de imágenes.
3. **Escenario C3 (Incompatibilidad de BlockNote con React 19):** Al integrar el editor de texto BlockNote, se detectan errores críticos debido a dependencias no soportadas en la última versión de React.
4. **Escenario C4 (Reducción del tiempo de entrega):** La cátedra adelanta la fecha de entrega del trabajo práctico 5 días antes de lo previsto por razones institucionales.
5. **Escenario C5 (Filtros avanzados en catálogo):** Se solicita expandir la lógica de filtros en el catálogo público que originalmente solo contemplaba sexo y tamaño.
### 23.2 Análisis de Impacto
Para cada cambio identificado, se analiza su impacto:
|
 ID Cambio 
|
 Impacto sobre el Alcance 
|
 Impacto sobre el Tiempo 
|
 Impacto sobre los Costos 
|
 Impacto sobre la Calidad 
|
|
---
|
---
|
---
|
---
|
---
|
|
**
C1
**
|
**
Alto:
**
 Requiere integrar SDK de Mercado Pago y base de datos para registrar transacciones. 
|
**
Alto:
**
 Retraso de 7 a 10 días en el sprint. 
|
**
Medio:
**
 Costos de comisiones de plataforma. 
|
**
Bajo:
**
 No afecta la calidad del core. 
|
|
**
C2
**
|
**
Bajo:
**
 La funcionalidad ya está desarrollada, es un problema operativo. 
|
**
Bajo:
**
 Se mitiga con el patrón Chain of Responsibility. 
|
**
Bajo:
**
 Cuentas secundarias son gratuitas. 
|
**
Alto:
**
 Mantiene el portal disponible. 
|
|
**
C3
**
|
**
Bajo:
**
 Requiere buscar alternativa (ej. Quill.js) o forzar la instalación. 
|
**
Medio:
**
 Demora de 2 a 3 días por investigación y refactorización. 
|
**
Bajo:
**
 Herramientas open-source. 
|
**
Bajo:
**
 Mismo resultado de cara al admin. 
|
|
**
C4
**
|
**
Alto:
**
 Obliga a recortar historias de usuario del backlog. 
|
**
Alto:
**
 Menor tiempo disponible para desarrollo. 
|
**
Bajo:
**
 No altera costos asumidos. 
|
**
Alto:
**
 Pruebas de sistema menos exhaustivas. 
|
|
**
C5
**
|
**
Medio:
**
 Modificar endpoints de consulta y lógica del frontend. 
|
**
Bajo:
**
 Demora de 1 a 2 días. 
|
**
Bajo:
**
 $0 costo. 
|
**
Bajo:
**
 Mejora la experiencia del usuario. 
|
### 23.3 Estrategias de Gestión
Proponer acciones que permitan gestionar adecuadamente los cambios sin comprometer los objetivos del proyecto:
- **Flujo de Aprobación de Cambios:** Cualquier solicitud de cambio debe ser evaluada por el Product Owner (Kevin S.) analizando la viabilidad técnica y el impacto en el cronograma.
- **Buffer de Tiempo:** El cronograma original del Sprint 3 cuenta con un margen de 3 días de contingencia dedicados a pulir detalles; este buffer absorbe pequeños cambios como el filtrado avanzado (C5) o la corrección de librerías (C3).
- **Repriorización del Backlog (Scrum):** Si se aprueba un cambio de alto impacto (como Mercado Pago - C1), se debe negociar con el PO quitar una funcionalidad del Sprint 3 de menor prioridad (como la sección de noticias) para mantener fija la fecha de entrega, logrando que el alcance sea variable pero el tiempo y la calidad sean fijos.
---
## 24. Seguimiento y Control del Proyecto
### 24.1 Estado Actual del Proyecto
Describir el estado actual del desarrollo:
- **Funcionalidades Finalizadas:**
  - Configuración inicial de la estructura del monorepo (`package.json`, `pnpm-workspace.yaml`).
  - Conexión a MongoDB Atlas y configuración de variables de entorno en backend.
  - Esquemas de validación de Zod para usuarios, noticias y animales.
  - Modelos y rutas del backend para Perros y Noticias.
- **Funcionalidades en Desarrollo:**
  - Sistema de autenticación con doble token JWT y cookies httpOnly.
  - Interceptor de Axios para Refresh Token en el frontend.
  - Integración multimedia con Cloudinary (fallback pendiente).
- **Funcionalidades Pendientes:**
  - Dashboard administrativo (interfaces CRUD).
  - Vistas públicas y catálogo con filtros en React.
  - Integración del editor enriquecido BlockNote.
### 24.2 Indicadores de Avance
Definir indicadores simples que permitan evaluar el progreso del proyecto:
1. **Burndown Chart del Sprint (Trabajo Pendiente vs. Tiempo):** Mide el avance diario de los Story Points comprometidos en el Sprint actual.
2. **Porcentaje de Historias de Usuario Completadas:** Calculado como:
   $$\text{\% Completitud} = \left( \frac{\text{Story Points Terminado y Probado}}{\text{Total Story Points del Backlog (63 SP)}} \right) \times 100$$
3. **Velocidad del Equipo:** Cantidad promedio de Story Points que el equipo logra pasar a la columna de "Done" al finalizar un Sprint de 2 semanas (Velocidad estimada: 21 SP por Sprint).
### 24.3 Riesgos Actuales
Analizar si los riesgos identificados en la Primera Entrega continúan vigentes o si han surgido nuevos riesgos:
- **Vigentes:** El riesgo de saturación de Cloudinary (R1) y de colisiones en el archivo único de API (R2) siguen siendo los más latentes debido a la inminente integración del Dashboard. La refactorización propuesta en la Parte 1 (Chain of Responsibility y modularización de llamadas API) es urgente para evitar bloqueos.
- **Nuevos riesgos identificados:** La integración de cookies httpOnly seguras en Chrome ha presentado restricciones en versiones recientes cuando se opera en local sin HTTPS, lo que podría obligar a configurar un proxy inverso local durante el desarrollo.
### 24.4 Acciones Correctivas
Proponer medidas que deberían tomarse ante posibles retrasos, desvíos de alcance o problemas de calidad:
- **Ante retrasos en Sprints (desvío de tiempo):** El Scrum Master convocará a una sesión de replanificación inmediata para recortar el alcance de tareas estáticas (por ejemplo, reducir el diseño de las Preguntas Frecuentes a un acordeón simple sin animaciones adicionales) y enfocar al equipo en finalizar la integración del CRUD y de seguridad.
- **Ante fallas de calidad de código (bugs recurrentes):** Detener el desarrollo de nuevas características (Feature Freeze) y dedicar la primera mitad de la siguiente iteración a corregir incidencias críticas y robustecer las validaciones de Zod.
---
## 25. Conclusión
Elaborar una reflexión grupal sobre:
El desarrollo de este documento integral de gestión y planificación para el Portal del CAAN ha puesto de manifiesto la enorme utilidad práctica de las técnicas de ingeniería de software para proyectos reales.
La descomposición sistemática a través de la WBS y la estimación por Story Points permitieron aterrizar las expectativas del equipo, asignando valores realistas de esfuerzo basados en la complejidad y no en meras intuiciones temporales. Asimismo, el análisis detallado de costos evidenció que, aun operando bajo esquemas gratuitos (tiers sandbox), existen costos humanos y operativos implícitos que deben cuantificarse para justificar la viabilidad a la directiva y asegurar la sostenibilidad.
Por otro lado, la planificación estructurada en hitos y dependencias nos preparó para reaccionar ante la incertidumbre mediante pautas formales de gestión de cambios y métricas de avance específicas. En definitiva, este trabajo integrador consolida la enseñanza de que un buen software no surge únicamente de escribir líneas de código, sino de un proceso disciplinado de gestión que asegure la calidad del producto, la previsibilidad de los tiempos y la satisfacción del usuario final.