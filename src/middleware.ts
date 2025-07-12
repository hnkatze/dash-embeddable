import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;
  
  // Rutas públicas que no requieren autenticación
  const publicPaths = ['/login', '/firebase-test'];
  
  // Si la ruta es pública, permitir acceso
  if (publicPaths.includes(pathname)) {
    return next();
  }
  
  // Para rutas protegidas, verificar autenticación
  const cookies = context.request.headers.get('cookie') || '';
  const isAuthenticated = cookies.includes('authenticated=true');
  
  // Si no está autenticado y no está en login, redirigir
  if (!isAuthenticated && pathname !== '/login') {
    return context.redirect('/login', 302);
  }
  
  // Si está autenticado y está en login, redirigir al dashboard
  if (isAuthenticated && pathname === '/login') {
    return context.redirect('/', 302);
  }
  
  return next();
});