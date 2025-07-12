# Despliegue en Vercel

## Pasos para desplegar en Vercel

1. **Instalar Vercel CLI (opcional):**
   ```bash
   npm install -g vercel
   ```

2. **Configurar variables de entorno en Vercel:**
   - Ve a tu dashboard de Vercel
   - Selecciona tu proyecto
   - Ve a Settings > Environment Variables
   - Añade las siguientes variables:
     ```
     PUBLIC_FIREBASE_API_KEY
     PUBLIC_FIREBASE_AUTH_DOMAIN
     PUBLIC_FIREBASE_PROJECT_ID
     PUBLIC_FIREBASE_STORAGE_BUCKET
     PUBLIC_FIREBASE_MESSAGING_SENDER_ID
     PUBLIC_FIREBASE_APP_ID
     PUBLIC_EMBEDDABLE_API_KEY
     ```

3. **Desplegar:**
   - **Opción A - Desde GitHub:**
     - Conecta tu repositorio de GitHub con Vercel
     - Vercel detectará automáticamente que es un proyecto Astro
     - El despliegue será automático

   - **Opción B - CLI:**
     ```bash
     vercel
     ```

4. **Configuración automática:**
   - Vercel detectará automáticamente el framework (Astro)
   - Usará el comando de build: `npm run build`
   - Output directory: `dist`

## Características optimizadas para Vercel

- ✅ Adaptador de Vercel configurado
- ✅ Serverless functions optimizadas
- ✅ Edge runtime para mejor rendimiento
- ✅ Middleware optimizado para Vercel
- ✅ Configuración de timeout y rutas
- ✅ Web Analytics habilitado

## Notas importantes

- Las funciones serverless tienen un timeout de 10 segundos para páginas y 5 segundos para middleware
- El proyecto usa el adaptador `@astrojs/vercel` en lugar de Node.js
- Las cookies y autenticación funcionan correctamente con las Edge Functions de Vercel
