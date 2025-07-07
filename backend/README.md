# 📚 Documentación de la API - Marketplace de Cursos

## 🔗 URL base
http://localhost:3000/api


---

## 🟢 Autenticación

### 🔹 Registro
- **POST** `/users`
- **Cuerpo:**
```json
{
  "user_name": "string",
  "user_first_name": "string",
  "user_last_name": "string",
  "user_email": "string",
  "user_password": "string",
  "user_rol": "student|teacher",
  "user_img": "string" // ejemplo: "default.png"
}


🔹 Inicio de sesión
POST /users/login

Cuerpo:
{
  "user_name": "string",
  "user_password": "string"
}

Respuesta:
{
  "token": "JWT",
  "user": {
    "user_id": "int",
    "user_name": "string",
    "user_email": "string",
    "user_rol": "student|teacher"
  }
}


🔹 Actualizar perfil
PUT /users/:id

Auth: Token Bearer

Cuerpo (todos opcionales):
{
  "user_name": "string",
  "user_first_name": "string",
  "user_last_name": "string",
  "user_email": "string",
  "user_password": "string",
  "user_img": "string"
}


📚 Cursos
🔹 Crear curso
POST /courses

Auth: Token Bearer (profesor)

Cuerpo:
{
  "course_title": "string",
  "course_category": "string",
  "course_description": "string",
  "course_price": "number",
  "course_start_date": "YYYY-MM-DD",
  "course_img": "string"
}


🔹 Listar todos los cursos
GET /courses

Respuesta: Arreglo de cursos.


🔹 Obtener detalles de un curso
GET /courses/:id

Respuesta: Objeto de un curso.


🔹 Eliminar un curso
DELETE /courses/:id

Auth: Token Bearer (profesor, propietario del curso)


🎓 Inscripción
🔹 Inscribirse en un curso
POST /enroll/:courseId

Auth: Token Bearer (estudiante)

Respuesta: Confirmación de inscripción.


🔹 Desinscribirse de un curso
DELETE /enroll/:courseId

Auth: Token Bearer (estudiante)

Respuesta: Confirmación de desinscripción.


🔐 Ruta protegida de prueba
GET /protected

Auth: Token Bearer

Respuesta:
{ "message": "Access granted!" }


🔹 Ver cursos en los que estoy inscrito
GET /enroll/my-courses

Auth: Token Bearer (estudiante)

Respuesta: Arreglo de cursos en los que el estudiante autenticado está inscrito.


En todas las rutas protegidas, enviar:
Authorization: Bearer <token>


✅ Instrucciones para la integración
Siempre incluye el token JWT en las rutas protegidas.

Asegúrate de que los formularios del frontend coincidan con los cuerpos de las peticiones que se muestran arriba.

Llama a las rutas exactamente como están listadas para un comportamiento consistente.