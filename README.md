# Tienda UCN Frontend

Este proyecto consiste en la implementación simplificada del frontend de la plataforma de comercio electrónico "Tienda UCN" usando Next.js. Esto incluye la creación de vistas, la gestión de sesiones de usuario y del carrito de compras, así como las interacciones básicas necesarias para una tienda en línea.

El sitio web se creó con un enfoque mobile-first, por lo que es responsive a diferentes tamaños de pantalla y mantiene una experiencia de usuario agradable y fluida.

Además, el sistema está diseñado para usarse en conjunto con una API REST creada con ASP .NET Core, la cual permite la gestión de datos de usuarios y productos.

## Instalación

Se requieren las siguientes tecnologías para ejecutar el proyecto

- [Visual Studio Code 1.89.1+](https://code.visualstudio.com/)
- [Node 22+](https://nodejs.org/es/download)
- [Git 2.45.1+](https://git-scm.com/downloads)

Una vez que todo esté instalado, ejecuta el proyecto siguiendo los pasos en la siguiente sección.

## Inicio rápido

1. Clona el repositorio en tu computadora desde la terminal.

   ```bash
   git clone https://github.com/2kSebaNG/tienda-ucn-frontend.git
   ```

2. Ve a la carpeta del proyecto.

   ```bash
   cd tienda-ucn-frontend
   ```

3. Abre el proyecto con Visual Studio Code.

   ```bash
   code .
   ```

4. Copia el contenido de `.env.example` al archivo `.env.local`.

   ```bash
   cp .env.example .env.local
   ```

5. En el archivo `.env.local`, reemplaza `your-api-url-here` en la variable `NEXT_PUBLIC_API_URL` por la URL base de tu API. 
Para encontrar la URL, dentro del repositorio del backend enceuntra el archivo
*launchSettings* en la carpeta *Properties*. Tu URL estara en:

```json
"profiles": {
    "http": {
      ,,,
      "applicationUrl": "http://tu-url",
      ,,,
      }
    }
```
   Asegúrate de encerrar la URL entre comillas dobles (" ") para evitar errores al leer las variables de entorno.

```bash
# En tu archivo .env.local (Paso 5 del README) reemplaza la variable de la API con:
NEXT_PUBLIC_API_URL="http://tu-url"
```
6. Crea tu Clave de NextAuth usando el comando:

   ```bash
   npx auth secret
   ```

   Este comando detectará que ya tienes una variable para el secreto de autenticación (en este caso, la variable es `NEXTAUTH_SECRET`) en tu archivo `.env.local`, por lo que deberías responder `y` si te pregunta si deseas sobrescribirla.

   Si el secreto no se escribió directamente en tu `.env.local`, revisa la consola: el valor de la Clave se mostrará ahí; cópialo y reemplaza `your-auth-secret-here` en la variable `NEXTAUTH_SECRET`. Quedaría, por ejemplo:

   ```bash
   NEXTAUTH_SECRET=your-auth-secret-here
   ```

7. Restaura las dependencias en un terminal de Visual Studio Code.

   ```bash
   npm i
   ```

8. Ejecuta el proyecto en modo desarrollo usando el mismo terminal.

   ```bash
   npm run dev
   ```

   Después de seguir estos pasos, verás que el proyecto se está ejecutando en `http://localhost:3000`. Para ver el sitio, mantén presionada la tecla `ctrl` y haz clic en la dirección o ábrela en tu navegador.

   ## Repositorio del backend

   Para probar la funcionalidad completa del sitio, accede a la API( - <a href="https://github.com/Rivera-CuentaOficial/Tienda-UCN"> API </a>) y sigue las instrucciones en el archivo README de ese repositorio para ejecutarla.

# Configuración y Pruebas del Endpoint de Registro y Verificación de Email

## Configuración de Endpoints

El frontend ya está preparado para consumir los endpoints de registro y verificación de email del backend. Solo asegúrate de que la variable `NEXT_PUBLIC_API_URL` en tu `.env.local` apunte correctamente a la URL base de tu API.

- **Registro:**  
  El formulario de registro está en `/auth/register`  
  Endpoint esperado: `POST /api/auth/register`

- **Verificación de email:**  
  La verificación se realiza en `/auth/verify-email?email=...&code=...`  
  Endpoint esperado: `POST /api/auth/verify-email`

## Flujo de Registro y Verificación

### a) Registro de Usuario

1. Ve a `/auth/register` y completa el formulario.
2. Al enviar, si el registro es exitoso, recibirás un mensaje indicando que se envió un correo de verificación.
3. El backend enviará un email con un enlace de verificación (contiene los parámetros `email` y `code`).

### b) Verificación de Email

1. Haz clic en el enlace recibido en tu correo, que te llevará a `/auth/verify-email?email=...&code=...`.
2. El frontend enviará automáticamente la solicitud de verificación al backend.
3. Si el código es válido y no ha expirado, verás un mensaje de éxito y podrás iniciar sesión.

### c) Casos de Código Inválido o Expirado

- Si el código es incorrecto o ya expiró, verás un mensaje de error indicando el motivo.
- Se mostrará un botón para **reenviar el correo de verificación**.

### d) Reenvío de Código de Verificación

1. Haz clic en el botón "Reenviar correo de verificación".
2. El sistema enviará nuevamente el email con un nuevo código.
3. Repite el proceso de verificación con el nuevo enlace recibido.

## Pruebas del Flujo

- **Registro exitoso:**  
  Completa el registro y verifica el email con el enlace recibido.

- **Código inválido:**  
  Modifica el parámetro `code` en la URL manualmente y verifica que se muestre el error correspondiente.

- **Código expirado:**  
  Espera a que expire el código (según configuración del backend) y luego intenta verificar; debe aparecer el mensaje de expiración.

- **Reenvío:**  
  Usa el botón de reenvío tras un error y verifica que recibes un nuevo correo y que el nuevo código funciona.

## Archivos Relacionados

- Vista de registro: `src/views/app/auth/register/`
- Vista de verificación: `src/views/app/auth/verify-email/`
- Hooks de autenticación: `src/hooks/api/use-auth-service.ts`
- Servicios: `src/services/auth-service.ts`

---

# Configuración de Búsqueda/Filtros/Paginación y Estados Vacíos/Errores

## 1. Levantar y Probar Búsqueda, Filtros y Paginación

### Probar Búsqueda, Filtros y Paginación

- Ve a la página de productos: `/products`
- **Búsqueda:** Usa el campo de búsqueda para filtrar productos por nombre o descripción.
- **Filtros:** Aplica filtros por categoría, precio, disponibilidad, etc.
- **Paginación:** Navega entre páginas usando los controles de paginación en la parte inferior de la lista.

Cada acción actualizará la URL y los resultados usando React Query y la API.

---

## 2. Estados Vacíos y de Error

- **Estado vacío:**  
  Si no hay productos que coincidan con la búsqueda o filtros, se muestra un mensaje amigable indicando que no se encontraron resultados.

- **Estado de error:**  
  Si ocurre un error al consultar la API (por ejemplo, error de red o del servidor), se muestra un mensaje de error y, si es posible, un botón para reintentar la operación.

- **Manejo centralizado:**  
  Todos los errores de API se procesan con el helper `handleApiError` para mostrar mensajes claros y consistentes.

---

## Archivos Relacionados

- Lógica de productos:  
  - Hooks: `src/hooks/api/use-product-service.ts`
  - Servicios: `src/services/product-service.ts`
  - Vistas: `src/views/app/products/`
- Manejo de errores: `src/lib/api.ts`

---

# Pruebas de Descuento, Stock y Carrito en Tienda UCN

## 1. Probar Descuentos en Productos

1. **Ingresa como administrador** y navega a `/admin/products`.
2. Selecciona un producto para ver su detalle (`/admin/products/[id]`).
3. Usa la opción **"Aplicar descuento"**:
   - Ingresa un porcentaje de descuento y confirma.
   - El precio con descuento se mostrará actualizado en la vista de detalle.
4. Cambia el descuento o ponlo en 0 para quitarlo.
5. **Verifica como cliente** en `/products/[id]` que el precio con descuento se muestre correctamente.

---

## 2. Probar Stock y Disponibilidad

1. Como administrador, en el detalle del producto:
   - Usa la opción para **activar/desactivar disponibilidad**.
   - Si el producto está inactivo, no aparecerá en la tienda para clientes.
2. Modifica el stock (si está implementado en el formulario de edición).
3. Como cliente, intenta agregar al carrito un producto sin stock o inactivo:
   - El botón de agregar estará deshabilitado o mostrará un mensaje de error.

---

## 3. Agregar y Actualizar Productos en el Carrito

1. **Como cliente**, ve a `/products` y selecciona un producto.
2. Haz clic en **"Agregar al carrito"**.
   - El producto aparecerá en el dropdown del carrito (ícono en la navbar) y en `/cart`.
3. Para **actualizar la cantidad**:
   - Usa los controles de suma/resta en el carrito o en la página de detalle.
   - Si la cantidad supera el stock, no te dejara agregar mas.
4. Para **eliminar** un producto del carrito:
   - Usa el botón de eliminar en el carrito.
5. El estado del carrito se mantiene aunque recargues la página (persistencia local).

---

## Archivos Relacionados

- Lógica de descuentos y stock:  
  - Admin: `src/views/app/admin/products/[id]/`
  - Servicios: `src/services/product-service.ts`
- Carrito:  
  - Store: `src/stores/cart-store.ts`
  - Hooks: `src/hooks/api/use-cart-service.ts`
  - Vistas: `src/views/app/cart/`, `src/components/layout/cart-dropdown.tsx`

---

# Documentación del Flujo de Compra y Endpoints Requeridos

## 1. Flujo de Compra para el Usuario

1. **Navega por los productos**  
   - Página: `/products`
   - Filtra, busca y selecciona productos para ver su detalle.

2. **Agrega productos al carrito**  
   - Desde la página de detalle (`/products/[id]`) o el listado, haz clic en "Agregar al carrito".
   - El carrito se puede revisar en cualquier momento desde el ícono en la barra de navegación o en `/cart`.

3. **Gestiona el carrito**  
   - Modifica cantidades, elimina productos o vacía el carrito en `/cart`.
   - El sistema valida stock y disponibilidad antes de permitir avanzar.

4. **Inicia el proceso de compra**  
   - Haz clic en "Proceder al checkout" en el carrito para ir a `/checkout`.
   - Completa los datos requeridos (si aplica).

5. **Confirma la compra**  
   - Revisa el resumen y confirma la orden.
   - Si la compra es exitosa, se muestra un mensaje de éxito y el código de la orden.

6. **Revisa tus órdenes**  
   - Accede a `/orders` para ver el historial de compras.
   - Haz clic en una orden para ver su detalle en `/orders/order/[code]`.

---

## 2. Endpoints Requeridos (Frontend → Backend)

- **Obtener productos:**  
  `GET /products`  
  (con soporte para búsqueda, filtros y paginación)

- **Detalle de producto:**  
  `GET /products/{id}`

- **Agregar/actualizar/eliminar en carrito:**  
  `POST /cart/add`  
  `PUT /cart/update`  
  `DELETE /cart/remove/{productId}`

- **Crear orden (checkout):**  
  `POST /orders`

- **Listar órdenes del usuario:**  
  `GET /orders`

- **Detalle de orden:**  
  `GET /orders/{code}`

---

## Archivos Relacionados

- Carrito: `src/views/app/cart/`, `src/stores/cart-store.ts`
- Checkout: `src/views/app/checkout/`
- Órdenes: `src/views/app/orders/`
- Hooks de API: `src/hooks/api/use-cart-service.ts`, `src/hooks/api/use-order-service.ts`
- Servicios: `src/services/cart-service.ts`, `src/services/order-service.ts`

---

# Documentación del Flujo de Administración - Tienda UCN Frontend

## ¿Qué puede hacer un administrador?

El flujo de administración permite a los usuarios con rol **Admin** gestionar los productos de la tienda desde el frontend. Las principales funcionalidades incluyen:

- **Visualizar listado de productos** (ruta: `/admin/products`)
- **Ver detalle de producto** (ruta: `/admin/products/[id]`)
- **Crear nuevos productos** (ruta: `/admin/new-product`)
- **Editar información de productos**
- **Aplicar o modificar descuentos**
- **Cambiar disponibilidad (activar/desactivar)**
- **Eliminar productos** (soft delete)

## Acceso

Solo los usuarios autenticados con rol `Admin` pueden acceder a las rutas de administración. El acceso está protegido tanto en frontend (middleware) como en backend.

## Navegación

- Desde el menú principal, accede a la sección **Administración**.
- El listado de productos muestra todos los productos, incluyendo los eliminados (marcados como "Eliminado").
- Al seleccionar un producto, se accede a su vista de detalle, donde se pueden realizar acciones administrativas.

## Acciones en el detalle de producto

- **Editar:** Redirige al formulario de edición.
- **Aplicar descuento:** Permite ingresar un porcentaje de descuento y aplicarlo.
- **Cambiar disponibilidad:** Activa o desactiva la visibilidad del producto en la tienda.
- **Eliminar:** Marca el producto como eliminado (no se borra físicamente).

## Consideraciones

- Los productos eliminados muestran un banner de advertencia y no permiten acciones administrativas adicionales.
- Todas las acciones administrativas muestran feedback inmediato (loading, error, éxito).
- No es posible acceder a rutas de compra, carrito u órdenes con una sesión de administrador.

## Archivos clave

- Vistas: `src/views/app/admin/products/`, `src/views/app/admin/new-product/`
- Hooks: `src/views/app/admin/products/[id]/hooks/`
- Servicios: `src/services/product-service.ts`
- Middleware: `src/middleware.ts`

---

## Autores

- <a href="https://github.com/Rivera-CuentaOficial">Sebastián Rivera González</a>
- <a href="https://github.com/Bayron-Cruz">Bayron Cruz Ramos</a>
