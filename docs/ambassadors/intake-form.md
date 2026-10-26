# Ficha de embajador — Allfit One

**Uso:** el equipo la completa con aprobación del embajador. Es el insumo para llenar [`intake.template.json`](intake.template.json) y **no se publica**.

- Lo que no se sepa se marca como **pendiente** y en el JSON queda vacío. Nunca se inventa.
- La ficha diligenciada se guarda en `ambassador-intake/<slug>/`, que Git ignora, junto a `intake.json` y la carpeta `fotos/`. Ver el [paso 2 de la guía](README.md#2-dónde-guardar-las-fotos-y-la-información).
- [`intake.example.json`](intake.example.json) muestra un intake completo con datos ficticios.

Entre corchetes va el campo del JSON que corresponde a cada respuesta.

## A. Identidad y permisos

- Nombre [`identity.givenName`]:
- Apellidos [`identity.familyName`]:
- Slug propuesto, sin acentos ni espacios [`slug`]:
- Disciplina o rol profesional [`content.*.role`]:
- Persona que valida los datos y fecha de aprobación:
- ¿Autorizó el uso de imagen y texto en la web de Allfit One? (sí / no / pendiente):
- ¿Hay restricciones de uso, duración o territorio? (no adjuntar documentos privados aquí):

## B. Presentación e historia

Escribe cada respuesta en español y en inglés. Las listas deben tener la misma cantidad de elementos en los dos idiomas.

- Título y descripción para buscadores y redes [`content.*.metaTitle`, `content.*.metaDescription`]:
- Frase principal de presentación, 1 a 2 oraciones [`content.*.lead`]:
- Hasta cuatro datos destacados comprobables para el hero [`content.*.heroFacts`]:
  1.
  2.
  3.
- Frase o manifiesto principal [`content.*.statement`]:
- Biografía profesional, 1 a 4 párrafos cortos [`content.*.aboutBody`]:
- Años de experiencia comprobables, si se van a mencionar:
- Título de la metodología [`content.*.methodTitle`]:
- Método, hasta cuatro pasos con título y descripción [`content.*.method`]:
  1.
  2.
  3.
- Certificaciones, distinciones o resultados mencionables, y la fuente que los confirma:
- Afirmaciones que **no** deben incluirse:

## C. Planes y propuesta comercial

> Una fila por plan. Agrega o quita planes según la oferta real. Todo debe estar aprobado. Sin precios aprobados, el perfil se crea sin planes.

| ID estable [`id`] | Nombre [`copy.*.name`] | Duración en meses [`months`] | Precio total COP [`priceCOP`] | Para quién [`copy.*.who`] | Cadencia [`copy.*.cadence`] | Qué incluye [`copy.*.includes`] | Texto del botón [`copy.*.cta`] | ¿Destacado? [`featured`] |
|---|---|---:|---:|---|---|---|---|---|
| | | | | | | | | |
| | | | | | | | | |
| | | | | | | | | |

- ID del plan base para comparar mensualidades [`basePlanId`]:
- Vigencia y condiciones comerciales:
- Aprobación interna de precios y fecha:
- Título y texto introductorio de planes [`content.*.plansTitle`, `content.*.plansLead`]:
- Título y texto de contacto [`content.*.contactTitle`, `content.*.contactBody`]:

## D. Fotografía

- **Hero:** retrato vertical (ideal 4:5) o cuadrado, nunca horizontal; idealmente de 1200 px de ancho o más, con fondo oscuro y liso [`photos.hero.file`]:
- **Cuerpo entero:** foto vertical, con las mismas recomendaciones [`photos.standing.file`]:
- Crédito del fotógrafo, si corresponde:
- Preferencias de recorte [`photos.hero.focusMobile`, `photos.hero.insetDesktop`]:
- ¿Los fondos son claros u ocupados? Requieren revisar las máscaras o pedir otra versión:
- Texto alternativo en ES y EN de cada foto, o vacío si la foto es decorativa [`photos.*.alt`]:

## E. Redes públicas

Las redes sin URL confirmada no se muestran.

- Instagram, handle y URL [`socials`]:
- TikTok, handle y URL [`socials`]:
- Otras redes públicas, handle y URL [`socials`]:
- Redes que prefiere no publicar:

## F. Versión en inglés y revisión

- Quién tradujo o revisó el contenido en inglés:
- Fecha de aprobación ES:
- Fecha de aprobación EN:
- Cambios o advertencias del embajador:
- Información faltante (si es obligatoria, impide pasar a `review`):

## G. Checklist antes de publicar

- [ ] Nombre, slug y disciplina confirmados.
- [ ] Trayectoria y afirmaciones profesionales verificadas con el embajador.
- [ ] Copy en español e inglés revisado, coherente y sin campos pendientes.
- [ ] Planes, precios en COP, duración, ahorro y beneficios aprobados.
- [ ] Fotos autorizadas; encuadre y máscaras revisados a 320 px, tablet y desktop.
- [ ] Texto alternativo apropiado; redes correctas y sin enlaces vacíos.
- [ ] CTA únicamente a `hello@allfit.one`, con asunto contextual.
- [ ] Accesibilidad comprobada; `npm run ambassador:check`, lint, typecheck, build y e2e en verde.
- [ ] Publicación aprobada explícitamente; el perfil sigue `noindex`.
