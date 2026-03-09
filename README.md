# API de Gestión de Medias 🎬

Esta es una API REST desarrollada con **Node.js**, **Express** y **MongoDB** para la gestión de producciones audiovisuales como películas y series.

El sistema permite administrar información relacionada con:

- Medias (películas o series)
- Géneros
- Directores
- Productoras
- Tipos de producción

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv
- Cors

## Funcionalidades principales

La API permite realizar operaciones CRUD sobre el modelo **Media**:

- Crear una media
- Consultar todas las medias
- Actualizar una media
- Eliminar una media

Las medias están relacionadas con:

- Género
- Director
- Productora
- Tipo

Estas relaciones se manejan mediante **referencias con ObjectId en MongoDB**.

## Ejemplo de endpoint

```
GET /api/media
```

Este endpoint permite consultar todas las medias registradas en la base de datos.

Ejecutar el servidor

```
npm run dev
```

El servidor se ejecutará en:

```
http://localhost:4000
```

## Repositorio del proyecto

Puedes encontrar el código fuente completo en el siguiente enlace:

**GitHub:**  
https://github.com/SsebasS-PD/Desarrollo_Api-Rest_ING_WEB_2.git

---

Desarrollado como práctica de desarrollo de **APIs REST con Node.js y MongoDB** para la Universidad Digital de Antioquia - Programa Tecnologia en Desarrollo de Software.