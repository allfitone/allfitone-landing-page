# Landings de embajadores — guía para el equipo

Esta guía explica cómo crear la página de un nuevo embajador de Allfit One **sin programar**. Cada página se arma automáticamente a partir de dos cosas:

1. **Un archivo de datos** con los textos, planes y redes del embajador.
2. **Dos fotografías:** un retrato y una foto de cuerpo entero.

El resultado son dos páginas, una en español y otra en inglés:

```text
https://www.allfit.one/es/ambassadors/<slug>
https://www.allfit.one/en/ambassadors/<slug>
```

Por ejemplo, la de William es `/es/ambassadors/william`.

> Los comandos de esta guía son para **PowerShell en Windows**. Al final hay [equivalentes para Bash](#equivalentes-para-bash-macos-o-linux).

## Antes de empezar

**Necesitas:**
- el proyecto descargado;
- Node.js 24;
- un editor de texto. Se recomienda **Visual Studio Code**, que marca los errores de formato del JSON.

**Una sola vez,** abre PowerShell en la carpeta del proyecto e instala las dependencias:

```powershell
Set-Location "C:\ruta\a\allfitone-landing-page"
npm ci
```

Todos los comandos de esta guía se ejecutan **desde esa carpeta**.

**Palabras que verás:**

| Palabra | Significado |
|---|---|
| **slug** | La parte final de la dirección web, por ejemplo `andrea-ejemplo`. Solo minúsculas, números y guiones; sin tildes, ñ ni espacios. |
| **intake** | El archivo `intake.json` con la información del embajador. Se usa una sola vez para crear su perfil. |
| **perfil** | El archivo final del embajador, `src\data\ambassadors\<slug>.json`. Lo crea el generador y es el que se edita después. |
| **draft** (borrador) | Estado inicial. La página solo se ve en tu computador; nunca se publica. |
| **review** (revisión) | Contenido completo, esperando aprobación. Tampoco se publica. |
| **published** (publicado) | Aprobado. La página se puede desplegar, aunque Google no la indexa. |

## El proceso en 7 pasos

| Paso | Qué haces | Quién |
|---|---|---|
| [1](#1-qué-pedirle-al-embajador) | Pedir la información y las fotos al embajador | Equipo comercial |
| [2](#2-dónde-guardar-las-fotos-y-la-información) | Guardar todo en `ambassador-intake\<slug>\` | Quien prepara la página |
| [3](#3-qué-plantilla-copiar) | Copiar la plantilla `intake.template.json` | Quien prepara la página |
| [4](#4-qué-campos-completar) | Completar los campos | Contenido / edición |
| [5](#5-ejecutar-el-generador) | Ejecutar el generador | Quien prepara la página |
| [6](#6-ver-la-landing) | Ver y ajustar la página en tu computador | Contenido / diseño |
| [7](#7-qué-aprobar-antes-de-publicar) | Conseguir las aprobaciones y publicar | Producto, marca y desarrollo |

## 1. Qué pedirle al embajador

Usa la **[ficha del embajador](intake-form.md)** como formulario. Imprímela o cópiala y complétala con él o ella. Incluye:

- **Identidad:** nombre y apellidos tal como quiere presentarse, y su disciplina o rol.
- **Historia:**
  - una frase de presentación;
  - una biografía corta (1 a 4 párrafos);
  - hasta 4 datos destacados comprobables;
  - una frase o manifiesto;
  - su método, en hasta 4 pasos.
- **Planes:** duración, precio total en pesos, para quién es cada plan, qué incluye y cuál recomienda. Solo si ya están aprobados comercialmente.
- **Redes:** usuario y dirección exacta de cada red que acepta mostrar.
- **Fotografías:** ver los requisitos en el [paso 2](#2-dónde-guardar-las-fotos-y-la-información).
- **Autorizaciones:** permiso escrito para usar su imagen, sus textos y sus redes en la web de Allfit One.
- **Versión en inglés:** quién la traduce o revisa.

**Nunca inventes datos.** Lo que el embajador no haya confirmado se deja pendiente, no se rellena.

## 2. Dónde guardar las fotos y la información

Todo lo del embajador va en una carpeta con su slug dentro de `ambassador-intake\`:

```text
allfitone-landing-page\
└── ambassador-intake\
    └── andrea-ejemplo\          ← una carpeta por embajador, con su slug
        ├── intake.json          ← la información (paso 3)
        ├── ficha.md             ← la ficha diligenciada (opcional)
        └── fotos\
            ├── retrato.jpg      ← foto para la portada
            └── cuerpo-entero.jpg
```

Para crear la carpeta y copiar las fotos, cambia las rutas de origen por las tuyas:

```powershell
New-Item -ItemType Directory -Force ambassador-intake\andrea-ejemplo\fotos
Copy-Item "C:\Users\tu-usuario\Downloads\retrato-andrea.jpg" ambassador-intake\andrea-ejemplo\fotos\retrato.jpg
Copy-Item "C:\Users\tu-usuario\Downloads\andrea-de-pie.jpg" ambassador-intake\andrea-ejemplo\fotos\cuerpo-entero.jpg
```

**Por qué esta carpeta:** Git ignora `ambassador-intake\`, así que nada de lo que guardes ahí se sube al repositorio. Es el lugar seguro para fotos originales, fichas y autorizaciones.

**No copies fotos a mano a `public\`.** El generador las copia al lugar correcto en el [paso 5](#5-ejecutar-el-generador).

**Requisitos de las fotos:**

| | Retrato (portada) | Cuerpo entero |
|---|---|---|
| Orientación | **Vertical** (ideal 4:5) o cuadrada. **Nunca horizontal**: el generador la rechaza. | Vertical |
| Tamaño | 1200 px de ancho o más (menos genera una advertencia) | 1200 px de ancho o más |
| Formato | JPG, PNG o WebP | JPG, PNG o WebP |
| Fondo | Oscuro y liso. Los fondos claros u ocupados, como un gimnasio iluminado, dejan bordes rectos visibles. | Igual |
| Permiso | Autorizado por escrito | Autorizado por escrito |

No hace falta comprimir las fotos: la web genera versiones optimizadas automáticamente.

## 3. Qué plantilla copiar

Copia la plantilla vacía dentro de la carpeta del embajador:

```powershell
Copy-Item docs\ambassadors\intake.template.json ambassador-intake\andrea-ejemplo\intake.json
```

Ábrela en tu editor:

```powershell
code ambassador-intake\andrea-ejemplo\intake.json
```

Si no usas Visual Studio Code, ábrela con tu editor habitual.

**Usa el ejemplo como guía.** [`docs/ambassadors/intake.example.json`](intake.example.json) es un intake **completo y válido** de una embajadora ficticia, "Andrea Ejemplo". Ábrelo al lado de tu archivo para ver cómo se escribe cada campo. No lo uses como base para un perfil real: todos sus datos son inventados.

**Al guardar:**
- El formato debe ser **UTF-8 sin BOM**. Visual Studio Code lo hace por defecto: en la barra inferior debe decir `UTF-8`, no `UTF-8 with BOM`. Un archivo con BOM se rechaza como "not valid JSON" aunque su contenido esté bien.
- No guardes el archivo con `Set-Content` ni `Out-File` de PowerShell 5.1: agregan el BOM.
- Respeta las comillas `"` y las comas entre campos. Si el editor subraya algo en rojo, hay un error de formato.

## 4. Qué campos completar

### Datos generales

| Campo | Qué escribir | ¿Puede quedar pendiente? |
|---|---|---|
| `slug` | La dirección de la página: `andrea-ejemplo` | **No** |
| `identity.givenName` | Nombre o nombres: `Andrea` | **No** |
| `identity.familyName` | Apellido (se muestra con contorno): `Ejemplo` | **No** |
| `photos.hero.file` | Ruta del retrato, relativa al `intake.json`: `fotos/retrato.jpg` | **No** |
| `photos.standing.file` | Ruta de la foto de cuerpo entero: `fotos/cuerpo-entero.jpg` | **No** |
| `photos.*.alt` | Descripción de la foto en `es` y `en`. Vacía en ambos idiomas si es decorativa, como cuando el nombre está al lado. | Sí (vacía) |
| `photos.hero.focusMobile` | Qué parte del retrato se ve en celulares. Déjalo en `center top` al principio; se ajusta en el [paso 6](#6-ver-la-landing). | Sí |
| `socials` | Cada red con `platform`, `handle` (`@usuario`) y `url` (`https://...`) | Sí: deja `"url": ""` y la red no se muestra |
| `plans` | Los planes aprobados (ver abajo) | Sí: deja `"plans": []` y la sección de planes no aparece |
| `basePlanId` | El `id` del plan contra el que se calcula el ahorro mensual. No viene en la plantilla: agrégalo junto a `plans`, como en el ejemplo. | Solo se usa si hay planes |

### Textos (en `content.es` y `content.en`)

Cada texto se escribe dos veces, en español (`es`) y en inglés (`en`).

| Campo | Dónde aparece en la página | Ejemplo (Andrea Ejemplo) |
|---|---|---|
| `metaTitle` | Título de la pestaña del navegador y al compartir; separa sus partes con « \| », nunca «-» ni «·» | Andrea Ejemplo \| Embajadora de Allfit One |
| `metaDescription` | Descripción al compartir el enlace | Andrea Ejemplo, embajadora ficticia… |
| `role` | Texto pequeño en cyan sobre el nombre | Entrenadora de running y fuerza |
| `lead` | Frase debajo del nombre | Entrena para correr mejor sin descuidar la fuerza… |
| `heroFacts` | Datos destacados en la franja de la portada (0 a 4) | Running y fuerza · Presencial y en línea |
| `statement` | Frase grande junto a la foto de cuerpo entero | Correr mejor empieza por entrenar con un plan. |
| `aboutBody` | Biografía, uno o más párrafos | … |
| `methodTitle` | Título del método (solo si hay pasos) | Cómo trabaja |
| `method` | Pasos del método, cada uno con `title` y `body` (0 a 4) | Conoce tu punto de partida… |
| `plansTitle` / `plansLead` | Título e introducción de los planes (solo si hay planes) | Planes / Dos opciones de ejemplo… |
| `contactTitle` / `contactBody` | Cierre de la página, antes del botón "Escríbenos" | Entrena con Andrea / Cuéntanos qué quieres conseguir… |

### Qué puede quedar pendiente

**Puede quedar vacío mientras el perfil sea borrador:**
- cualquier texto, escribiendo `""`;
- las listas, escribiendo `[]`;
- los planes, con `"plans": []`;
- la dirección de una red, con `"url": ""`.

El generador lista estos campos como **Pending**.

**No puede faltar:** slug, nombre, apellido y las dos fotos. Sin ellos, el generador muestra un error y no crea nada.

### Reglas importantes

- **Misma cantidad en ambos idiomas.** Si hay 3 datos destacados en español, debe haber 3 en inglés. Lo mismo para la biografía, el método y lo que incluye cada plan.
- **Nada de "pendiente", "TODO" ni texto inventado:** lo que falte se deja vacío.
- **Precios:** el precio **total** del plan, en pesos, solo con números: `540000` (sin `$`, puntos ni comas).
- **`months`:** número entero de meses (1, 3, 6, 12…).
- **Plan destacado:** como máximo un plan con `"featured": true`.
- **Plan base:** `basePlanId` debe ser el `id` de uno de los planes, normalmente el más corto. Contra él se calcula "Ahorras 10% frente al plan de 1 mes".
- **El único botón de compra es el email.** No agregues WhatsApp, agendas, pagos ni enlaces de compra.

Un plan se escribe así; copia el bloque por cada plan y cambia los valores:

```json
{
  "id": "3-months",
  "months": 3,
  "priceCOP": 540000,
  "featured": true,
  "copy": {
    "es": { "name": "3 meses", "who": "Para quién es", "cadence": "Frecuencia", "includesLead": "Incluye", "includes": ["Beneficio 1", "Beneficio 2"], "cta": "Pedir el plan de 3 meses" },
    "en": { "name": "3 months", "who": "Who it is for", "cadence": "Frequency", "includesLead": "Includes", "includes": ["Benefit 1", "Benefit 2"], "cta": "Ask for the 3-month plan" }
  }
}
```

## 5. Ejecutar el generador

Primero **valida** el archivo sin crear nada:

```powershell
npm run ambassador:new -- ambassador-intake\andrea-ejemplo\intake.json --dry-run
```

Si termina con `Dry run: the intake for "andrea-ejemplo" is valid. Nothing was written.`, **crea el borrador**:

```powershell
npm run ambassador:new -- ambassador-intake\andrea-ejemplo\intake.json
```

**Qué hace el generador:**
- Revisa el slug, los textos en ambos idiomas, los planes, las redes y las fotos.
- Copia las fotos a `public\ambassadors\andrea-ejemplo\`. Tus originales no se tocan.
- Crea el perfil `src\data\ambassadors\andrea-ejemplo.json` en estado `draft`.
- Lo registra en el sitio.

Si hay **cualquier** error, no escribe nada.

**Cómo leer la respuesta:**

| Sección | Significado |
|---|---|
| `Warnings` | Avisos que no bloquean, como una foto pequeña. Revísalos. |
| `Pending` | Campos vacíos. Se aceptan en borrador, pero hay que completarlos antes de pasar a revisión. |
| `Errors (nothing was written)` | Algo impide crear el perfil. Corrígelo y vuelve a ejecutar. |

En PowerShell los errores pueden salir en rojo con texto técnico adicional. Busca la línea que empieza con `Cannot read` o el bloque `Errors`.

**Errores frecuentes:**

| Mensaje (resumido) | Qué hacer |
|---|---|
| `Expected ',' or '}' after property value in JSON at position … (line 3 column 3)` | Falta una coma o una comilla cerca de esa línea. |
| `Unexpected token … is not valid JSON` en un archivo que parece correcto | Se guardó con BOM. Vuelve a guardarlo como `UTF-8` en Visual Studio Code. |
| `slug: src/data/ambassadors/<slug>.json already exists; edit that profile instead` | Ese embajador ya existe: edita su perfil en lugar de crearlo otra vez. |
| `photos.hero.file: … does not exist` | La ruta de la foto está mal escrita o la foto no está en `fotos\`. |
| `… is not a readable JPEG, PNG, or WebP image` | El archivo no es una foto válida; expórtala de nuevo como JPG. |
| `photos.hero: the hero photo must be vertical or square` | El retrato es horizontal; pide o recorta una versión vertical. |
| `content.*.heroFacts: es has 3 items and en has 2` | Falta un elemento en uno de los idiomas. |
| `socials[0].url: expected an https:// address` | La dirección de la red debe empezar por `https://`. |

## 6. Ver la landing

Inicia el sitio en tu computador:

```powershell
npm run dev
```

1. **Abre la dirección que muestra la terminal** (normalmente `Local: http://localhost:3000`), agregando la ruta del embajador:
   - `http://localhost:3000/es/ambassadors/andrea-ejemplo`
   - `http://localhost:3000/en/ambassadors/andrea-ejemplo`
2. **Si responde 404 justo después de crearlo,** espera unos segundos y recarga. Si persiste, detén el servidor con `Ctrl + C` y vuelve a ejecutar `npm run dev`.
3. **Si el puerto 3000 está ocupado,** Next usa otro automáticamente y lo avisa (`Port 3000 is in use … using available port 3001 instead`). Usa esa dirección.
4. **Si la terminal dice `Another next server is already running in this directory`,** ya hay un servidor de este proyecto abierto. Usa su dirección; solo puede haber uno por proyecto.
5. **Para elegir otro puerto:** `npm run dev -- -p 3005`.

Los borradores **solo** se ven así, en tu computador. Nadie más puede verlos.

**Revisa en distintos tamaños.** En el navegador pulsa `F12` y luego el icono de dispositivo (o `Ctrl + Shift + M`). Prueba 320 px (celular pequeño), 375 px, 768 px (tablet) y 1440 px (escritorio). Comprueba que:
- el nombre se lea completo y no se salga de la pantalla;
- la cara se vea bien en el recorte del celular;
- los bordes de las fotos se disuelvan, sin verse como una caja;
- los precios, el ahorro, el botón "Escríbenos" y las redes sean correctos.

**Los ajustes se hacen en el perfil, no en el intake:** `src\data\ambassadors\andrea-ejemplo.json`. El intake solo se usa una vez. Guarda el archivo y la página se actualiza sola.

- **La cara queda cortada en el celular:** cambia `photos.hero.focusMobile`. Por ejemplo, `"70% top"` mueve el encuadre a la derecha y `"center 20%"` lo baja un poco.
- **El retrato queda muy pegado o muy lejos del borde en escritorio:** agrega en `photos.hero` el campo `"insetDesktop": "8vw"` (por defecto es `5vw`).
- **Un texto no convence:** cámbialo en `content.es` y `content.en`.

**Antes de pedir la revisión,** valida el perfil:

```powershell
npm run ambassador:check
npm run lint
npm run typecheck
```

**Es normal que `npm run build` falle** mientras exista un perfil en borrador o revisión, con el mensaje `Ambassador profiles are not ready to ship`. Es la protección que impide publicar algo no aprobado. No cambies el estado a publicado solo para que el build pase.

## 7. Qué aprobar antes de publicar

**Antes de pasar a revisión,** completa todo lo pendiente y cambia en el perfil:

```json
"status": "review"
```

**Checklist de aprobación:**

- [ ] Nombre, slug y disciplina confirmados con el embajador.
- [ ] Trayectoria, cifras y afirmaciones verificadas con el embajador. Nada inventado.
- [ ] Textos en español e inglés revisados y sin campos vacíos.
- [ ] Planes, precios en pesos, duración, ahorro y beneficios aprobados comercialmente, y confirmado que el embajador presta esos servicios.
- [ ] Autorización escrita de uso de ambas fotos y textos alternativos revisados.
- [ ] Permiso para enlazar sus redes y direcciones correctas.
- [ ] Revisión visual en celular, tablet y escritorio, incluidos encuadre y bordes de las fotos.
- [ ] El único contacto es el email `hello@allfit.one`.
- [ ] Aprobación explícita de producto y marca para publicar.

**Publicar** lo hace una persona de desarrollo, después de todas las aprobaciones:

1. Cambiar en el perfil `"status": "published"`.
2. Ejecutar:

   ```powershell
   npm run ambassador:check -- --release
   npm run build
   npm run test:e2e
   ```

   Las pruebas incluyen al nuevo embajador automáticamente.
3. Guardar en Git **solo** los archivos del embajador y abrir el pull request:

   ```powershell
   git add -- src/data/ambassadors/andrea-ejemplo.json src/data/ambassadors/index.ts public/ambassadors/andrea-ejemplo/
   git diff --cached --name-only
   ```

Publicado no significa que aparezca en Google: las páginas de embajadores no se indexan ni se enlazan desde el home.

## Editar o retirar un embajador

**Editar:** cambia `src\data\ambassadors\<slug>.json` y revisa el resultado con `npm run dev`. Si reemplazas una foto en `public\ambassadors\<slug>\`, actualiza también su `width` y `height`; `npm run ambassador:check` avisa si no coinciden. Los cambios de precio necesitan aprobación comercial previa.

**Retirar:** borra el perfil y su carpeta de fotos, y actualiza el registro:

```powershell
Remove-Item src\data\ambassadors\andrea-ejemplo.json
Remove-Item -Recurse public\ambassadors\andrea-ejemplo
npm run ambassador:check -- --write
```

Cambiar el estado a `draft` no basta: el build fallaría hasta que se borre.

## Problemas frecuentes

| Situación | Solución |
|---|---|
| El generador dice "not valid JSON" | Revisa comas y comillas cerca de la línea indicada, y que el archivo se haya guardado como `UTF-8` sin BOM. |
| La página nueva responde 404 | Espera unos segundos y recarga; si sigue, reinicia `npm run dev`. Comprueba que el slug de la dirección coincida con el del perfil. |
| Todas las páginas de embajadores muestran un error en `npm run dev` | Un perfil en `review` o `published` tiene campos vacíos, o un perfil tiene un error. Ejecuta `npm run ambassador:check` para ver cuál. |
| `npm run build` falla con `Ambassador profiles are not ready to ship` | Es esperado mientras haya borradores. Solo se publica con todo aprobado. |
| La foto de portada se ve con un borde recto | El fondo es claro u ocupado. Pide una versión con fondo oscuro. |
| El generador avisa `not vertical` o `1200 px` | Pide una foto vertical o de mayor tamaño. |

## Equivalentes para Bash (macOS o Linux)

```bash
mkdir -p ambassador-intake/andrea-ejemplo/fotos
cp ~/Downloads/retrato-andrea.jpg ambassador-intake/andrea-ejemplo/fotos/retrato.jpg
cp ~/Downloads/andrea-de-pie.jpg ambassador-intake/andrea-ejemplo/fotos/cuerpo-entero.jpg
cp docs/ambassadors/intake.template.json ambassador-intake/andrea-ejemplo/intake.json
npm run ambassador:new -- ambassador-intake/andrea-ejemplo/intake.json --dry-run
npm run ambassador:new -- ambassador-intake/andrea-ejemplo/intake.json
# retirar un embajador
rm src/data/ambassadors/andrea-ejemplo.json
rm -r public/ambassadors/andrea-ejemplo
npm run ambassador:check -- --write
```

Los comandos `npm` son iguales en ambos sistemas.

## Archivos de esta carpeta

| Archivo | Para qué sirve |
|---|---|
| [`README.md`](README.md) | Esta guía. |
| [`intake-form.md`](intake-form.md) | Ficha para recopilar la información con el embajador. |
| [`intake.template.json`](intake.template.json) | Plantilla vacía que se copia para cada embajador. |
| [`intake.example.json`](intake.example.json) | Ejemplo completo y válido, con datos ficticios. |
| [`technical-reference.md`](technical-reference.md) | Referencia técnica: arquitectura, contrato de datos y reglas de publicación. |
