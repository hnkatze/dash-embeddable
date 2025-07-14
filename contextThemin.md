# Client Context Theming - Guía de Implementación

## 📖 Introducción

Este proyecto utiliza **Client Context** de Embeddable para manejar temas dinámicos que permiten personalizar la apariencia de los componentes según el cliente o contexto específico. Esto elimina la necesidad de múltiples archivos de tema y permite cambios dinámicos sin recompilación.

## 🚀 Configuración Actual

### Presets Disponibles

El proyecto incluye tres temas predefinidos en [`src/presets/client-contexts.cc.yml`](src/presets/client-contexts.cc.yml):

#### 🟣 **BipBip Theme**
```yaml
BipBip:
  client: 'bipbip'
  theme:
    colors:
      - '#6778DE'
      - '#FF997C'
      - '#9EA4F4'
      - '#B8B8D1'
      - '#FF6B6C'
      - '#FFC145'
      - '#9DC7FF'
      - '#FF805B'
      - '#CD9FFF'
      - '#E6DEDE'
      - '#FFA6A6'
      - '#fb0021'
    brand:
      primary: '#6778DE'
      secondary: '#FFA6A6'
      accent: '#fb0021'
```

#### 🔵 **Yalo Theme**
```yaml
Yalo:
  client: 'yalo'
  theme:
    colors:
      - '#bde3fa'
      - '#3db4f0'
      - '#179ce0'
      - '#0a7cbf'
      - '#09639b'
      - '#0c5480'
      - '#10466a'
      - '#0b2c46'
    brand:
      primary: '#bde3fa'
      secondary: '#09639b'
      accent: '#0b2c46'
```

#### 🟡 **Hamburguesa Theme**
```yaml
Hamburguesa:
  client: 'hamburguesa'
  theme:
    colors:
      - '#f5e6b2'
      - '#d4a373'
      - '#e63946'
      - '#f1c40f'
      - '#27ae60'
      - '#784421'
      - '#a0522d'
      - '#fffbe7'
    brand:
      primary: '#f5e6b2'
      secondary: '#27ae60'
      accent: '#e63946'
```

## 🛠️ Implementación en Componentes

### 1. Definición del Componente (`.emb.ts`)

```typescript
// Ejemplo: MiComponente.emb.ts
import { defineComponent } from '@embeddable.com/vanilla-components';
import Component from './index';
import { meta } from './meta';

export default defineComponent(Component, meta, {
  props: (inputs: Inputs<typeof meta>, [state], clientContext) => {
    return {
      clientContext, // ✅ Pasar el clientContext al componente
      // ...otras props
    };
  },
});
```

### 2. Implementación en el Componente React (`.tsx`)

```tsx
// Ejemplo: MiComponente/index.tsx
import React from 'react';

interface Props {
  clientContext?: {
    client?: string;
    theme?: {
      colors?: string[];
      brand?: {
        primary?: string;
        secondary?: string;
        accent?: string;
      };
    };
  };
  // ...otras props
}

// Colores por defecto (fallback)
const DEFAULT_COLORS = [
  '#6778DE', '#FF997C', '#9EA4F4', '#B8B8D1',
  '#FF6B6C', '#FFC145', '#9DC7FF', '#FF805B'
];

export default function MiComponente({ clientContext }: Props) {
  // ✅ Extraer colores del client context o usar defaults
  const themeColors = clientContext?.theme?.colors || DEFAULT_COLORS;
  const primaryBrand = clientContext?.theme?.brand?.primary || '#6778DE';
  const secondaryBrand = clientContext?.theme?.brand?.secondary || '#FFA6A6';
  const accentBrand = clientContext?.theme?.brand?.accent || '#fb0021';
  const clientName = clientContext?.client || 'default';

  return (
    <div>
      <h2 style={{ color: primaryBrand }}>
        Dashboard para cliente: {clientName}
      </h2>
      {/* Tu componente usando los colores del tema */}
    </div>
  );
}
```

### 3. Ejemplo con Chart.js

```tsx
// Ejemplo: BarChart con theming
import { Chart as ChartJS } from 'chart.js';

export default function ThemedBarChart({ data, clientContext }: Props) {
  const themeColors = clientContext?.theme?.colors || DEFAULT_COLORS;
  
  const chartOptions = {
    // ...otras opciones
    plugins: {
      legend: {
        labels: {
          color: clientContext?.theme?.brand?.primary || '#333'
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: clientContext?.theme?.brand?.secondary || '#666'
        }
      }
    }
  };

  const chartData = {
    labels: data.labels,
    datasets: [{
      data: data.values,
      backgroundColor: themeColors.slice(0, data.values.length),
      borderColor: clientContext?.theme?.brand?.accent || '#fb0021',
      borderWidth: 2
    }]
  };

  return <Bar data={chartData} options={chartOptions} />;
}
```

## 🌐 Uso en Aplicaciones

### HTML Estático

```html
<em-beddable
  token="${securityToken}"
  client-context='${JSON.stringify({ 
    client: "yalo",
    theme: {
      colors: [
        "#bde3fa", "#3db4f0", "#179ce0", "#0a7cbf",
        "#09639b", "#0c5480", "#10466a", "#0b2c46"
      ],
      brand: {
        primary: "#bde3fa",
        secondary: "#09639b",
        accent: "#0b2c46"
      }
    }
  })}'
></em-beddable>
```

