const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    short: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
});

// Evita el error de recompilar modelos en Next.js
module.exports = mongoose.models.Course || mongoose.model("Course", CourseSchema);
