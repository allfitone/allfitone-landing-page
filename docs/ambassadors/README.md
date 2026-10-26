# Allfit One Ambassador Landing System

Sistema para crear landings de embajadores a partir de **datos y fotografías**, sin escribir una página, CSS ni un test por persona. Todas las landings usan una sola plantilla con el Design System y la identidad de Allfit One.

- **Para agregar un embajador:** sigue el [procedimiento](#procedimiento). Usa la [ficha de intake](intake-form.md) para recopilar la información y la [plantilla JSON](intake.template.json) para cargarla.

## Estado actual

| Perfil | URL | Estado | Notas |
|---|---|---|---|
| William Vergel | `/es/ambassadors/william`, `/en/ambassadors/william` | `published` | Propuesta privada: el copy y los precios son **muestras**, no una oferta aprobada. `/ambassadors/william` redirige con 308 a la versión en español. |

Publicado no significa indexable. Todas las páginas de embajador son `noindex, nofollow`, quedan fuera del sitemap y no se enlazan desde el home. No existe un índice `/ambassadors`.

## Qué hay que entregar por embajador

Una carpeta local `ambassador-intake/<slug>/` en la raíz del repositorio. Git la ignora, así que nada de lo que contiene se versiona.

| Archivo | Contenido |
|---|---|
| `intake.json` | Copia de [`intake.template.json`](intake.template.json) llena con el contenido **aprobado** de la ficha, en español e inglés. |
| Foto del hero | Retrato vertical (ideal 4:5) o, como máximo, cuadrado; **nunca horizontal**. JPEG, PNG o WebP, idealmente de 1200 px de ancho o más, con fondo oscuro y liso. |
| Foto de cuerpo entero | Vertical, con las mismas recomendaciones de formato y tamaño. |

La ficha diligenciada ([`intake-form.md`](intake-form.md)), las autorizaciones y los originales también quedan en esa carpeta o fuera del repositorio. Nunca en `public/`, `src/` ni `docs/`.

## Procedimiento

### 1. Preparar el intake

1. Completa la ficha con el embajador, incluida la autorización escrita de uso de imagen y texto.
2. Crea `ambassador-intake/<slug>/`.
3. Copia ahí `docs/ambassadors/intake.template.json` como `intake.json` y las dos fotos.
4. Llena `intake.json`:
   - `photos.hero.file` y `photos.standing.file`: rutas de las fotos, relativas a `intake.json`.
   - Campos sin aprobar: déjalos vacíos (`""` o `[]`). **Nunca** escribas "pendiente", "TODO" ni texto inventado.
   - Planes: agrégalos solo si están aprobados, con el formato de [planes](#planes) y su `basePlanId`. Sin precios aprobados, deja `"plans": []`.

### 2. Crear el borrador

Trabaja en una rama nueva:

```bash
npm run ambassador:new -- ambassador-intake/<slug>/intake.json --dry-run   # valida sin escribir
npm run ambassador:new -- ambassador-intake/<slug>/intake.json             # crea el borrador
```

El comando:

- Valida el slug (formato y que sea único), los idiomas, la estructura, los planes y las URLs.
- Lee el formato y las dimensiones de cada foto, respetando la rotación EXIF.
- Copia las fotos a `public/ambassadors/<slug>/hero.<ext>` y `standing.<ext>`. Los originales no se modifican y nada se sobrescribe.
- Escribe `src/data/ambassadors/<slug>.json` con `status: "draft"`.
- Regenera `src/data/ambassadors/index.ts` y lista los campos pendientes.

Si hay cualquier error, no escribe nada.

### 3. Previsualizar y ajustar

```bash
npm run dev
```

1. Abre `/es/ambassadors/<slug>` y `/en/ambassadors/<slug>`. Los borradores solo existen en `next dev`. Si justo después de crearlo responde 404, espera unos segundos y recarga: `next dev` tarda en registrar el slug nuevo. Si persiste, reinicia `npm run dev`.
2. Revisa a 320 px, en un móvil común, en tablet y en desktop. Usa la lista de [ajustes manuales](#ajustes-que-requieren-intervención-manual).
3. Los ajustes se hacen solo en `src/data/ambassadors/<slug>.json`: encuadre, textos y planes. **No se tocan componentes, CSS ni tests.**

### 4. Revisión

1. Completa los campos pendientes y cambia `status` a `"review"`.
2. Ejecuta:

   ```bash
   npm run ambassador:check
   npm run lint
   npm run typecheck
   ```

3. Revisa el checklist de la ficha.

`npm run build` falla a propósito mientras haya un perfil sin publicar. Ver [publicación segura](#publicación-segura).

### 5. Aprobación y publicación

Con aprobación explícita de contenido, precios, fotos y diseño:

1. Cambia `status` a `"published"`.
2. Ejecuta:

   ```bash
   npm run ambassador:check -- --release
   npm run build
   npm run test:e2e
   ```

   Los tests e2e recorren automáticamente cada perfil publicado: el nuevo embajador queda cubierto sin escribir tests.
3. Haz commit solo de `src/data/ambassadors/<slug>.json`, `src/data/ambassadors/index.ts` y `public/ambassadors/<slug>/`, y abre el PR.

### Editar un embajador

Edita `src/data/ambassadors/<slug>.json` y, si hace falta, reemplaza sus fotos. Si una foto cambia de tamaño, actualiza `width` y `height`; `ambassador:check` avisa si no coinciden. Los cambios de precio requieren primero la decisión comercial y el copy en ambos idiomas.

### Retirar un embajador

1. Borra `src/data/ambassadors/<slug>.json` y `public/ambassadors/<slug>/`.
2. Ejecuta `npm run ambassador:check -- --write`.
3. Despliega.

Cambiar el estado a `draft` no basta en la rama desplegada: el build fallaría hasta borrarlo. Ten en cuenta la caché del CDN.

## Publicación segura

| Estado | `next dev` | `next build` (todo despliegue) | Pendientes permitidos |
|---|---|---|---|
| `draft` | Visible | **Falla** | Sí |
| `review` | Visible | **Falla** | No |
| `published` | Visible | Se genera la página, `noindex, nofollow` | No |

Todo lo que está en `public/` se sirve por URL una vez desplegado, aunque ninguna página lo enlace. Por eso `next.config.ts` aplica `src/lib/ambassadors/release.ts` en cada build de producción. Esto ocurre con cualquier pipeline de despliegue, incluidos Vercel, CI o un build manual.

El build **falla** si:

- algún perfil no está `published`; o
- algún archivo bajo `public/ambassadors/` no pertenece a un perfil publicado, como fotos huérfanas o de un perfil retirado.

En la práctica, un perfil o foto no aprobado no puede llegar a un despliegue por accidente. `npm run ambassador:check` muestra estos bloqueos como advertencias, y con `--release` como errores, para detectarlos sin compilar.

- **Vista previa remota:** no existe. Habilitarla, por ejemplo con un despliegue preview protegido, requiere una decisión explícita.
- **Indexación:** hacer indexable a un embajador requiere una decisión de producto y SEO, además de `hreflang` con `languageAlternates()`, entradas en `src/app/sitemap.ts` y quitar el `noindex`. No está implementado.

## Fotografías

### Qué automatiza el generador

Comprobado con fotos de distinta composición:

| Entrada | Resultado |
|---|---|
| JPEG, PNG o WebP | Aceptados. Se leen formato y dimensiones del encabezado. |
| JPEG con rotación EXIF | Se registran las dimensiones visibles y se muestra con la orientación correcta. |
| Archivo que no es imagen o ruta inexistente | Error; no se escribe nada. |
| Menos de 1200 px de ancho | Advertencia: se verá suave en pantallas grandes. |
| Hero horizontal | **Error.** En desktop la foto conserva su proporción a la altura del hero y queda detrás del nombre. |
| Hero cuadrado | Advertencia. En desktop invade unos 200 px de la columna de texto, aunque bajo la zona difuminada, legible. |
| Hero muy alto (9:16) | Válido. En desktop se ve más angosto y sin solaparse con el texto. |
| Foto de cuerpo entero no vertical | Advertencia. Se ve más baja que la columna de texto. |

En móvil, el hero siempre se recorta a 4:5 (`object-fit: cover`), así que ninguna composición produce overflow. `next/image` genera las variantes optimizadas por tamaño de pantalla: no hace falta comprimir las fotos antes.

### Ajustes que requieren intervención manual

1. **Encuadre del hero en móvil.** El recorte 4:5 parte de `center top`. Si la cara o el torso quedan cortados, ajusta `photos.hero.focusMobile`, por ejemplo `"70% top"` o `"center 20%"`.
2. **Posición del hero en desktop.** Ajusta `photos.hero.insetDesktop` (por defecto `5vw`) si el retrato queda muy pegado o muy lejos del borde.
3. **Fondos claros u ocupados.** Las máscaras que disuelven los bordes están calibradas para el fondo oscuro y liso de William. Con un gimnasio iluminado o una pared clara se ven bordes rectos, como una "caja". El sistema no tiene una variante de máscara para ese caso: pide otra foto o una versión con el fondo oscurecido en edición.
4. **Hero cuadrado.** Revisa en desktop que el nombre siga siendo legible sobre la zona difuminada. Si no, pide un recorte vertical.
5. **Nombre largo.** El nombre usa tipografía muy grande. Revisa a 320 px los apellidos compuestos largos; si se desbordan, el test e2e de overflow falla.
6. **Derechos y texto alternativo.** Confirma la autorización de cada foto. `alt` vacío en ambos idiomas marca la foto como decorativa, que es lo correcto cuando el nombre está al lado.

## Arquitectura

```text
src/app/[lang]/ambassadors/[slug]/page.tsx   ruta única: lookup por slug, metadata y 404
src/components/ambassadors/                  plantilla compartida
  ambassador-landing.tsx                     composición: nav, secciones, footer
  ambassador-hero.tsx                        hero con nombre, retrato y datos
  ambassador-manifesto.tsx                   manifiesto, foto de cuerpo entero y método
  ambassador-plans.tsx                       planes, precio mensual y ahorro
  ambassador-contact.tsx                     cierre con email y redes
src/lib/ambassadors/
  schema.ts                                  contrato de datos y validador (lo usan la app y los scripts)
  registry.ts                                carga y valida los perfiles; decide la visibilidad
  release.ts                                 regla de publicación que aplica next.config.ts
  pricing.ts                                 precio mensual, ahorro, formato COP y duración
  contact.ts                                 enlaces mailto con asunto contextual
src/lib/content.ts                           ambassadorPageContent: copy común ES/EN de la plantilla
src/data/ambassadors/<slug>.json             un perfil por embajador
src/data/ambassadors/index.ts                índice generado; no se edita a mano
public/ambassadors/<slug>/                   fotos web de los perfiles nuevos
scripts/ambassadors/                         ambassador:new, ambassador:check y utilidades
tests/e2e/ambassador.spec.ts                 e2e parametrizado sobre cada perfil publicado
tests/e2e/ambassador-model.spec.ts           precios, contrato, estados, publicación y layout con N planes
```

Cómo encaja todo:

1. **Validación en el build.** `registry.ts` importa cada JSON listado en `index.ts` y lo valida con `schema.ts`. Un perfil inválido, o en `review`/`published` con campos pendientes, rompe todas las páginas de embajador en `next dev` y también el build. Así no hay errores silenciosos.
2. **Rutas generadas.** `generateStaticParams()` genera solo los slugs visibles, y `dynamicParams = false` convierte cualquier otro en 404.
3. **Plantilla.** Los componentes reciben el perfil y el idioma. Las secciones sin contenido, como redes sin URL, método vacío o perfil sin planes, se omiten.
4. **Encuadre y columnas.** Llegan al CSS como variables (`--ambassador-hero-focus`, `--ambassador-hero-inset`, `--ambassador-fact-count`, `--ambassador-method-count`) y `data-plan-count`. No hay reglas por persona.

## Contrato de datos

El contrato completo está en `src/lib/ambassadors/schema.ts`. Ejemplo real: `src/data/ambassadors/william.json`.

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `slug` | texto | sí | Minúsculas, números y guiones simples, sin acentos. Coincide con el nombre del archivo y forma la URL. |
| `status` | `draft` · `review` · `published` | sí | Ver [publicación segura](#publicación-segura). |
| `identity.givenName`, `identity.familyName` | texto | sí | El apellido se muestra en outline. No se traducen. |
| `photos.hero` | foto | sí | Vertical o cuadrada. Admite `focusMobile` e `insetDesktop`. |
| `photos.standing` | foto | sí | Foto vertical de cuerpo entero. |
| `socials[]` | `{ platform, handle, url? }` | no | Sin `url` (o con `url` vacío) la red no se muestra. La URL debe ser `https://`. |
| `basePlanId` | texto | si hay planes | `id` del plan contra el que se calcula el ahorro. |
| `plans[]` | plan | no | Sin planes, la sección no se muestra. |
| `content.es`, `content.en` | copy | sí | Misma estructura en ambos idiomas, ítem por ítem. |

**Foto:** `src`, `width` y `height` los escribe el generador. `alt` es `{ es, en }`; si queda vacío en ambos idiomas, la foto es decorativa, y si se escribe, va en ambos.

**Copy por idioma:**

- **Metadata:** `metaTitle`, `metaDescription`.
- **Hero:** `role`, `lead`, `heroFacts[]` (0 a 4).
- **Manifiesto:** `statement`, `aboutBody[]` (al menos 1 párrafo).
- **Método:** `methodTitle` y `method[]` (0 a 4 pasos `{ title, body }`).
- **Planes:** `plansTitle` y `plansLead`, obligatorios si hay planes.
- **Contacto:** `contactTitle`, `contactBody`.

El copy común (botón de contacto, "Equivale a … al mes", ahorro, "Recomendado", footer) vive en `ambassadorPageContent` en `src/lib/content.ts`.

**Campos pendientes:** un texto obligatorio vacío es *pendiente*. Solo `draft` lo acepta.

### Planes

```json
{
  "id": "3-months",
  "months": 3,
  "priceCOP": 450000,
  "featured": false,
  "copy": {
    "es": { "name": "3 meses", "who": "", "cadence": "", "includesLead": "Incluye", "includes": [""], "cta": "Pedir el plan de 3 meses" },
    "en": { "name": "3 months", "who": "", "cadence": "", "includesLead": "Includes", "includes": [""], "cta": "Ask for the 3-month plan" }
  }
}
```

- `id` es estable; el copy va dentro de cada plan y nunca se empareja por posición.
- `months` es un entero mayor o igual a 1. `priceCOP` es el precio **total** en pesos enteros, mayor o igual a 0.
- Puede haber como máximo un plan `featured`.
- La cantidad de planes es libre: en desktop se muestran hasta 3 por fila, y con 1 o 2 se centran.
- **Precio mensual:** `Math.round(priceCOP / months)`.
- **Ahorro:** se calcula contra `basePlanId` y solo se muestra si es mayor que 0. No se muestra si el plan base cuesta 0. La frase interpola la duración del plan base: "frente al plan de 3 meses" y "compared with the 3-month plan".

## Metadata

Cada perfil y cada idioma generan su propio title, description, canonical, Open Graph (`type: profile`) y Twitter card. La imagen social es la compartida de Allfit One.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run ambassador:new -- <intake.json> [--dry-run]` | Crea un perfil `draft` desde un intake. |
| `npm run ambassador:check` | Valida todos los perfiles, fotos (existencia, formato y dimensiones) e índice, y advierte de lo que bloquearía el build. Lo ejecuta CI. |
| `npm run ambassador:check -- --write` | Además regenera `src/data/ambassadors/index.ts`. |
| `npm run ambassador:check -- --release` | Convierte en error lo que bloquearía el build. |

Los scripts corren con el soporte de TypeScript de Node 24 y no agregan dependencias.

## Automatizado frente a revisión humana

**Automatizado:**

- Estructura, idiomas, slug, planes, precios, URLs, formato y dimensiones de las fotos, y orientación del hero.
- Copia de fotos, índice y estado inicial.
- Precio mensual y ahorro.
- Metadata, 404 y exclusión del sitemap.
- Bloqueo de despliegues con perfiles o fotos no publicados.
- Tests e2e de accesibilidad, overflow, CTA y cambio de idioma por perfil.

**Revisión humana:**

- Veracidad del copy y la traducción.
- Precios y condiciones comerciales.
- Derechos de las fotos.
- Encuadre, máscaras y legibilidad.
- Aprobación final y cambio de estado.

## Decisiones

- **JSON por perfil.** Son datos editables sin conocer el código y se validan con el mismo `schema.ts` en el build y en los scripts. Un formulario o un CMS futuro pueden producir el mismo contrato.
- **Copy del perfil fuera de `content.ts`.** `content.ts` conserva el copy de interfaz, incluido el común de embajadores.
- **Publicación segura en el build.** Los borradores solo existen en `next dev` y el build de producción rechaza lo no publicado. No hay variable de entorno para saltarse la regla, porque podría quedar activa en producción por error.
- **Hero horizontal prohibido.** Es una restricción de datos comprobada visualmente, no una variante de diseño.
- **URL de William intacta.** Sus fotos siguen en `public/ambassadors/william-vergel-*.jpg`; los perfiles nuevos usan `public/ambassadors/<slug>/`.
- **`priority` reemplazado por `preload`.** `priority` está deprecado en Next 16, y en esta versión los dos hacen lo mismo.
- **Correcciones respecto a la versión anterior,** sin cambio visual (verificado pixel a pixel en 5 anchos y 2 idiomas):
  - Las meta `twitter:*` heredaban las del home; ahora son las del perfil.
  - El `h1` se anunciaba como "WilliamVergel"; ahora es "William Vergel".

## Fuera de alcance

CMS, panel, base de datos, checkout o pagos, WhatsApp, demo, trial, waitlist, generación de copy con IA en tiempo de ejecución, índice público `/ambassadors`, enlaces desde el home, indexación y variantes de máscara para fondos claros.
