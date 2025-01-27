import express from 'express';
import { PORT } from './config.js';
import { connectDB } from './db.js';
import userRoute from './src/routes/userRoute.js';
import productRoute from './src/routes/productRoute.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import categoryRoute from './src/routes/categoryRoute.js';

const app = express();

// Conectar a la base de datos
connectDB().then(() => {
    // Configuración de middlewares
    app.use(express.json()); // Para parsear JSON
    app.use(express.urlencoded({ extended: true })); // Para parsear formularios URL-encoded
    app.use(cookieParser());

    // Configuración de sesión
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Esto debe ser false si no estás usando HTTPS
    }));

    // Rutas
    app.use("/api/user", userRoute);
    app.use("/api/product", productRoute);
    app.use("/api/category",categoryRoute)

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} 🚀`);
    });
}).catch((err) => {
    console.error('Failed to start server:', err);
});
