# 🖼️ Guía de Imágenes

Tu portafolio soporta múltiples formatos y fuentes de imágenes.

---

## ✅ Formatos Soportados

### Formatos de Archivo
- ✅ **PNG** - Ideal para logos, gráficos con transparencia
- ✅ **JPG/JPEG** - Ideal para fotografías
- ✅ **WebP** - Formato moderno, mejor compresión
- ✅ **GIF** - Imágenes animadas
- ✅ **SVG** - Gráficos vectoriales escalables
- ✅ **ICO** - Iconos

### Fuentes de Imágenes
- ✅ **URLs Online** (`http://`, `https://`)
- ✅ **Rutas Locales** (`/images/...`)
- ✅ **Base64** (`data:image/...`)

---

## 📂 Cómo Usar Imágenes

### 1. Imágenes Online (URLs)

Las imágenes online son las más sencillas de usar.

**Ejemplo:**

```typescript
// En prisma/seed.ts
{
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  logoImage: 'https://example.com/logo.png',
}
```

**Fuentes recomendadas:**
- [Unsplash](https://unsplash.com) - Fotografías gratis de alta calidad
- [Pexels](https://pexels.com) - Fotos y videos gratis
- [Picsum](https://picsum.photos) - Imágenes aleatorias

---

### 2. Imágenes Locales

Para usar imágenes locales, sigue estos pasos:

#### Paso 1: Agrega la imagen al proyecto

Coloca tus imágenes en la carpeta `public/`:

```
Portafolio/
├── public/
│   ├── images/
│   │   ├── profile.jpg       ← Tu foto de perfil
│   │   ├── logo.png          ← Tu logo
│   │   ├── project-1.jpg     ← Imagen de proyecto
│   │   └── tutorial-1.png    ← Imagen de tutorial
│   └── ...
```

#### Paso 2: Usa la ruta en la base de datos

```typescript
// En prisma/seed.ts
{
  profileImage: '/images/profile.jpg',
  logoImage: '/images/logo.png',
}
```

**Nota:** La ruta debe empezar con `/` (desde la raíz de `public/`).

---

### 3. Imágenes Base64

Para convertir una imagen a base64:

#### Método A: Línea de comandos

**PowerShell (Windows):**

```powershell
# Genera solo el string base64
[Convert]::ToBase64String([IO.File]::ReadAllBytes("tu-imagen.png")) | Out-File imagen.txt

# O crea directamente el data URL completo (ajusta el tipo MIME según tu imagen)
$base64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes("tu-imagen.png"))
"data:image/png;base64,$base64" | Out-File imagen-base64.txt
```

**macOS / Linux:**

```bash
# Convertir imagen a base64
base64 -i tu-imagen.png > imagen.txt

# O crear data URL directamente
echo "data:image/png;base64,$(base64 -i tu-imagen.png)" > imagen-base64.txt
```

#### Método B: JavaScript (en el navegador)

```javascript
// Lee el archivo y convierte a base64
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];

const reader = new FileReader();
reader.onload = function(e) {
  console.log(e.target.result); // Esto es tu data URL
};
reader.readAsDataURL(file);
```

#### Uso en la base de datos:

```typescript
// En prisma/seed.ts
{
  profileImage: 'data:image/png;base64,iVBORw0KGgoAAAANS...',
  logoImage: 'data:image/png;base64,iVBORw0KGgoAAAANS...',
}
```

> ⚠️ Base64 aumenta el tamaño del dato ~33% respecto al archivo original. Para imágenes grandes, prefiere URLs online o archivos locales en `public/`.

---

## 🔧 Configurar Imágenes en la Base de Datos

### Editar `prisma/seed.ts`

Busca la sección del Profile:

```typescript
const profile = await prisma.profile.upsert({
  where: { id: 'default' },
  update: {
    // Actualiza solo lo que necesites
    profileImage: 'https://tu-nueva-imagen.jpg',
    logoImage: '/images/tu-logo.png',
  },
  create: {
    // ... resto del código
    profileImage: 'https://tu-imagen.jpg',
    logoImage: '/images/tu-logo.png',
  }
});
```

### Ejecutar el seed

```bash
bun run db:seed
```

> Esto aplica los cambios tanto en tu base de datos local como en producción, según cuál `DATABASE_URL` tengas activa en tu `.env` al momento de correr el comando.

---

## 📝 Agregar Imágenes a Otros Contenidos

### Proyectos

En `prisma/seed.ts`, busca `projectsData`:

```typescript
const projectsData = [
  {
    title: 'Mi Proyecto',
    image: '/images/projects/project-1.jpg',  // ← Imagen local
    // o
    image: 'https://example.com/project.jpg',  // ← Imagen online
    githubUrl: 'https://github.com/tu-usuario/tu-proyecto',
    tags: ['React', 'TypeScript'],
    order: 1
  },
  // ...
];
```

### Tutoriales

En `prisma/seed.ts`, busca `tutorialsData`:

```typescript
const tutorialsData = [
  {
    title: 'Mi Tutorial',
    image: '/images/tutorials/tutorial-1.png',  // ← Imagen local
    // o
    image: 'https://example.com/tutorial.jpg',  // ← Imagen online
    youtubeUrl: 'https://youtube.com/watch?v=xxx',
    level: 'Principiante',
    category: 'Frontend',
    order: 1
  },
  // ...
];
```

---

## 🎨 Componentes de Imagen

Todas las imágenes del sitio pasan por **`next/image`** (redimensionado, AVIF/WebP, `sizes`, carga diferida y `priority` para la foto del hero y el logo). Los hosts remotos permitidos se configuran en `next.config.ts` → `images.remotePatterns` (por defecto cualquier host `https`).

### SafeImage

`src/components/ui/safe-image.tsx`: envoltorio de `next/image` que muestra un fallback si no hay `src` o la imagen falla al cargar. Acepta todas las props de `next/image`.

```tsx
// Imagen que llena su contenedor (el contenedor debe ser `relative` y tener tamaño o aspect-ratio)
<div className="relative aspect-video overflow-hidden">
  <SafeImage
    src={tutorial.image}
    alt={tutorial.title}
    fill
    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
    className="object-cover"
  />
</div>

// Imagen con dimensiones intrínsecas (logo)
<SafeImage src={profile.logoImage} alt="" width={160} height={64} className="h-16 w-auto" />

// Fallback personalizado y prioridad (imagen LCP)
<SafeImage src={profile.profileImage} alt="Foto" fill sizes="128px" priority fallback={<User />} />
```

**Propiedades adicionales a las de `next/image`:**
- `src` - URL, ruta local (`/images/...`) o `data:` (base64, se sirve sin optimizar). Admite `null`/`undefined`
- `fallback` - Elemento a mostrar si no hay imagen o falla la carga (por defecto, un icono sobre fondo `bg-muted`)

---

## 🐛 Solución de Problemas

### Problema: "Imagen no se muestra"

**Causas posibles:**
1. La URL es incorrecta
2. El archivo local no existe en `public/`
3. La ruta local no empieza con `/`
4. El formato no es soportado

**Soluciones:**

```powershell
# 1. Verificar que la imagen exista (PowerShell)
Test-Path public\images\tu-imagen.jpg

# 2. Verificar la URL en el navegador
# Abre la URL de la imagen directamente

# 3. Ejecutar el seed de nuevo
bun run db:seed

# 4. Verificar consola del navegador para errores
# F12 → Console
```

### Problema: "Base64 no funciona"

**Causas posibles:**
1. El string base64 está incompleto
2. Falta el prefijo `data:image/...`

**Solución:**
```typescript
// INCORRECTO
profileImage: 'iVBORw0KGgoAAAANS...';

// CORRECTO
profileImage: 'data:image/png;base64,iVBORw0KGgoAAAANS...';
```

### Problema: "Imagen local no carga"

**Causas posibles:**
1. El archivo no está en `public/`
2. La ruta no empieza con `/`

**Solución:**
```
# Estructura correcta
Portafolio/
├── public/
│   └── images/
│       └── mi-imagen.png  ← Aquí

# En seed.ts
image: '/images/mi-imagen.png'  ← Debe empezar con /
```

---

## 📊 Recomendaciones

### Formatos por Tipo de Imagen

| Tipo de Imagen | Formato Recomendado | ¿Por qué? |
|----------------|---------------------|-----------|
| Foto de Perfil | JPG/WebP | Mejor compresión, archivo más pequeño |
| Logo con transparencia | PNG | Soporta canal alpha |
| Gráficos vectoriales | SVG | Escalable sin pérdida de calidad |
| Animaciones | GIF | Soportado universalmente |
| Fotografías | WebP | Mejor relación calidad/tamaño |

### Optimización

1. **Comprimir imágenes antes de usarlas:**
   - [TinyPNG](https://tinypng.com) - PNG y JPG
   - [Squoosh](https://squoosh.app) - Todas las herramientas de Google

2. **Usar tamaños apropiados:**
   - Perfil: 400x400px mínimo
   - Logo: 200x200px mínimo
   - Proyectos: 800x600px mínimo
   - Tutoriales: 800x600px mínimo

3. **Usar formatos modernos:**
   - WebP para fotos (30% más pequeño que JPG)
   - AVIF si es soportado (50% más pequeño que WebP)

---

## 🎯 Ejemplos Completos

### Ejemplo 1: Todo con URLs de Unsplash

```typescript
// prisma/seed.ts
const profile = await prisma.profile.upsert({
  where: { id: 'default' },
  update: {},
  create: {
    // ...
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    logoImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
  }
});

const projectsData = [
  {
    title: 'Proyecto 1',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    // ...
  },
];

const tutorialsData = [
  {
    title: 'Tutorial 1',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    // ...
  },
];
```

### Ejemplo 2: Todo con imágenes locales

```typescript
// prisma/seed.ts
const profile = await prisma.profile.upsert({
  where: { id: 'default' },
  update: {},
  create: {
    // ...
    profileImage: '/images/profile.jpg',
    logoImage: '/images/logo.png',
  }
});

const projectsData = [
  {
    title: 'Proyecto 1',
    image: '/images/projects/proyecto-1.jpg',
    // ...
  },
];

const tutorialsData = [
  {
    title: 'Tutorial 1',
    image: '/images/tutorials/tutorial-1.png',
    // ...
  },
];
```

### Ejemplo 3: Mixto (URLs y locales)

```typescript
const projectsData = [
  {
    title: 'Proyecto Online',
    image: 'https://images.unsplash.com/photo-xxx',
    // ...
  },
  {
    title: 'Proyecto Local',
    image: '/images/projects/proyecto-local.jpg',
    // ...
  },
];
```

---

## ✅ Checklist

Antes de usar imágenes:

- [ ] Formato compatible (PNG, JPG, WebP, SVG, GIF)
- [ ] Si es local: archivo en `public/`
- [ ] Si es local: ruta empieza con `/`
- [ ] Si es online: URL accesible
- [ ] Texto alternativo (alt) descriptivo
- [ ] Tamaño apropiado para el uso

---

## 📚 Recursos Útiles

- [Can I Use - Formatos de Imagen](https://caniuse.com/#feat=webp)
- [ImageOptim](https://imageoptim.com) - Optimizador de imágenes
- [Squoosh](https://squoosh.app) - Herramienta de optimización online
- [Unsplash](https://unsplash.com) - Fotos gratis de alta calidad
- [Pexels](https://pexels.com) - Fotos y videos gratis

---

**¿Necesitas ayuda?** Revisa la sección "Solución de Problemas" o verifica la consola del navegador.