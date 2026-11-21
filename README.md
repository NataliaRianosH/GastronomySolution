# Soluciones Gastronómicas Francini V.

Sitio estático (HTML + CSS + JS) publicado con GitHub Pages desde `main`.

## Gestionar la galería sin tocar código (Pages CMS)

1. Entra a <https://app.pagescms.org> con tu cuenta de GitHub y abre el repositorio `GastronomySolution`.
2. En el menú elige **Galería de fotos**.
3. **Agregar:** botón para añadir una foto → sube la imagen en *Foto*, escribe el *Texto alternativo* (describe lo que se ve) y, si quieres, el *Orden*.
4. **Quitar:** elimina la foto de la lista. (El archivo de la imagen sigue en `images/galeria/`; se puede borrar desde la sección de medios.)
5. **Cambiar el orden:** usa el número *Orden* (1 sale primero) o mueve el elemento dentro de la lista. Si hay empates o el campo está vacío, se respeta el orden de la lista.
6. **Tamaño:** campo opcional (`normal`, `alto`, `ancho`, `grande`) que define cuánto espacio ocupa la foto en la cuadrícula.
7. Pulsa **Guardar**: el CMS crea un commit en `main`.

### Peso recomendado por imagen
- **Máximo 300 KB** por foto (idealmente 150–250 KB).
- Ancho de **1200–1600 px**, formato **JPG** (o WebP). Sin fotos directas del celular a máxima resolución.
- Comprímelas antes de subirlas, por ejemplo en <https://squoosh.app>.

### Cómo ver los cambios
GitHub Pages tarda **1–3 minutos** en publicar después de guardar. Recarga con `Ctrl+F5` (o `Cmd+Shift+R`) para evitar ver la versión en caché.

## Estructura
- `data/galeria.json`: lista de fotos (imagen, alt, orden, formato, posicion).
- `images/galeria/`: carpeta de subida del CMS.
- `.pages.yml`: configuración de Pages CMS.
- `js/main.js` lee `data/galeria.json` y pinta la galería. Si el archivo no carga, se muestra la galería escrita en `index.html` (respaldo).

## Probar en local
`fetch` no funciona abriendo el HTML con doble clic (`file://`), así que usa un servidor local:

```
python -m http.server 8000
```
y abre <http://localhost:8000>. Para simular GitHub Pages bajo subcarpeta, sirve el directorio padre y abre `/GastronomySolution/`.
