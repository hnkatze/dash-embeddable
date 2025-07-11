# Dashboard Viewer - Embeddable

Una aplicación web moderna construida con **Astro** y **Tailwind CSS** que permite visualizar dashboards interactivos usando la plataforma [Embeddable](https://embeddable.com/).

## 🚀 Características

- **Selección dinámica de dashboards** desde la API de Embeddable
- **Interfaz responsiva** diseñada con Tailwind CSS
- **Carga asíncrona** con estados de loading y manejo de errores
- **Visualización en pantalla completa** con scroll automático
- **TypeScript completo** para mayor seguridad de tipos
- **Arquitectura moderna** con Astro y componentes reutilizables

## 🛠️ Tecnologías

- **[Astro](https://astro.build/)** - Framework web moderno
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utilitario
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript con tipos estáticos
- **[Embeddable API](https://docs.embeddable.com/)** - Plataforma de dashboards embebidos

## 📋 Prerrequisitos

- **Node.js** v18 o superior
- **npm** o **yarn** o **pnpm**
- **API Key de Embeddable** (configurada en el proyecto)

## 🔧 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/hnkatze/dash-embeddable.git
   cd dash-embeddable
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura la API Key**
   
   Edita el archivo `src/components/DashboardSelector.astro` y actualiza la variable `API_KEY`:
   ```typescript
   const API_KEY = 'tu-api-key-aquí';
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   
   Visita `http://localhost:4321` para ver la aplicación.

## 🎯 Uso

### Seleccionar y Mostrar Dashboard

1. **Carga automática**: Al abrir la aplicación, se cargan automáticamente todos los dashboards disponibles
2. **Selección**: Usa el dropdown para seleccionar el dashboard que deseas visualizar
3. **Visualización**: Haz clic en "Mostrar Dashboard" para cargar y mostrar el dashboard seleccionado
4. **Pantalla completa**: El dashboard se muestra en pantalla completa con scroll automático

### Estados de la Aplicación

- **🔄 Cargando**: Spinner animado mientras se obtienen los datos
- **✅ Dashboard activo**: Visualización completa del dashboard seleccionado
- **❌ Error**: Mensajes informativos en caso de errores de conexión o configuración

## 🏗️ Estructura del Proyecto

```
dash-embeddable/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── DashboardSelector.astro    # Componente principal
│   │   └── Welcome.astro              # Componente de bienvenida
│   ├── layouts/
│   │   └── Layout.astro               # Layout principal
│   ├── pages/
│   │   └── index.astro                # Página principal
│   └── styles/
│       └── global.css                 # Estilos globales (Tailwind)
├── astro.config.mjs                   # Configuración de Astro
├── package.json                       # Dependencias y scripts
├── tsconfig.json                      # Configuración de TypeScript
└── README.md                          # Este archivo
```

## 🔐 Configuración de API

### Embeddable API

La aplicación utiliza dos endpoints principales de la API de Embeddable:

1. **Lista de Dashboards**
   ```
   GET https://api.us.embeddable.com/api/v1/embeddables
   ```

2. **Obtención de Token de Seguridad**
   ```
   POST https://api.us.embeddable.com/api/v1/security-token
   ```

### Parámetros del Token

```typescript
{
  embeddableId: string,        // ID del dashboard seleccionado
  expiryInSeconds: number,     // Duración del token (24 horas)
  securityContext: object,     // Contexto de seguridad personalizable
  user: string,                // Identificador único del usuario
  environment: string          // Ambiente (default, prod, etc.)
}
```

## 🎨 Personalización

### Estilos con Tailwind CSS

Todos los estilos están implementados usando clases utilitarias de Tailwind CSS:

- **Responsive Design**: `sm:flex-row`, `lg:max-w-6xl`
- **Estados Interactivos**: `hover:bg-blue-700`, `focus:ring-2`
- **Animaciones**: `animate-spin`, `transition-colors`
- **Layout Flexible**: `flex`, `flex-col`, `flex-1`

### Modificar la Configuración del Token

Edita la función `fetchDashboardToken` en `DashboardSelector.astro`:

```typescript
const tokenRequest = {
  embeddableId: embeddableId,
  expiryInSeconds: 60 * 60 * 24, // 24 horas
  securityContext: {
    // Agregar tu contexto de seguridad personalizado
    userId: 'usuario-123',
    roles: ['admin', 'viewer']
  },
  user: 'tu-email@ejemplo.com',
  environment: 'production' // o 'staging', 'development'
};
```

## 📦 Scripts Disponibles

```bash
# Desarrollo local
npm run dev

# Construcción para producción
npm run build

# Vista previa de la construcción
npm run preview

# Comandos de Astro
npm run astro
```

## 🐛 Depuración

### Consola del Navegador

La aplicación incluye logging detallado para facilitar la depuración:

```javascript
// Logs disponibles en la consola
- "Solicitando token para embeddableId: [ID]"
- "Datos de la petición del token: [objeto]"
- "Respuesta del servidor: [status]"
- "Token recibido exitosamente"
- "Componente embeddable creado y agregado al DOM"
```

### Errores Comunes

1. **"No token was passed to em-beddable"**
   - Verificar que la API Key sea válida
   - Revisar los parámetros del tokenRequest

2. **Error 400 en la API**
   - Verificar que el embeddableId existe
   - Revisar los parámetros de securityContext

3. **"No hay dashboards disponibles"**
   - Verificar conectividad a internet
   - Verificar que la API Key tenga permisos correctos

## 🚀 Despliegue

### Construcción para Producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/` y estarán listos para desplegar en cualquier servidor web estático.

### Opciones de Despliegue

- **[Vercel](https://vercel.com/)** - Despliegue automático desde GitHub
- **[Netlify](https://netlify.com/)** - Hosting estático con CI/CD
- **[GitHub Pages](https://pages.github.com/)** - Hosting gratuito para proyectos públicos
- **Servidor propio** - Cualquier servidor web que sirva archivos estáticos

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

- **Documentación de Embeddable**: [https://docs.embeddable.com/](https://docs.embeddable.com/)
- **Documentación de Astro**: [https://docs.astro.build/](https://docs.astro.build/)
- **Documentación de Tailwind**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

## 🎉 Agradecimientos

- **[Embeddable](https://embeddable.com/)** por proporcionar la plataforma de dashboards
- **[Astro Team](https://astro.build/)** por el excelente framework
- **[Tailwind CSS](https://tailwindcss.com/)** por el sistema de diseño

---

**Desarrollado con ❤️ usando Astro + Tailwind CSS**
