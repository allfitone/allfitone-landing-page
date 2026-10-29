# Ambassador Landing System — referencia técnica

Complemento técnico de la [guía para el equipo](README.md). Describe cómo está construido el sistema, el contrato de datos completo y las reglas de publicación. Para crear un embajador no hace falta leerlo.

## Estado actual

| Perfil | URL | Estado | Notas |
|---|---|---|---|
| William Vergel | `/es/ambassadors/william`, `/en/ambassadors/william` | `published` | Propuesta privada: el copy y los precios son **muestras**. `/ambassadors/william` redirige con 308 a la versión en español. |
| Marco Santiago Alfonso | `/es/ambassadors/marco`, `/en/ambassadors/marco` | `published` | Aprobado por el equipo de Allfit One el 2026-10-26: cifras, planes y servicios, uso de las fotos, enlace a Instagram, nombre, URL y textos ES/EN. |
| Kevin Velásquez | `/es/ambassadors/kevin`, `/en/ambassadors/kevin` | `published` | Aprobado por el equipo de Allfit One el 2026-10-28: uso de las fotos, nombre y URL, enlace a Instagram, planes y servicios, y textos ES/EN. TikTok sigue sin confirmar y oculto. |

Publicado no significa indexable. Todas las páginas de embajador son `noindex, nofollow`, quedan fuera del sitemap y no se enlazan desde el home. No existe un índice `/ambassadors`.

## Arquitectura

```text
src/app/[lang]/ambassadors/[slug]/page.tsx   ruta única: lookup por slug, metadata y 404
src/components/ambassadors/                  plantilla compartida
  ambassador-landing.tsx                     composición: nav, secciones, footer
  ambassador-hero.tsx                        hero con nombre, retrato y datos
  ambassador-manifesto.tsx                   manifiesto, foto de cuerpo entero y método
  ambassador-plans.tsx                       planes, precio mensual y ahorro
  ambassador-contact.tsx                     cierre con email y enlaces sociales secundarios
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
docs/ambassadors/                            guía, ficha, plantilla, ejemplo y esta referencia
tests/e2e/ambassador.spec.ts                 e2e parametrizado sobre cada perfil publicado
tests/e2e/ambassador-model.spec.ts           precios, contrato, estados, publicación y layout con N planes
```

Cómo encaja todo:

1. **Validación en el build.** `registry.ts` importa cada JSON listado en `index.ts` y lo valida con `schema.ts`. Un perfil inválido, o en `review`/`published` con campos pendientes, rompe todas las páginas de embajador en `next dev` y también el build. Así no hay errores silenciosos.
2. **Rutas generadas.** `generateStaticParams()` genera solo los slugs visibles, y `dynamicParams = false` convierte cualquier otro en 404.
3. **Plantilla.** Los componentes reciben el perfil y el idioma. Las secciones sin contenido, como redes sin URL, método vacío o perfil sin planes, se omiten.
4. **Encuadre y columnas.** Llegan al CSS como variables (`--ambassador-hero-focus`, `--ambassador-hero-inset`, `--ambassador-fact-count`, `--ambassador-method-count`) y `data-plan-count`. No hay reglas por persona.

## Contrato de datos

El contrato completo está en `src/lib/ambassadors/schema.ts`. Ejemplos válidos:

