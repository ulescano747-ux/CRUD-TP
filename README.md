# API de la Cafetería del CRUI

## Instalación

Tener Node.js instalado. Desde la carpeta del proyecto, ejecutar:

```bash
npm install
```

## Ejecutar el servidor

```bash
npm start
```

El servidor queda disponible en `http://localhost:3000`.

## Rutas

| Método | Ruta | Acción |
|---|---|---|
| GET | `/` | Mensaje de bienvenida |
| GET | `/api/productos` | Listar productos |
| GET | `/api/productos/:id` | Consultar un producto |
| POST | `/api/productos` | Crear un producto |
| PUT | `/api/productos/:id` | Modificar un producto |
| DELETE | `/api/productos/:id` | Eliminar un producto |

Para crear o modificar, enviar un cuerpo JSON con `nombre` y `precio`. El nombre no puede estar vacío y el precio debe ser un número mayor que cero. La categoría es opcional.

Ejemplo:

```json
{
  "nombre": "Jugo de naranja",
  "precio": 2000,
  "categoria": "bebida"
}
```

Los productos se guardan en un array mientras el servidor está encendido. Al reiniciarlo, vuelve la lista inicial.

Las capturas de pruebas están en la carpeta `capturas`.
