# Manual Técnico: Frontend de Chatbot Laguna (React)

## Índice
1. [Introducción](#introducción)  
2. [Requisitos Previos](#requisitos-previos)  
3. [Estructura del Proyecto](#estructura-del-proyecto)  
4. [Componentes Principales](#componentes-principales)  
5. [Rutas y Navegación](#rutas-y-navegación)  
6. [Integración con Backend](#integración-con-backend)  
7. [Despliegue](#despliegue)  
8. [Solución de Problemas](#solución-de-problemas)  
9. [Explicaciones Técnicas](#explicaciones-técnicas)  
10. [Apéndices](#apéndices)  

---

## 1. Introducción <a name="introducción"></a>
El frontend de Chatbot Laguna es una aplicación web desarrollada en **React** que permite a los usuarios interactuar con el sistema de manera intuitiva. Esta interfaz incluye funcionalidades como:
- **Carga y gestión de documentos** (PDFs, enlaces web).
- **Visualización de métricas y estadísticas** (consultas exitosas, fallidas, etc.).
- **Navegación entre páginas** (Home, Entrenamiento, Reportes).
- **Integración con el backend** para procesamiento de datos y respuestas.

---

## 2. Requisitos Previos <a name="requisitos-previos"></a>

### 2.1 Dependencias
- **React** (v18+)
- **React Router DOM** (v6+)
- **React Toastify** (para notificaciones)
- **Axios** (para llamadas HTTP)
- **Tailwind CSS** (para estilos)

### 2.2 Herramientas
- **Node.js** (v16+)
- **npm** o **yarn** (gestor de paquetes)
- **Visual Studio Code** (recomendado)

---

## 3. Estructura del Proyecto <a name="estructura-del-proyecto"></a>

```
chatbot-laguna-frontend/
├── public/
├── src/
│   ├── assets/            # Iconos y recursos visuales
│   ├── components/        # Componentes reutilizables
│   ├── context/           # Contexto de la aplicación
│   ├── pages/             # Páginas principales
│   ├── App.jsx            # Punto de entrada de la aplicación
│   └── main.jsx           # Renderizado de la aplicación
├── .env                   # Variables de entorno
├── package.json           # Dependencias y scripts
└── README.md              # Documentación del proyecto
```

---

## 4. Componentes Principales <a name="componentes-principales"></a>

### 4.1 **App.jsx**
- **Descripción**: Punto de entrada de la aplicación. Define las rutas y configura el contenedor de notificaciones (`ToastContainer`).
- **Rutas**:
  - `/` y `/home`: Página principal.
  - `/train`: Página de entrenamiento (carga de documentos).
  - `/reports`: Página de reportes y métricas.

### 4.2 **Home.jsx**
- **Descripción**: Página principal que incluye el `Navbar`, `SideBar` y el contenido principal (`Main`).
- **Componentes utilizados**:
  - `Navbar`: Barra de navegación superior.
  - `SideBar`: Menú lateral.
  - `Main`: Contenedor del contenido principal.

### 4.3 **Train.jsx**
- **Descripción**: Página de entrenamiento donde los usuarios pueden cargar documentos PDF o enlaces web para actualizar la base de conocimiento.
- **Funcionalidades**:
  - Arrastrar y soltar archivos.
  - Subida de múltiples archivos.
  - Procesamiento de enlaces web.

### 4.4 **Dashboard.jsx**
- **Descripción**: Muestra métricas clave como consultas exitosas, fallidas y consultas más frecuentes.
- **Componentes utilizados**:
  - `Card`: Tarjetas informativas.
  - `RecentQuery`: Tabla de consultas recientes.

### 4.5 **Card.jsx**
- **Descripción**: Componente reutilizable para mostrar métricas en tarjetas.
- **Propiedades**:
  - `name`: Nombre de la métrica.
  - `icon`: Icono asociado.
  - `amount`: Valor numérico.
  - `percentage`: Porcentaje de cambio (opcional).

---

## 5. Rutas y Navegación <a name="rutas-y-navegación"></a>

### 5.1 Configuración de Rutas
Las rutas se definen en `App.jsx` utilizando `react-router-dom`:
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/home" element={<Home />} />
  <Route path="/train" element={<Train />} />
  <Route path="/reports" element={<Reports />} />
</Routes>
```

### 5.2 Navegación
- **Navbar**: Proporciona acceso rápido a las páginas principales.
- **SideBar**: Menú lateral con opciones adicionales.

---

## 6. Integración con Backend <a name="integración-con-backend"></a>

### 6.1 Llamadas HTTP
- **Fetch Querys**: Obtiene las consultas recientes desde el backend.
- **Upload Files**: Sube archivos PDF para su procesamiento.
- **Delete Document**: Elimina documentos de la base de datos.

### 6.2 Variables de Entorno
- **VITE_BACKEND_URL**: URL del backend (configurada en `.env`).

---

## 7. Despliegue <a name="despliegue"></a>

### 7.1 Configuración de Producción
1. Crear archivo `.env`:
   ```ini
   VITE_BACKEND_URL=https://api.chatbotlaguna.com
   ```
2. Compilar el proyecto:
   ```bash
   npm run build
   ```
3. Desplegar en un servidor web (ej. Nginx, Apache).

---

## 8. Solución de Problemas <a name="solución-de-problemas"></a>

### 8.1 Errores Comunes
- **CORS Issues**: Verificar que el backend permita solicitudes desde el frontend.
- **Fallo en Subida de Archivos**: Asegurarse de que los archivos sean PDFs válidos.
- **Problemas de Conexión**: Verificar la URL del backend en `.env`.

---

## 9. Explicaciones Técnicas <a name="explicaciones-técnicas"></a>

### 9.1 ¿Qué es React?
React es una biblioteca de JavaScript para construir interfaces de usuario interactivas y reutilizables. En este proyecto, se utiliza para crear una SPA (Single Page Application).

### 9.2 ¿Qué es React Router?
React Router es una librería que permite la navegación entre páginas en aplicaciones React sin recargar la página.

### 9.3 ¿Qué es Tailwind CSS?
Tailwind CSS es un framework de utilidades que permite diseñar interfaces rápidamente mediante clases predefinidas.

---

## 10. Apéndices <a name="apéndices"></a>

### A. Diagrama de Arquitectura
```
[Usuario] → [Frontend (React)] ↔ [Backend (FastAPI)]
                   ↳ [MongoDB]
                   ↳ [ChromaDB]
```

### B. Dependencias Clave
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.14.2",
  "react-toastify": "^9.1.3",
  "axios": "^1.5.0",
  "tailwindcss": "^3.3.3"
}
```

### C. Información del Contribuidor

**Contribuidor Principal**:  
**Carlos Roberto Rocha Trejo**  
- **GitHub**: [@RobertoRochaT](https://github.com/RobertoRochaT)  
- **LinkedIn**: [Carlos Roberto Rocha Trejo](https://linkedin.com/in/carlosr-rocha)  
- **Rol**: Desarrollador Frontend y Arquitecto de Software  
- **Contribuciones**:  
  - Diseño e implementación de la interfaz de usuario.  
  - Integración con el backend para la carga de documentos y consultas.  
  - Desarrollo de componentes reutilizables (Card, Navbar, SideBar).  
  - Optimización del rendimiento y experiencia de usuario.  

**Colaboradores**:  
- **Nombre del Colaborador** (si aplica)  
  - **Rol**: Breve descripción de su contribución.  
  - **Contacto**: Enlace a perfil profesional (LinkedIn, GitHub, etc.).  

---

**Agradecimientos Especiales**:  
Agradecemos a todos los colaboradores y a la comunidad de código abierto por su invaluable apoyo en el desarrollo de este proyecto. Su dedicación y expertise han sido fundamentales para el éxito de esta iniciativa.  

---

**Política de Contribuciones**:  
Este proyecto es de código abierto y acepta contribuciones de la comunidad. Si deseas contribuir, por favor revisa las [guías de contribución](https://github.com/tu-usuario/chatbot-laguna-frontend/blob/main/CONTRIBUTING.md) en el repositorio oficial.  

---

**Contacto General**:  
Para consultas técnicas, colaboraciones o soporte, por favor contactar a través de:  
- **Correo Electrónico**: soporte@chatbotlaguna.com  
- **Repositorio Oficial**: [Chatbot Laguna Frontend en GitHub](https://github.com/tu-usuario/chatbot-laguna-frontend)  
- **Documentación Adicional**: [Documentación del Proyecto](https://chatbotlaguna.com/docs)  

---

Este manual y el proyecto son mantenidos activamente por el equipo de desarrollo. ¡Gracias por tu interés en Chatbot Laguna! 🚀