- `src/data/ambassadors/william.json`: perfil real.
- `docs/ambassadors/intake.example.json`: intake ficticio.

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `slug` | texto | sí | Minúsculas, números y guiones simples, sin acentos. Coincide con el nombre del archivo y forma la URL. |
| `status` | `draft` · `review` · `published` | sí | Ver [publicación segura](#publicación-segura). |
| `identity.givenName`, `identity.familyName` | texto | sí | El apellido se muestra en outline. No se traducen. |
| `photos.hero` | foto | sí | Vertical o cuadrada. Admite `focusMobile` e `insetDesktop`. |
| `photos.standing` | foto | sí | Foto vertical de cuerpo entero. |
| `socials[]` | `{ platform, handle, url? }` | no | Se muestran en el cierre como enlaces secundarios junto al botón de email: el nombre de la red en texto (el Design System no usa logos de marca) y el `handle` visible. Sin `url` (o con `url` vacío) la red no se muestra. La URL debe ser `https://`. |
| `basePlanId` | texto | si hay planes | `id` del plan contra el que se calcula el ahorro. |
| `plans[]` | plan | no | Sin planes, la sección no se muestra. |
| `content.es`, `content.en` | copy | sí | Misma estructura en ambos idiomas, ítem por ítem. |

**Foto.** En el perfil, `src`, `width` y `height` los escribe el generador. En el intake solo se indica `file`, la ruta relativa al intake. `alt` es `{ es, en }`: si queda vacío en ambos idiomas, la foto es decorativa; si se escribe, va en ambos.

**Encuadre del hero (opcional):**

- `focusMobile`: `object-position` del recorte 4:5 en móvil. Admite `left`, `center`, `right` o un porcentaje, seguido opcionalmente de `top`, `center`, `bottom` o un porcentaje. Ejemplos: `"88% top"`, `"center 20%"`. Por defecto es `center top`.
- `insetDesktop`: distancia del retrato al borde derecho de la grilla en desktop, en `vw`, `rem` o `px`. Ejemplos: `"5vw"`, `"2rem"`, `"40px"`. Por defecto es `5vw`.

**Copy por idioma:**

| Bloque | Campos |
|---|---|
| Metadata | `metaTitle`, `metaDescription` |
| Hero | `role`, `lead`, `heroFacts[]` (0 a 4) |
| Manifiesto | `statement`, `aboutBody[]` (al menos 1 párrafo) |
| Método | `methodTitle` y `method[]` (0 a 4 pasos `{ title, body }`) |
| Planes | `plansTitle` y `plansLead` (obligatorios si hay planes) |
| Contacto | `contactTitle`, `contactBody` |

**Copy común.** El botón de contacto, "Equivale a … al mes", el texto de ahorro, "Recomendado" y el footer viven en `ambassadorPageContent` (`src/lib/content.ts`).

**Pendientes.** Un texto obligatorio vacío (`""` o lista vacía) es *pendiente*. Solo `draft` lo acepta.

**Codificación.** Los archivos JSON deben guardarse en UTF-8 **sin BOM**. `JSON.parse` rechaza el BOM, y el archivo se reporta como "not valid JSON" aunque su contenido sea correcto.

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
- **Ahorro:** se calcula contra `basePlanId` y solo se muestra si es mayor que 0; no se muestra si el plan base cuesta 0. La frase interpola la duración del plan base: "frente al plan de 3 meses" y "compared with the 3-month plan".

## Publicación segura

| Estado | `next dev` | `next build` (todo despliegue) | Pendientes permitidos |
|---|---|---|---|
| `draft` | Visible | **Falla** | Sí |
| `review` | Visible | **Falla** | No |
| `published` | Visible | Se genera la página, `noindex, nofollow` | No |

Todo lo que está en `public/` se sirve por URL una vez desplegado. Por eso `next.config.ts` aplica `src/lib/ambassadors/release.ts` en cada build de producción, con cualquier pipeline de despliegue. El build **falla** si:

- algún perfil no está `published`; o
- algún archivo bajo `public/ambassadors/` no pertenece a un perfil publicado.

`next typegen`, que ejecuta `npm run typecheck`, carga la misma fase de configuración pero se excluye de la regla, porque solo genera tipos. `npm run ambassador:check` reporta los bloqueos como advertencias, o como errores con `--release`.

**Vista previa remota:** no existe; requiere una decisión explícita.

**Indexación:** requiere una decisión de producto y SEO, además de `hreflang` con `languageAlternates()`, entradas en `src/app/sitemap.ts` y quitar el `noindex`.

## Fotografías

Comprobado con fotos de distinta composición:

| Entrada | Resultado |
|---|---|
| JPEG, PNG o WebP | Aceptados; se leen formato y dimensiones del encabezado. |
| JPEG con rotación EXIF | Se registran las dimensiones visibles y se muestra bien orientado. |
| Archivo que no es imagen o ruta inexistente | Error; no se escribe nada. |
| Menos de 1200 px de ancho | Advertencia. |
| Hero horizontal | **Error.** En desktop la foto quedaría detrás del nombre. |
| Hero cuadrado | Advertencia. Invade unos 200 px de la columna de texto bajo la zona difuminada. |
| Hero muy alto (9:16) | Válido. |
| Foto de cuerpo entero no vertical | Advertencia. |

Las máscaras que disuelven los bordes están calibradas para un fondo oscuro y liso. Con fondos claros u ocupados se ven bordes rectos, y no hay variante de máscara para ese caso.

## Metadata

Cada perfil y cada idioma generan su propio title, description, canonical, Open Graph (`type: profile`) y Twitter card. La imagen social es la compartida de Allfit One.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run ambassador:new -- <intake.json> [--dry-run]` | Crea un perfil `draft` desde un intake. |
| `npm run ambassador:check` | Valida perfiles, fotos (existencia, formato y dimensiones) e índice, y advierte de lo que bloquearía el build. Lo ejecuta CI. |
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

- **JSON por perfil.** Son datos editables sin conocer el código y se validan con el mismo `schema.ts` en el build y en los scripts.
- **Copy del perfil fuera de `content.ts`.** `content.ts` conserva el copy de interfaz, incluido el común de embajadores.
- **Publicación segura en el build.** Los borradores solo existen en `next dev`. No hay variable de entorno para saltarse la regla.
- **Hero horizontal prohibido.** Es una restricción de datos comprobada visualmente, no una variante de diseño.
- **Apellidos con tilde o Ñ.** El interlineado comprimido del nombre ocultaba el acento detrás del nombre de pila. Si el apellido tiene una marca diacrítica, `ambassador-hero.tsx` agrega la clase `ambassador-name-accented` (`.26em` de espacio superior); los demás nombres conservan su composición exacta.
- **Redes sin logos de marca.** El Design System no los usa como iconos de interfaz; la red se nombra en texto, junto al icono semántico `external`.
- **URL de William intacta.** Sus fotos siguen en `public/ambassadors/william-vergel-*.jpg`; los perfiles nuevos usan `public/ambassadors/<slug>/`.

## Fuera de alcance

CMS, panel, base de datos, checkout o pagos, WhatsApp, demo, trial, waitlist, generación de copy con IA en tiempo de ejecución, índice público `/ambassadors`, enlaces desde el home, indexación, variantes de máscara para fondos claros y logos de redes sociales.
