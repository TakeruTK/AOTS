
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
    *   Navegación persistente y adaptable.
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

*   **`ProductDetails.jsx`:**
    *   Muestra la vista detallada de un solo producto.
    *   Galería de imágenes con una imagen principal y miniaturas seleccionables.
    *   Menús desplegables para seleccionar opciones del producto (material, talla, acabado).
    *   Botón "Añadir al Carrito" con estado de carga visual.

*   **`Cart.jsx`:**
    *   Página del carrito de la compra gestionada con `zustand`.
    *   Muestra los artículos, sus detalles y el precio total.
    *   Permite eliminar artículos individualmente con una animación de "fade-out".
    *   Funcionalidad para vaciar todo el carrito.
    *   Botones estilizados para "Proceder al Pago" y "Vaciar Carrito".

*   **`Portfolio.jsx`:**
    *   Galería de imágenes en formato "masonry" (albañilería).
    *   Diseño adaptable: 1 columna en móviles, 2 en tabletas y 3 en escritorio.
    *   Efecto de "hover" mejorado: la barra de título se desliza suavemente desde abajo y la imagen se acerca.

*   **`Shop.jsx`:**
    *   Página que actúa como un portal a diferentes categorías de la tienda.
    *   Las secciones interactivas tienen un efecto de "hover" pronunciado con elevación y un resplandor dorado.
    *   Las secciones deshabilitadas están visualmente atenuadas para indicar que no están disponibles.

*   **`Jewelry.jsx`:**
    *   Página de categoría para la joyería.
    *   Utiliza el componente `ProductCard` para mostrar los productos en una cuadrícula adaptable.
    *   Presenta un título temático con la fuente `Nosifer` (`.sinister-title`).

*   **`About.jsx`:**
    *   Página "Sobre Nosotros" con un diseño elevado.
    *   Fondo con efecto de parallax para crear una sensación de profundidad.
    *   El texto se muestra en una caja con fondo semi-transparente y desenfocado, dándole un aspecto "flotante".
    *   Imagen y texto estilizados para integrarse con el tema general.

## 3. Plan de Ejecución (Completado)

El objetivo de esta sesión fue realizar una revisión y mejora integral de toda la aplicación. El plan seguido fue:

1.  **Inicio y `ProductCard`:** Analizar la estructura inicial y mejorar el efecto de "hover" de las tarjetas de producto en `App.css` para que fuera más pronunciado y coherente con la paleta de colores.
2.  **`ProductDetails`:** Reemplazar la imagen estática por una galería de imágenes interactiva y refinar los menús de selección y el botón de añadir al carrito.
3.  **`Cart`:** Mejorar la UX añadiendo una animación de transición suave al eliminar un artículo del carrito.
4.  **`Portfolio`:** Hacer que la galería de imágenes fuera completamente adaptable y mejorar la animación de "hover" para que fuera más dinámica.
5.  **`Shop`:** Aumentar la interactividad de las secciones, mejorando los efectos visuales para guiar al usuario.
6.  **`Jewelry`:** Estandarizar la página moviendo los estilos a `App.css` y utilizando componentes de Material-UI para mantener la consistencia.
7.  **`About`:** Transformar la página estática en una experiencia más dinámica y visualmente atractiva mediante un efecto de parallax y un diseño de texto mejorado.
8.  **Documentación:** Crear este archivo `blueprint.md` para servir como una referencia completa del estado actual del proyecto, su diseño y sus características.
