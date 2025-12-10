import { Schema, model, models } from "mongoose";

const CourseSchema = new Schema(
    {
        title: { type: String, required: true },
        short: { type: String, required: true },
        icon: { type: String, required: true },
        color: { type: String, required: true },
        image: { type: String, default: "/default-course.png" }
    },
    { timestamps: true }
);

// Previene recrear el modelo en hot reload
export default models.Course || model("Course", CourseSchema);



