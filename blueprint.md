
# Blueprint: Ashes of the Souls E-Commerce

## 1. Visión General

Esta aplicación es una sofisticada plataforma de comercio electrónico para "Ashes of the Souls", una marca ficticia especializada en joyería gótica y arcana. El objetivo es proporcionar una experiencia de usuario visualmente inmersiva e interactiva que guíe a los usuarios desde la exploración de productos hasta la compra, todo ello envuelto en una estética oscura y elegante.

## 2. Esquema del Proyecto

### Tecnologías y Librerías
*   **Framework:** React (con Vite)
*   **UI:** Material-UI
*   **Enrutamiento:** React Router Dom
*   **Gestión de Estado:** Zustand (para el carrito de la compra)
*   **Estilos:** CSS centralizado en `src/App.css`
*   **Internacionalización:** i18next y react-i18next

### Guía de Estilo y Diseño
*   **Tema:** Oscuro y gótico.
*   **Paleta de Colores:**
    *   Fondo Principal: `#121212`
    *   Fondo de Tarjetas/Componentes: `#1e1e1e`
    *   Texto Principal: `#f5f5f5`
    *   Acento Dorado: `#B8860B`
    *   Acento Rojo Siniestro: `#e53935`
*   **Tipografía:**
    *   General: `Roboto`
    *   Títulos Principales: `Cinzel Light`, `Cormorant SC`
    *   Descripciones: `Montserrat Light`, `Lato Light`
    *   Título "Siniestro": `Nosifer`
*   **Interacción:** Los elementos interactivos presentan animaciones suaves, incluyendo efectos de "elevación" (`transform`), resplandores (`box-shadow`), y transiciones de color y opacidad.
*   **Diseño Adaptable:** La aplicación está diseñada para ser totalmente funcional y estéticamente agradable en dispositivos móviles, tabletas y ordenadores de sobremesa.

### Características y Componentes Clave

*   **Enrutamiento (`App.jsx`):**
    *   Configuración central de las rutas con `react-router-dom`.
    *   Rutas definidas: `/`, `/product/:id`, `/cart`, `/portfolio`, `/shop`, `/jewelry`, `/about`.

*   **`Header.jsx`:**
    *   Navegación persistente y adaptable con posición fija.
    *   Fondo semi-transparente con efecto de desenfoque (`backdrop-filter`).
    *   Enlaces de navegación a las páginas principales.
    *   Icono del carrito que muestra el número de artículos y enlaza a la página del carrito.

*   **Página de Inicio (Integrada en `App.jsx`):**
    *   Presenta una cuadrícula de productos destacados.
    *   Carga los datos de los productos y gestiona la navegación a las páginas de detalles.

*   **`ProductCard.jsx`:**
    *   Componente reutilizable para mostrar productos.
    *   Efecto de "hover" avanzado: la tarjeta se eleva, proyecta una sombra dorada, y la imagen interior se acerca y cambia de filtro.
    *   Al hacer clic, redirige a la página de detalles del producto.

*   **`ProductDetail.jsx`:**
    *   Muestra la vista detallada de un solo producto.
    *   Galería de imágenes con navegación y vista ampliada en un modal.
    *   Menús desplegables para seleccionar opciones (material, talla, acabado) con un ancho fijo para evitar saltos en el diseño.
    *   Botón "Añadir al Carrito" con estado de carga visual.

*   **`Cart.jsx`:**
    *   Página del carrito de la compra gestionada con `zustand`.
    *   Espaciado superior para evitar solapamiento con la barra de navegación.
    *   Muestra los artículos, sus detalles y el precio total.
    *   Permite eliminar artículos individualmente con una animación de "fade-out".
    *   Funcionalidad para vaciar todo el carrito.

*   **`Portfolio.jsx`:**
    *   Galería de imágenes en formato `standard` para un orden visual consistente.
    *   Navegación en lightbox que sigue el orden de la galería.
    *   Diseño adaptable: 1 columna en móviles, 2 en tabletas y 3 en escritorio.

*   **`Shop.jsx`:**
    *   Página que actúa como un portal a diferentes categorías de la tienda.
    *   Las secciones interactivas tienen un efecto de "hover" pronunciado con elevación y un resplandor dorado.

*   **`Jewelry.jsx`:**
    *   Página de categoría para la joyería.
    *   Utiliza el componente `ProductCard` para mostrar los productos en una cuadrícula adaptable.

*   **`About.jsx`:**
    *   Página "Sobre Nosotros" con un diseño elevado.
    *   Fondo con efecto de parallax para crear una sensación de profundidad.
    *   El texto se muestra en una caja con fondo semi-transparente y desenfocado.

*   **Internacionalización (i18n):**
    *   Soporte bilingüe (ES/EN) con `i18next`.
    *   Selector de idioma persistente en el `Header`.

## 3. Plan de Ejecución (Últimos Cambios)

El objetivo de esta sesión ha sido refinar la experiencia de usuario y corregir inconsistencias visuales en varias partes de la aplicación.

1.  **Corregir Orden de Galería en Portafolio:**
    *   **Problema:** La galería `masonry` desordenaba las imágenes, causando una navegación inconsistente en el lightbox.
    *   **Solución:** Se cambió el `variant` de `ImageList` a `standard` y se simplificó la lógica para asegurar un orden secuencial y predecible.

2.  **Solucionar Superposición de la Barra de Navegación:**
    *   **Problema:** En la página del carrito, el título quedaba oculto por la barra de navegación fija.
    *   **Solución:** Se añadió un `padding-top` (`pt`) al contenedor principal en `Cart.jsx` para desplazar el contenido hacia abajo.

3.  **Estabilizar Diseño en Detalles del Producto:**
    *   **Problema:** Los menús desplegables en `ProductDetail.jsx` cambiaban de tamaño según el texto de la opción seleccionada, afectando la alineación.
    *   **Solución:** Se envolvieron los `FormControl` en un `Box` con `maxWidth` para mantener un ancho uniforme y consistente.