### React Application

```jsx
import { Embeddable } from '@embeddable.com/react';

function Dashboard({ currentClient }) {
  const getThemeForClient = (clientType) => {
    const themes = {
      bipbip: {
        colors: [
          '#6778DE', '#FF997C', '#9EA4F4', '#B8B8D1',
          '#FF6B6C', '#FFC145', '#9DC7FF', '#FF805B',
          '#CD9FFF', '#E6DEDE', '#FFA6A6', '#fb0021'
        ],
        brand: {
          primary: '#6778DE',
          secondary: '#FFA6A6',
          accent: '#fb0021'
        }
      },
      yalo: {
        colors: [
          '#bde3fa', '#3db4f0', '#179ce0', '#0a7cbf',
          '#09639b', '#0c5480', '#10466a', '#0b2c46'
        ],
        brand: {
          primary: '#bde3fa',
          secondary: '#09639b',
          accent: '#0b2c46'
        }
      },
      hamburguesa: {
        colors: [
          '#f5e6b2', '#d4a373', '#e63946', '#f1c40f',
          '#27ae60', '#784421', '#a0522d', '#fffbe7'
        ],
        brand: {
          primary: '#f5e6b2',
          secondary: '#27ae60',
          accent: '#e63946'
        }
      }
    };
    
    return themes[clientType] || themes.bipbip;
  };

  return (
    <Embeddable
      token={securityToken}
      clientContext={{
        client: currentClient,
        theme: getThemeForClient(currentClient)
      }}
    />
  );
}
```

### Vue.js Application

```vue
<template>
  <Embeddable
    :token="securityToken"
    :client-context="clientContextData"
  />
</template>

<script>
export default {
  data() {
    return {
      currentClient: 'yalo'
    };
  },
  computed: {
    clientContextData() {
      return {
        client: this.currentClient,
        theme: this.getThemeForClient(this.currentClient)
      };
    }
  },
  methods: {
    getThemeForClient(clientType) {
      // Misma lógica de temas que en React
    }
  }
};
</script>
```

## 🎨 Personalización de Temas

### Estructura del Theme Object

```typescript
interface ThemeConfig {
  client: string;           // Identificador del cliente
  theme: {
    colors: string[];       // Array de colores para gráficos (mínimo 8)
    brand: {
      primary: string;      // Color principal de la marca
      secondary: string;    // Color secundario
      accent: string;       // Color de acento/énfasis
    };
  };
}
```

### Mejores Prácticas

1. **Colores suficientes**: Incluye al menos 8-12 colores en el array para gráficos complejos
2. **Contraste**: Asegúrate de que los colores tengan buen contraste para legibilidad
3. **Consistencia**: Mantén coherencia entre `brand.primary` y el primer color del array
4. **Fallbacks**: Siempre define colores por defecto en tus componentes

### Agregar un Nuevo Tema

1. **Edita** [`src/presets/client-contexts.cc.yml`](src/presets/client-contexts.cc.yml)
2. **Agrega** un nuevo preset siguiendo la estructura existente:

```yaml
NuevoCliente:
  client: 'nuevo-cliente'
  theme:
    colors:
      - '#color1'
      - '#color2'
      # ... más colores
    brand:
      primary: '#color-principal'
      secondary: '#color-secundario'
      accent: '#color-acento'
```

## 🔍 Debugging

### Verificar Client Context en Componente

```tsx
export default function MiComponente({ clientContext }: Props) {
  // ✅ Debug: Ver qué está llegando
  console.log('Client Context recibido:', clientContext);
  
  if (!clientContext?.theme) {
    console.warn('⚠️ No se recibió tema, usando colores por defecto');
  }
  
  return (
    <div>
      <pre>{JSON.stringify(clientContext, null, 2)}</pre>
      {/* Tu componente */}
    </div>
  );
}
```

### Validar en Browser DevTools

```javascript
// En la consola del navegador
window.embeddableClientContext // Ver el contexto actual
```

## 📚 Referencias

- [Embeddable Client Context Documentation](https://docs.embeddable.com/development/client-context)
- [Embeddable Theming Guide](https://docs.embeddable.com/development/theming)
- [Component Development](https://docs.embeddable.com/development/defining-components)

## 🆘 Troubleshooting

### Problema: Los colores no cambian
- ✅ Verifica que estás pasando `clientContext` en el `.emb.ts`
- ✅ Confirma que tu componente está leyendo `clientContext?.theme?.colors`
- ✅ Revisa la consola para errores de parsing JSON

### Problema: Tema no disponible en Workspace
- ✅ Verifica que [`client-contexts.cc.yml`](src/presets/client-contexts.cc.yml) esté bien formateado
- ✅ Confirma que el archivo esté en `src/presets/`
- ✅ Re-deploy del workspace si es necesario

### Problema: Colores se ven mal
- ✅ Verifica que tengas suficientes colores en el array (mínimo 8)
- ✅ Prueba los colores en un visualizador de paletas
- ✅ Considera el contraste para accesibilidad

---

**¿Necesitas ayuda?** Revisa los componentes de ejemplo en [`src/components/vanilla/charts/`](src/components/vanilla/charts/) como `ContextAwareBarChart` y `ClientContextDemo`.
