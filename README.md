# Agenda Personal - JavaScript Backend

Una aplicación web de una sola página (SPA) para la administración de eventos personales. Este proyecto permite visualizar, crear, editar y eliminar eventos, los cuales se almacenan de forma dinámica y estructurada directamente en el sistema de archivos del servidor.

## ¿Para qué sirve?
La aplicación funciona como un gestor de tiempo personal. Desde una interfaz única, el usuario puede:
* Visualizar los días del mes en un calendario interactivo para saber qué fechas tienen eventos programados.
* Registrar nuevos eventos asignándoles una fecha, una hora y una descripción.
* Modificar o eliminar eventos existentes.
* Llevar un control estadístico rápido del total de eventos y las fechas únicas registradas.

Realizado procesamiento dinámico de datos mediante una API RESTful básica.

* **Backend (Lógica y Servidor):** Construido con **Node.js** y el framework **Express**. En lugar de utilizar una base de datos tradicional, aprovecha el módulo `fs` (File System) de Node para crear, leer, actualizar y eliminar archivos.
* **Almacenamiento de Datos:** Los eventos se guardan como archivos de texto (Markdown - `.md`). El sistema crea automáticamente un sistema de carpetas basado en la fecha y la hora del evento (ej. `priv/2026.05.10/11.00.md`).
* **Frontend (Interfaz):** Desarrollado con **HTML5**, **CSS3** (diseño responsivo con CSS Grid y Flexbox) y **JavaScript puro (Vanilla JS)** para la manipulación del DOM y las peticiones asíncronas (`fetch`) al servidor.

## Estructura Principal
```text
/
├── index.html          # Interfaz principal de la aplicación
├── index.js            # Servidor backend (Node.js + Express)
├── priv/               # Directorio autogenerado donde se guardan los eventos (.md)
└── pub/                # Archivos estáticos públicos
    ├── css/style.css   # Estilos de la página
    ├── img/            # Iconos e imágenes de la interfaz
    └── agenda.js       # Lógica del frontend (eventos, renderizado, peticiones)
---------------------------------
COMO CORRERLO:

1. Clonar o descargar el repositorio:
Abre tu terminal y ubícate en la carpeta del proyecto.

2. Instalar las dependencias:
El proyecto requiere Express para levantar el servidor. Ejecuta el siguiente comando para instalarlo:

npm install express

3. Iniciar el servidor:
Ejecuta el archivo principal del backend con Node:


4. Abrir la aplicación:

http://localhost:3000
