# 🎨 Dynamic Theme Selector - Guía de Uso

## Descripción
El selector de temas dinámico permite cambiar entre diferentes paletas de colores en tiempo real para los dashboards de Embeddable, facilitando el testing y personalización visual.

## Temas Disponibles

### 🔵 Yalo (Tema Verde/Azul)
- **Cliente**: `yalo`
- **Colores principales**: Azules y cians
- **Uso**: Perfecto para aplicaciones corporativas o relacionadas con tecnología
- **Paleta**: `#bde3fa`, `#3db4f0`, `#179ce0`, `#0a7cbf`, `#09639b`, `#0c5480`, `#10466a`, `#0b2c46`

### 🟣 BipBip (Tema Original)
- **Cliente**: `bipbip`
- **Colores principales**: Violetas, naranjas, y rojos
- **Uso**: Tema vibrante y energético
- **Paleta**: `#6778DE`, `#FF997C`, `#9EA4F4`, `#B8B8D1`, `#FF6B6C`, `#FFC145`, `#9DC7FF`, `#FF805B`, `#CD9FFF`, `#E6DEDE`, `#FFA6A6`, `#fb0021`

### 🔴 BipBipVariant (Tema Rojo)
- **Cliente**: `bipbip-variant`
- **Colores principales**: Gradientes de rojo
- **Uso**: Para destacar alertas, urgencias o llamadas a la acción
- **Paleta**: `#fb0021`, `#ff4d6d`, `#ff758f`, `#ff8fa3`, `#ffb3c6`, `#ffccd5`, `#ffdde4`, `#fff0f3`

### 🍔 Hamburguesa (Tema Ingredientes)
- **Cliente**: `hamburguesa`
- **Colores principales**: Colores cálidos inspirados en ingredientes
- **Uso**: Perfecto para aplicaciones de food & beverage
- **Paleta**: `#f5e6b2` (pan), `#d4a373` (pan inferior), `#e63946` (tomate), `#f1c40f` (queso), `#27ae60` (lechuga), `#784421` (carne), `#a0522d` (tocino), `#fffbe7` (sésamo)

## Funcionalidades

### 🔄 Cambio Dinámico
- Los temas se aplican inmediatamente al seleccionar
- Si hay un dashboard cargado, se recarga automáticamente con el nuevo tema
- La interfaz se actualiza para mostrar los colores del tema activo

### 👁️ Vista Previa Visual
- **Indicador de tema**: Muestra el nombre del tema activo
- **Paleta de colores**: Muestra todos los colores del tema
- **Gradiente dinámico**: El fondo del indicador cambia según el tema
- **Botón temático**: El botón "Mostrar Dashboard" usa los colores del tema

### 🎛️ Interfaz Intuitiva
- Selector dropdown con todos los temas disponibles
- Nombres descriptivos para fácil identificación
- Transiciones suaves entre cambios de tema
- Feedback visual inmediato

## Implementación Técnica

### Client Context
Cada tema se envía como `client-context` al componente embeddable:

```javascript
{
  client: 'nombre-del-cliente',
  theme: {
    colors: ['#color1', '#color2', ...],
    brand: {
      primary: '#color-principal',
      secondary: '#color-secundario',
      accent: '#color-acento'
    }
  }
}
```

### Estructura de Datos
Los temas están definidos en el objeto `THEMES` con la siguiente estructura:
- `name`: Nombre descriptivo del tema
- `client`: Identificador único del cliente
- `theme.colors`: Array de colores para gráficos
- `theme.brand`: Colores principales de la marca
- `background`: Color de fondo del canvas

## Uso Práctico

### Para Desarrolladores
1. Selecciona un tema del dropdown
2. Elige un dashboard de la lista
3. Haz clic en "Mostrar Dashboard"
4. El dashboard se renderiza con los colores del tema seleccionado

### Para Testing
- Cambia entre temas para ver cómo se ven los mismos datos con diferentes paletas
- Verifica la legibilidad y contraste de cada tema
- Prueba diferentes combinaciones dashboard + tema

### Para Demos
- Usa temas específicos según el cliente o contexto de la presentación
- El tema "Hamburguesa" es perfecto para demos de restaurantes
- El tema "Yalo" funciona bien para aplicaciones corporativas

## Logs y Debugging

El sistema incluye logs detallados en la consola:
- `🎨 Tema actualizado a: [nombre]` - Cuando se cambia el tema
- `🔄 Cambiando tema del dashboard actual...` - Cuando se recarga con nuevo tema
- `✅ Componente embeddable cargado con tema [nombre]` - Confirmación de carga

## Extensión del Sistema

Para agregar un nuevo tema:

1. Añadir al objeto `THEMES` en `DashboardSelector.astro`
2. Incluir en el `<select>` HTML
3. Definir colores siguiendo la estructura existente
4. Probar con diferentes tipos de dashboards

---

**Nota**: Los temas se aplican a nivel de componente embeddable y afectan todos los gráficos y visualizaciones dentro del dashboard seleccionado.
