import mongoose, { Schema, models } from "mongoose";

const ProgressSchema = new Schema(
    {
        userId: { type: String, required: true },
        courseId: { type: String, required: true },
        lessonId: { type: String, required: true },
        score: { type: Number },
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// 👇 MUY IMPORTANTE: forzar nombre exacto de la colección
export default models.Progress ||
    mongoose.model("Progress", ProgressSchema, "progresses");
