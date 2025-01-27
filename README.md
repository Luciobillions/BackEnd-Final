
# 🚀 Cómo correr el proyecto

## 1️⃣ Clonar el repositorio 💾

```bash
git clone https://github.com/Luciobillions/BackEnd-Final.git
```

## 2️⃣ Instalar dependencias 📦

Accede a la carpeta raíz del proyecto y ejecuta:

```bash
npm i
```

## 3️⃣ Configurar variables de entorno

Asegúrate de que el archivo `.env` del proyecto esté configurado con las credenciales correctas para conectar a **MongoDB**. Un ejemplo del archivo `.env` podría ser:

```env
MONGO_URI=mongodb://localhost:27017/mi_base_de_datos
PORT=3000
```

Yo estuve utilizando **MongoDB Atlas** 🔗  
[MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)

## 4️⃣ Configurar la base de datos ⚙️

1. Abre **MongoDB Compass** u otra herramienta para gestionar MongoDB.  
2. Conecta a tu instancia de MongoDB y verifica que la base de datos mencionada en el `.env` esté accesible.

---

# 📌 Endpoints disponibles

## 👤 User
- `GET` - `/api/user/get`  
- `POST` - `/api/user/create`  
- `DELETE` - `/api/user/delete/:id`  
- `PUT` - `/api/user/update/:id`  
- `POST` - `/api/user/login`  

## 🛒 Product
- `GET` - `/api/product/get`  
- `POST` - `/api/product/create`  
- `DELETE` - `/api/product/delete/:id`  
- `PUT` - `/api/product/update/:id`  

## 🗂️ Category
- `GET` - `/api/category/get`  
- `POST` - `/api/category/create`  
- `DELETE` - `/api/category/delete/:id`  
- `PUT` - `/api/category/update/:id`  

---

# 🔧 Ejemplos de datos mock

### **User**
Para probar la creación de un usuario con `POST /api/user/create`, puedes usar el siguiente ejemplo:

```json
{
  "name": "Testeo",
  "lastname": "Prueba",
  "email": "Tester123@gmail.com",
  "age": 33,
  "password": "Password123"
}
```

📌 **Nota:** La contraseña debe cumplir ciertos requisitos.

---

### **Product**
Para probar la creación de un producto con `POST /api/product/create`, puedes usar el siguiente ejemplo:

```json
{
  "name": "Jordan Bluberry",
  "price": 500,
  "description": "Zapatillas talle 43, color azulado",
  "status": "AVAILABLE",
  "category": "6796fe0997217c7ababdd1b2",
  "stock": 66
}
```

📌 **Nota:**  
- `status` debe ser uno de los siguientes valores: `"AVAILABLE"`, `"NOT AVAILABLE"`, `"DISCONTINUED"`.  
- `category` debe contener el **ID** de una categoría existente.

---

### **Category**
Para probar la creación de una categoría con `POST /api/category/create`, puedes usar el siguiente ejemplo:

```json
{
  "name": "Zapatillas",
  "description": "Zapatillas deportivas"
}
```

---

# 🧪 Comandos para probar la aplicación

### 1️⃣ Iniciar el servidor
```bash
npm start
```

### 2️⃣ Probar los endpoints
Usa herramientas como **Thunder Client** o **Postman** para enviar solicitudes a los endpoints listados anteriormente.  
Por ejemplo, para obtener todos los usuarios:

```http
GET http://localhost:3000/api/user/get
```

---

# 🔐 Autenticación con JWT  

Para acceder a ciertas rutas protegidas de la API, los usuarios deben autenticarse primero.  
Esto se hace a través de un **token JWT**, que se genera al iniciar sesión y tiene una duración de **1 hora**.  

---

## 🔑 Inicio de sesión  
Después de crear una cuenta, el usuario debe iniciar sesión para acceder a funciones de la API.

📌 **Endpoint:**  
```http
POST /api/user/login
```

📌 **Body (JSON):**
```json
{
  "email": "Tester123@gmail.com",
  "password": "Password123"
}
```

📌 **Respuesta esperada:**
```json
{
  "message": "logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## ⚙️ Uso del token en Postman o Thunder Client  
Para acceder a rutas protegidas, el **token** generado debe incluirse en la **autenticación** de cada petición.

📌 **Pasos en Postman o Thunder Client:**  
1. Ir a la pestaña **Auth**.  
2. Seleccionar **Bearer Token**.  
3. Pegar el token generado en el campo correspondiente.  


---

## 🎉 ¡Gracias por usar esta API!

Aprecio que hayas tomado el tiempo para probar esta API. 🚀  
Si tienes alguna sugerencia, error o mejora, siéntete libre de abrir un **issue** en el repositorio. Muchas Gracias!!
