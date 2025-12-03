
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

*   **Internacionalización (i18n):**
    *   **Soporte Bilingüe:** La aplicación ofrece soporte completo para español (ES) e inglés (EN).
    *   **Gestión de Idioma:** Se utiliza `i18next` y `react-i18next` para gestionar las traducciones.
    *   **Archivos de Traducción:** Los textos se almacenan en archivos JSON (`src/locales/en/translation.json` y `src/locales/es/translation.json`).
    *   **Selector de Idioma:** Un componente `LanguageSwitcher.jsx` permite a los usuarios cambiar de idioma.
    *   **Persistencia:** El idioma seleccionado se guarda en `localStorage` para mantener la preferencia del usuario en futuras visitas.

## 3. Plan de Ejecución (Internacionalización)

El objetivo de esta sesión es agregar soporte bilingüe (ES/EN) a la aplicación.

1.  **Instalar dependencias:** `npm install i18next react-i18next i18next-browser-languagedetector`
2.  **Configurar i18next:** Crear `src/i18n.js` para configurar `i18next` con los recursos de traducción y la detección del idioma.
3.  **Crear archivos de traducción:** Crear `src/locales/en/translation.json` y `src/locales/es/translation.json`.
4.  **Integrar i18next en la app:** Envolver el componente principal `App` con `I18nextProvider` en `src/main.jsx`.
5.  **Crear el componente `LanguageSwitcher`:** Desarrollar un componente de React para que el usuario pueda seleccionar el idioma.
6.  **Extraer textos:** Reemplazar los textos hardcodeados en los componentes JSX con la función `t()` de `react-i18next`.
7.  **Traducir contenido:** Poblar los archivos `translation.json` con las traducciones correspondientes.
8.  **Añadir el `LanguageSwitcher` al `Header`:** Integrar el componente de cambio de idioma en la cabecera de la aplicación.
