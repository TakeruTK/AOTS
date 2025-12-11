
# Blueprint: Ashes of the Souls E-Commerce

## 1. Visión General

Esta aplicación es una sofisticada plataforma de comercio electrónico para "Ashes of the Souls", una marca ficticia especializada en joyería gótica y arcana. El objetivo es proporcionar una experiencia de usuario visualmente inmersiva e interactiva que guíe a los usuarios desde la exploración de productos hasta un flujo de pago completo y funcional, todo ello envuelto en una estética oscura y elegante.

## 2. Esquema del Proyecto

### Tecnologías y Librerías
*   **Framework:** React (con Vite)
*   **UI:** Material-UI
*   **Enrutamiento:** React Router Dom
*   **Gestión de Estado:** Zustand (para el carrito de la compra)
*   **Backend y Pasarela de Pago:** Express.js, Stripe, dotenv, cors
*   **Librerías de Stripe:** @stripe/stripe-js, @stripe/react-stripe-js
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

### Características y Componentes Clave

*   **`Header.jsx`:**
    *   Navegación persistente y adaptable.
    *   Icono del carrito que muestra el número de ítems y enlaza a la página del carrito.

*   **`ProductCard.jsx`:**
    *   Componente reutilizable para mostrar productos con un efecto de "hover" avanzado.
    *   Incluye un botón "Añadir al carrito" que se integra sin alterar el diseño original de la tarjeta.

*   **`ProductDetail.jsx`:**
    *   Vista detallada del producto con galería de imágenes y opciones seleccionables.
    *   Funcionalidad para añadir productos al carrito.

*   **Páginas de Flujo de Compra:**
    *   **`/cart` (`Cart.jsx`):** Página del carrito de compras donde los usuarios pueden ver, modificar la cantidad y eliminar productos. Muestra el total y permite continuar al checkout.
    *   **`/checkout` (`Checkout.jsx`):** Redirige al usuario a la pasarela de pago de Stripe para completar la transacción de forma segura.
    *   **`/payment-success` (`PaymentSuccess.jsx`):** Página de agradecimiento que se muestra tras una compra exitosa, limpiando el carrito.
    *   **`/payment-failed` (`PaymentFailed.jsx`):** Página que informa al usuario si el pago fue cancelado o falló.

*   **Gestión de Estado del Carrito (`cartStore.js`):**
    *   Manejo centralizado del estado del carrito con Zustand.
    *   Funciones: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`.
    *   Estado: `items`, `totalItems`, `totalPrice`.

*   **Backend (`server.js`):**
    *   Servidor Express.js que gestiona la comunicación con la API de Stripe.
    *   Endpoint `/create-checkout-session` para iniciar una nueva transacción.
    *   Endpoint `/webhook` para recibir y procesar eventos de Stripe (ej. `checkout.session.completed`).

## 3. Plan de Ejecución: Implementación del Flujo de Compra

El objetivo es construir una funcionalidad de comercio electrónico completa, desde la selección de productos hasta un pago real, utilizando Stripe como pasarela de pago.

### Fase 1: Estructura del Carrito
1.  **Configurar Zustand:** Crear el store `cartStore.js` para gestionar el estado del carrito de la compra.
2.  **Ampliar `cartStore`:** Implementar la lógica de `addToCart`, `updateQuantity`, `removeFromCart` y el cálculo de subtotales y total.
3.  **Integrar Botón en `ProductCard`:** Añadir un botón "Añadir al carrito" en las tarjetas de producto.
4.  **Actualizar `Header`:** Añadir un icono de carrito que muestre la cantidad de productos y enlace a la página `/cart`.

### Fase 2: Páginas de Compra
1.  **Crear Nuevas Rutas:** Añadir las rutas `/checkout`, `/payment-success`, y `/payment-failed` en `App.jsx`.
2.  **Construir `Cart.jsx`:** Desarrollar la página del carrito para que sea funcional, permitiendo la edición de cantidades, la eliminación de productos, la visualización del total y la navegación hacia el checkout.
3.  **Crear Páginas de Resultado:** Implementar las páginas `PaymentSuccess.jsx` y `PaymentFailed.jsx`.

### Fase 3: Lógica de la Pasarela de Pago con Stripe
1.  **Configurar el Servidor Express:** Instalar dependencias (`express`, `stripe`, `dotenv`, `cors`) y crear `server.js` para manejar los endpoints `/create-checkout-session` y `/webhook`.
2.  **Integrar Firebase MCP:** Configurar `.idx/mcp.json` para ejecutar el servidor Express junto a la aplicación de React.
3.  **Construir `Checkout.jsx`:** Implementar la lógica para llamar al servidor local, crear una sesión de Stripe, y redirigir al usuario a la página de pago de Stripe.
4.  **Desarrollar Páginas de Resultado:** Crear las páginas `PaymentSuccess.jsx` (que limpia el carrito) y `PaymentFailed.jsx` basadas en la redirección de Stripe.

### Fase 4: Estilo y Buenas Prácticas
1.  **Componentes Reutilizables:** Crear componentes limpios y reutilizables.
2.  **Comentarios para Desarrolladores:** Dejar comentarios claros en el código en todos los puntos de integración.
3.  **Consistencia Visual:** Asegurar que todas las nuevas páginas y componentes sigan la guía de estilo del proyecto.
