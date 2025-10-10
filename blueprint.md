# Blueprint: Ashes of the Souls

## Descripción

"Ashes of the Souls" es una tienda online de joyería artesanal con una estética oscura y gótica. La aplicación permite a los usuarios explorar los productos, personalizar sus joyas y, en el futuro, realizar compras.

## Estructura y Diseño

*   **Tema:** Oscuro, con una paleta de colores en tonos plateados, dorados y negros.
*   **Tipografía:** Serif, para un aspecto elegante y clásico.
*   **Diseño:** Moderno y limpio, con un enfoque en la calidad visual de los productos.
*   **Componentes:** Uso de la librería Material-UI para una interfaz de usuario consistente y atractiva.

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
        *   Selección de acabado (pulido, mate, envejecido) con modificadores de precio.
    *   **Precio dinámico:** El precio total se actualiza en tiempo real según las opciones de personalización seleccionadas.
    *   Botón "Añadir al carrito" que agrega el producto personalizado al carrito.
*   **Carrito de Compras:**
    *   Gestión del estado del carrito con `zustand`.
    *   Página del carrito que muestra los artículos añadidos, con su imagen, nombre, personalizaciones y precio.
    *   Cálculo del precio total de la compra.
    *   Funcionalidad para eliminar artículos individuales del carrito.
    *   Funcionalidad para vaciar todo el carrito.
    *   Botón "Proceder al Pago" (actualmente sin funcionalidad).

## Próximos Pasos

*   **Proceso de Pago:**
    *   Integrar una pasarela de pago (como Stripe o PayPal).
*   **Autenticación de Usuarios:**
    *   Permitir a los usuarios crear cuentas y guardar su información.
*   **Base de Datos:**
    *   Migrar los datos de los productos a una base de datos (como Firebase Firestore) para una gestión más sencilla.
