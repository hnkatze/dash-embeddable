import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
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

  // Continuar con la respuesta pero agregar headers de privacidad
  const response = await next();
  
  // Agregar headers adicionales de privacidad
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'no-referrer');
  
  return response;
});