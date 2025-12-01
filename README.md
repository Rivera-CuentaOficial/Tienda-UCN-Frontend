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

5. En el archivo `.env.local`, reemplaza `your-api-url-here` en la variable `NEXT_PUBLIC_API_URL` por la URL base de tu API. Asegúrate de encerrar la URL entre comillas dobles (" ") para evitar errores al leer las variables de entorno.

```bash
# En tu archivo .env.local (Paso 5 del README) reemplaza la variable de la API con:
NEXT_PUBLIC_API_URL="http://localhost:5000"
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

Para probar la funcionalidad completa del sitio, accede a la API( - <a href="https://github.com/Rivera-CuentaOficial/Tienda-UCN">) y sigue las instrucciones en el archivo README de ese repositorio para ejecutarla.

## Autor

- <a href="https://github.com/Rivera-CuentaOficial">Sebastián Rivera González</a>
- <a href="https://github.com/Bayron-Cruz">Bayron Cruz Ramos</a>
