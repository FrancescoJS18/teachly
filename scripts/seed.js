require("dotenv").config({ path: ".env.local" }); // Cargar .env
const mongoose = require("mongoose");
const Course = require("../models/CourseModel");

// Conexión
async function seed() {
    await mongoose.connect(process.env.MONGODB_URI);

    const cursos = [
        {
            title: "Python",
            short: "Curso básico de Python",
            icon: "/icons/python.png",
            color: "from-yellow-400 to-red-400",
        },
        {
            title: "JavaScript",
            short: "Aprende JS desde cero",
            icon: "/icons/js.png",
            color: "from-yellow-300 to-yellow-500",
        },
        {
            title: "HTML",
            short: "Curso de HTML inicial",
            icon: "/icons/html.png",
            color: "from-orange-400 to-yellow-500",
        },
        {
            title: "PHP",
            short: "Curso básico de PHP",
            icon: "/icons/php.png",
            color: "from-indigo-400 to-purple-500",
        },
        {
            title: "CSS",
            short: "Diseño web con CSS",
            icon: "/icons/css.png",
            color: "from-blue-400 to-blue-600",
        },
    ];

    await Course.deleteMany(); // limpia antes de insertar
    await Course.insertMany(cursos);

    console.log("Cursos creados correctamente");
    process.exit();
}

seed();


