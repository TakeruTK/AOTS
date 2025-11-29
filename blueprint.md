# Blueprint: Ashes of the Souls

## Descripción

"Ashes of the Souls" es una tienda online de joyería artesanal con una estética oscura y gótica. La aplicación permite a los usuarios explorar los productos, personalizar sus joyas y, en el futuro, realizar compras.

## Estructura y Diseño

*   **Estilo Visual:** Arte oscuro, elegante y minimalista. Fondo negro (#000000) con amplios espacios. Acentos en dorado quemado (#B8860B).
*   **Tipografías:**
    *   **Títulos:** 'Cinzel Light' (o 'Cormorant SC'), en mayúsculas, con espaciado de letra amplio. Color blanco.
    *   **Subtítulos:** 'Playfair Display Italic' (o 'Cormorant Italic'). Color gris claro.
    *   **Cuerpo:** 'Montserrat Light' (o 'Lato Light'). Color gris.
*   **Diseño:** Minimalista, sobrio y artístico, con un enfoque en la coherencia visual y una estética "Dark Souls".

## Características Implementadas

*   **Navegación:**
    *   Barra de navegación con enlaces a las páginas "Home" y "Portfolio".
    *   Enrutamiento implementado con `react-router-dom`.
    *   Icono de carrito en la barra de navegación que muestra el número de artículos en el carrito.
*   **Página de Inicio (Home):**
    *   Banner principal (Hero Banner) con una imagen de fondo y el eslogan de la marca.
    *   Galería de productos con imágenes, nombres y precios base.
    *   Tarjetas de producto con un botón "Ver Detalles" que redirige a la página de detalle del producto.
*   **Página de Portafolio (Portfolio):**
    *   Galería de imágenes de trabajos anteriores en un diseño de albañilería (masonry).
*   **Página de Detalle del Producto:**
    *   Muestra la imagen, nombre y descripción del producto.
    *   **Personalización:**
        *   Selección de material (bronce, plata, oro) con modificadores de precio.
        *   Selección de talla.
*   **Tienda (Shop):**
    *   Página que agrupa las diferentes categorías de productos.
    *   Sección de "Joyería Siniestra" que enlaza a la página de joyería.
    *   Secciones "Próximamente" para Ropa y Artefactos.
*   **Carrito de Compras (Cart):**
    *   Muestra los productos agregados al carrito.
    *   Permite ajustar la cantidad de cada producto.
    *   Calcula y muestra el precio total.
    *   Funcionalidad para eliminar productos del carrito.
*   **Estado Global:**
    *   Gestión del estado del carrito mediante `zustand`.

